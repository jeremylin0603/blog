# Prettier

## 原理

轉成 AST 語法樹後再重新排列，簡單來說就是去掉所有排版，將留下的訊息整理成另一種單純表達內容的格式後，再按照排版設定輸出。

## 專案中單獨使用指令使用

1. install prettier to 開發依賴
   ` pnpm add -D  prettier`

2. set config

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
   `"ptr": "prettier --write '**/*.{md,vue,js,ts,json}'"`

## vs code 儲存時自動排版

1. 確定 VS Code 有安裝插件 "Prettier - Code formatter"
2. cmd + shift + p 呼叫 setting config
3. 加入設定

```json
"editor.formatOnSave": true,
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[markdown]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

其中第一項設定為儲存時自動 format
後面三項為指定特定語言的預設格式工具為 prettier
