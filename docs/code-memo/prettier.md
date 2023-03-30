# Prettier

<BaseImg src="https://i.imgur.com/cnrwEb0.png" isAutoSize />

## （一）What is Prettier？

> Prettier is an "Opinionated _(武斷、固執的)_" code formatter, has few options.  
> 延伸閱讀 - [Opinionated vs Unopinionated](/code-memo/opinionated.md)

Prettier 是具有**固定理念**的開發工具，負責管理、格式化程式碼，僅有少量的配置選項。  
理念核心是「讓使用者開發的時候能夠忽略所有格式相關的問題」，將程式碼基於「可讀性」和「可維護性」來自動格式化

## （二）Why Prettier？

管理團隊 coding style，避免提交後還要修改的風險，保證專案中每一個角落的 code 都維持一至的風格，省去人為錯誤，而且基本上開箱即用，可以立即投入開發。

## （三）How Prettier work？

將既有程式轉換成一種中間態格式：AST ，轉換後按照設定的格式內容重新輸出。
就像室內重新裝潢，把裝潢拆光留下屋內本身必要的功能和管線，然後再按照你的需求重新上裝潢。

### AST - Abstract Syntax Tree

一種用來紀錄程式的結構，只保留運行時必要的內容，不關心不影響運行的格式，runtime 如 browser 或是 Node 都是藉由 parser 將 JS file 轉成 AST 後才能命令電腦執行。

實際轉換過程可以到 [prettier playground](https://prettier.io/playground/)  
ps: 需要開啟左下角設定裡的 "open AST" 選項

## （四）How to use?

> 由於 prettier 是 Opinionated 的，因此理想請況下是無需任何配置即可使用，相對的也不會開放太多配置選項。
> 且 Prettier 並沒有太多 Opinionated 的缺陷，就算開發中途要加入也行 - 前題是所有共同開發者先有共識，否則會出現各種抱怨甚至導致士氣低落影響開發。

#### 專案中單獨使用指令使用

1. Install prettier to 開發依賴
   ` pnpm add -D prettier`

2. 在專案根目錄新增 `.prettierrc.json` 並按照需求配置：

```json
{
  // 允許長度
  "printWidth": 120,
  // 一次 tab 為幾個空白
  "tabWidth": 2,
  // 句尾分號
  "semi": false,
  // 是否單引號優先
  "singleQuote": true,
  // 句尾逗號
  "trailingComma": "none",
  // {} 間強制空白
  "bracketSpacing": true,
  // arrow fn 入參時強制括號
  "arrowParens": "always"
}
```

3. 在 package.json 註冊 prettier 執行指令

```json
"scripts": {
  // ptr 只是我自己習慣用的，自己定義好就行
  "ptr": "prettier --write '**/*.{md,vue,js,ts,json}'"
}
```

#### vs code 儲存時自動排版

1. 確定 VS Code 有安裝插件 "Prettier - Code formatter"
2. cmd + shift + p 呼叫 setting config
3. 加入設定

```json
// 儲存後自動格式化
"editor.formatOnSave": true,
// 指定負責格式化的套件
"editor.defaultFormatter": "esbenp.prettier-vscode",
// 也能另外針對個別語言指定負責格式化的套件
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

> 許多教學會用 VSCode 的設定介面操作，但我個人偏好直接修改設定檔，可以很清楚的掌握自己在做什麼事

## (五) Work with Git

- 利用 Git hook 來確保能上 commit 的程式都是經過 Prettier 校驗的

我們需要兩個套件來實現: lint-stage & husky  
這邊可以直接用 [mrm](https://mrm.js.org/) 來簡化配置流程，同時裝好兩個套件和各自的基本配置

`npx mrm lint-staged`

運行後專案會在根目錄上新增.husky folder、並且在 package.json 產生相應配置

```json
"devDependencies": {
    "husky": ">=7",
    "lint-staged": ">=10"
},
"lint-staged": {
    "*.{md,vue,js,ts,json}": "prettier --fix"
}
```

## 常見問題

#### 編輯器不會跳提示

- Prettier-vscode 本身不具備 highlight 的功能，需要整合到 ESLint 讓 ESLint-vscode 協助 highlight 效果，詳見[ESLint & Prettier](/code-memo/linter-and-formatter.md)
