const __vite__fileDeps=["assets/slidev/DrawingControls-CNcDOX1a.js","assets/modules/unplugin-icons-wkxBS9DS.js","assets/modules/vue-j0Y6FmN0.js","assets/modules/shiki-XPhe-9yo.js","assets/modules/shiki-BSchMNmt.css","assets/slidev/DrawingPreview-BoEEQprw.js","assets/index-BMedB7mq.js","assets/index-DvPsmk00.css","assets/DrawingPreview-DJj49XSD.css","assets/slidev/ContextMenu-quSZPnwR.js","assets/slidev/IconButton-BjU6n1UB.js","assets/slidev/context-ByBTBn7y.js","assets/modules/file-saver-DY7lxZlc.js","assets/ContextMenu-BbRI2RnC.css","assets/DrawingControls-C5T1oZL5.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as g,c as x,k as C,q as S,v as D,w as B,x as I,a as A,y as O,z as N,A as R,B as H,D as T,E as U}from"../index-BMedB7mq.js";import{d as h,a7 as j,o as s,c as r,A as e,b as f,e as n,f as L,i as M,g as i,ag as W,y as z,k,af as y,a6 as E,M as b,l as m,F as $,x as P,v as F,t as G,h as Q}from"../modules/vue-j0Y6FmN0.js";import{Q as q,G as K,C as X,r as Y,u as J,S as Z,N as ee,o as te}from"./ContextMenu-quSZPnwR.js";import{c as se,a as oe}from"./DrawingPreview-BoEEQprw.js";import"../modules/shiki-XPhe-9yo.js";import"../modules/unplugin-icons-wkxBS9DS.js";import"./IconButton-BjU6n1UB.js";import"./context-ByBTBn7y.js";import"../modules/file-saver-DY7lxZlc.js";const le="/speech/slides/2024_stachka_js-that-do-not-exist/assets/logo-BYkHSa_O.png",ae={key:0,class:"fixed top-0 bottom-0 left-0 right-0 grid z-20"},ne=h({__name:"Modal",props:{modelValue:{default:!1},class:{default:""}},emits:["update:modelValue"],setup(c,{emit:l}){const a=c,t=j(a,"modelValue",l);function o(){t.value=!1}return(_,u)=>(s(),r(W,null,[e(t)?(s(),f("div",ae,[n("div",{bg:"black opacity-80",class:"absolute top-0 bottom-0 left-0 right-0 -z-1",onClick:u[0]||(u[0]=v=>o())}),n("div",{class:M(["m-auto rounded-md bg-main shadow",a.class]),"dark:border":"~ main"},[L(_.$slots,"default")],2)])):i("v-if",!0)],1024))}}),ie=g(ne,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/Modal.vue"]]),re={class:"slidev-info-dialog slidev-layout flex flex-col gap-4 text-base"},de=["innerHTML"],ue=n("a",{href:"https://github.com/slidevjs/slidev",target:"_blank",class:"!opacity-100 !border-none !text-current"},[n("div",{class:"flex gap-1 children:my-auto"},[n("div",{class:"opacity-50 text-sm mr-2"},"Powered by"),n("img",{class:"w-5 h-5",src:le,alt:"Slidev logo"}),n("div",{style:{color:"#2082A6"}},[n("b",null,"Sli"),E("dev ")])])],-1),ce=h({__name:"InfoDialog",props:{modelValue:{default:!1}},emits:["update:modelValue"],setup(c,{emit:l}){const t=j(c,"modelValue",l),o=z(()=>typeof x.info=="string");return(_,u)=>(s(),r(ie,{modelValue:e(t),"onUpdate:modelValue":u[0]||(u[0]=v=>y(t)?t.value=v:null),class:"px-6 py-4"},{default:k(()=>[n("div",re,[o.value?(s(),f("div",{key:0,class:"mb-4",innerHTML:e(x).info},null,8,de)):i("v-if",!0),ue])]),_:1},8,["modelValue"]))}}),pe=g(ce,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/InfoDialog.vue"]]),me=h({__name:"Controls",setup(c){const l=b(),a=b();return(d,t)=>(s(),f($,null,[m(q,{modelValue:e(C),"onUpdate:modelValue":t[0]||(t[0]=o=>y(C)?C.value=o:null)},null,8,["modelValue"]),m(K),l.value?(s(),r(e(l),{key:0})):i("v-if",!0),a.value?(s(),r(e(a),{key:1,modelValue:e(S),"onUpdate:modelValue":t[1]||(t[1]=o=>y(S)?S.value=o:null)},null,8,["modelValue"])):i("v-if",!0),e(x).info?(s(),r(pe,{key:2,modelValue:e(D),"onUpdate:modelValue":t[2]||(t[2]=o=>y(D)?D.value=o:null)},null,8,["modelValue"])):i("v-if",!0),m(X)],64))}}),_e=g(me,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/Controls.vue"]]),ve=h({__name:"PrintStyle",setup(c){function l(a,{slots:d}){if(d.default)return F("style",d.default())}return(a,d)=>(s(),r(l,null,{default:k(()=>[E(" @page { size: "+P(e(B))+"px "+P(e(I))+"px; margin: 0px; } ",1)]),_:1}))}}),fe=g(ve,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/PrintStyle.vue"]]),ge=h({__name:"play",setup(c){Y();const{next:l,prev:a,isEmbedded:d,isPrintMode:t}=A(),{isDrawing:o}=se(),_=G();function u(p){var V;N.value||p.button===0&&((V=p.target)==null?void 0:V.id)==="slide-container"&&(p.pageX/window.innerWidth>.6?l():a())}J(_);const v=z(()=>O.value||N.value);b();const w=b();return R(()=>import("./DrawingControls-CNcDOX1a.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])).then(p=>w.value=p.default),(p,V)=>(s(),f($,null,[e(t)?(s(),r(fe,{key:0})):i("v-if",!0),n("div",{id:"page-root",ref_key:"root",ref:_,class:M(["grid",e(U)?"grid-rows-[1fr_max-content]":"grid-cols-[1fr_max-content]"])},[m(oe,{class:"w-full h-full",style:Q({background:"var(--slidev-slide-container-background, black)"}),width:e(t)?e(H).width.value:void 0,scale:e(T),"is-main":!0,onPointerdown:u,onContextmenu:e(te)},{default:k(()=>[m(Z,{"render-context":"slide"})]),controls:k(()=>[e(t)?i("v-if",!0):(s(),f("div",{key:0,class:M(["absolute bottom-0 left-0 transition duration-300 opacity-0 hover:opacity-100",[v.value?"!opacity-100 right-0":"opacity-0 p-2",e(o)?"pointer-events-none":""]])},[m(ee,{class:"m-auto",persist:v.value},null,8,["persist"])],2)),!e(x).drawings.presenterOnly&&!e(d)&&w.value?(s(),r(e(w),{key:1,class:"ml-0"})):i("v-if",!0)]),_:1},8,["style","width","scale","onContextmenu"]),i("v-if",!0)],2),e(t)?i("v-if",!0):(s(),r(_e,{key:1}))],64))}}),De=g(ge,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/pages/play.vue"]]);export{De as default};
