# 未整理隨筆

## img prevent default

情境是需要拖曳交換已上傳圖片的順序，套用 [SortableJS](https://github.com/SortableJS/Sortable?tab=readme-ov-file)後在手機端長按拖曳時會跳出 [另開新圖片, 複製圖片] 等預設視窗(contextmenu)。
原本是打算 querySelectAll 去處理，查一下發現 vue 本身就能很好的實現這個功能 `@contextmenu.prevent`

```js
<img src="..." @contextmenu.prevent />
```
