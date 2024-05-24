# 未整理隨筆

## 捕獲(capture)&冒泡(bobble)

- 在一顆 dom tree 上，會先 capture 再 bobble  
  也就是說，每一次 click ，最先收到通知的都是 document，然後一路傳遞到最深的子層，接著再開始 bobble 回來，最後 bobble 到 document。
- 預設上的事件都是在 bobble 階段進行，但可以加上 capture 指定要在捕獲階段執行
- 事件的註冊首先有分事件類型(click、scroll 這樣是兩種類型)，並且執行時會按照註冊順序執行(同一個 elem 可以註冊好幾個 click)

### 常見 api

> preventDefault  
> stopPropagation  
> stopImmediatePropagation

preventDefault 剛學很容易搞混，但跟這裡關聯不大，preventDefault 表示禁止元素原生已經預設的事件，例如 `<a>` 原生就預設了點擊後跳轉至連結的 click 事件，preventDefault 可以取消這種行為。

stopPropagation 只是單純阻止事件傳播，若是 capture 則阻止讓子層捕獲，若 bobble 則阻止往父層冒泡。

stopImmediatePropagation 除了做到 stopPropagation 的工作以外，還阻止了同一個元素的同個事件類型，但沒辦法阻止比當下註冊順序還要前面的同個事件類型。

example:

```js
btn.addEventListener('click'...) // 1
btn.addEventListener('click'...) // 2
btn.addEventListener('click'...) // 3 <- stopImmediatePropagation，會阻止 4 & 5 觸發 & 事件向上/向下傳遞
btn.addEventListener('click'...) // 4
btn.addEventListener('click'...) // 5
btn.addEventListener('touch'...) // 6
```

## 時間處理 Intl

沒用過，有空再來研究

```js
new Intl.DateTimeFormat('zh-Hant-TW', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(Date.now())
// '下午2:39:53'
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
