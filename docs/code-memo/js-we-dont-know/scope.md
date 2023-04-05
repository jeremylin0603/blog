# Scope Chain & Scope

## Scope chain

Scope chain 是當前 EC 的 Reference 所關聯到的外部 EC 去尋找的，而外部的 EC 也有自己的 Ref 參照到更外面，這樣不斷的往外參照直到 global，就形成了一條 scope chain。

要特別強調，Reference 向外的關聯並不是關聯到 call stack 中的前一個 EC，而是關聯到「創建當前 EC」的 EC，換個說法就是 Reference 關聯哪一個 EC 看的不是當前 EC 由誰呼叫，而是看當前 EC 被誰創建的。

```javascript
var num = 123
var text = 'global text'

function a() {
  var text = 'a text'

  function b() {
    c()
  }

  b()
}

function c() {
  console.log(text)
}

a()
```

上例中：

1. Global EC 創建階段將 `num`、`text`、`a function`、`c function` 存儲到記憶體中，並在執行階段賦值(assign)了 `num`&`text` 後執行`a()`

   current stack: [global, a()]

2. 此時 `a-EC` 被放入 stack 中，`a-EC` 的創建階段將`text`、`b function` 存儲到記憶體中，並在執行階段 assign `text` 後執行 `b()`

   current stack: [global, a(), b()]

3. `b-EC` 被放入 stack 中，`b-EC` 的執行階段執行了 `c()`

   current stack: [global, a(), b(), c()]

4. 接著繼續執行 `c()`，並且將`c-EC`放入 stack

   current stack: [global, a(), b(), c()]

5. `c-EC` 執行 log(text)，但`c-EC`中沒有 text，因此沿著 REF 找，這時雖然 stack 中 `c-EC` 的上一層是 `b-EC`，但 `c function` 是由 global 創建的，所以 REF 指向 global，text 也會往 global 尋找，最後印出`'global text'`，而非印出呼叫 `c()` 時外部的 `'a text'`

## Scope

ES6 之後 Scope 有三種 - `Global scope`、`Function scope`、`Block scope`，其中 `Block scope` 是隨著 ES6 的 `let`、`const` 所新增的。
相信大家都知道 `var` 跟 `let`、`const` 在作用域上有不同的表現：

```javascript
var textVar = 'origin var'
let textLet = 'origin let'

if (true) {
  var textVar = 'new var'
  let textLet = 'new let'
}

console.log(`${textVar}, ${textLet}`) // new var, origin let
```

上例中我們在 block scope 中重複宣告了 `var` & `let`，最終 `var` 被重新賦值但 `let` 依然是 'origin let'，表面上我們知道 `var` 不受 Block Scope 所限制，實際上發生了什麼事？

首先 Global EC 被放入 stack 中，開始創建階段，直到`第二行`時，JS Engine 將 `textVar` & `textLet` 塞進記憶體中，但此時 `textVar` 被存在 `Variable Environment`，而 `textLet` 被存在 `textLet`。

接著繼續在創建階段的`第四行`，因為 scope 是不會產生新 EC 的，因此無論 if 條件判斷如何，scope 中的變數一樣會在創建階段被存入記憶體之中。

創建階段的`第五行`，`textVar` 被重新宣告並且初始化賦予 `undefined`，注意此時 `Variable env.` 中只存有一個變數叫 textVar

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <image href="@source/drawio/scope_1.drawio.svg" height="400" width="600" />
</svg>

創建階段的`第六行`，又宣告同名的 `textLet`，此時「因為在 block scope 中宣告」，因此 Lexical env. 為其創建這個 block scope 專屬的環境

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <image href="@source/drawio/scope_2.drawio.svg" height="400" width="600" />
</svg>

所以到了執行階段，`var` 會被更新，但 `let` 卻能保持原有的值，**雖然在同一個 EC 中**，但 `let` 遇到 block scope 時會在 Lexical env. 中創建其專屬的作用域

最後按照這個邏輯，我們回頭看面試經典題目：

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // 3, 3, 3
  }, 500)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // 0, 1, 2
  }, 500)
}
```

這裡先不談 event loop，光看 scope 我們可以知道：var 從頭到尾都只有一個，但 let 在 for loop 循環中依序創建了三個專屬的 scope，所以回頭查找參照的變數時才能夠找到對應的 let，不像 var 會被覆蓋。

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <image href="@source/drawio/scope_3.drawio.svg" height="400" width="600" />
</svg>
