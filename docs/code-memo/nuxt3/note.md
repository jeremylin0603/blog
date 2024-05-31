# Nuxt 3 - 未整理隨筆

- ### useFetch & useLazyFetch

在 server 端，兩者行為是完全一樣的，只有到了 client 端，lazy 會將欲請求的 promise 丟到 onBeforeMount 處理，使 route 不阻塞

```javascript
// 為方便表達，極度簡化過
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

---

- ### `<img>` onerror

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

---

- ### nuxt api server 的 proxy 在送出 `DELETE` method 時會出錯

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

解法為在 web proxy 請求送出前主動刪除 `content-length`

```js
// ~/server/api/[...].ts
if (event.node.req.method === 'DELETE') delete event.node.req.headers['content-length']
```

---

- ### `<NuxtLink>` 的 error

```html
<NuxtLink v-show="Boolean(storyOption.actionToId)" :to="`/${storyOption.actionToId}`">
  {{ storyOption.actionTo }}
</NuxtLink>
```

若 `storyOption.actionToId` 為空，NuxtLink 會拋出 fatal error 導致 crash 而且無法從錯誤訊息判斷錯誤來源，在複雜的結構下極難追蹤，需注意這種需求要用 v-if 而非 v-show 去避免傳給 `:to=""` 不必要的值
目前猜測是被轉譯成 `to="/undefined"` 之類的...之後有空再回頭來研究原因

---

- ### `<KeepAlive>`

待補

---

- ### Nuxt useFetch 同請求短時間併發

useAsyncData 會維護一個佇列，每個請求在佇列中的生命週期為送出請求到 promise 的 finally 為止

```js
  }).finally(() => {
    asyncData.pending.value = false;
    delete nuxt._asyncDataPromises[key]; // 清除佇列
  })
```

若短時間併發同一個請求(同一個 payload key)，useAsyncData 的策略為尊重第一個回來的請求，後續的請求只要回來後發現佇列有重複的 key，就會直接返回之前請求的結果，而忽略後面的請求。  
意即若第一個請求為 error，則第二個請求就算成功，也會直接返回第一次的結果。

```js
// 請求前標記 cancelled
if (nuxt._asyncDataPromises[key]) {
  nuxt._asyncDataPromises[key].cancelled = true
}
```

```js
  // 請求後直接返回首次回應的結果
  ).then((_result) => {
    if (promise.cancelled) {
      return nuxt._asyncDataPromises[key];
    }
    ...
  }).catch((error) => {
    if (promise.cancelled) {
      return nuxt._asyncDataPromises[key];
    }
    ...
  }
```

- ### Nuxt Error handle

  - 在 Nuxt 框架下推薦使用 `showError` & `createError`
  - 關於 Nuxt Error 的理解，與其看官方文件，base code 其實沒幾行，看完就懂了（只限 error 這塊，平常還是得乖乖看^^）
  - 底層其實就是依賴 nuxt 的全域狀態 `useError()` 維護一個 state，這個 state 是否有值直接影響 error.vue 的開合，在 `/nuxt-root` file 中簡單幾行就能理解 error.vue 的運作

  ```vue
  <!-- /nuxt/app/src/components/nuxt-root.vue -->
  <template>
    <Suspense @resolve="onResolve">
      <div v-if="abortRender" />
      <ErrorComponent v-else-if="error" :error="error" />
      <IslandRenderer v-else-if="islandContext" :context="islandContext" />
      <component :is="SingleRenderer" v-else-if="SingleRenderer" />
      <AppComponent v-else />
    </Suspense>
  </template>

  <script setup lang="ts">
  // error handling
  const error = useError()
  </script>
  ```

  - showError & createError 相同之處就是他們都是建立一個 error object，不同之處則是 showError 會將 error object 賦値到 useError state，createError 則只是單純建立一個 error object 而已，也因為如此在使用 createError 時我們就像在處理一般的 error 一樣主動拋出去

  ```ts
  // /nuxt/app/composables/error.ts
  export const createError = <DataT = unknown>(
    error:
      | string
      | Error
      | (Partial<NuxtError<DataT>> & {
          status?: number
          statusText?: string
        })
  ) => {
    const nuxtError: NuxtError<DataT> = createH3Error<DataT>(error)

    Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
      value: true,
      configurable: false,
      writable: false
    })

    return nuxtError
  }

  export const showError = <DataT = unknown>(
    error:
      | string
      | Error
      | (Partial<NuxtError<DataT>> & {
          status?: number
          statusText?: string
        })
  ) => {
    const nuxtError = createError<DataT>(error)

    try {
      const nuxtApp = useNuxtApp()
      const error = useError()

      if (import.meta.client) {
        nuxtApp.hooks.callHook('app:error', nuxtError)
      }

      error.value = error.value || nuxtError
    } catch {
      throw nuxtError
    }

    return nuxtError
  }
  ```

  - 可以看到 showError 在賦值之前會先呼叫 `app:error` 的 hook，所以雖然不是個好方法，但若有需要可以在 `app:error` 的 hook 捕捉 error 訊息的同時，清除 useError state，寫成一個 plugin 然後控制得好，就是一個全域的 error-handler 了，會這樣做的理由是進入 error.vue 表示原本的 app.vue 被關閉，所以除非真的是 fatal error 如 404 or 500，否則都不應該進到 error 頁面。
  - 清除 useError state 時需要塞字串 `'null'`，這樣做的原因是 nuxt 本身的 clearError 也是這樣做(Nuxt4 要改塞 `'undefined'` [see](https://nuxt.com/docs/guide/going-further/features#compatibilityversion))。

  ```ts
  // /nuxt/app/composables/error.ts
  export const clearError = async (options: { redirect?: string } = {}) => {
    const nuxtApp = useNuxtApp()
    const error = useError()

    nuxtApp.callHook('app:error:cleared', options)

    if (options.redirect) {
      await useRouter().replace(options.redirect)
    }

    error.value = nuxtDefaultErrorValue
  }
  // /nuxt/src/core/templates.ts
  declare module '#app/defaults' {
    type DefaultErrorValue = ${ctx.nuxt.options.future.compatibilityVersion === 4 ? 'undefined' : 'null'}
  }
  ```
