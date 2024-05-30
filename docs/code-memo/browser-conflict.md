# 裝置＆瀏覽器調適未整理筆記

## 100vh 在手機端會被網址列阻擋畫面

```css
.full-height {
  height: 100dvh;
}
```

[urlbarsize](https://bokand.github.io/demo/urlbarsize.html)

## Safari 在非同步的 scope 下會阻止另開新頁 window.open()

這應該是一種安全性策略，最直接的解法就是跳脫 async scope

```js
await fetchSomeApi()
setTimeout(() => window.open, 0)
```

## ios 內建的 Chrome core 不是 V8 而是 webkit

這是基於 apple 的政策，所有運行在 ios 上的 browser 都得用 webkit  
但 ios 17.4 開始允許歐盟地區在允許的範圍內使用 webkit 以外的 core，[詳見](https://developer.apple.com/support/alternative-browser-engines/)
