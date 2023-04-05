import{_ as c,M as o,p as i,q as r,Q as e,t as n,N as a,V as p,a1 as d}from"./framework-cd43f88a.js";const l={},u=e("h1",{id:"hoisting-tdz",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#hoisting-tdz","aria-hidden":"true"},"#"),n(" Hoisting & TDZ")],-1),m=e("p",null,"hoist:「提升」，這不是個好名字，因為實際上沒有任何程式碼被「提升」，會讓不知道的人以為自己懂了但其實誤會大了(像是當年剛接觸 JS 的我 QQ)",-1),h=d(`<p>第一個階段「creation」，function 會被存在 heap 中，var 會被存在 variable env.並且初始化賦值 undefined，let &amp; const 會存在 lexical env. 並且不被初始化。</p><p>「creation」階段結束後，執行階段開始，此時記憶體中已經有了完整的 function 跟經過初始化的 var，所以我們能夠在實際的程式碼中宣告的行數之前存取 function &amp; var 而不會報錯。</p><p>但我們沒辦法在宣告之前的行數存取 let &amp; const，因為沒有被初始化所以雖然已經存在記憶體，但是沒辦法存取。</p><p>接著看<code>let</code>&amp;<code>const</code>的例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// &quot;Cannot access &#39;num&#39; before initialization&quot;</span>
<span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">ACCESS_TOKEN</span><span class="token punctuation">)</span> <span class="token comment">// &quot;Cannot access &#39;ACCESS_TOKEN&#39; before initialization&quot;</span>
<span class="token keyword">const</span> <span class="token constant">ACCESS_TOKEN</span> <span class="token operator">=</span> <span class="token string">&#39;abcde&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>範例中我們試著在 <code>let</code>、<code>const</code> 宣告之前存取，但是報錯了，所以有些同學就會認為 <code>let</code>、<code>const</code>沒有 hoisting。</p><h4 id="let、const依然有-hoisting" tabindex="-1"><a class="header-anchor" href="#let、const依然有-hoisting" aria-hidden="true">#</a> <code>let</code>、<code>const</code>依然有 hoisting</h4><p>這是很常見的思維誤區，首先按照 hoisting 的原因（在「creation」時預先創建變數的空間並將變數指向該空間），<code>let</code>、<code>const</code>也沒有例外地創建了專屬的記憶體空間，<strong>只是因為沒有初始化，JS 不讓讀取而已</strong>，我們可以從 error message 窺探一二：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// &quot;Cannot access &#39;num&#39; before initialization&quot;</span>
<span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// &quot;num is not defined&quot;</span>
<span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">&#39;hi!&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第一個例子一樣先在宣告前存取<code>num</code>，沒有意外地報錯。</p><p>但在第二個例子中，若我們 log 一個不曾宣告的變數，則會報錯 <strong>num is not defined</strong>，訊息中告訴我們 <code>num</code> 並沒有被定義。</p><p>回到第一個例子的錯誤訊息： <strong>Cannot access &#39;num&#39; before initialization</strong>，表示 JS 「知道」你有定義變數，但是「初始化之前」不允許你存儲這個變數。</p><h4 id="暫時性死區-temporal-dead-zone-tdz" tabindex="-1"><a class="header-anchor" href="#暫時性死區-temporal-dead-zone-tdz" aria-hidden="true">#</a> 暫時性死區 Temporal Dead Zone(TDZ)</h4><p>由於 <code>let</code> &amp; <code>const</code> 依然有 hoisting，只是在初始化之前無法存取，這個宣告前無法存取的地方被稱為<strong>暫時性死區</strong> <strong>Temporal Dead Zone(TDZ)</strong></p><h2 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> REF</h2>`,17),v={href:"https://dev.to/pranav016/advanced-javascript-series-part-42-scope-chains-and-their-working-lexical-and-variable-environments-19d5",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.udemy.com/course/javascriptjs/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.w3schools.com/js/js_scope.asp",target:"_blank",rel:"noopener noreferrer"};function _(f,b){const t=o("RouterLink"),s=o("ExternalLinkIcon");return i(),r("div",null,[u,m,e("p",null,[n("在 "),a(t,{to:"/code-memo/js-we-dont-know/execution-context.html"},{default:p(()=>[n("Execution context")]),_:1}),n(" 後我們可以知道 EC 有兩個階段：")]),h,e("p",null,[e("a",v,[n("What is a Scope Chain?"),a(s)]),n(" @DEV Community")]),e("p",null,[e("a",g,[n("JavaScript 全攻略：克服 JS 的奇怪部分"),a(s)]),n(" @Udemy")]),e("p",null,[e("a",k,[n("Javascript Scope"),a(s)]),n(" @W3C")])])}const j=c(l,[["render",_],["__file","hoisting.html.vue"]]);export{j as default};