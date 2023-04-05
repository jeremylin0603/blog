# JS Engine、Call stack & Execution context

這篇就先從 JS Engine 開始聊聊他是如何解析 JS 的。

## JS Engine

負責執行 Javascript 的 process，目的是將人類才看得懂的高階語言轉譯成機器看得懂的機器語言，JS Engine 包含了 Memory Heap 與 Call stack，而 JS Engine 又是由 runtime 負責運行的。

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <image href="@source/drawio/runtime.drawio.svg" height="400" width="600" />
</svg>

## runtime

runtime 本質是虛擬機(Virtual Machine)，其中包含了處理 JS 的 JS Engine、維護非同步事件的 Event loop，和為了服務各自環境所提供的額外 API (如 browser 的 DOM 操作、或是 Nodejs 的 `fs` module)

市面上著名的 runtime 為 Chrome 的 V8，後端的 Nodejs 也是基於 V8 才得以實作出來，其中他們內部的 JS Engine 運行方式不完全相同，但無論哪一個都得按照 ECMAScript 的規範來運行。

> 未來有時間再開一個系列分享從 WWW 誕生到 JS、V8、Node 之間非常有趣的歷史故事^^

## Call stack

關於 Call stack 只需要知道兩件事

1. Call stack 是 JS Engine 中的一部分，用來維護「Execution context」的佇列
2. Call stack 是後進先出的（LIFO - last in first out），就像品客洋芋片一樣，最先放進去的那片得吃到最後才拿得出來。

## Execution context(EC)

Execution context （以下簡稱 EC）由 JS Engine 創建，用來解析和執行我們的 JS 程式碼。每個 EC 都會經歷兩個階段 - 「創建」和「執行」。通常「執行」過程中會再創建新的 EC，每次創建一個新的 EC 都會將其推入 **Call stack**後執行，直到執行完畢後才會被移出 stack，並且繼續執行下一個 EC，直到整個 Call stack 佇列被清空。

JS Engine 初次解析 script file 或 ES6 module 時，都會開啟一個新的 Call stack 佇列，並且在佇列中創建第一個 EC 稱為 **Global EC**

##### 每個 EC 是由四個東西組成的：

- Variable environment(VE): 存儲了當前 EC 中宣告的變數（僅限 `var`），並且在創建階段替變數初始化(initialize)賦予 `undefined`，導致我們在宣告前讀取`var`時會是 `undefined`
- Lexical environment(LE): 存儲了當前 EC 中宣告的變數（僅限 `let` & `const`），但不會被初始化。另外 LE 如同 call stack 一樣，也具有「佇列」特性，稍後會補充說明。
- Reference: 又稱為 Outer environment，會指向當前環境的外部 EC，當取用變數時在當前的 EC 找不到，就會往 Reference 找，這樣不斷的向外查找也就形成了 scope chain，會一直找到 global 為止。
- 'this' binding: 創建 `this` 變數，並將其指向 global object。若是屬於 Object 中的 function，則 `this` 會指向所屬的 Object，更多行為詳見[this](./this.md)

## When will EC be created?

JS Engine 執行時若遇到下列情況，皆會創建一個新的 Execution context：

- function invoke `fn()`
- 初次載入 script 時，創建一個獨立的 call stack & global execution context
- 初次載入 ES6 import module 時，創建一個獨立的 call stack & global execution context
- eval()

也就是說能夠堆疊在 global EC 之上的 EC，全部都是 function invoke 後所建的 EC。

## EC 兩階段(2 phase)

### Phase1. 創建(creation)

creation 階段 JS Engine 會先在記憶體中替**當前 scope 中宣告**的變數和 function 創建空間。

> function 會被直接存在 Heap 中，Heap 是設計來存放 Object 的空間，而在 JS 中的 function 其實是 Object。

### Phase2. 執行(execution)

<BaseImg src="https://i.imgur.com/ibACf8Y.png" isAutoSize/>
創建階段結束後，會回頭從第一行開始按照順序往下執行程式碼，執行的過程中遇到創建新 EC 的條件時，就會暫停當前執行，並且由 JS Engine 創建一個新的 EC 推入 call stack 中，繼續開始新 EC 兩階段，直到新 EC 執行完畢被移出 stack，當前 EC 才會從剛才中斷的地方繼續往下執行。

了解完 EC 的組成和特性後，就能開始解釋 JS 的種種行為了。

[-> Scope Chain & Scope](./scope.md)

[-> Hoisting](./hoisting.md)

## Hoisting

## 小結

1. 當 script 第一次被執行時，JS Engine 會創建一個 global execution context，並且將其加入 call stack 之中
2. JS Engine 會逐行執行程式碼，當遇到 function invoke、eval() 時，會再創建一個全新的 Execution context 後加進 call stack
3. 當最後加入的 context 執行完畢後將其拋出 stack，並且繼續執行下一個最晚加入的 context
4. 直到整個 stack 清空為止。

#### REF

[How JS Works - Lexical Environment](https://www.borderlessengineer.com/post/how-js-works-lexical-environment) @borderless engineer

[JavaScript Runtime Environment: JavaScript Engine](https://slawinski.dev/blog/javascript-runtime-environment-javascript-engine/) @slawinski.dev

[How will the Lexical environment and the Variable Environment will look like at the following code](https://stackoverflow.com/questions/69417158/how-will-the-lexical-environment-and-the-variable-environment-will-look-like-at) @stack overflow

[JavaScript Execution Context & var/let/const](https://ithelp.ithome.com.tw/articles/10288147?sc=iThelpR) @IT 邦

[JavaScript execution context — lexical environment and block scope (part 3)](https://cabulous.medium.com/javascript-execution-context-lexical-environment-and-block-scope-part-3-fc2551c92ce0) @medium Carson
