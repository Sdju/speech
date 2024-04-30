function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/slidev/DrawingControls-D28jtnY_.js","assets/modules/unplugin-icons-D6MUUJpM.js","assets/modules/vue-DWLVE48c.js","assets/modules/shiki-cMibciSt.js","assets/modules/shiki-BSchMNmt.css","assets/slidev/DrawingPreview-BUTqSdPB.js","assets/index-Rr6RXTWx.js","assets/index-DrM4WIO0.css","assets/slidev/ContextMenu-BxlR6PDV.js","assets/slidev/bottom-y-L7Himv.js","assets/slidev/context-CIDk9P6d.js","assets/bottom-D0tQaxHK.css","assets/ContextMenu-Cb15NfzG.css","assets/DrawingControls-C5T1oZL5.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{b,c as y,o as C,y as x,z as S,u as B,A as I,B as N,_ as $,w as A,D as O,E as R}from"../index-Rr6RXTWx.js";import{d as w,af as E,o,c as r,A as e,b as _,e as l,f as T,i as D,g as a,ag as U,y as P,k as M,ae as g,aa as H,M as h,l as c,F as z,t as L,h as F}from"../modules/vue-DWLVE48c.js";import{Q as G,G as Q,C as W,r as j,a as K,S as X,b as Y,N as q,o as J}from"./ContextMenu-BxlR6PDV.js";import{P as Z}from"./PrintStyle-Dr-4WC2V.js";import{u as ee}from"./DrawingPreview-BUTqSdPB.js";import"../modules/shiki-cMibciSt.js";import"../modules/unplugin-icons-D6MUUJpM.js";import"./bottom-y-L7Himv.js";import"./context-CIDk9P6d.js";const se="/speech/slides/2024_holy-spring_vue-renderer/assets/logo-BYkHSa_O.png",oe={key:0,class:"fixed top-0 bottom-0 left-0 right-0 grid z-20"},te=w({__name:"Modal",props:{modelValue:{default:!1},class:{default:""}},emits:["update:modelValue"],setup(p,{emit:n}){const i=p,s=E(i,"modelValue",n);function t(){s.value=!1}return(m,d)=>(o(),r(U,null,[e(s)?(o(),_("div",oe,[l("div",{bg:"black opacity-80",class:"absolute top-0 bottom-0 left-0 right-0 -z-1",onClick:d[0]||(d[0]=v=>t())}),l("div",{class:D(["m-auto rounded-md bg-main shadow",i.class]),"dark:border":"~ main"},[T(m.$slots,"default")],2)])):a("v-if",!0)],1024))}}),le=b(te,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/internals/Modal.vue"]]),ae={class:"slidev-info-dialog slidev-layout flex flex-col gap-4 text-base"},ne=["innerHTML"],ie=l("a",{href:"https://github.com/slidevjs/slidev",target:"_blank",class:"!opacity-100 !border-none !text-current"},[l("div",{class:"flex gap-1 children:my-auto"},[l("div",{class:"opacity-50 text-sm mr-2"},"Powered by"),l("img",{class:"w-5 h-5",src:se,alt:"Slidev logo"}),l("div",{style:{color:"#2082A6"}},[l("b",null,"Sli"),H("dev ")])])],-1),re=w({__name:"InfoDialog",props:{modelValue:{default:!1}},emits:["update:modelValue"],setup(p,{emit:n}){const s=E(p,"modelValue",n),t=P(()=>typeof y.info=="string");return(m,d)=>(o(),r(le,{modelValue:e(s),"onUpdate:modelValue":d[0]||(d[0]=v=>g(s)?s.value=v:null),class:"px-6 py-4"},{default:M(()=>[l("div",ae,[t.value?(o(),_("div",{key:0,class:"mb-4",innerHTML:e(y).info},null,8,ne)):a("v-if",!0),ie])]),_:1},8,["modelValue"]))}}),de=b(re,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/internals/InfoDialog.vue"]]),ue=w({__name:"Controls",setup(p){const n=h(),i=h();return(f,s)=>(o(),_(z,null,[c(G,{modelValue:e(C),"onUpdate:modelValue":s[0]||(s[0]=t=>g(C)?C.value=t:null)},null,8,["modelValue"]),c(Q),n.value?(o(),r(e(n),{key:0})):a("v-if",!0),i.value?(o(),r(e(i),{key:1,modelValue:e(x),"onUpdate:modelValue":s[1]||(s[1]=t=>g(x)?x.value=t:null)},null,8,["modelValue"])):a("v-if",!0),e(y).info?(o(),r(de,{key:2,modelValue:e(S),"onUpdate:modelValue":s[2]||(s[2]=t=>g(S)?S.value=t:null)},null,8,["modelValue"])):a("v-if",!0),c(W)],64))}}),ce=b(ue,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/internals/Controls.vue"]]),pe=w({__name:"play",setup(p){j();const{next:n,prev:i,isEmbedded:f,isPrintMode:s}=B(),{isDrawing:t}=ee(),m=L();function d(u){var k;N.value||u.button===0&&((k=u.target)==null?void 0:k.id)==="slide-container"&&(u.pageX/window.innerWidth>.6?n():i())}K(m);const v=P(()=>I.value||N.value);h();const V=h();return $(()=>import("./DrawingControls-D28jtnY_.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])).then(u=>V.value=u.default),(u,k)=>(o(),_(z,null,[e(s)?(o(),r(Z,{key:0})):a("v-if",!0),l("div",{id:"page-root",ref_key:"root",ref:m,class:D(["grid",e(R)?"grid-rows-[1fr_max-content]":"grid-cols-[1fr_max-content]"])},[c(X,{class:"w-full h-full",style:F({background:"var(--slidev-slide-container-background, black)"}),width:e(s)?e(A).width.value:void 0,scale:e(O),"is-main":!0,onPointerdown:d,onContextmenu:e(J)},{default:M(()=>[c(Y,{"render-context":"slide"})]),controls:M(()=>[e(s)?a("v-if",!0):(o(),_("div",{key:0,class:D(["absolute bottom-0 left-0 transition duration-300 opacity-0 hover:opacity-100",[v.value?"!opacity-100 right-0":"opacity-0 p-2",e(t)?"pointer-events-none":""]])},[c(q,{class:"m-auto",persist:v.value},null,8,["persist"])],2)),!e(y).drawings.presenterOnly&&!e(f)&&V.value?(o(),r(e(V),{key:1,class:"ml-0"})):a("v-if",!0)]),_:1},8,["style","width","scale","onContextmenu"]),a("v-if",!0)],2),e(s)?a("v-if",!0):(o(),r(ce,{key:1}))],64))}}),Ve=b(pe,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/pages/play.vue"]]);export{Ve as default};
