import{_ as p,M as i,p as o,q as l,Q as n,t as s,N as e,a1 as t}from"./framework-cd43f88a.js";const c={},r=t('<h1 id="vuepress-筆記" tabindex="-1"><a class="header-anchor" href="#vuepress-筆記" aria-hidden="true">#</a> Vuepress 筆記</h1><h2 id="dependence" tabindex="-1"><a class="header-anchor" href="#dependence" aria-hidden="true">#</a> Dependence</h2><ul><li>Node v14.18.0+</li></ul><h2 id="主題" tabindex="-1"><a class="header-anchor" href="#主題" aria-hidden="true">#</a> 主題</h2>',4),u={href:"https://www.npmjs.com/search?q=keywords:vuepress-theme",target:"_blank",rel:"noopener noreferrer"},d={href:"https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"配置側邊欄",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置側邊欄","aria-hidden":"true"},"#"),s(" 配置側邊欄")],-1),k={href:"https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar",target:"_blank",rel:"noopener noreferrer"},m=t(`<li>階層內的頁面標題取決於 markdown 的第一行 #title<div class="language-markdown" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Vuepress 筆記</span>

<span class="token title important"><span class="token punctuation">##</span> Dependence</span>

<span class="token list punctuation">-</span> Node v14.18.0+
</code></pre></div></li>`,1),b=t(`<h3 id="配置於-docs-vuepress-config-ts" tabindex="-1"><a class="header-anchor" href="#配置於-docs-vuepress-config-ts" aria-hidden="true">#</a> 配置於 /docs/.vuepress/config.ts</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> sidebarConfig <span class="token keyword">from</span> <span class="token string">&#39;./sidebar&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    sidebar<span class="token operator">:</span> sidebarConfig
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>type: <code>import type { SidebarConfig } from &#39;vuepress&#39;</code></li><li>建議另外開個 sidebar.ts 存放會比較好管理</li></ul><h3 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> Config</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> SidebarConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span>
<span class="token keyword">const</span> sidebar<span class="token operator">:</span> SidebarConfig <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// 顯示在側邊欄的標題</span>
    text<span class="token operator">:</span> <span class="token string">&#39;About&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 是否可開合</span>
    collapsible<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;/about/&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// 自定義名稱</span>
        text<span class="token operator">:</span> <span class="token string">&#39;關於我&#39;</span><span class="token punctuation">,</span>
        link<span class="token operator">:</span> <span class="token string">&#39;/about/list.md&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    text<span class="token operator">:</span> <span class="token string">&#39;Memo&#39;</span><span class="token punctuation">,</span>
    collapsible<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;/memo/vuepress.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/memo/markdown.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/memo/interview.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/memo/chatgpt.md&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/memo/prettier.md&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    text<span class="token operator">:</span> <span class="token string">&#39;Daily&#39;</span><span class="token punctuation">,</span>
    collapsible<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;/daily/&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 不用展開功能，直接連結至頁面</span>
  <span class="token string">&#39;/topics.md&#39;</span>
<span class="token punctuation">]</span>
<span class="token doc-comment comment">/**
 * Object type 示範
 const sidebar: SidebarConfig = <span class="token punctuation">{</span>
  &#39;/about/&#39;: [
    <span class="token punctuation">{</span>
      text: &#39;About&#39;,
      children: [&#39;/about/&#39;, &#39;/about/list.md&#39;]
    <span class="token punctuation">}</span>
  ],
  &#39;/memo/&#39;: [
    <span class="token punctuation">{</span>
      text: &#39;Memo&#39;,
      children: [&#39;/memo/vuepress.md&#39;, &#39;/memo/markdown.md&#39;]
    <span class="token punctuation">}</span>
  ],
  &#39;/daily/&#39;: [
    <span class="token punctuation">{</span>
      text: &#39;Daily&#39;,
      children: [&#39;/daily/&#39;]
    <span class="token punctuation">}</span>
  ]
<span class="token punctuation">}</span> 
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>SidebarConfig 支持 Array &amp; Object 兩種形式的配置，而 Object type 適合側邊欄會隨著路由變換的場景，因此本站選用 Array type。</li></ul><h2 id="front-matter" tabindex="-1"><a class="header-anchor" href="#front-matter" aria-hidden="true">#</a> Front Matter</h2>`,7),h={href:"https://v2.vuepress.vuejs.org/reference/frontmatter.html#frontmatter",target:"_blank",rel:"noopener noreferrer"},g=t(`<h2 id="markdown-內使用-vue-組件配置" tabindex="-1"><a class="header-anchor" href="#markdown-內使用-vue-組件配置" aria-hidden="true">#</a> markdown 內使用 Vue 組件配置</h2><ul><li><p>流程</p><ol><li>安裝插件至開發依賴</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pnpm add -D @vuepress/plugin-register-components@next
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>typescript 要注意版號需相同，否則過不了編譯</strong></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token string-property property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;@vuepress/client&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2.0.0-beta.60&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;@vuepress/plugin-register-components&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2.0.0-beta.60&quot;</span> <span class="token comment">// 60</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>配置插件(/docs/.vuepress/config.ts)</p><ul><li>指定註冊的共用組件路徑，以此為例(docs/.vuepress/components)內的所有組件皆會被註冊</li><li>__dirname 為 commonJS 提供的參數，ESM 模式下要另行宣告</li></ul></li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> url <span class="token keyword">from</span> <span class="token string">&#39;url&#39;</span>
<span class="token keyword">const</span> __dirname <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">fileURLToPath</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name"><span class="token constant">URL</span></span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">registerComponentsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      componentsDir<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./components&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,2);function f(y,_){const a=i("ExternalLinkIcon");return o(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[s("主題種類繁多"),e(a)]),s("，官方提供一個隨開即用的預設主題，也能自己開發")]),n("li",null,[n("a",d,[s("預設主題相關配置"),e(a)])])]),v,n("ul",null,[n("li",null,[n("a",k,[s("官方連結"),e(a)])]),m]),b,n("p",null,[n("a",h,[s("Frontmatter"),e(a)]),s(" @official")]),g])}const w=p(c,[["render",f],["__file","vuepress.html.vue"]]);export{w as default};
