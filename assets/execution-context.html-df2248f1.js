import{_ as s,M as c,p as h,q as d,Q as e,t as n,N as t,V as l,a1 as o}from"./framework-cd43f88a.js";const p="/blog/assets/runtime.drawio-2ff4f00b.svg",u={},x=o('<h1 id="js-engine、call-stack-execution-context" tabindex="-1"><a class="header-anchor" href="#js-engine、call-stack-execution-context" aria-hidden="true">#</a> JS Engine、Call stack &amp; Execution context</h1><p>這篇就先從 JS Engine 開始聊聊他是如何解析 JS 的。</p><h2 id="js-engine" tabindex="-1"><a class="header-anchor" href="#js-engine" aria-hidden="true">#</a> JS Engine</h2><p>負責執行 Javascript 的 process，目的是將人類才看得懂的高階語言轉譯成機器看得懂的機器語言，JS Engine 包含了 Memory Heap 與 Call stack，而 JS Engine 又是由 runtime 負責運行的。</p><svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><image href="'+p+'" height="400" width="600"></image></svg><h2 id="runtime" tabindex="-1"><a class="header-anchor" href="#runtime" aria-hidden="true">#</a> runtime</h2><p>runtime 本質是虛擬機(Virtual Machine)，其中包含了處理 JS 的 JS Engine、維護非同步事件的 Event loop，和為了服務各自環境所提供的額外 API (如 browser 的 DOM 操作、或是 Nodejs 的 <code>fs</code> module)</p><p>市面上著名的 runtime 為 Chrome 的 V8，後端的 Nodejs 也是基於 V8 才得以實作出來，其中他們內部的 JS Engine 運行方式不完全相同，但無論哪一個都得按照 ECMAScript 的規範來運行。</p><blockquote><p>未來有時間再開一個系列分享從 WWW 誕生到 JS、V8、Node 之間非常有趣的歷史故事^^</p></blockquote><h2 id="call-stack" tabindex="-1"><a class="header-anchor" href="#call-stack" aria-hidden="true">#</a> Call stack</h2><p>關於 Call stack 只需要知道兩件事</p><ol><li>Call stack 是 JS Engine 中的一部分，用來維護「Execution context」的佇列</li><li>Call stack 是後進先出的（LIFO - last in first out），就像品客洋芋片一樣，最先放進去的那片得吃到最後才拿得出來。</li></ol><h2 id="execution-context-ec" tabindex="-1"><a class="header-anchor" href="#execution-context-ec" aria-hidden="true">#</a> Execution context(EC)</h2><p>Execution context （以下簡稱 EC）由 JS Engine 創建，用來解析和執行我們的 JS 程式碼。每個 EC 都會經歷兩個階段 - 「創建」和「執行」。通常「執行」過程中會再創建新的 EC，每次創建一個新的 EC 都會將其推入 <strong>Call stack</strong>後執行，直到執行完畢後才會被移出 stack，並且繼續執行下一個 EC，直到整個 Call stack 佇列被清空。</p><p>JS Engine 初次解析 script file 或 ES6 module 時，都會開啟一個新的 Call stack 佇列，並且在佇列中創建第一個 EC 稱為 <strong>Global EC</strong></p><h5 id="每個-ec-是由四個東西組成的" tabindex="-1"><a class="header-anchor" href="#每個-ec-是由四個東西組成的" aria-hidden="true">#</a> 每個 EC 是由四個東西組成的：</h5>',16),m=o("<li>Variable environment(VE): 存儲了當前 EC 中宣告的變數（僅限 <code>var</code>），並且在創建階段替變數初始化(initialize)賦予 <code>undefined</code>，導致我們在宣告前讀取<code>var</code>時會是 <code>undefined</code></li><li>Lexical environment(LE): 存儲了當前 EC 中宣告的變數（僅限 <code>let</code> &amp; <code>const</code>），但不會被初始化。另外 LE 如同 call stack 一樣，也具有「佇列」特性，稍後會補充說明。</li><li>Reference: 又稱為 Outer environment，會指向當前環境的外部 EC，當取用變數時在當前的 EC 找不到，就會往 Reference 找，這樣不斷的向外查找也就形成了 scope chain，會一直找到 global 為止。</li>",3),g=e("code",null,"this",-1),E=e("code",null,"this",-1),f=o('<h2 id="when-will-ec-be-created" tabindex="-1"><a class="header-anchor" href="#when-will-ec-be-created" aria-hidden="true">#</a> When will EC be created?</h2><p>JS Engine 執行時若遇到下列情況，皆會創建一個新的 Execution context：</p><ul><li>function invoke <code>fn()</code></li><li>初次載入 script 時，創建一個獨立的 call stack &amp; global execution context</li><li>初次載入 ES6 import module 時，創建一個獨立的 call stack &amp; global execution context</li><li>eval()</li></ul><p>也就是說能夠堆疊在 global EC 之上的 EC，全部都是 function invoke 後所建的 EC。</p><h2 id="ec-兩階段-2-phase" tabindex="-1"><a class="header-anchor" href="#ec-兩階段-2-phase" aria-hidden="true">#</a> EC 兩階段(2 phase)</h2><h3 id="phase1-創建-creation" tabindex="-1"><a class="header-anchor" href="#phase1-創建-creation" aria-hidden="true">#</a> Phase1. 創建(creation)</h3><p>creation 階段 JS Engine 會先在記憶體中替<strong>當前 scope 中宣告</strong>的變數和 function 創建空間。</p><blockquote><p>function 會被直接存在 Heap 中，Heap 是設計來存放 Object 的空間，而在 JS 中的 function 其實是 Object。</p></blockquote><h3 id="phase2-執行-execution" tabindex="-1"><a class="header-anchor" href="#phase2-執行-execution" aria-hidden="true">#</a> Phase2. 執行(execution)</h3>',9),k=e("p",null,"創建階段結束後，會回頭從第一行開始按照順序往下執行程式碼，執行的過程中遇到創建新 EC 的條件時，就會暫停當前執行，並且由 JS Engine 創建一個新的 EC 推入 call stack 中，繼續開始新 EC 兩階段，直到新 EC 執行完畢被移出 stack，當前 EC 才會從剛才中斷的地方繼續往下執行。",-1),_=e("p",null,"了解完 EC 的組成和特性後，就能開始解釋 JS 的種種行為了。",-1),b=o('<h2 id="hoisting" tabindex="-1"><a class="header-anchor" href="#hoisting" aria-hidden="true">#</a> Hoisting</h2><h2 id="小結" tabindex="-1"><a class="header-anchor" href="#小結" aria-hidden="true">#</a> 小結</h2><ol><li>當 script 第一次被執行時，JS Engine 會創建一個 global execution context，並且將其加入 call stack 之中</li><li>JS Engine 會逐行執行程式碼，當遇到 function invoke、eval() 時，會再創建一個全新的 Execution context 後加進 call stack</li><li>當最後加入的 context 執行完畢後將其拋出 stack，並且繼續執行下一個最晚加入的 context</li><li>直到整個 stack 清空為止。</li></ol><h4 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> REF</h4>',4),v={href:"https://www.borderlessengineer.com/post/how-js-works-lexical-environment",target:"_blank",rel:"noopener noreferrer"},C={href:"https://slawinski.dev/blog/javascript-runtime-environment-javascript-engine/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://stackoverflow.com/questions/69417158/how-will-the-lexical-environment-and-the-variable-environment-will-look-like-at",target:"_blank",rel:"noopener noreferrer"},S={href:"https://ithelp.ithome.com.tw/articles/10288147?sc=iThelpR",target:"_blank",rel:"noopener noreferrer"},J={href:"https://cabulous.medium.com/javascript-execution-context-lexical-environment-and-block-scope-part-3-fc2551c92ce0",target:"_blank",rel:"noopener noreferrer"};function j(V,L){const i=c("RouterLink"),r=c("BaseImg"),a=c("ExternalLinkIcon");return h(),d("div",null,[x,e("ul",null,[m,e("li",null,[n("'this' binding: 創建 "),g,n(" 變數，並將其指向 global object。若是屬於 Object 中的 function，則 "),E,n(" 會指向所屬的 Object，更多行為詳見"),t(i,{to:"/code-memo/js-we-dont-know/this.html"},{default:l(()=>[n("this")]),_:1})])]),f,t(r,{src:"https://i.imgur.com/ibACf8Y.png",isAutoSize:""}),k,_,e("p",null,[t(i,{to:"/code-memo/js-we-dont-know/scope.html"},{default:l(()=>[n("-> Scope Chain & Scope")]),_:1})]),e("p",null,[t(i,{to:"/code-memo/js-we-dont-know/hoisting.html"},{default:l(()=>[n("-> Hoisting")]),_:1})]),b,e("p",null,[e("a",v,[n("How JS Works - Lexical Environment"),t(a)]),n(" @borderless engineer")]),e("p",null,[e("a",C,[n("JavaScript Runtime Environment: JavaScript Engine"),t(a)]),n(" @slawinski.dev")]),e("p",null,[e("a",w,[n("How will the Lexical environment and the Variable Environment will look like at the following code"),t(a)]),n(" @stack overflow")]),e("p",null,[e("a",S,[n("JavaScript Execution Context & var/let/const"),t(a)]),n(" @IT 邦")]),e("p",null,[e("a",J,[n("JavaScript execution context — lexical environment and block scope (part 3)"),t(a)]),n(" @medium Carson")])])}const H=s(u,[["render",j],["__file","execution-context.html.vue"]]);export{H as default};
