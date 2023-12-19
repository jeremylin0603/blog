# Nuxt 3

## 未整理隨筆

- useFetch & useLazyFetch
  在 server 端，兩者行為是完全一樣的，只有到了 client 端，lazy 會將欲請求的 promise 丟到 onBeforeMount 處理，使 route 不阻塞

```javascript
/** 為方便表達，極度簡化過 */
export function useAsyncData(...args) {
  if (server & immediate) {
    nuxt.hook('app:created', async () => {
      await promise
    })
  }

  if (client) {
    const instance = getCurrentInstance()
    instance._nuxtOnBeforeMountCbs = []
    const cbs = instance._nuxtOnBeforeMountCbs

    onBeforeMount(() => {
      cbs.forEach((cb) => {
        cb()
      })
      cbs.splice(0, cbs.length)
    })

    onUnmounted(() => cbs.splice(0, cbs.length))

    if (lazy) instance._nuxtOnBeforeMountCbs.push(initialFetch)
    else if (immediate) initialFetch()
  }
}
```

> server side 的 html 生成後就結束了，不會因為觸發某個變數的 setter 而回頭更新，結合 server 端無視 lazy 請求的設計，在請求時的 watch 應直接設置 immediate 確保準備生成 html 時所有資料都在預期中。

- `<img>` 若請求失敗，其 onerror 事件在 server side 觸發後就結束了，client side 不會重新觸發一次，因此目前取巧的方法是在 server side 塞一個註記，讓 client side 按照註記生成與否去延後處理 onerror 事件。
  （但 server render 依然會渲染死圖，因此若有 onerror 後換成預設圖片的需求，user 依然會在第一個瞬間看到破圖，而後 script 跑到 onerror 才會看到預設圖片）

```typescript
/**
 * CustomImg component
 * 為了解決 img 標籤的 onerror 事件在 hydrate 前觸發導致無法正確捕捉的問題
 * copy from nuxt-image
 * @see https://github.com/nuxt/image/pull/842/files
 */

export default defineComponent({
  name: 'CustomImg',
  emits: ['load', 'error'],
  setup: (_, ctx) => {
    const imgEl = ref<HTMLImageElement>()

    const { isServer } = useEnvironment()
    const nuxtApp = useNuxtApp()
    const initialLoad = nuxtApp.isHydrating

    onMounted(() => {
      if (!imgEl.value) return

      if (imgEl.value.complete && initialLoad) {
        if (imgEl.value.getAttribute('data-error')) ctx.emit('error', new Event('error'))
        else ctx.emit('load', new Event('load'))
      }

      imgEl.value.onload = (event) => {
        ctx.emit('load', event)
      }
      imgEl.value.onerror = (event) => {
        ctx.emit('error', event)
      }
    })

    return () =>
      h('img', {
        ref: imgEl,
        ...(isServer ? { onerror: "this.setAttribute('data-error', 1)" } : {}),
        ...ctx.attrs
      })
  }
})
```

- nuxt api server 的 proxy 在送出 `DELETE` method 時會出錯

這是由於其背後使用 `node-http-proxy` 套件，該套件會將不帶有 `content-length` 的 `DELETE` & `OPTIONS` method 補上 content-length: 0

```javascript
// @see: https://github.com/http-party/node-http-proxy/blob/9b96cd725127a024dabebec6c7ea8c807272223d/lib/http-proxy/passes/web-incoming.js#L34-L40
module.exports = {
  deleteLength: function deleteLength(req, res, options) {
    if ((req.method === 'DELETE' || req.method === 'OPTIONS') && !req.headers['content-length']) {
      req.headers['content-length'] = '0'
      delete req.headers['transfer-encoding']
    }
  }
}
```

但是 nodejs 依據 RFC9112 session-11.2，「不允許」DELETE 帶有多餘的信息([連結](https://github.com/nodejs/undici/issues/2046#issuecomment-1694645103))，理由是這種行為可能會遭受攻擊 - 藉由接收方解析不同協議的差異，去夾帶額外請求信息達到攻擊，稱為 Request Smuggling(請求走私)

- [RFC9112 session-11.2](https://www.rfc-editor.org/rfc/rfc9112#name-request-smuggling)

> 11.2. Request Smuggling
> Request smuggling ([Linhart]) is a technique that exploits differences in protocol parsing among various recipients to hide additional requests (which might otherwise be blocked or disabled by policy) within an apparently harmless request. Like response splitting, request smuggling can lead to a variety of attacks on HTTP usage.
>
> This specification has introduced new requirements on request parsing, particularly with regard to message framing in Section 6.3, to reduce the effectiveness of request smuggling.

- 首次請求 nuxt ssr page, 接著點擊瀏覽器的上一頁後再點擊下一頁（以下簡稱"上下頁"）, 不會重新向 web server 請求而是取得 cache document 生成頁面

這種行為會導致頁面始終被快取在首次 ssr 的狀態。

例如進入頁面後請求失敗使頁面顯示 fail page，此時做上下頁的操作後，頁面會直接快取上次請求取得的 document，而非失敗畫面，直到 script 在 client side 重新跑一次後才會刷新到正常頁面。
