# Vue3 TODO List

A Vue3 Side project

## Topic stage

紀錄過程中想特別深入研究的 topic，避免過幾天就忘了

- Stylelint
- husky & lint-staged
- Volar (needed disable Vetur)
- virtual DOM(聲明式渲染)
- 源碼導讀
- v-model = v-bind: + v-on:

## 隨手筆記

- `pnpm create vue@latest`

> ref: [create-vue](https://github.com/vuejs/create-vue)

- `<input>`
  有啥屬性、啥事件？

type: `number`, `color`, `checkbox`, `radio`, `date`, `file`, `month`, `password`, `range`, `time`.

attribute:

event:

- 為啥 `<input>` 雙向綁定的時候一定要加上 `:value="text"`，我只綁定 `@input="handleText"` 一樣可以運作啊？

這樣才能確保初始值一至，如果沒加，那一直到輸入 value 之前，<input> 實際上沒有跟任何資料綁定再一起。

- `reactive()`

  - about type
    不建議使用泛型(generics)，建議直接使用 interface。

    > 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。

    ```typescript
    import { reactive } from 'vue'

    interface Book {
      title: string
      year?: number
    }

    /** not-recommend */
    const book = reactive<Book>({ title: 'Vue 3 指引' })

    /** recommend */
    const book: Book = reactive({ title: 'Vue 3 指引' })
    ```

- `Date()`: type string, `new Date()`: type Date
