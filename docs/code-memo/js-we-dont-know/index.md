# Javascript

<BaseImg src="https://cdn.pixabay.com/photo/2019/10/03/12/12/javascript-4523100_960_720.jpg" isAutoSize />

## 前言

JS 是一門很有性格的語言，入行越久，我總以為越來越熟悉的同時卻也覺得越來越陌生。

有次聽到一個前端同事在聊 Hoisting，説 let、const 並沒有 hoisting，我就順便加入討論也跟她分享：「其實他們都有 hoisting，只是 JS 不讓你讀取而已」。

看似平凡的分享，但其實事後回想起來才驚覺「我沒辦法再説得更仔細了」

畢竟我只是知道這個特性，「記下來」後分享給同事，讓他也「記下來」而已

假如同事接著問：「為什麼 JS 不讓讀呢？」是因為 ES6 語法規定如此？因為要避免 var 常見的問題？說真的我答不上來。

就像是小朋友都知道太陽從東邊升起，西邊落下，但是問他們為什麼？太陽真的是自己「升」起來嗎？小朋友也只能跟你說反正就是這樣。

總之我想說的是，我認為追究本質才是進步的根源，只有真的理解了底層，才能在堅實的基礎上前進，而不是靠經驗瞎猜或是上網強記各種行為。

\-

因此我想從最底層的運行邏輯來重新認識 JS 的各種「特色」，畢竟記那些特性真的很沒意思，但如果能徹底了解這些行為的原因，那就有點意思了 XD

只是礙於時間有限，只能先把比較重要的東西順著寫出來，篇幅比較生硬，之後再找時間回頭重新編排 QQ

## 目錄

- 1. Javascript 誕生
- [2. JS Engine、Call stack & Execution context](./execution-context.md)
- [3. Scope Chain & Scope](./scope.md)
- [3. Hoisting & TDZ](./hoisting.md)
- 4. Chrome DevTool & Call Stack
- 5. Event loop

## 補充

- [單線程與同步執行](./thread.md)
- ['this' keyword](./this.md)
- [truthy & falsy & nullish](./truthy-falsy-nullish.md)
