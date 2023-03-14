import{_ as n,p as s,q as a,a1 as e}from"./framework-cd43f88a.js";const t={},o=e(`<h1 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> Prettier</h1><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><p>轉成 AST 語法樹後再重新排列，簡單來說就是去掉所有排版，將留下的訊息整理成另一種單純表達內容的格式後，再按照排版設定輸出。</p><h2 id="專案中單獨使用指令使用" tabindex="-1"><a class="header-anchor" href="#專案中單獨使用指令使用" aria-hidden="true">#</a> 專案中單獨使用指令使用</h2><ol><li><p>install prettier to 開發依賴 <code> pnpm add -D prettier</code></p></li><li><p>set config</p></li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 允許長度</span>
  <span class="token property">&quot;printWidth&quot;</span><span class="token operator">:</span> <span class="token number">120</span><span class="token punctuation">,</span>
  <span class="token comment">// 一次 tab 為幾個空白</span>
  <span class="token property">&quot;tabWidth&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token comment">// 句尾分號</span>
  <span class="token property">&quot;semi&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 是否單引號優先</span>
  <span class="token property">&quot;singleQuote&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 句尾逗號</span>
  <span class="token property">&quot;trailingComma&quot;</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// {} 間強制空白</span>
  <span class="token property">&quot;bracketSpacing&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// arrow fn 入參時強制括號</span>
  <span class="token property">&quot;arrowParens&quot;</span><span class="token operator">:</span> <span class="token string">&quot;always&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>在 package.json 註冊 prettier 執行指令 <code>&quot;ptr&quot;: &quot;prettier --write &#39;**/*.{md,vue,js,ts,json}&#39;&quot;</code></li></ol><h2 id="vs-code-儲存時自動排版" tabindex="-1"><a class="header-anchor" href="#vs-code-儲存時自動排版" aria-hidden="true">#</a> vs code 儲存時自動排版</h2><ol><li>確定 VS Code 有安裝插件 &quot;Prettier - Code formatter&quot;</li><li>cmd + shift + p 呼叫 setting config</li><li>加入設定</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token property">&quot;[javascript]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token property">&quot;[typescript]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token property">&quot;[markdown]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中第一項設定為儲存時自動 format 後面三項為指定特定語言的預設格式工具為 prettier</p>`,11),p=[o];function r(i,l){return s(),a("div",null,p)}const u=n(t,[["render",r],["__file","prettier.html.vue"]]);export{u as default};
