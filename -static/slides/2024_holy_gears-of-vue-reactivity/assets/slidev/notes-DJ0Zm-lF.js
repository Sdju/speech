import{g as B,h as U,i as V,j as D}from"../modules/unplugin-icons-CB6_PBK2.js";import{d as E,t as C,V as H,A as u,G as L,o as _,b as j,e as o,h as y,C as l,l as s,k as p,c as b,x as w,F as A}from"../modules/vue-DLh68ZqW.js";import{u as G,a as I,d as t,e as M,s as P,f as R}from"../index-CrxCzjtL.js";import{_ as q,C as J}from"./NoteDisplay.vue_vue_type_style_index_0_lang-DZxkI9oe.js";import{_ as d}from"./IconButton.vue_vue_type_script_setup_true_lang-97ts6WWU.js";import"../modules/shiki-hqeNZCiN.js";const K={class:"h-full pt-2 flex flex-col"},O={class:"flex-none border-t border-main",px3:"",py2:""},Q={class:"flex-none border-t border-main"},W={class:"flex gap-1 items-center px-6 py-3"},X={class:"p2 text-center"},ne=E({__name:"notes",setup(Y){G({title:`Notes - ${P}`});const{slides:z,total:f}=I(),{isFullscreen:m,toggle:S}=R,v=C(),n=H("slidev-notes-font-size",18),a=u(()=>{var e;return((e=t.lastUpdate)==null?void 0:e.type)==="viewer"?t.viewerPage:t.page}),x=u(()=>z.value.find(e=>e.no===a.value));L(a,()=>{var e;(e=v.value)==null||e.scrollTo({left:0,top:0,behavior:"smooth"}),window.scrollTo({left:0,top:0,behavior:"smooth"})});function $(){n.value=n.value+1}function F(){n.value=n.value-1}const k=u(()=>{var i,r;const e=((i=t.lastUpdate)==null?void 0:i.type)==="viewer"?t.viewerClicks:t.clicks,c=((r=t.lastUpdate)==null?void 0:r.type)==="viewer"?t.viewerClicksTotal:t.clicksTotal;return M(C(e),void 0,c)});return(e,c)=>{var h,g;const i=V,r=D,N=B,T=U;return _(),j(A,null,[o("div",{class:"fixed top-0 left-0 h-3px bg-primary transition-all duration-500",style:y({width:`${(a.value-1)/(l(f)-1)*100+1}%`})},null,4),o("div",K,[o("div",{ref_key:"scroller",ref:v,class:"px-5 flex-auto h-full overflow-auto",style:y({fontSize:`${l(n)}px`})},[s(q,{note:(h=x.value)==null?void 0:h.meta.slide.note,"note-html":(g=x.value)==null?void 0:g.meta.slide.noteHTML,placeholder:`No notes for Slide ${a.value}.`,"clicks-context":k.value,"auto-scroll":!0},null,8,["note","note-html","placeholder","clicks-context"])],4),o("div",O,[s(J,{"clicks-context":k.value,readonly:""},null,8,["clicks-context"])]),o("div",Q,[o("div",W,[s(d,{title:l(m)?"Close fullscreen":"Enter fullscreen",onClick:l(S)},{default:p(()=>[l(m)?(_(),b(i,{key:0})):(_(),b(r,{key:1}))]),_:1},8,["title","onClick"]),s(d,{title:"Increase font size",onClick:$},{default:p(()=>[s(N)]),_:1}),s(d,{title:"Decrease font size",onClick:F},{default:p(()=>[s(T)]),_:1}),c[0]||(c[0]=o("div",{class:"flex-auto"},null,-1)),o("div",X,w(a.value)+" / "+w(l(f)),1)])])])],64)}}});export{ne as default};
