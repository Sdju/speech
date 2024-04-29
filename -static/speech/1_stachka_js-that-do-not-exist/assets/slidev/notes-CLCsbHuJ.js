import{h as H,i as L,j as V,k as A}from"../modules/unplugin-icons-DZA621cD.js";import{d as M,t as P,Q,y as z,D as R,o as c,b as U,e as t,h as b,A as o,l as s,k as i,c as C,x as S,F as q}from"../modules/vue-DRJy-LFx.js";import{c as w,u as G,a as J,s as r,f as K,_ as O}from"../index-Cb-hh98z.js";import{N as W}from"./NoteDisplay-BmkXbYZv.js";import{I as u}from"./IconButton-l0S1FJHm.js";import"../modules/shiki-BOfWWkK8.js";const X={class:"h-full flex flex-col"},Y={class:"flex-none border-t border-main"},Z={class:"flex gap-1 items-center px-6 py-3"},ee=t("div",{class:"flex-auto"},null,-1),te={class:"p2 text-center"},oe=M({__name:"notes",setup(se){const N=w.titleTemplate.replace("%s",w.title||"Slidev");G({title:`Notes - ${N}`});const{slides:F,total:_}=J(),{isFullscreen:p,toggle:$}=K,d=P(),l=Q("slidev-notes-font-size",18),n=z(()=>{var e;return((e=r.lastUpdate)==null?void 0:e.type)==="viewer"?r.viewerPage:r.page}),a=z(()=>F.value.find(e=>e.no===n.value));R(n,()=>{var e;(e=d.value)==null||e.scrollTo({left:0,top:0,behavior:"smooth"}),window.scrollTo({left:0,top:0,behavior:"smooth"})});function B(){l.value=l.value+1}function T(){l.value=l.value-1}return(e,le)=>{var m,f,v,h,x,g,k,y;const D=V,I=A,j=H,E=L;return c(),U(q,null,[t("div",{class:"fixed top-0 left-0 h-2px bg-teal-500 transition-all duration-500",style:b({width:`${(n.value-1)/o(_)*100}%`})},null,4),t("div",X,[t("div",{ref_key:"scroller",ref:d,class:"px-5 flex-auto h-full overflow-auto",style:b({fontSize:`${o(l)}px`})},[s(W,{note:(v=(f=(m=a.value)==null?void 0:m.meta)==null?void 0:f.slide)==null?void 0:v.note,"note-html":(g=(x=(h=a.value)==null?void 0:h.meta)==null?void 0:x.slide)==null?void 0:g.noteHTML,placeholder:`No notes for Slide ${n.value}.`,"clicks-context":(y=(k=a.value)==null?void 0:k.meta)==null?void 0:y.__clicksContext,"auto-scroll":!0},null,8,["note","note-html","placeholder","clicks-context"])],4),t("div",Y,[t("div",Z,[s(u,{title:o(p)?"Close fullscreen":"Enter fullscreen",onClick:o($)},{default:i(()=>[o(p)?(c(),C(D,{key:0})):(c(),C(I,{key:1}))]),_:1},8,["title","onClick"]),s(u,{title:"Increase font size",onClick:B},{default:i(()=>[s(j)]),_:1}),s(u,{title:"Decrease font size",onClick:T},{default:i(()=>[s(E)]),_:1}),ee,t("div",te,S(n.value)+" / "+S(o(_)),1)])])])],64)}}}),_e=O(oe,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/pages/notes.vue"]]);export{_e as default};
