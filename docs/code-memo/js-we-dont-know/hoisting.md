# Hoisting & TDZ

hoist:「提升」，這不是個好名字，因為實際上沒有任何程式碼被「提升」，會讓不知道的人以為自己懂了但其實誤會大了(像是當年剛接觸 JS 的我 QQ)

在 [Execution context](./execution-context.md) 後我們可以知道 EC 有兩個階段：

第一個階段「creation」，function 會被存在 heap 中，var 會被存在 variable env.並且初始化賦值 undefined，let & const 會存在 lexical env. 並且不被初始化。

「creation」階段結束後，執行階段開始，此時記憶體中已經有了完整的 function 跟經過初始化的 var，所以我們能夠在實際的程式碼中宣告的行數之前存取 function & var 而不會報錯。

但我們沒辦法在宣告之前的行數存取 let & const，因為沒有被初始化所以雖然已經存在記憶體，但是沒辦法存取。

接著看`let`&`const`的例子：

```javascript
console.log(num) // "Cannot access 'num' before initialization"
let num = 1
```

```javascript
console.log(ACCESS_TOKEN) // "Cannot access 'ACCESS_TOKEN' before initialization"
const ACCESS_TOKEN = 'abcde'
```

範例中我們試著在 `let`、`const` 宣告之前存取，但是報錯了，所以有些同學就會認為 `let`、`const`沒有 hoisting。

#### `let`、`const`依然有 hoisting

這是很常見的思維誤區，首先按照 hoisting 的原因（在「creation」時預先創建變數的空間並將變數指向該空間），`let`、`const`也沒有例外地創建了專屬的記憶體空間，**只是因為沒有初始化，JS 不讓讀取而已**，我們可以從 error message 窺探一二：

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

## REF

[What is a Scope Chain?](https://dev.to/pranav016/advanced-javascript-series-part-42-scope-chains-and-their-working-lexical-and-variable-environments-19d5) @DEV Community

[JavaScript 全攻略：克服 JS 的奇怪部分](https://www.udemy.com/course/javascriptjs/) @Udemy

[Javascript Scope](https://www.w3schools.com/js/js_scope.asp) @W3C
