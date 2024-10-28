import{Y as te,Z as ne,J as oe,$ as le}from"../modules/unplugin-icons-DuYYHIwL.js";import{d as Z,T as ie,M as se,t as T,U as ae,R as j,H as ce,V as re,n as G,D as c,o as i,c as k,i as S,h as K,C as ue,W as de,b as x,j as me,P as pe,J as z,X as ve,I as fe,e as a,F as q,Y as J,k as N,x as w,g as V,l as C}from"../modules/vue--jQnZVtx.js";import{l as he,k as ge,o as ke,q as _e,C as X,r as be,t as A,v as xe,w as Y,x as ye}from"../index-BMB48uBV.js";import{_ as we,C as Ce}from"./NoteDisplay.vue_vue_type_style_index_0_lang-C42x22Cu.js";import{a as De,S as $e,_ as Fe,b as Se}from"../SlideWrapper-PUBEzRou.js";import{_ as W}from"./IconButton.vue_vue_type_script_setup_true_lang-B-DibdWb.js";import"../modules/shiki-Bv45gz0-.js";import"./context-z35ddS6i.js";import"../bundle-mjs-Dnoi3Axr.js";import"../modules/file-saver-B315z_Em.js";const Ee=["placeholder"],Me=Z({__name:"NoteEditable",props:{no:{type:Number,required:!0},class:{default:""},editing:{default:!1},style:{default:()=>({})},placeholder:{default:"No notes for this slide"},clicksContext:{type:Object},highlight:{default:!0},autoHeight:{default:!1}},emits:["update:editing","markerDblclick","markerClick"],setup(D,{emit:P}){const l=D,y=P,r=ie(l,"editing",y,{passive:!0}),{info:h,update:$}=De(se(l,"no")),p=T("");let E;const{ignoreUpdates:_}=ae(p,s=>{if(!r.value)return;const m=l.no;clearTimeout(E),E=setTimeout(()=>{$({note:s},m)},500)});j(()=>{var s;return(s=h.value)==null?void 0:s.note},(s="")=>{r.value||(clearTimeout(E),_(()=>{p.value=s}))},{immediate:!0,flush:"sync"});const d=T(),b=T();ce(()=>{var s;r.value&&((s=d.value)==null||s.focus())}),re(d,()=>{r.value=!1});function B(){!l.autoHeight||!d.value||!r.value||d.value.scrollHeight>d.value.clientHeight&&(d.value.style.height=`${d.value.scrollHeight}px`)}function R(s){r.value&&s.metaKey&&s.key==="s"&&(s.preventDefault(),$({note:p.value},l.no))}return j([p,r],()=>{G(()=>{B()})},{flush:"post",immediate:!0}),(s,m)=>{var M;return c(r)?ue((i(),x("textarea",{key:1,ref_key:"inputEl",ref:d,"onUpdate:modelValue":m[2]||(m[2]=g=>p.value=g),class:S(["prose resize-none overflow-auto outline-none bg-transparent block border-primary border-2",l.class]),style:K([{"line-height":"1.75"},[l.style,b.value!=null?{height:`${b.value}px`}:{}]]),placeholder:D.placeholder,onKeydown:[m[3]||(m[3]=me(g=>r.value=!1,["esc"])),R]},null,46,Ee)),[[de,p.value]]):(i(),k(we,{key:0,class:S(["border-transparent border-2",[l.class,p.value?"":"opacity-25 italic select-none"]]),style:K(l.style),note:p.value||D.placeholder,"note-html":(M=c(h))==null?void 0:M.noteHTML,"clicks-context":D.clicksContext,"auto-scroll":!D.autoHeight,highlight:l.highlight,onMarkerClick:m[0]||(m[0]=(g,H)=>y("markerClick",g,H)),onMarkerDblclick:m[1]||(m[1]=(g,H)=>y("markerDblclick",g,H))},null,8,["class","style","note","note-html","clicks-context","auto-scroll","highlight"]))}}}),He={class:"h-screen w-screen of-hidden flex"},Ne={class:"grid grid-rows-[auto_max-content] border-r border-main select-none max-h-full h-full"},Te={class:"relative"},Be={class:"absolute left-0 top-0 bottom-0 w-200 flex flex-col flex-auto items-end group p2 gap-1 max-h-full of-x-visible of-y-auto",style:{direction:"rtl"}},Ie=["onClick"],Ve={p2:"",border:"t main"},Ae={class:"select-none w-13 text-right my4 flex flex-col gap-1 items-end"},We={class:"text-3xl op20 mb2"},Ke=["onDblclick"],Re={class:"py3 mt-0.5 mr--8 ml--4 op0 transition group-hover:op100"},ze={key:0,class:"select-none absolute bottom-0 right-0 bg-main rounded-tl p2 op35 text-xs"},Le={class:"absolute top-0 right-0 px3 py1.5 border-b border-l rounded-lb bg-main border-main select-none"},Pe={class:"text-xs op50"},L=450,tt=Z({__name:"overview",setup(D){he({title:`Overview - ${ke}`});const{openInEditor:P,slides:l}=ge(),y=pe(new Map),r=T([]),h=T(null),$=z(()=>l.value.map(t=>{var e,o;return s(((o=(e=t.meta)==null?void 0:e.slide)==null?void 0:o.note)||"")})),p=z(()=>$.value.reduce((t,e)=>t+e,0)),E=z(()=>l.value.map(t=>B(t)).reduce((t,e)=>t+e,0)),_=ve(),d=new WeakMap;function b(t){return d.has(t)||d.set(t,_e(t,X)),d.get(t)}function B(t){var e,o;return((e=t.meta)==null?void 0:e.clicks)||((o=b(t))==null?void 0:o.total)}function R(t){_.value===t?_.value=void 0:_.value=t}function s(t){const e=/[\w`'\-\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g,o=t.match(e);let v=0;if(!o)return 0;for(let F=0;F<o.length;F++)o[F].charCodeAt(0)>=19968?v+=o[F].length:v+=1;return v}function m(t){const e=t.getBoundingClientRect(),o=20;return e.top>=0-o&&e.left>=0-o&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)+o&&e.right<=(window.innerWidth||document.documentElement.clientWidth)+o}function M(){const t=[];Array.from(y.entries()).forEach(([e,o])=>{m(o)&&t.push(e)}),r.value=t}function g(t){const e=document.createElement("a");e.target="_blank",e.href=ye+t.slice(1),e.click()}function H(t){const e=y.get(t);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function Q(t,e,o){const v=b(o);v.current===e?v.current=X:v.current=e,t.preventDefault()}return fe(()=>{G(()=>{M()})}),(t,e)=>{const o=te,v=ne,F=oe,ee=le;return i(),x("div",He,[a("nav",Ne,[a("div",Te,[a("div",Be,[(i(!0),x(q,null,J(c(l),(n,f)=>{var u,I,U,O;return i(),x("div",{key:n.no,class:"relative",style:{direction:"ltr"}},[a("button",{class:S(["relative transition duration-300 w-8 h-8 rounded hover:bg-active hover:op100",r.value.includes(f)?"op100 text-primary bg-gray:5":"op20"]),onClick:Ue=>H(f)},[a("div",null,w(f+1),1)],10,Ie),(I=(u=n.meta)==null?void 0:u.slide)!=null&&I.title?(i(),x("div",{key:0,class:S(["pointer-events-none select-none absolute left-110% backdrop-blur-8 top-50% translate-y--50% ws-nowrap z-10 px2 shadow-xl rounded border border-main transition duration-400 op0 group-hover:op100",r.value.includes(f)?"text-primary":"text-main important-text-op-50"])},w((O=(U=n.meta)==null?void 0:U.slide)==null?void 0:O.title),3)):V("v-if",!0)])}),128))])]),a("div",Ve,[c(be)?(i(),k(W,{key:1,title:c(A)?"Dark mode":"Light mode","pointer-events-none":"",op50:""},{default:N(()=>[c(A)?(i(),k(o,{key:0})):(i(),k(v,{key:1}))]),_:1},8,["title"])):(i(),k(W,{key:0,title:c(A)?"Switch to light mode theme":"Switch to dark mode theme",onClick:e[0]||(e[0]=n=>c(xe)())},{default:N(()=>[c(A)?(i(),k(o,{key:0})):(i(),k(v,{key:1}))]),_:1},8,["title"]))])]),a("main",{class:"flex-1 h-full of-auto",style:K(`grid-template-columns: repeat(auto-fit,minmax(${L}px,1fr))`),onScroll:M},[(i(!0),x(q,null,J(c(l),(n,f)=>(i(),x("div",{key:n.no,ref_for:!0,ref:u=>y.set(f,u),class:S(["relative border-t border-main of-hidden flex gap-4 min-h-50 group",f===0?"pt5":""])},[a("div",Ae,[a("div",We,w(f+1),1),C(W,{class:"mr--3 op0 group-hover:op80",title:"Play in new tab",onClick:u=>g(c(Y)(n,!1))},{default:N(()=>[C(F)]),_:2},1032,["onClick"]),V("v-if",!0)]),a("div",{class:"flex flex-col gap-2 my5",style:K({width:`${L}px`})},[a("div",{class:"border rounded border-main overflow-hidden bg-main select-none h-max",onDblclick:u=>g(c(Y)(n,!1))},[(i(),k(Se,{key:n.no,width:L,class:"pointer-events-none important:[&_*]:select-none"},{default:N(()=>[C($e,{"clicks-context":b(n),route:n,"render-context":"overview"},null,8,["clicks-context","route"]),C(Fe,{page:n.no},null,8,["page"])]),_:2},1024))],40,Ke),B(n)?(i(),k(Ce,{key:0,active:_.value===n,"clicks-context":b(n),class:"w-full mt-2",onDblclick:u=>R(n),onClick:u=>_.value=n},null,8,["active","clicks-context","onDblclick","onClick"])):V("v-if",!0)],4),a("div",Re,[C(W,{title:"Edit Note",class:S(["rounded-full w-9 h-9 text-sm",h.value===n.no?"important:op0":""]),onClick:u=>h.value=n.no},{default:N(()=>[C(ee)]),_:2},1032,["class","onClick"])]),C(Me,{no:n.no,class:"max-w-250 w-250 text-lg rounded p3","auto-height":!0,highlight:_.value===n,editing:h.value===n.no,"clicks-context":b(n),onDblclick:u=>h.value!==n.no?h.value=n.no:null,"onUpdate:editing":e[1]||(e[1]=u=>h.value=null),onMarkerClick:(u,I)=>Q(u,I,n)},null,8,["no","highlight","editing","clicks-context","onDblclick","onMarkerClick"]),$.value[f]>0?(i(),x("div",ze,w($.value[f])+" words ",1)):V("v-if",!0)],2))),128))],36),a("div",Le,[a("div",Pe,w(c(l).length)+" slides · "+w(E.value+c(l).length-1)+" clicks · "+w(p.value)+" words ",1)])])}}});export{tt as default};
