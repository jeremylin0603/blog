import{c,b as n,p as t,q as s,x as i,_ as o}from"./framework-cd43f88a.js";const l=["src"],_=["src","width","height"],p=c({__name:"BaseImg",props:{src:{type:String,required:!0},isAutoSize:{type:Boolean,default:!1},w:{type:Number,default:300},h:{type:Number,default:300},align:{type:String,default:"center"}},setup(a){const e=a,r=n({"--align":e.align});return(u,d)=>(t(),s("div",{style:i(r),class:"wrapper"},[a.isAutoSize?(t(),s("img",{key:0,src:e.src},null,8,l)):(t(),s("img",{key:1,src:e.src,width:e.w,height:e.h},null,8,_))],4))}});const g=o(p,[["__scopeId","data-v-770f70b8"],["__file","BaseImg.vue"]]);export{g as default};