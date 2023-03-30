# Hoisting

> 本篇會專注在方便理解 Hoisting，更詳細的運行邏輯請往[Execution context](./execution-context.md)

hoist:「提升」，這不是個好名字，因為實際上沒有任何程式碼被「提升」，會讓不知道的人以為自己懂了但其實誤會大了(像是當年剛接觸 JS 的我 QQ)

要了解 Hoisting，得先知道 JS 運行時並不是一開始就馬上一行一行的跑我們寫的程式碼，而是在這之前先做了一些「準備」，做完「準備」才會開始從頭「執行」我們的 code。

而「準備」階段，會先從頭找出在當前的作用域中，所有宣告的變數(var, let, const)和方法(function)，並且為他們在記憶體中預先創建這些變數和方法的空間。

也因此我們能夠在宣告變數或方法之前呼叫他們而不會報錯(let, const 例外，後面會提)，感覺起來就像他們被「提升」到檔案頂端了。

接著來看一個例子：

```javascript
console.log(num) // undefined
fn() // hi!

var num = 1
function fn() {
  console.log('hi!')
}
console.log(num) // 1
```

`第1行`在 `num` 宣告之前存取了 `num`，沒有報錯並且得到 `undefined` 而不是 `1`，接著`第2行`在 fn 宣告之前執行了 fn，也執行成功 log 出 `'hi!'`，為什麼 `num` 不是 `1`，但 fn 可以正常運行？

首先要了解 `=` 賦值(assigned)運算子跟 `+`、`-` 一樣，都是「準備完畢」之後的「執行」階段才會作用，執行時才會將`=`右側(Right side)的值賦予左側(Left side)的變數。

而在「準備」階段 JS 會替 `var`、`let`、`const` 宣告的變數建立一個專屬的記憶體空間，並且將 `var`「初始化」(initialize)賦與 `undefined`(只有`var`會被初始化賦予`undefined`)。

因此在 `=` 被執行前，若我們要存取 `var` 所宣告的變數，則會是初始化階段賦予的 `undefined`，直到 `=` 運算子被執行。

至於 function 在「準備」階段就會直接被存入記憶體中，所以可以順利呼叫並執行，**但這是很糟糕的 coding style，千萬別在專案中做這種事。**

接著看`let`&`const`的例子：

```javascript
console.log(num) // "Cannot access 'num' before initialization"
let num = 1
```

```javascript
console.log(ACCESS_TOKEN) // "Cannot access 'ACCESS_TOKEN' before initialization"
const ACCESS_TOKEN = 'abcde'
```

範例中我們試著在 `let`、`const` 宣告之前存取，但是報錯了，所以`let`、`const`就沒有 hoisting 嗎？

#### `let`、`const`依然有 hoisting

這是很常見的思維誤區，首先按照 hoisting 的原因（在「準備」時預先創建變數的空間並將變數指向該空間），`let`、`const`也沒有例外地創建了專屬的記憶體空間，**只是因為沒有初始化，JS 不讓讀取而已**，我們可以從 error message 窺探一二：

```javascript
console.log(num) // "Cannot access 'num' before initialization"
let num = 1
```

```javascript
console.log(num) // "num is not defined"
let text = 'hi!'
```

第一個例子一樣先在宣告前存取`num`，沒有意外地報錯。

但在第二個例子中，若我們 log 一個不曾宣告的變數，則會報錯 **num is not defined**，訊息中告訴我們 `num` 並沒有被定義。

回到第一個例子的錯誤訊息： **Cannot access 'num' before initialization**，表示 JS 「知道」你有定義變數，但是「初始化之前」不允許你存儲這個變數。

#### 暫時性死區 Temporal Dead Zone(TDZ)

由於 `let` & `const` 依然有 hoisting，只是在初始化之前無法存取，這個宣告前無法存取的地方被稱為**暫時性死區** **Temporal Dead Zone(TDZ)**

## Conclusion

總之，我們只需要知道 JS 在處理檔案的過程中，會有兩個階段「準備」與「執行」，而「準備」階段會先掃過當前作用域中宣告的所有變數和方法，並且預先在記憶體中創建他們的空間，這個先「準備」的過程就是 hoisting，別想得太複雜。

至於知道這個有什麼用？~~因為面試會考啊~~從底層認識 JS，我們才能知道一些 bug 「根本」的原因出在哪裡，而不是靠著模糊的概念瞎 G8 亂猜，就算運氣好猜對了修好 bug，其實你以為的原因也是錯的，這也是觀察到工程師之間一條很明顯的分水嶺，如果我們面對所有現象都只用模糊的概念去理解，那這世界最後就只會有宗教，不會有科學了。

所以面試會考是有它的道理在的。

## REF

[What is a Scope Chain?](https://dev.to/pranav016/advanced-javascript-series-part-42-scope-chains-and-their-working-lexical-and-variable-environments-19d5) @DEV Community

[JavaScript 全攻略：克服 JS 的奇怪部分](https://www.udemy.com/course/javascriptjs/) @Udemy

[Javascript 的作用域 (Scope) 與範圍鏈 (Scope Chain)：往外找](https://medium.com/itsems-frontend/javascript-scope-and-scope-chain-ca17a1068c96) @medium

[Javascript Scope](https://www.w3schools.com/js/js_scope.asp) @W3C
