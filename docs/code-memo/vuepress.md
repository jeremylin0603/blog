# Vuepress 筆記

## Dependence

- Node v14.18.0+

## 主題

- [主題種類繁多](https://www.npmjs.com/search?q=keywords:vuepress-theme)，官方提供一個隨開即用的預設主題，也能自己開發
- [預設主題相關配置](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html)

## 配置側邊欄

- [官方連結](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar)
- 階層內的頁面標題取決於 markdown 的第一行 #title
  @[code{1-5} markdown:no-line-numbers](./vuepress.md)

### 配置於 /docs/.vuepress/config.ts

```typescript
import sidebarConfig from './sidebar'
export default defineUserConfig({
  theme: defaultTheme({
    sidebar: sidebarConfig
  })
})
```

- type: `import type { SidebarConfig } from 'vuepress'`
- 建議另外開個 sidebar.ts 存放會比較好管理

### Config

```typescript
import type { SidebarConfig } from 'vuepress'
const sidebar: SidebarConfig = [
  {
    // 顯示在側邊欄的標題
    text: 'About',
    // 是否可開合
    collapsible: true,
    children: [
      '/about/',
      {
        // 自定義名稱
        text: '關於我',
        link: '/about/list.md'
      }
    ]
  },
  {
    text: 'Memo',
    collapsible: true,
    children: ['/memo/vuepress.md', '/memo/markdown.md', '/memo/interview.md', '/memo/chatgpt.md', '/memo/prettier.md']
  },
  {
    text: 'Daily',
    collapsible: true,
    children: ['/daily/']
  },
  // 不用展開功能，直接連結至頁面
  '/topics.md'
]
/**
 * Object type 示範
 const sidebar: SidebarConfig = {
  '/about/': [
    {
      text: 'About',
      children: ['/about/', '/about/list.md']
    }
  ],
  '/memo/': [
    {
      text: 'Memo',
      children: ['/memo/vuepress.md', '/memo/markdown.md']
    }
  ],
  '/daily/': [
    {
      text: 'Daily',
      children: ['/daily/']
    }
  ]
} 
 */
```

- SidebarConfig 支持 Array & Object 兩種形式的配置，而 Object type 適合側邊欄會隨著路由變換的場景，因此本站選用 Array type。

## Front Matter

[Frontmatter](https://v2.vuepress.vuejs.org/reference/frontmatter.html#frontmatter) @official

## markdown 內使用 Vue 組件配置

- 流程

  1. 安裝插件至開發依賴

  ```
  pnpm add -D @vuepress/plugin-register-components@next
  ```

  - **typescript 要注意版號需相同，否則過不了編譯**

  ```javascript
    "devDependencies": {
      "@vuepress/client": "2.0.0-beta.60",
      "@vuepress/plugin-register-components": "2.0.0-beta.60" // 60
    }
  ```

  2. 配置插件(/docs/.vuepress/config.ts)

     - 指定註冊的共用組件路徑，以此為例(docs/.vuepress/components)內的所有組件皆會被註冊
     - \_\_dirname 為 commonJS 提供的參數，ESM 模式下要另行宣告

  ```typescript
  import path from 'path'
  import * as url from 'url'
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

  export default defineUserConfig({
    plugins: [
      registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components')
      })
    ]
  })
  ```
