# truthy & falsy & nullish

JS 擁有「強制型轉」的特性，在判斷式中並不是只有 boolean 才能被判讀，以下列出所有在判斷式中會被強制型轉成 boolean 的類別

### Truthy

- 以下判斷式皆會被執行

```javascript
if (true)
if ({})
if ([])
if (42)
if ("0")
if ("false")
if (new Date())
if (-42)
if (12n)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)
```

### Falsy

`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`

### Nullish

`null`, `undefined`

> 延伸閱讀 - 好用新語法 [Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

### 能定義清楚就不要偷懶，放過自己也放過同事

#### == & ===

個人認為開發時沒有任何理由能夠使用 == 徒增風險，唯一指定 ===

#### 字串判斷

```javascript
/** "status" here maybe ""(falsy) or "ok"(truthy) */

// bad
if (status) {...}

// good
if (status === "ok") {...}

// even better
const isSuccess = status === "ok"
if (isSuccess) {...}

// or avoid magic string
const ok = "ok"
if (status === ok)
```

#### String & Number

最容易出事的就是 `String` & `Number`

```javascript
console.log(Boolean(0)) // false
console.log(Boolean(1)) // true
console.log(Boolean('0')) //true

console.log(Boolean('')) // false
console.log(Boolean('ha')) // True
```

常有人習慣在 **Logical Operator(&&)** 中依賴 String 或 Number 作爲條件判斷(我曾經也是 QQ)，導致怎麼死的都不知道

```javascript
// 常會認為只要有值就能過，殊不知 (num = 0) || (str = '') 皆為 false
if (data.num && data.str) ...

// 如果只是要判斷有沒有值，可以寫個簡單的判斷函式
import { hasValue } from '@/utils'
const hasNum = hasValue(data.num)
const hasStr = hasValue(data.str)
if (hasNum && hasStr) ...
```

#### "0" & 0

String `"0"` 為 Truthy，Number `0` 為 Falsy，總之與其這麼麻煩不如開發的時候清楚定義就萬無一失

```javascript
const fn = (data) => {
  const isPass = data.num === 0
  if (isPass) ...
}
```

#### REF

[Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) @MDN
[Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) @MDN
[Nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) @MDN
