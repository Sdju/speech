import{d as b,t as C,a8 as A,o as v,b as m,F as N,g as q,e as c,y as t,a6 as p,au as $,c as I,h as M,i as B,an as O,A as w,av as T,v as G,aw as V,D as W,x as E,I as P}from"../modules/vue-D2lcLnn_.js";import{b as S,$ as Z,a0 as H,a1 as J,a2 as K,a3 as Q,a4 as U,g as X,u as j}from"../index-uA0L1AT0.js";import{u as Y}from"./context-D39_U8h1.js";const ee={class:"h-full w-full flex items-center justify-center gap-2 slidev-slide-loading"},te=c("div",{class:"i-svg-spinners-90-ring-with-bg text-xl"},null,-1),se=c("div",null,"Loading slide...",-1),ne=b({__name:"SlideLoading",setup(f){const e=C(!1);return A(()=>{setTimeout(()=>{e.value=!0},200)}),(a,o)=>(v(),m("div",ee,[e.value?(v(),m(N,{key:0},[te,se],64)):q("v-if",!0)]))}}),le=S(ne,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/internals/SlideLoading.vue"]]),ae=b({__name:"SlideWrapper",props:{clicksContext:{type:Object,required:!0},renderContext:{type:String,default:"slide"},active:{type:Boolean,default:!1},is:{type:Function,required:!0},route:{type:Object,required:!0}},setup(f){const e=f,a=t(()=>{var n,r;return((r=(n=e.route.meta)==null?void 0:n.slide)==null?void 0:r.frontmatter.zoom)??1});p(Z,e.route),p(H,C(e.route.no)),p(J,C(e.renderContext)),p(K,$(e,"active")),p(Q,$(e,"clicksContext")),p(U,a);const o=t(()=>a.value===1?void 0:{width:`${100/a.value}%`,height:`${100/a.value}%`,transformOrigin:"top left",transform:`scale(${a.value})`}),_=T({loader:async()=>{const n=await e.is();return b({setup(r,{attrs:u}){return A(()=>{var i,x;(x=(i=e.clicksContext)==null?void 0:i.onMounted)==null||x.call(i)}),()=>G(n.default,u)}})},delay:300,loadingComponent:le});return(n,r)=>(v(),m("div",{class:B(w(X)(f.route))},[(v(),I(O(w(_)),{style:M(o.value),"data-slidev-no":e.route.no,class:B({"disable-view-transition":!["slide","presenter"].includes(e.renderContext)})},null,8,["style","data-slidev-no","class"]))],2))}}),ge=S(ae,[["__scopeId","data-v-072900a9"],["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/internals/SlideWrapper.vue"]]),be={render(){return[]}},oe=c("div",{hidden:""},null,-1),re={class:"absolute w-full h-full"},ie=["viewBox"],ce=["rx","ry","cx","cy","transform"],ue=["rx","ry","cx","cy","transform"],de=["rx","ry","cx","cy","transform"],pe=c("div",{class:"absolute left-0 top-0 w-full h-full backdrop-blur-[40px]"},null,-1),ve={class:"absolute right-[20px] bottom-[20px] text-lg opacity-50"},_e=b({__name:"global-bottom",setup(f){V(s=>({"811b1429-speed":D.value})),Y(),window.$doubleClick=function(s,l){if(s.value!=="slide")return;const d=P(),y=t(()=>a.value===d.setupState.$page),g=new Set([l].flat()),{clicks:h,next:F}=j();W(h,(k,R)=>{g.has(k)&&k>R&&y.value&&setTimeout(()=>{F()},500)})};const{currentSlideRoute:e,currentSlideNo:a}=j(),o=t(()=>{var s,l;return((l=(s=e.value.meta)==null?void 0:s.slide)==null?void 0:l.frontmatter)||{}});function _(s,l){var y;const d=((y=o.value[s])==null?void 0:y.split(" ").map((g,h)=>g==="_"?l[h]:Number(g)))??l;return{rx:d[0],ry:d[1],cx:d[2],cy:d[3]}}const n=t(()=>{var s;return((s=o.value["bg.offset"])==null?void 0:s.split(" ").map(l=>Number(l)))??[0,0]}),r=t(()=>_("bg.green",[280,277,1100,276])),u=t(()=>_("bg.black",[235,282,1102,262])),i=t(()=>_("bg.accent",[0,0,682,692])),x=t(()=>o.value["bg.green.trans"]??"rotate(0)"),L=t(()=>o.value["bg.black.trans"]??"rotate(0)"),z=t(()=>o.value["bg.accent.trans"]??"rotate(0)"),D=t(()=>o.value["bg.speed"]??"0.7s");return(s,l)=>(v(),m(N,null,[oe,c("div",re,[(v(),m("svg",{class:"absolute left-[0px] top-0 w-[980px] h-[554px] back",viewBox:`${n.value} ${n.value} ${n.value+980} ${n.value+532}`,fill:"none",xmlns:"http://www.w3.org/2000/svg"},[c("ellipse",{rx:i.value.rx,ry:i.value.ry,cx:i.value.cx,cy:i.value.cy,transform:z.value,fill:"#34475E"},null,8,ce),c("ellipse",{rx:r.value.rx,ry:r.value.ry,cx:r.value.cx,cy:r.value.cy,transform:x.value,fill:"#3ABA7F"},null,8,ue),c("ellipse",{rx:u.value.rx,ry:u.value.ry,cx:u.value.cx,cy:u.value.cy,transform:L.value,fill:"#111214"},null,8,de)],8,ie)),pe,c("div",ve,E(w(a)),1)])],64))}}),me=S(_e,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/global-bottom.vue"]]),he={render(){return[G(me)]}};export{he as G,ge as S,be as a};
