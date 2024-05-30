# 怎樣算一個字

## 字元總表 - Unicode

1. 世界上幾乎大部分的字元，包含 emoji，都被涵蓋在 Unicode 編碼底下，也就是在 Unicode 這張表中，每個字都有一個獨立的 id(組合字例外，後續補充)

2. Unicode 用 17 組依序的`平面(Plant)`來大致區分不同意圖的文字，從 0 號平面開始，直到 16 號平面。例如第 0 平面為基本文字（中英日韓數字...）、第 1 平面為幾乎失傳的古文和數學符號、音符、emoji，諸如此類每個平面的編碼都涵蓋了不同意思的文字

3. 舉例，0 號平面的範圍為 0000 ~ FFFF，1 號平面的範圍為 10000 ~ 1FFFF。  
   其中平面 0，英文字母 A 的代號為 `U+0041`，中文數字 一 的代號為 `U+4E00`  
   平面 1，'😀' 的代號為 `U+1F600`

[wiki - Unicode 字元平面對映](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84)

## 從代號到計算機

1. 每個字元在 Unicode 中都有特殊的代號，例如英文 'a' Unicode 編碼為 `U+0061`，但 Unicode 只負責定義每個文字的編號，並不負責這些文字在計算機中如何存儲或是如何傳輸，因此為了服務計算機傳輸和儲存，衍伸出兩大常見的編碼格式 UTF-8 & UTF-16。

## UTF-8 vs UTF-16

1. UTF-8 的系統中，使用 1 ~ 4 個 byte 來表達一個 char

```js
const utf8_A = new TextEncoder().encode('A')
console.log(utf8_A) // Uint8Array [ 65 ] --> 1 byte (0x41)

const utf8_smile = new TextEncoder().encode('😊')
console.log(utf8_smile) // Uint8Array [ 240, 159, 152, 138 ] --> 4 bytes (0xF0 0x9F 0x98 0x8A)
```

2. UTF-16 的系統中，使用 2 or 4 個 byte 來表達一個 char，其中當 2 byte 無法表達時，（也就是超過第 0 平面「BMP」的範圍`U+0000`~`U+FFFF`），會改用 4 byte 來表達，此時這 2 + 2 byte 的組合稱為代理對(surrogate pair)

```js
// "A" 的 UTF-16 編碼
const utf16_A = new Uint16Array([0x0041])
console.log(utf16_A) // Uint16Array [ 65 ] => 雖然與 UTF-8 都是 65，但存儲是用 2 bytes (0x0041)

// "😊" 的 UTF-16 編碼
const utf16_smile = new Uint16Array([0xd83d, 0xde0a])
console.log(utf16_smile) // Uint16Array [ 55357, 56842 ] => 4 bytes (0xD83D 0xDE0A)
```

> `0x` 開頭表達數字為 16 進位，因此 0x0041 => 4 \* 16 + 1 = 65

3. 結合前面兩點，通常使用 UTF-8 編碼會更省空間。

## Javascript 的表達與字元長度

1. 在 JS 中會使用 `\u` 當前綴以表達一個 Unicode 字元

```js
'💩' === '\uD83D\uDCA9' // true
```

2. 在 JS 中是以 UTF-16 編碼來判斷字元長度，因此當字元是一個代理對(surrogate pair)時，長度為 2

```js
'💩'.length // 2
```

> 對於代理對，可以使用 `Array.from` 來切分其字串長度

```js
'💩'.split('').length // 2 -> 實際為 ['\uD83D', '\uDCA9'].length
Array.from('💩').length // 1 -> 此時一個代理對為一個值 ["💩"].length
```

3. 在 JS 中可以使用 `String.codePointAt()` 來查詢字元的 Unicode 碼位

```js
'💩'.codePointAt() // 128169
```

## 麻煩的「零寬連字(ZWJ)」

1. 在 emoji 系統中，還存在各種不同的 Unicode 字元組合成一個新的符號，包含 emoji 和部分國家的語言，稱為 ZWJ(Zero Width Joiner)。

2. JS 在判斷一個 ZWJ 符號時，是以「所有組合」下去判別的，所以螢幕上看到的一個字符對於 JS 來說並不是一個字符或是一個代理對，而是「一群字符」，因此對於 ZWJ，沒有一個常規的做法去判斷長度。

```js
'🏴󠁧󠁢󠁥󠁮󠁧󠁿'.split('') // ['\uD83C', '\uDFF4', '\uDB40', '\uDC67', '\uDB40', '\uDC62', '\uDB40', '\uDC65', '\uDB40', '\uDC6E', '\uDB40', '\uDC67', '\uDB40', '\uDC7F']

Array.from('🏴󠁧󠁢󠁥󠁮󠁧󠁿') // ['🏴', '󠁧U+200D', '󠁢U+E0065', '󠁥U+E006E', '󠁮U+E0067', '󠁧U+E007F']
```

[Emoji Charts](https://unicode.org/emoji/charts/emoji-zwj-sequences.html)

### 字元總表 - ASCII

1. 常常會聽到的 ASCII 其實就是 Unicode 的前身，只單純定義了英文、數字、基本標點符號，和一些跳脫字元，Unicode 是向後相容 ASCII 的。

2. 兩大編碼系統也相容 ASCII，但是 UTF-8 在表達與 ASCII 相同的字元時，一樣是用一個 byte 來表達，與 ASCII 完全相符，因此 UTF-8 相較 UTF-16 更完整的相容 ASCII。

[WIKI-ASCII](https://zh.wikipedia.org/zh-tw/ASCII)

### 參考資料 && 推薦 JS 套件

[在程式裡算 Emoji 字數的那些問題](https://medium.com/dcardlab/%E5%9C%A8%E7%A8%8B%E5%BC%8F%E8%A3%A1%E7%AE%97-emoji-%E5%AD%97%E6%95%B8%E7%9A%84%E9%82%A3%E4%BA%9B%E5%95%8F%E9%A1%8C-8e1a1170a499)  
[grapheme-breaker](https://github.com/foliojs/grapheme-breaker)  
[grapheme-splitter](https://github.com/orling/grapheme-splitter)
