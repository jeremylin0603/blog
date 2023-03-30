import{_ as l,M as t,p as r,q as u,R as d,Q as n,N as s,V as p,t as a,a1 as o}from"./framework-cd43f88a.js";const k={},h=n("h1",{id:"execution-context",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#execution-context","aria-hidden":"true"},"#"),a(" Execution context")],-1),v=n("h2",{id:"what-is-execution-context",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#what-is-execution-context","aria-hidden":"true"},"#"),a(" What is Execution context?")],-1),m=n("p",null,[a("Execution context （以下簡稱 EC）是 JS Engine 在記憶體中創建的空間，用來存儲當前執行任務的各種資訊，包含當前作用域中的變數與函式、"),n("code",null,"this"),a(" key word、作用域外部的 reference 等訊息。通常執行過程中會創建許多新的 EC，每次創建一個新的 EC 都會將其推入一個維護 EC 執行順序的隊列 - "),n("strong",null,"call stack"),a("，JS Engine 會執行 Call stack 中最新推入的 EC 直到該 EC 被執行完畢後將其 pop 出 Call stack，並且繼續執行下一個最後推入的 EC，直到整個 Call stack 佇列被清空，結束執行。")],-1),b=n("p",null,"call stack 是後進先出的（LIFO - last in first out）",-1),g=o('<h4 id="js-engine" tabindex="-1"><a class="header-anchor" href="#js-engine" aria-hidden="true">#</a> JS Engine</h4><p>負責執行 Javascript 的虛擬機(Virtual Machine)，目的是將人類才看得懂的高階語言轉譯成機器看得懂的機器語言，JS Engine 包含了 Memory Heap 與 Call stack，其中 Heap 是記憶體空間，用來儲存變數和物件，call stack 如上所述是用來維護 EC 的佇列。</p><p>市面上著名的 JS Engine 為 Chrome 的 V8，Node.js 也是基於 V8 才得以誕生的，每個 JS Engine 運行的方式不完全相同，但無論哪一個都得按照 ECMAScript 的規範來運行，關於 JS、ECMA、V8 和 Node 背後的故事未來有機會再開一篇聊聊。</p><h2 id="when-will-ec-be-created" tabindex="-1"><a class="header-anchor" href="#when-will-ec-be-created" aria-hidden="true">#</a> When will EC be created?</h2><p>JS Engine 執行時若遇到下列情況，皆會創建一個新的 Execution context 並推入 call stack 之中：</p><ul><li>初次載入 script 時，創建 global execution context</li><li>function invoke <code>fn()</code></li><li>import module</li><li>eval()</li></ul><h2 id="ec-phase" tabindex="-1"><a class="header-anchor" href="#ec-phase" aria-hidden="true">#</a> EC phase</h2><p>每個 Execution context 都包含兩個階段(phase):</p><h3 id="phase1-創建-creation" tabindex="-1"><a class="header-anchor" href="#phase1-創建-creation" aria-hidden="true">#</a> Phase1. 創建(creation)</h3><p>這階段會創建</p>',10),x=n("li",null,[n("p",null,"Lexical environment(LE): 存儲了當前 scope 中宣告的變數和 function")],-1),f=n("li",null,[n("p",null,"Reference: 又稱為 Outer environment，指向當前環境的外部 LE，變數在當前的 LE 找不到時就會往 Reference 找，這樣不斷的向外關聯也就形成了 scope chain，會一直找到 global 為止")],-1),_=n("code",null,"this",-1),E=n("code",null,"this",-1),w=n("code",null,"this",-1),C=n("h3",{id:"phase2-執行-execution",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#phase2-執行-execution","aria-hidden":"true"},"#"),a(" Phase2. 執行(execution)")],-1),j=o(`<p>call stack 中最上面（最後加入的）的 EC 會先被執行，直到該執行階段結束(function return)，執行完畢後將其 pop 出 call stack 佇列，直到最後 global execution context 也被 pop 出去時才算執行完畢。</p><h2 id="ec-hoisting" tabindex="-1"><a class="header-anchor" href="#ec-hoisting" aria-hidden="true">#</a> EC &amp; Hoisting</h2><h2 id="小結" tabindex="-1"><a class="header-anchor" href="#小結" aria-hidden="true">#</a> 小結</h2><ol><li>當 script 第一次被執行時，JS Engine 會創建一個 global execution context，並且將其加入 call stack 之中</li><li>JS Engine 會逐行執行程式碼，當遇到 function invoke、import module、eval() 時，會再創建一個全新的 Execution context 後加進 call stack</li><li>當最後加入的 context 執行完畢後將其拋出 stack，並且繼續執行下一個最晚加入的 context</li><li>直到整個 stack 清空為止。</li></ol><h2 id="scope-chain" tabindex="-1"><a class="header-anchor" href="#scope-chain" aria-hidden="true">#</a> Scope Chain</h2><p>Scope Chain 指的是不同的作用域互相包裹之下，存取某個變數時若在當前作用域找不到該變數，就會繼續往外部作用域尋找，直到最後抵達 global scope 為止。</p><p>而現在我們知道每個 EC 都會創建 Reference，這個 Reference 會關聯到外部的 EC，外部的 EC 也有自己的 Reference 指向更外部的 EC，這樣不斷地向外關聯就形成了 scope chain</p><blockquote><p>notice：Reference 關聯的外部 EC 是依據「程式碼實際位置的外部」，而非依據 call stack 佇列的位置</p></blockquote><h2 id="block-scope" tabindex="-1"><a class="header-anchor" href="#block-scope" aria-hidden="true">#</a> Block Scope</h2><p>在 ES6 之前只有兩種 Scope: <code>global scope</code> &amp; <code>function scope</code>，ES6 之後新增了 <code>block scope</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ./index.js</span>

<span class="token comment">// global scope here</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// function scope here</span>
<span class="token punctuation">}</span>

<span class="token punctuation">{</span>
  <span class="token comment">// block scope here</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> REF</h4>`,12),S={href:"https://www.borderlessengineer.com/post/how-js-works-lexical-environment",target:"_blank",rel:"noopener noreferrer"},y={href:"https://slawinski.dev/blog/javascript-runtime-environment-javascript-engine/",target:"_blank",rel:"noopener noreferrer"},J={href:"https://stackoverflow.com/questions/69417158/how-will-the-lexical-environment-and-the-variable-environment-will-look-like-at",target:"_blank",rel:"noopener noreferrer"},R={href:"https://ithelp.ithome.com.tw/articles/10288147?sc=iThelpR",target:"_blank",rel:"noopener noreferrer"},L={href:"https://cabulous.medium.com/javascript-execution-context-lexical-environment-and-block-scope-part-3-fc2551c92ce0",target:"_blank",rel:"noopener noreferrer"},V=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">10</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> apple <span class="token operator">=</span> <span class="token string">&#39;global apple&#39;</span>
<span class="token keyword">let</span> banana <span class="token operator">=</span> <span class="token string">&#39;global banana&#39;</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token string">&#39;scope apple&#39;</span>
  <span class="token keyword">var</span> grape <span class="token operator">=</span> <span class="token string">&#39;global grape&#39;</span>
  <span class="token keyword">let</span> orange <span class="token operator">=</span> <span class="token string">&#39;scope orange&#39;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>apple<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>banana<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>banana<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>grape<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>orange<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token string">&#39;apple&#39;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>apple<span class="token punctuation">)</span>
  <span class="token comment">// let apple = &#39;banana&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function N(B,I){const c=t("BaseImg"),i=t("RouterLink"),e=t("ExternalLinkIcon");return r(),u("div",null,[h,v,m,d(" TODO: 關於 stack 只需要知道兩件事 "),n("blockquote",null,[b,s(c,{src:"https://cdn.pixabay.com/photo/2012/02/23/08/38/rocks-15712_1280.jpg",isAutoSize:""})]),g,n("ul",null,[x,f,n("li",null,[n("p",null,[s(i,{to:"/code-memo/js-we-dont-know/this.html"},{default:p(()=>[_]),_:1}),a(" binding: 創建 "),E,a(" 變數，並將其指向 global object。若是屬於 Object 中的 function，則 "),w,a(" 會指向所屬的 Object，更多行為詳見"),s(i,{to:"/code-memo/js-we-dont-know/this.html"},{default:p(()=>[a("this")]),_:1})])])]),C,s(c,{src:"https://i.imgur.com/ibACf8Y.png",isAutoSize:""}),j,n("p",null,[n("a",S,[a("How JS Works - Lexical Environment"),s(e)]),a(" @borderless engineer")]),n("p",null,[n("a",y,[a("JavaScript Runtime Environment: JavaScript Engine"),s(e)]),a(" @slawinski.dev")]),n("p",null,[n("a",J,[a("How will the Lexical environment and the Variable Environment will look like at the following code"),s(e)]),a(" @stack overflow")]),n("p",null,[n("a",R,[a("JavaScript Execution Context & var/let/const"),s(e)]),a(" @IT 邦")]),n("p",null,[n("a",L,[a("JavaScript execution context — lexical environment and block scope (part 3)"),s(e)]),a(" @medium Carson")]),V])}const T=l(k,[["render",N],["__file","execution-context.html.vue"]]);export{T as default};
