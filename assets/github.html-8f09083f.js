import{_ as n,p as a,q as s,a1 as e}from"./framework-cd43f88a.js";const t={},i=e(`<h1 id="github" tabindex="-1"><a class="header-anchor" href="#github" aria-hidden="true">#</a> *Github</h1><h2 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> Actions</h2><h3 id="設定" tabindex="-1"><a class="header-anchor" href="#設定" aria-hidden="true">#</a> 設定</h3><h4 id="基本設定" tabindex="-1"><a class="header-anchor" href="#基本設定" aria-hidden="true">#</a> 基本設定</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># workflow name</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy GitHub Pages

<span class="token comment"># trigger condition</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token comment"># 執行步驟</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build dist
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span> npm run docs<span class="token punctuation">:</span>build

      <span class="token comment"># 部署到 GitHub Pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to Github Pages
        <span class="token comment"># 直接用別人寫好的 action</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@4.1.5
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token key atrule">folder</span><span class="token punctuation">:</span> docs/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="進階設定" tabindex="-1"><a class="header-anchor" href="#進階設定" aria-hidden="true">#</a> 進階設定</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,7),l=[i];function c(p,u){return a(),s("div",null,l)}const d=n(t,[["render",c],["__file","github.html.vue"]]);export{d as default};
