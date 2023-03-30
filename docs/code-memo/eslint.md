# ESLint

<BaseImg src="https://i.imgur.com/AMj8T5L.jpeg" isAutoSize/>

## CLI

```bash
pnpm create @eslint/config
```

## Config

```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended", //
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugin": ["prettier"],
  "overrides": [
    {
      "files": ["*-test.js", "*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

#### root

`.eslint.*` 會自動從所在目錄向上查找有無其他 `.eslint.*` 並進行合併，例如

```
your-project
├── .eslintrc.json  <--- your-project/.eslintrc.json
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc.json <--- test/.eslintrc.json
  └── test.js
```

合併時內層優先級最高，以上表結構為例，內層 `test/.eslintrc.json` 的規則優先級會高於外層 `your-project/.eslintrc.json`

root 屬性為 true 表達該檔案為規則合併的根，意即 `test/.eslintrc.json` 的規則會一路查找到根目錄或是 `root: true` 的 config 檔案為止

**這個屬性能夠避免專案內嵌時可能發生的意外，建議專案根目錄的 eslint config 都應該配置**

#### env

由于 JS 可以運行於不同的 runtime，而不同的 runtime 會提供不同的 API 作為全域變數使用，env 用於向 ESLint 表示專案的開發環境，舉個例子

```javascript
module.exports = { ... } // error: 'module' is not defined. eslint(no-undef)
```

由于變數 module 是 Node.js 依據 CommonJS 規範所提供的全域變數，所以通常無需特別引入即可使用，但 ESLint 不會先預設任何開發環境，所以報錯  
`'module' is not defined. eslint(no-undef)`  
此時就需要告訴 ESLint 我們的 runtime 是 Node.js

```json
{
  "env": {
    "node": true
  }
}
```

其他環境配置詳見[Configure Language Options](https://eslint.org/docs/latest/use/configure/language-options) @official

#### rules

- 可以配置所有 ESLint 提供的規則，插件[plugins](#plugins)提供的規則一樣在這邊配置
- 優先級永遠高於 [extends](#extends)
- 規則可粗分三個階級，有 Number & String 兩種表達方式
  - 0 | "none": 關閉規則
  - 1 | "warn": 僅提醒，不會阻止運行
  - 2 | "error": 報錯，阻止運行
- 部分規則本身帶有除了三個停醒階級以外的選項，例如

```json
{
  "array-bracket-newline": ["error", { "multiline": true, "minItems": 2 }]
}
```

- 規則可藉由註解在部分區塊中配置或關閉，但這種做法會增加專案維護風險需謹慎使用 ex:  
  `/* eslint eqeqeq: "off", curly: "error" */`  
  `/* eslint-disable */`

- 上述的區塊註解可以藉由`noInlineConfig`選項關閉

```json
{
  "root": true,
  "rules": {...},
  "noInlineConfig": true
}
```

- 更多 rules 配置詳見 [Rules Reference](https://eslint.org/docs/latest/rules/) @official

#### extends & plugins

> extends 和 plugins 很容易搞混，這邊為了方便比較放在一起說明

##### extends

每一個開發團隊都應該有一套大家共同遵守的 coding style，其中 eslint config 按照共識配置好一個設定檔後就會沿用到所有專案上，此時這套 config 如果都要用複製貼上大法搬移就太麻煩了。  
eslint 本身提供一套方法讓大家可以把自己的 config 配置上傳到 npm，之後只要直接引用即可，甚至如果你是 google 這種赫赫有名的團隊，大家還能直接把你們的設定抓過來用，例如`eslint-config-google` or `eslint-config-airbnb`。

這個整包可引用的 ESLint config 配置就是屬於 extends

notice:

- eslint 本身內建兩套 extends `eslint:recommended` & `eslint:all`，通常使用「recommended」後再按照需求配置細節

- extends 具有後蓋前的特性，陣列的最後一個配置會覆蓋前面的

- extends 包須符合命名規則 `eslint-config-*`，使用上可以忽略前綴做使用，例如 `eslint-config-prettier`，可以直接稱作 `prettier`

```json
{
  "extends": ["prettier"] // 全名為 eslint-config-prettier
}
```

- 注意 config 不單只是 rules 的集成，而是一整包設定檔，可以包含 root、extends、plugins、rules 等所有配置

- 自制 extends config 詳見 [Share Configurations](https://eslint.org/docs/latest/extend/shareable-configs) @official

##### plugins

前面提到 extends 是圍繞在 ESLint **本身提供的設定檔** 集成的一包 config，相對的 plugins 則是為了要使用 ESLint **本身不具備的「規則」**，另行開發插件來讓 ESLint 協助運行。  
例如常見的前端框架 React & Vue，都有自己定義的檔案結構和語法，此時就需要另行開發插件(plugins)並定義相應的規則，讓 ESLint 也能藉由這些自定義的規則做檢查。

notice:

- plugins 本身是一套 ESLint 之外的規則集成，只「提供」規則，不會主動「開啟」規則，要使用 plugins 中的規則需要自行配置 rules，或是看有沒有相應的 config 可以使用 ex: `eslint-config-vue/standard`

- plugins 同 extends 一樣有命名規範 `eslint-plugin-*`，使用上一樣能省略前綴 ex: `eslint-plugin-prettier` 省略後 `prettier`

```json
{
  "plugins": ["prettier"] // 全名為 eslint-plugin-prettier
}
```

##### plugin in extends

許多 plugin 套件本身就包含相應的 config 配置，例如 `eslint-plugin-prettier` 的 source code 可以看到

```javascript
module.exports = {
  // 提供一包 config
  configs: {
    recommended: {
      extends: ['prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off'
      }
    }
  },
  rules: {
    prettier: {
      // plugin rules...
    }
  }
}
```

像這樣 plugin 本身提供的 config 可以直接引入 extends 做使用，命名上也有規範  
`plugin:your-plugin-name/config-name`
例如 plugin "prettier" 提供一個 config 叫 "recommended"，則我們可以這樣引入

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

**請注意這邊是幫你寫好設定而已，recommended 中的 extends: ['eslint-config-prettier'] 依然要自己安裝依賴**

- 更多關於 plugins 配置詳見 [Create Plugins](https://eslint.org/docs/latest/extend/plugins) @official

#### overrides

_目前還沒遇到用得到的場景，未來有用到再回來補充細節。_

官方解釋是這樣說的：

> Allows to override configuration for files and folders, specified by glob patterns

能夠直接針對特定的檔案，給予不同的 rules，優先級高於 rules

#### parser

解析器，負責將程式碼轉換成 ESLint 能夠理解的 [AST](/code-memo/prettier.md#ast-abstract-syntax-tree)。

ESLint 內建的解析器 [esprima](https://www.npmjs.com/package/esprima) 是針對 ECMAScript 當前的版本解析，因此若我們使用一些實驗性的語法(由 Babel 轉譯)、或是寫 TypeScript 的時候，就超出了 esprima 能讀懂的範圍了。

此時我們可以另外安裝

- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
  協助將 esprima 陌生的語法例如 Typescript，轉成 ESLint 能夠解析的 AST

#### parserOptions

解析器的選項，沒特別用過未來有機會再補充

附上使用範例至少能有點感覺

```javascript
// for esprima options
{
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  }
}
```

## 常見問題

### 編輯器沒有提示

- 檢查編輯器套件是否生效 [ESLint integration](https://eslint.org/docs/latest/use/integrations) @official

### ESM 模式下不生效

- 將副檔名改為`.cjs`
  > use .eslintrc.cjs when running ESLint in JavaScript packages that specify "type":"module" in their package.json. Note that ESLint does not support ESM configuration at this time.

### 報錯循環，自動格式化一直報錯

- 可能是規則和其他 Formatter 衝突，請見 [ESLint & Prettier](/code-memo/linter-and-formatter.md)

## Ref

[ESLint Official](https://eslint.org/)
