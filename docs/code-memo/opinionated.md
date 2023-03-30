# Opinionated vs Unopinionated

## 什麼是 Opinionated

先以前端三大框架為例：

> Angular is a full-featured “opinionated” framework. That means you have to do things the Angular way, which makes is more difficult and more rewrite to add into existing apps.  
> React and Vue are “non-opinionated” frameworks. Technically, they are not frameworks. But rather “libraries”. They are easier to add into existing web apps without a heavy rewrite. You can drop bits and pieces of them into existing app and migrate them over little at a time.

簡而言之，Opinionated 是一種產品風格，使用上具備不容質疑的思維，需要按照工具的設計理念使用，好處是有開箱即用、不需花太多心思配置的特性，但相對的也會導致失去變更的彈性，也意味著大多時候不容易引入開發到一半的專案。

就像是一個沒辦法聽進去任何意見的人要加入一個團隊，若是個大神，大家都願意照他的想法做事那是最好不過，但若他只是個固執的傢伙，跟團隊風格、想法有很大的差異，就會變成做什麼事都綁手綁腳，最後只會各種起爭執和衝突。

但另一方面若是一個沒有主見的人，好處是可以自由自在的相處，但得花費大量時間討論每一個共識。

<BaseImg src="https://cdn.pixabay.com/photo/2016/06/13/09/57/meeting-1453895_960_720.png" />

另外 Node.js 官網也在開篇表明自己是個好溝通的傢伙：

> Fast, unopinionated, minimalist web framework for Node.js

必須要強調，Opinionated 並不是一種惹人厭的風格，只看情境適不適合，工具終究只是工具。

例如 [Prettier](/code-memo/prettier.md) 是 Opinionated，但經由社群不斷的反饋意見和版本迭代，新增一堆配置項後讓 react 的開發者忍不住跳出來抱怨 Prettier 正在違背 Opinionated 的精神，多一堆配置項把事情搞得複雜， Prettier 開發者也喊冤表示這絕非他本意 QQ  
[Resist adding configuration](https://github.com/prettier/prettier/issues/40) @github issue #40

## Conclusion

較大的彈性可能可以迎合多數人的喜好，但往往也讓事情變得複雜，分散關注點。

選擇多了看似有許多自由，也可能受限於要選什麼，變得故步自封。

比如出門穿搭，大學時愛買衣服，衣服多了煩惱也多了，哪像現在櫃子打開衣服都一樣，簡單的素 T 套個褲子就可以出門，沒得選就不用花力氣選了。

不管是彈性還是個性，都要拿捏有度才是正道啊～
