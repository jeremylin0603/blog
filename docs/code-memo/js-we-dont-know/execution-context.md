# Execution context

## What is Execution context?

Execution context （以下簡稱 EC）是 JS Engine 在記憶體中創建的空間，用來存儲當前執行任務的各種資訊，包含當前作用域中的變數與函式、`this` key word、作用域外部的 reference 等訊息。通常執行過程中會創建許多新的 EC，每次創建一個新的 EC 都會將其推入一個維護 EC 執行順序的隊列 - **call stack**，JS Engine 會執行 Call stack 中最新推入的 EC 直到該 EC 被執行完畢後將其 pop 出 Call stack，並且繼續執行下一個最後推入的 EC，直到整個 Call stack 佇列被清空，結束執行。

<!-- TODO: 關於 stack 只需要知道兩件事 -->

> call stack 是後進先出的（LIFO - last in first out）
> <BaseImg src="https://cdn.pixabay.com/photo/2012/02/23/08/38/rocks-15712_1280.jpg" isAutoSize />

#### JS Engine

負責執行 Javascript 的虛擬機(Virtual Machine)，目的是將人類才看得懂的高階語言轉譯成機器看得懂的機器語言，JS Engine 包含了 Memory Heap 與 Call stack，其中 Heap 是記憶體空間，用來儲存變數和物件，call stack 如上所述是用來維護 EC 的佇列。

市面上著名的 JS Engine 為 Chrome 的 V8，Node.js 也是基於 V8 才得以誕生的，每個 JS Engine 運行的方式不完全相同，但無論哪一個都得按照 ECMAScript 的規範來運行，關於 JS、ECMA、V8 和 Node 背後的故事未來有機會再開一篇聊聊。

## When will EC be created?

JS Engine 執行時若遇到下列情況，皆會創建一個新的 Execution context 並推入 call stack 之中：

- 初次載入 script 時，創建 global execution context
- function invoke `fn()`
- import module
- eval()

## EC phase

每個 Execution context 都包含兩個階段(phase):

### Phase1. 創建(creation)

這階段會創建

- Lexical environment(LE): 存儲了當前 scope 中宣告的變數和 function

- Reference: 又稱為 Outer environment，指向當前環境的外部 LE，變數在當前的 LE 找不到時就會往 Reference 找，這樣不斷的向外關聯也就形成了 scope chain，會一直找到 global 為止

- [`this`](./this.md) binding: 創建 `this` 變數，並將其指向 global object。若是屬於 Object 中的 function，則 `this` 會指向所屬的 Object，更多行為詳見[this](./this.md)

### Phase2. 執行(execution)

<BaseImg src="https://i.imgur.com/ibACf8Y.png" isAutoSize/>
call stack 中最上面（最後加入的）的 EC 會先被執行，直到該執行階段結束(function return)，執行完畢後將其 pop 出 call stack 佇列，直到最後 global execution context 也被 pop 出去時才算執行完畢。

## EC & Hoisting

## 小結

1. 當 script 第一次被執行時，JS Engine 會創建一個 global execution context，並且將其加入 call stack 之中
2. JS Engine 會逐行執行程式碼，當遇到 function invoke、import module、eval() 時，會再創建一個全新的 Execution context 後加進 call stack
3. 當最後加入的 context 執行完畢後將其拋出 stack，並且繼續執行下一個最晚加入的 context
4. 直到整個 stack 清空為止。

## Scope Chain

Scope Chain 指的是不同的作用域互相包裹之下，存取某個變數時若在當前作用域找不到該變數，就會繼續往外部作用域尋找，直到最後抵達 global scope 為止。

而現在我們知道每個 EC 都會創建 Reference，這個 Reference 會關聯到外部的 EC，外部的 EC 也有自己的 Reference 指向更外部的 EC，這樣不斷地向外關聯就形成了 scope chain

> notice：Reference 關聯的外部 EC 是依據「程式碼實際位置的外部」，而非依據 call stack 佇列的位置

## Block Scope

在 ES6 之前只有兩種 Scope: `global scope` & `function scope`，ES6 之後新增了 `block scope`

```javascript
// ./index.js

// global scope here
function fn() {
  // function scope here
}

{
  // block scope here
}
```

#### REF

[How JS Works - Lexical Environment](https://www.borderlessengineer.com/post/how-js-works-lexical-environment) @borderless engineer

[JavaScript Runtime Environment: JavaScript Engine](https://slawinski.dev/blog/javascript-runtime-environment-javascript-engine/) @slawinski.dev

[How will the Lexical environment and the Variable Environment will look like at the following code](https://stackoverflow.com/questions/69417158/how-will-the-lexical-environment-and-the-variable-environment-will-look-like-at) @stack overflow

[JavaScript Execution Context & var/let/const](https://ithelp.ithome.com.tw/articles/10288147?sc=iThelpR) @IT 邦

[JavaScript execution context — lexical environment and block scope (part 3)](https://cabulous.medium.com/javascript-execution-context-lexical-environment-and-block-scope-part-3-fc2551c92ce0) @medium Carson

```javascript
console.log(num)
if (0) {
  var num = 10
}
```

```javascript
var apple = 'global apple'
let banana = 'global banana'
{
  let apple = 'scope apple'
  var grape = 'global grape'
  let orange = 'scope orange'
  console.log(apple)
  console.log(banana)
}
console.log(banana)
console.log(grape)
console.log(orange)
```

```javascript
let apple = 'apple'
if (true) {
  console.log(apple)
  // let apple = 'banana'
}
```

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0)
}

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0)
}
```
