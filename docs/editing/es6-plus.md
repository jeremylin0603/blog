# ECMAScript syntax

個人主觀將語法分三類

- Useful: 有正面效果，可以直接投入開發
- Learn: 學習後能加深對語言生態的認知，平時開發用不太到
- Danger: 有**個人認為**的負面效果，知道即可不建議投入開發

## Useful

### Promise.allSettled()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

- Handle multiple Promise type in an Array，當所有的 request 都取回 response 後回傳一個包含狀態(status _fulfilled_ or _rejected_)和結果(success _value_ or failed _reason_) 的 Array

```javascript
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject('foo'), 100)
})
const collectPromises = [promise1, promise2]

Promise.allSettled(collectPromises).then((results) => {
  results.forEach((result) => {
    console.log(result)
  })
})
/* (log print)
{ status: 'fulfilled', value: 3 }
{ status: 'rejected', reason: 'foo' }
*/
```

> 有個場景是一次處理多隻 API 的輪詢，其中包含狀態更新和 session 驗證等請求，只要其一 reject 整個網站就會停止所有動作並蓋上一個斷線遮罩，所有 API 回來後才會進到下一輪的輪詢倒數。  
> 當時是將請求放入陣列中，請求前計算陣列長度，當收到回傳時 -1，直到 0 則表示所有請求都回來了，再開始下一輪輪詢，處理起來不難但後來有這 API 後程式簡化許多。

### Dynamic Import

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

> 在定義 Vue Router 時官方就建議使用 Dynamic Import 了，使用者可以忍受每進一個新路由等待 0.5 秒，但絕對不能忍受剛進網站時多等 2 秒鐘。

### Nullish (??)

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

> 個人認為是針對 `a || b` 寫法的優化，JS 強制型轉的機制下傳統寫法只要是

### String.prototype.replaceAll()

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

## Learn

### Proxy

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

- 攔截針對物件的操作，可以理解為改寫了 dot 運算子(.)的行為

### Reflect

- 為了取代 Object 而設計的 API
- 修改了原本 Object 的歷史問題，for example:
  > `delete obj[name]` > `Reflect.deleteProperty(obj, name)`  
  > `name in obj` > `Reflect.has(obj, name)`

## Danger

### Logical Assignment

- danger reason
  個人認為語法違反直覺，影響可讀性，真要使用就用舊語法也沒有太大問題

#### Logical AND assignment (&&=)

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)

- Only assigns if x is truthy.

```javascript
// old
x && (x = y)

// new
x &&= y
```

#### Logical OR assignment (||=)

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)

- Only assigns if x is falsy.

```javascript
// old
x || (x = y)

// new
x ||= y
```

## Ref:

[阮一峰 ES6](https://es6.ruanyifeng.com/)
[MDN]
[STATE OF JS 2022](https://2022.stateofjs.com/zh-Hant/)
