# ESLint & Prettier

現代前後端分離、多人協作的開發模式早已離不開 Linter & Formatter 這些工具，但開發新專案或是公司換新電腦時很容易遇到這些工具出了問題，例如 Linter 沒有提示，或是 Formatter 不生效，甚至是彼此間互相衝突...就算 google 後排除了問題，其實也沒真正搞懂他們彼此間的關係，只是讓編輯器維持著不清不楚的恐怖平衡而已，所以這篇就來一口氣釐清。

- 這篇是圍繞著 VSCode 描述的
- VSCode 本身就有提供基本的 Formatter，能夠針對 JS、TS、JSON、HTML、CSS 格式化，但我個人偏好給 Prettier 處理，就不多贅述有興趣請至 [VSCode Formatting](https://code.visualstudio.com/docs/editor/codebasics#_formatting) @official

## Linter vs Formatter

Linter 跟 Formatter 看似負責的事情都差不多，但目的卻是大相徑庭，所以得先釐清兩者的關係

`ESLint` 是 Linter，主要負責 Code quality，良好的 Code quality 能夠降低出現低級 bug 的風險，例如使用變數時少打一個字，或是在變數宣告前就使用它。

`Prettier` 是 Formatter，主要負責 Code Formatting，良好的 Code Formatting 能夠提升程式碼的可讀性和可維護性，例如陣列元素之間適當的間隔，或是一行內過多的訊息適當的換行。

而容易混淆的地方在於 `ESLint` 本身也有提供 Code Formatting 的功能，當與 Prettier 共同使用時如果沒有做好配置就會產生兩邊的衝突 - ESLint 說可以但是 Prettier 說不行，照著 Prettier 做了以後 ESLint 又不給過了，甚至照著教學配置了儲存後自動格式化，還會被自動儲存綁架讓程式碼永遠過不了編譯。

## Why not just ESLint, but Prettier?

為何不用 ESLint 就好，還要特地裝一個 Prettier？用 Prettier 有什麼好處？不用不行嗎？

我認爲這個問題真的見仁見智，不用當然可以，事實上就有一派開發人員只用 ESLint，因為他們受不了 Prettier 的「霸道」和吝嗇的配置選項。

但我個人更欣賞 Prettier [Opinionated](/code-memo/opinionated.md) 的精神，和少量的配置讓我無需把心思放在代碼風格上，而且 Linter 就專心維護 Code quality，其他所有檔案類型的風格問題都交給 Prettier 處理和配置，但要他們一起運行還需要費一點功夫，接著就來解決這個問題。

## Prettier in ESLint

讓 Prettier 在 ESLint 中運作最主要是為了解決兩者間的衝突，後面會說明這種作法的優劣。

首先解決衝突需要以下兩個步驟：

1. 關閉 ESLint 所有關於風格的規則
2. 在 ESLint 中引入 Prettier

#### 1. 關閉 ESLint 所有關於風格的規則

首先關閉 ESLint 只需要下載套件 `eslint-config-prettier` 後配置到 ESLint config 即可

```bash
pnpm add -D eslint-config-prettier
```

```json
{
  // 這裡要注意 extend 順序關係到權重，prettier 放最下面能保證所有風格規則都有被確實關閉
  "extends": [
    // ...some other config,
    "prettier"
  ]
}
```

#### 2. 在 ESLint 中引入 Prettier

再來將 Prettier 引入 ESLint 只需要安裝套件 `eslint-plugin-prettier` 後配置到 ESLint 即可

```json
{
  "plugins": ["prettier"],
  // 這個設定讓 Prettier 也能夠藉由 ESLint 的幫助得到錯誤提示
  "rules": {
    "prettier/prettier": "warn"
  }
}
```

如此一來 ESLint 就能抓到 .prettierrc.\* 的配置並且協助執行了

> `eslint-plugin-prettier` 本身就有提供一套 config 以簡化配置，可以直接參考[plugin in extends](/code-memo/eslint.md#plugin-in-extends)

這樣配置後我們能得到以下幾點好處：

1. 衝突消失了
2. 權責分離， `.prettierrc.*` for all document format & `.eslintrc.*` for code Lint
3. Prettier 得到了 ESLint 的 highlight 提示功能，可以有意識的學習 Prettier 的 best practices，主動去思考不同風格的優劣

但也不全然都是好處，壞處則是反對 Prettier 的人最在意的：過於吝嗇的選項。也就是 Prettier 選項之外的規格你都不能改，就算想用 eslint rules 覆蓋也沒辦法...。

> 我曾為了要讓 eslint rules 能夠阻止 Prettier 的換行問題不信邪的花了整整兩天，最終還是被 react 的共同開發者在 issue 發表的論點給說服了 - 別浪費糾結在那些風格的力氣。  
> These style differences don’t really matter, people care way too much about them. - [gaearon](https://github.com/prettier/prettier/issues/40#issuecomment-271659359) @github

Prettier 我個人唯一在意的地方就是[宣告陣列時陣列中的元素換行問題 @prettier #issue 352](https://github.com/prettier/prettier-vscode/issues/352)，結論是要麻棄用 Prettier，或是用下面的 hack 註解來避免換行

<!-- prettier-ignore -->
```javascript
// 原本希望的
const arr = [
  '...string', 
  '...string', 
  '...string'
]
// prettier 強制的
const arr = ['...string', '...string', '...string']
// hack 註解以避免換行 > 在第一個元素右側加上註解符號
const arr = [
  '...string', //
  '...string',
  '...string'
]
```

剩下的在我個人使用上都挺好，開箱即用沒煩惱^^。

## 補充

### VSCode Setting

`editor.formatOnSave`: `boolean`

保存時格式化文件，若沒有特別指定 `editor.defaultFormatOnSave` 則會交由 VSCode 預設的 Formatter 處理。

`editor.defaultFormatter`: `string`

定義優先於其他所有格式化設定的的格式化插件，需要給予擴展插件的識別碼(identifier)，Prettier 識別碼：`"esbenp.prettier-vscode"`

`editor.codeActionsOnSave`: `object`, 針對 ESLint 自動格式化所新增的擴展，支持 `source.fixAll` | `source.fixAll.eslint: boolean`
更多詳見 [Improved Auto Fix on Save](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) @Official Doc - Version 2.0.4
