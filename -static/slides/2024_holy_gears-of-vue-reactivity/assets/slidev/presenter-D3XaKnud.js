import{g as V,h as W,k as j,l as H}from"../modules/unplugin-icons-DB9XkFc3.js";import{d as B,o as n,c,i as M,C as e,t as $,A as b,G as z,P as q,L as A,O,ai as J,a6 as K,b as k,e as t,l as o,k as g,h as N,g as Q,x as U,F as X}from"../modules/vue-Q4s2-U04.js";import{a as Y,u as Z,h as ee,c as te,d as se,j as oe,s as ne,k as ae,l as re,m as le,n as ie,o as ce,_ as ue}from"../index-BbiOO84V.js";import{b as de,c as me,a as F,S as pe}from"../SlideWrapper-DWQw1t-t.js";import{r as _e,u as fe,a as xe,S as ve,_ as ke,G as ge,b as ye,c as be,o as Ce}from"./shortcuts-Cu2EPynh.js";import{_ as he,C as we}from"./NoteDisplay.vue_vue_type_style_index_0_lang-um8RbidQ.js";import{_ as Se}from"./DrawingControls.vue_vue_type_style_index_0_lang-BrWgkY7m.js";import{_ as P}from"./IconButton.vue_vue_type_script_setup_true_lang-8v733tQF.js";import"../modules/shiki-D5mv3H49.js";import"./context-lgS2nqr9.js";import"../bundle-mjs-Dnoi3Axr.js";import"../modules/file-saver-igGfcqei.js";const $e=B({__name:"NoteStatic",props:{no:{},class:{},clicksContext:{}},setup(C){const i=C,{info:l}=de(i.no);return(u,p)=>{var _,f;return n(),c(he,{class:M(i.class),note:(_=e(l))==null?void 0:_.note,"note-html":(f=e(l))==null?void 0:f.noteHTML,"clicks-context":u.clicksContext},null,8,["class","note","note-html","clicks-context"])}}}),ze={class:"bg-main h-full slidev-presenter"},Ne={class:"relative grid-section next flex flex-col p-2 lg:p-4"},Fe={key:1,class:"h-full flex justify-center items-center"},Pe={key:0,class:"grid-section note of-auto"},Be={key:1,class:"grid-section note grid grid-rows-[1fr_min-content] overflow-hidden"},Me={class:"border-t border-main py-1 px-2 text-sm"},De={class:"grid-section bottom flex"},Ee={class:"text-2xl pl-2 pr-6 my-auto tabular-nums"},Le={class:"progress-bar"},Re=B({__name:"presenter",setup(C){const i=$();_e(),fe(i),xe();const{clicksContext:l,currentSlideNo:u,currentSlideRoute:p,hasNext:_,nextRoute:f,slides:D,getPrimaryClicks:E,total:L}=Y(),{isDrawing:R}=me();Z({title:`Presenter - ${ne}`}),$(!1);const{timer:T,resetTimer:h}=ee(),G=b(()=>D.value.map(v=>te(v))),a=b(()=>l.value.current<l.value.total?[p.value,l.value.current+1]:_.value?[f.value,0]:null),x=b(()=>a.value&&G.value[a.value[0].no-1]);z(a,()=>{x.value&&a.value&&(x.value.current=a.value[1])},{immediate:!0});const w=q();return A(()=>{const v=i.value.querySelector("#slide-content"),s=O(J()),y=K();z(()=>{if(!y.value||R.value||!oe.value)return;const r=v.getBoundingClientRect(),d=(s.x-r.left)/r.width*100,m=(s.y-r.top)/r.height*100;if(!(d<0||d>100||m<0||m>100))return{x:d,y:m}},r=>{se.cursor=r})}),(v,s)=>{var S;const y=V,r=W,d=j,m=H;return n(),k(X,null,[t("div",ze,[t("div",{class:M(["grid-container",`layout${e(ae)}`])},[t("div",{ref_key:"main",ref:i,class:"relative grid-section main flex flex-col"},[o(F,{key:"main",class:"p-2 lg:p-4 flex-auto","is-main":"",onContextmenu:e(Ce)},{default:g(()=>[o(ve,{"render-context":"presenter"})]),_:1},8,["onContextmenu"]),(n(),c(we,{key:(S=e(p))==null?void 0:S.no,"clicks-context":e(E)(e(p)),class:"w-full pb2 px4 flex-none"},null,8,["clicks-context"])),s[3]||(s[3]=t("div",{class:"absolute left-0 top-0 bg-main border-b border-r border-main px2 py1 op50 text-sm"}," Current ",-1))],512),t("div",Ne,[a.value&&x.value?(n(),c(F,{key:"next"},{default:g(()=>[(n(),c(pe,{key:a.value[0].no,"clicks-context":x.value,route:a.value[0],"render-context":"previewNext"},null,8,["clicks-context","route"]))]),_:1})):(n(),k("div",Fe,s[4]||(s[4]=[t("div",{class:"text-gray-500"}," End of the presentation ",-1)]))),s[5]||(s[5]=t("div",{class:"absolute left-0 top-0 bg-main border-b border-r border-main px2 py1 op50 text-sm"}," Next ",-1))]),w.value&&e(re)?(n(),k("div",Pe,[o(e(w))])):(n(),k("div",Be,[(n(),c($e,{key:`static-${e(u)}`,no:e(u),class:"w-full max-w-full h-full overflow-auto p-2 lg:p-4",style:N({fontSize:`${e(le)}em`}),"clicks-context":e(l)},null,8,["no","style","clicks-context"])),t("div",Me,[o(P,{title:"Increase font size",onClick:e(ie)},{default:g(()=>[o(y)]),_:1},8,["onClick"]),o(P,{title:"Decrease font size",onClick:e(ce)},{default:g(()=>[o(r)]),_:1},8,["onClick"]),Q("v-if",!0)])])),t("div",De,[o(ke,{persist:!0}),s[6]||(s[6]=t("div",{"flex-auto":""},null,-1)),t("div",{class:"timer-btn my-auto relative w-22px h-22px cursor-pointer text-lg",opacity:"50 hover:100",onClick:s[2]||(s[2]=(...I)=>e(h)&&e(h)(...I))},[o(d,{class:"absolute"}),o(m,{class:"absolute opacity-0"})]),t("div",Ee,U(e(T)),1)]),(n(),c(Se,{key:2}))],2),t("div",Le,[t("div",{class:"progress h-3px bg-primary transition-all",style:N({width:`${(e(u)-1)/(e(L)-1)*100+1}%`})},null,4)])]),o(ge),o(ye),o(be)],64)}}}),Qe=ue(Re,[["__scopeId","data-v-c6857adc"]]);export{Qe as default};
