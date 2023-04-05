import{_ as a,p as e,q as n,a1 as i}from"./framework-cd43f88a.js";const s={},t=i(`<h1 id="vs-code" tabindex="-1"><a class="header-anchor" href="#vs-code" aria-hidden="true">#</a> VS Code</h1><h2 id="好用插件" tabindex="-1"><a class="header-anchor" href="#好用插件" aria-hidden="true">#</a> 好用插件</h2><h3 id="工作流" tabindex="-1"><a class="header-anchor" href="#工作流" aria-hidden="true">#</a> 工作流</h3><h4 id="draw-io-integration" tabindex="-1"><a class="header-anchor" href="#draw-io-integration" aria-hidden="true">#</a> Draw.io Integration</h4><ul><li>vscode 流程圖神器</li></ul><h5 id="how-to-use" tabindex="-1"><a class="header-anchor" href="#how-to-use" aria-hidden="true">#</a> How to use?</h5><ol><li>安裝插件 &quot;Draw.io Integration&quot;</li><li>直接建立新檔並按照 &quot;xxxx.drawio.svg&quot; 命名. ex: workflow.drawio.svg</li><li>在 vscode 中開啟，即可直接編輯並儲存</li><li>儲存後即可直接像正常的 .svg 引用</li></ol><h4 id="code-spell-checker" tabindex="-1"><a class="header-anchor" href="#code-spell-checker" aria-hidden="true">#</a> Code Spell Checker</h4><ul><li>不廢話，別裝逼，裝它。</li></ul><h4 id="error-lens" tabindex="-1"><a class="header-anchor" href="#error-lens" aria-hidden="true">#</a> Error Lens</h4><ul><li>可直接把 error 顯示在錯誤點旁邊，好處是省下 mouse hover 到紅字上看 error message 的功夫</li><li>但有人覺得這樣版面很亂 so 請斟酌食用</li></ul><h4 id="git-blame" tabindex="-1"><a class="header-anchor" href="#git-blame" aria-hidden="true">#</a> Git Blame</h4><ul><li><s>戰犯顯示器</s>多人共同開發的時候可以看一下這段厲害的程式碼是誰寫的，互相學習學習</li></ul><h4 id="quokka-js" tabindex="-1"><a class="header-anchor" href="#quokka-js" aria-hidden="true">#</a> Quokka.js</h4><ul><li>即時編譯的 js/ts 工具，優勢是 console 即時顯示，有時候要單獨測試某段程式很有用</li></ul><h4 id="tabnine" tabindex="-1"><a class="header-anchor" href="#tabnine" aria-hidden="true">#</a> Tabnine</h4><ul><li>AI 這麼潮，不裝還真不敢說自己有在寫程式</li><li>可以當作 AI 版的超強大 Snippet 工具</li><li>還可以用指令協助後續推斷</li><li>免費仔先知道這些就好了</li></ul><p><img src="https://i.imgur.com/nOxmXV8.png" alt=""></p><h4 id="todo-tree" tabindex="-1"><a class="header-anchor" href="#todo-tree" aria-hidden="true">#</a> Todo Tree</h4><ul><li>可以騙自己之後要回來優化的地方晚上比較好入眠</li><li>有 <code>// TODO</code> &amp; <code>// FIXME</code> 兩種功能</li><li>小缺點是跟 Tabnine 的註解推斷相衝突</li></ul><h4 id="git-graph" tabindex="-1"><a class="header-anchor" href="#git-graph" aria-hidden="true">#</a> Git Graph</h4><ul><li>懶得另外裝 Git GUI，有時候又要看線圖的話可以用</li><li>但其實直接下指令查效果也差不多所以有點雞肋 <code>git log --graph --all --oneline</code></li></ul><h2 id="bash-cmd" tabindex="-1"><a class="header-anchor" href="#bash-cmd" aria-hidden="true">#</a> bash cmd</h2><ul><li>呼叫 VSCode 開啟專案資料夾 - <code>code .</code><img src="https://i.imgur.com/iH5XmCl.png" alt=""></li></ul><h2 id="自定義-snippet" tabindex="-1"><a class="header-anchor" href="#自定義-snippet" aria-hidden="true">#</a> 自定義 Snippet</h2><ol><li>在 vscode 左下角的設定中點擊 User Snippet(配置用戶代碼片段)後輸入要設定的語言</li><li>設定範例</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// prettier-ignore</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;Create function&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cfn&quot;</span><span class="token punctuation">,</span>
		<span class="token property">&quot;body&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token string">&quot;function $1 ($2) {&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;$3&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;}&quot;</span>
		<span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Create a function&quot;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中</p><ul><li>Create function 沒有實質功能，自己命名用</li><li>prefix: 觸發 Snippet 的指令</li><li>body: 實際渲染的模板，$1, $2...為 cursor 落點，用 tab 往下切換</li><li>description: 自定義描述</li></ul><h2 id="常見問題" tabindex="-1"><a class="header-anchor" href="#常見問題" aria-hidden="true">#</a> 常見問題</h2>`,30),o=[t];function r(l,d){return e(),n("div",null,o)}const u=a(s,[["render",r],["__file","vscode.html.vue"]]);export{u as default};