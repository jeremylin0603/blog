# Markdown 常用功能

- 部分功能有多種表達方式，個人認為沒必要都知道所以只會挑一個順眼的表達
- 標題前面加註星號\*表示非原生 markdown 語法
- 更多請參考 [官方文件](https://markdown.tw/#blockquote)

## Title

- 避免影響排版不放效果

```markdown
# 一級標題

## 二級標題

### 三級標題

#### 四級標題

##### 五級標題

###### 六級標題
```

## Tag

- ### render

tags: `typescript` `vue3`

- ### code

```markdown
tags: `typescript` `vue3`
```

## HTML

- 標籤中無法辨認 MD 語法，只能讀 HTML
- 區塊元素前後需空一行
- 元素的開頭與結尾不可縮排 or 空白

- ### render

...some text...

<table>
    <tr>
        <td>Foo</td>
        <td>Bar</td>
    </tr>
</table>

...some text...

- ### code

```markdown
...some text...

<table>
  <tr>
    <td>Foo</td>
    <td>Bar</td>
  </tr>
</table>

...some text...
```

## 註解

```markdown
<!-- 註解 -->
```

## 換行

- 單純的換行並不會真的換行，需要中間空一行，或是在換行的句尾加上兩個空白，才會被轉譯為`<br />`

  - 官方表示 markdown 中並不適合把每個斷行都轉成 `<br />`，因此用雙空格

- ### render

<!-- 加了一個空白-->

沒有雙空白 1
沒有雙空白 2

<!-- 加了兩個空白 or 空一行 -->

有雙空白 1  
有雙空白 2

中間空一行 3

- ### code

```markdown
<!-- 加了一個空白-->

沒有雙空白 1
沒有雙空白 2

<!-- 加了兩個空白 or 空一行 -->

有雙空白 1  
有雙空白 2

中間空一行 3
```

## 引言

- 可以有階層
- 內部一樣能用雙空白換行、標題、清單、程式區塊等其他 markdown 語法

- ### render

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> > id sem consectetuer libero luctus adipiscing.

- ### code

```markdown
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> > id sem consectetuer libero luctus adipiscing.
```

## 清單

- 分為有序和無序兩種
- 無序用 + or \* or - 皆可，顯示上沒有差異
- 有序清單並不在意開頭數字，渲染時會自動按照排列顯示
- 清單內的引言要縮排一次(1 tab or 4 space)

- ### render

- Red
- Green
- Blue

* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
  > This is a blockquote
  > inside a list item.
* Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.
    <table>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </table>

1. Red
2. Green
3. Blue

---

1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
   Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
   viverra nec, fringilla in, laoreet vitae, risus.
2. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
   Suspendisse id sem consectetuer libero luctus adipiscing.

- ### code

```markdown
- Red
- Green
- Blue

* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
* Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.

1. Red
2. Green
3. Blue

---

1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
   Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
   viverra nec, fringilla in, laoreet vitae, risus.
2. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
   Suspendisse id sem consectetuer libero luctus adipiscing.
```

## 分隔線

- ### render

---

- ### code

```markdown
---
```

## \*連結

- vuepress 會自動將「_相對與絕對路徑_」轉為 vue 的 `<router-link to="...">`，URL link 則保持原本的 `<a href="...">`
- vuepress 會自動將外部連結添加 `target="_blank" rel="noopener noreferrer" 属性`，以避免讓外部連結取得我們不想主動透露的訊息，未來有機會寫一篇

- ### render

[外部連結](https://markdown.tw/#blockquote)  
[其他頁面](/blog/about/)  
[當前頁面錨點](#title)  
[其他頁面錨點](/blog/memo/prettier#專案中單獨使用指令使用)

- ### code

```markdown
[外部連結](https://markdown.tw/#blockquote)  
[其他頁面](/blog/about/)  
[當前頁面錨點](#title)  
[其他頁面錨點](/blog/memo/prettier#專案中單獨使用指令使用)
```

## 強調

- \_ \* 皆可，一個符號會轉為`<em>`，兩個符號轉為`<strong>`
- 記得用啥開頭就用啥結尾
- 可直接在**文字內**使用

- ### render

_Hello World!_  
**Hello World!**

- ### code

```markdown
_Hello World!_
**Hello World!**
```

## \*刪除線

- ### render

~~hahaha~~

- ### code

```markdown
~~hahaha~~
```

## \*表格

- 範例包含靠左/中/右的語法

- ### render

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |

| First Header | Second Header | Third Header |
| :----------- | :-----------: | -----------: |
| Cell         |     Cell      |         Cell |
| Cell         |     Cell      |         Cell |

- ### code

```markdown
| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |

| First Header | Second Header | Third Header |
| :----------- | :-----------: | -----------: |
| Cell         |     Cell      |         Cell |
| Cell         |     Cell      |         Cell |
```

## \*程式碼

- 區塊語法可指定語系
  - :javascript
- 區塊語法可指定行數
  - 範圍: {5-8}
  - 跳行: {5,8,9}
  - 混用: {5,8-10,15-22,30}
- 區塊語法可關閉行號(默認為啟用行號)

  - :no-line-numbers

- ### render

`行內為markdown原生支持`

```typescript:{2}
const num: number = 100
console.log(num)
```

- ### code

````markdown
`行內為markdown原生支持`

```typescript:{2}
const num: number = 100
console.log(num)
```
````

## \*引入專案內部程式碼

- 可指定要顯示的特定行數
- 可指定顯示語言
- 可指定 highlight 行數
- 可禁用行號
- ex: `@[code{3-10} js{3}:no-line-numbers](../foo.js)`

- ### render

@[code](../index.md)

- ### code

```markdown
@[code](../index.md)
```

## \*使用 Vue 語法 & 組件

- 使用組件需要另外配置設定[詳見](/blog/code-memo/vuepress#使用-vue-組件配置)

- ### render

<span v-for="i in 3">{{ i }}</span>

- ### code

```markdown
<span v-for="i in 3">{{ i }}</span>
```

## 圖片

- 無法指定寬高，若需要就用 img 標籤或另外寫一個 img renderer component 吧哈

- ### render

![Alt text](/favicon.png)

- ### code

```markdown
![Alt text](/favicon.png)
```

## 目錄

- ### render

[[toc]]

- ### code

```markdown
[[toc]]
```

## 跳脫字元

- 一般敘述的文字中與語法符號衝突時，加入反斜線即可
  ex: `\*` turn to=> `*`

### 衝突符號列表

```
\   反斜線
`   反引號
*   星號
_   底線
{}  大括號
[]  方括號
()  括號
#   井字號
+   加號
-   減號
.   英文句點
!   驚嘆號
```
