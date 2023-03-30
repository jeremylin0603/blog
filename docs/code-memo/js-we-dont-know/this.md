# this

> 本篇主要關心的是 browser runtime，如果把 Node runtime 混再一起說明會很混亂，例如 Node 頂層 this 指向 `module.exports`，但 function 中 this 指向 `global`...，等未來有時間深入 Node 再另開一篇文章研究研究

## What is "this"?

### "this" 是由 execution context 創建時主動建立的變數(variable)，並且將 this 指向某個變數，指向是會隨著

- 整個程式運行所創建的第一個 execution context 為 global execution context，JS Engine 會主動建立一個 global object(browser 為 `window`)、和 `this`，並且 global 中的 `this` 指向 global object。

- 但 `strick mode` 嚴格模式不綁定 `this`，因此 `strick mode` 的 `this` 為 `undefined`

### 最基本的 "this": 指向呼叫他的 context

```javascript
const text = 'outside'
const obj = {
  text: 'inside',
  fn: function () {
    console.log(this.text)
    const insideFn = function () {
      console.log(this.text)
    }
    insideFn()
  }
}
obj.fn() // fn 的上一層 context 是 obj，因此 log 為 'inside'
const newFn = obj.fn
newFn() // newFn 的上一層 context 指向 global context，因此 log 為 'outside'
```

### "this" in arrow function:

這問題很單純，因為 arrow fn 沒有 this，所以 arrow fn 裡面的 this 就跟其他變數一樣，這個 scope 沒有就一路往 scope chain 找，直到找到其他有意義的 this 或是 global this 為止。

```javascript
// arrow fn 怎麼對待變數 a，就會怎麽對待 this
const a = 1

const arrowFn = () => {
  console.log(a)
  console.log(this)
}
```

### obj 的 this 指向自己本身

```javascript
const obj = {
  num: 1,
  showNum: function () {
    console.log(this.num)
  }
}

obj.showNum() // 1
```

## 「obj fn 中的 fn」 - this 會指回 global object

```javascript
const obj = {
  num: 1,
  showNum: function () {
    console.log(this.num)
    function showInsideNum() {
      console.log(this.num) // undefined
      console.log(this === window) // true
    }
    showInsideNum()
  }
}

obj.showNum() // 1
```

### call, apply, bind

- 這些方法的目的都是改變 this 指向
- call, apply 可以看作另外指定 "this" 的 invoke, 兩者只差在入參方式不同
- bind 只單純綁定後 return 一個 function，不會 invoke function

```javascript
// ...承上例
const obj2 = {
  num: 2,
  showNumAndProps: function (a, b) {
    console.log(this.num, a, b)
  }
}

obj2.showNumAndProps(3, 4) // 2, 3, 4
obj2.showNumAndProps.call(obj1, 3, 4) // 1, 3, 4
obj2.showNumAndProps.apply(obj1, [3, 4]) // 1, 3, 4
// * obj2.showNumAndProps.bind(obj1, 3, 4) will return a function that already bind this.
const showBind = obj2.showNumAndProps.bind(obj1, 3, 4)
showBind() // 1, 3, 4
// * after bind, "this" can't retarget again.
showBind.call(obj1, 3, 2) // 1, 3, 4
showBind() // 1, 3, 4
```

參考連結: [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.techbridge.cc/2019/02/23/javascript-this/) @huli blog
