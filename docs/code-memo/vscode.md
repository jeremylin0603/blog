# VS Code

## 好用插件

### 工作流

#### Draw.io Integration

- vscode 流程圖神器

##### How to use?

1. 安裝插件 "Draw.io Integration"
2. 直接建立新檔並按照 "xxxx.drawio.svg" 命名. ex: workflow.drawio.svg
3. 在 vscode 中開啟，即可直接編輯並儲存
4. 儲存後即可直接像正常的 .svg 引用

#### Code Spell Checker

- 不廢話，別裝逼，裝它。

#### Error Lens

- 可直接把 error 顯示在錯誤點旁邊，好處是省下 mouse hover 到紅字上看 error message 的功夫
- 但有人覺得這樣版面很亂 so 請斟酌食用

#### Git Blame

- ~~戰犯顯示器~~多人共同開發的時候可以看一下這段厲害的程式碼是誰寫的，互相學習學習

#### Quokka.js

- 即時編譯的 js/ts 工具，優勢是 console 即時顯示，有時候要單獨測試某段程式很有用

#### Tabnine

- AI 這麼潮，不裝還真不敢說自己有在寫程式
- 可以當作 AI 版的超強大 Snippet 工具
- 還可以用指令協助後續推斷
- 免費仔先知道這些就好了

![](https://i.imgur.com/nOxmXV8.png)

#### Todo Tree

- 可以騙自己之後要回來優化的地方晚上比較好入眠
- 有 `// TODO` & `// FIXME` 兩種功能
- 小缺點是跟 Tabnine 的註解推斷相衝突

#### Git Graph

- 懶得另外裝 Git GUI，有時候又要看線圖的話可以用
- 但其實直接下指令查效果也差不多所以有點雞肋 `git log --graph --all --oneline`

## bash cmd

- 呼叫 VSCode 開啟專案資料夾 - `code .`
  ![](https://i.imgur.com/iH5XmCl.png)

## 自定義 Snippet

1. 在 vscode 左下角的設定中點擊 User Snippet(配置用戶代碼片段)後輸入要設定的語言
2. 設定範例

```json
// prettier-ignore
{
  "Create function": {
		"prefix": "cfn",
		"body": [
			"function $1 ($2) {",
			"$3",
			"}"
		],
		"description": "Create a function"
	}
}
```

其中

- Create function 沒有實質功能，自己命名用
- prefix: 觸發 Snippet 的指令
- body: 實際渲染的模板，$1, $2...為 cursor 落點，用 tab 往下切換
- description: 自定義描述

## 常見問題
