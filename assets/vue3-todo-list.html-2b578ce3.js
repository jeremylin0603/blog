import{_ as t,M as o,p as c,q as l,Q as e,t as n,N as i,a1 as s}from"./framework-cd43f88a.js";const p={},r=s('<h1 id="vue3-todo-list" tabindex="-1"><a class="header-anchor" href="#vue3-todo-list" aria-hidden="true">#</a> Vue3 TODO List</h1><p>A Vue3 Side project</p><h2 id="topic-stage" tabindex="-1"><a class="header-anchor" href="#topic-stage" aria-hidden="true">#</a> Topic stage</h2><p>紀錄過程中想特別深入研究的 topic，避免過幾天就忘了</p><ul><li>Stylelint</li><li>husky &amp; lint-staged</li><li>Volar (needed disable Vetur)</li><li>virtual DOM(聲明式渲染)</li><li>源碼導讀</li><li>v-model = v-bind: + v-on:</li></ul><h2 id="隨手筆記" tabindex="-1"><a class="header-anchor" href="#隨手筆記" aria-hidden="true">#</a> 隨手筆記</h2><ul><li><code>pnpm create vue@latest</code></li></ul>',7),d={href:"https://github.com/vuejs/create-vue",target:"_blank",rel:"noopener noreferrer"},u=s(`<ul><li><code>&lt;input&gt;</code> 有啥屬性、啥事件？</li></ul><p>type: <code>number</code>, <code>color</code>, <code>checkbox</code>, <code>radio</code>, <code>date</code>, <code>file</code>, <code>month</code>, <code>password</code>, <code>range</code>, <code>time</code>.</p><p>attribute:</p><p>event:</p><ul><li>為啥 <code>&lt;input&gt;</code> 雙向綁定的時候一定要加上 <code>:value=&quot;text&quot;</code>，我只綁定 <code>@input=&quot;handleText&quot;</code> 一樣可以運作啊？</li></ul><p>這樣才能確保初始值一至，如果沒加，那一直到輸入 value 之前，<input> 實際上沒有跟任何資料綁定再一起。</p><ul><li><p><code>reactive()</code></p><ul><li><p>about type 不建議使用泛型(generics)，建議直接使用 interface。</p><blockquote><p>不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">interface</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  year<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/** not-recommend */</span>
<span class="token keyword">const</span> book <span class="token operator">=</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span>Book<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;Vue 3 指引&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/** recommend */</span>
<span class="token keyword">const</span> book<span class="token operator">:</span> Book <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;Vue 3 指引&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p><code>Date()</code>: type string, <code>new Date()</code>: type Date</p></li></ul>`,7);function k(v,m){const a=o("ExternalLinkIcon");return c(),l("div",null,[r,e("blockquote",null,[e("p",null,[n("ref: "),e("a",d,[n("create-vue"),i(a)])])]),u])}const h=t(p,[["render",k],["__file","vue3-todo-list.html.vue"]]);export{h as default};