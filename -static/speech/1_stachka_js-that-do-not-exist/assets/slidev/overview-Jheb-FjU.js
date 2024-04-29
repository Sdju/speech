import{d as oe,e as le,_ as se,f as ie,g as ae}from"../modules/unplugin-icons-DZA621cD.js";import{d as G,a7 as ce,a8 as re,t as I,a9 as de,D as L,C as ue,a0 as pe,n as Q,A as l,o as s,c as y,i as w,h as F,aa as me,ab as ve,b,j as fe,J as he,y as A,ac as _e,e as i,F as P,ad as U,k as H,g as T,x,l as g}from"../modules/vue-DRJy-LFx.js";import{_ as Y,c as R,u as ke,a as ge,b as be,C as O,i as xe,d as q,t as ye,g as J,e as we}from"../index-Cb-hh98z.js";import{u as Ce,S as De,D as Se,a as $e}from"./DrawingPreview-BNay2FVR.js";import{I as W}from"./IconButton-l0S1FJHm.js";import{N as Ee}from"./NoteDisplay-BmkXbYZv.js";import{C as Ne}from"./ClicksSlider-DbY_ECm9.js";import"../modules/shiki-BOfWWkK8.js";const Me=["placeholder"],He=G({__name:"NoteEditable",props:{no:{type:Number,required:!0},class:{default:""},editing:{default:!1},style:{default:()=>({})},placeholder:{default:"No notes for this slide"},clicksContext:{type:Object},autoHeight:{default:!1}},emits:["update:editing","markerDblclick","markerClick"],setup(C,{emit:j}){const m=C,v=j,c=ce(m,"editing",v,{passive:!0}),{info:D,update:k}=Ce(re(m,"no")),p=I("");let S;const{ignoreUpdates:z}=de(p,d=>{if(!c.value)return;const u=m.no;clearTimeout(S),S=setTimeout(()=>{k({note:d},u)},500)});L(()=>{var d;return(d=D.value)==null?void 0:d.note},(d="")=>{c.value||(clearTimeout(S),z(()=>{p.value=d}))},{immediate:!0,flush:"sync"});const r=I(),h=I();ue(()=>{var d;c.value&&((d=r.value)==null||d.focus())}),pe(r,()=>{c.value=!1});function B(){!m.autoHeight||!r.value||!c.value||r.value.scrollHeight>r.value.clientHeight&&(r.value.style.height=`${r.value.scrollHeight}px`)}return L([p,c],()=>{Q(()=>{B()})},{flush:"post",immediate:!0}),(d,u)=>{var $;return l(c)?me((s(),b("textarea",{key:1,ref_key:"inputEl",ref:r,"onUpdate:modelValue":u[2]||(u[2]=_=>p.value=_),class:w(["prose resize-none overflow-auto outline-none bg-transparent block border-primary border-2",m.class]),style:F([{"line-height":"1.75"},[m.style,h.value!=null?{height:`${h.value}px`}:{}]]),placeholder:C.placeholder,onKeydown:u[3]||(u[3]=fe(_=>c.value=!1,["esc"]))},null,46,Me)),[[ve,p.value]]):(s(),y(Ee,{key:0,class:w(["border-transparent border-2",[m.class,p.value?"":"opacity-25 italic select-none"]]),style:F(m.style),note:p.value||C.placeholder,"note-html":($=l(D))==null?void 0:$.noteHTML,"clicks-context":C.clicksContext,"auto-scroll":!C.autoHeight,onMarkerClick:u[0]||(u[0]=(_,E)=>v("markerClick",_,E)),onMarkerDblclick:u[1]||(u[1]=(_,E)=>v("markerDblclick",_,E))},null,8,["class","style","note","note-html","clicks-context","auto-scroll"]))}}}),Te=Y(He,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/NoteEditable.vue"]]),Ie={class:"h-screen w-screen of-hidden flex"},Be={class:"grid grid-rows-[auto_max-content] border-r border-main select-none max-h-full h-full"},Ve={class:"relative"},We={class:"absolute left-0 top-0 bottom-0 w-200 flex flex-col flex-auto items-end group p2 gap-1 max-h-full of-scroll",style:{direction:"rtl"}},je=["onClick"],ze={p2:"",border:"t main"},Ae={class:"select-none w-13 text-right my4 flex flex-col gap-1 items-end"},Oe={class:"text-3xl op20 mb2"},Fe={class:"flex flex-col gap-2 my5"},Ke=["onDblclick"],Le={class:"py3 mt-0.5 mr--8 ml--4 op0 transition group-hover:op100"},Pe={key:0,class:"select-none absolute bottom-0 right-0 bg-main rounded-tl p2 op35 text-xs"},Ue={class:"absolute top-0 right-0 px3 py1.5 border-b border-l rounded-lb bg-main border-main select-none"},Re={class:"text-xs op50"},X=450,qe=G({__name:"overview",setup(C){const j=R.titleTemplate.replace("%s",R.title||"Slidev");ke({title:`Overview - ${j}`});const{openInEditor:m,slides:v}=ge(),c=he(new Map),D=I([]),k=I(null),p=A(()=>v.value.map(t=>{var e,o;return d(((o=(e=t.meta)==null?void 0:e.slide)==null?void 0:o.note)||"")})),S=A(()=>p.value.reduce((t,e)=>t+e,0)),z=A(()=>v.value.map(t=>B(t)).reduce((t,e)=>t+e,0)),r=new WeakMap;function h(t){return r.has(t)||r.set(t,be(t,O)),r.get(t)}function B(t){var e,o;return((e=t.meta)==null?void 0:e.clicks)||((o=h(t))==null?void 0:o.total)}function d(t){var e;return((e=t.match(/[\w\d\’\'-]+/gi))==null?void 0:e.length)||0}function u(t){const e=t.getBoundingClientRect(),o=20;return e.top>=0-o&&e.left>=0-o&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)+o&&e.right<=(window.innerWidth||document.documentElement.clientWidth)+o}function $(){const t=[];Array.from(c.entries()).forEach(([e,o])=>{u(o)&&t.push(e)}),D.value=t}function _(t){const e=document.createElement("a");e.target="_blank",e.href=t,e.click()}function E(t){const e=c.get(t);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function Z(t,e,o){const N=h(o);N.current===e?N.current=O:N.current=e,t.preventDefault()}return _e(()=>{Q(()=>{$()})}),(t,e)=>{const o=oe,N=le,ee=se,te=ie,ne=ae;return s(),b("div",Ie,[i("nav",Be,[i("div",Ve,[i("div",We,[(s(!0),b(P,null,U(l(v),(n,f)=>{var M,a,V,K;return s(),b("div",{key:n.no,class:"relative",style:{direction:"ltr"}},[i("button",{class:w(["relative transition duration-300 w-8 h-8 rounded hover:bg-active hover:op100",D.value.includes(f)?"op100 text-primary bg-gray:5":"op20"]),onClick:Je=>E(f)},[i("div",null,x(f+1),1)],10,je),(a=(M=n.meta)==null?void 0:M.slide)!=null&&a.title?(s(),b("div",{key:0,class:w(["pointer-events-none select-none absolute left-110% backdrop-blur-8 top-50% translate-y--50% ws-nowrap z-10 px2 shadow-xl rounded border border-main transition duration-400 op0 group-hover:op100",D.value.includes(f)?"text-primary":"text-main important-text-op-50"])},x((K=(V=n.meta)==null?void 0:V.slide)==null?void 0:K.title),3)):T("v-if",!0)])}),128))])]),i("div",ze,[l(xe)?T("v-if",!0):(s(),y(W,{key:0,title:l(q)?"Switch to light mode theme":"Switch to dark mode theme",onClick:e[0]||(e[0]=n=>l(ye)())},{default:H(()=>[l(q)?(s(),y(o,{key:0})):(s(),y(N,{key:1}))]),_:1},8,["title"]))])]),i("main",{class:"flex-1 h-full of-auto",style:F(`grid-template-columns: repeat(auto-fit,minmax(${X}px,1fr))`),onScroll:$},[(s(!0),b(P,null,U(l(v),(n,f)=>{var M;return s(),b("div",{key:n.no,ref_for:!0,ref:a=>c.set(f,a),class:w(["relative border-t border-main of-hidden flex gap-4 min-h-50 group",f===0?"pt5":""])},[i("div",Ae,[i("div",Oe,x(f+1),1),g(W,{class:"mr--3 op0 group-hover:op80",title:"Play in new tab",onClick:a=>_(l(J)(n,!1))},{default:H(()=>[g(ee)]),_:2},1032,["onClick"]),(M=n.meta)!=null&&M.slide?(s(),y(W,{key:0,class:"mr--3 op0 group-hover:op80",title:"Open in editor",onClick:a=>l(m)(`${n.meta.slide.filepath}:${n.meta.slide.start}`)},{default:H(()=>[g(te)]),_:2},1032,["onClick"])):T("v-if",!0)]),i("div",Fe,[i("div",{class:"border rounded border-main overflow-hidden bg-main select-none h-max",onDblclick:a=>_(l(J)(n,!1))},[(s(),y($e,{key:n.no,width:X,class:"pointer-events-none important:[&_*]:select-none"},{default:H(()=>[g(De,{is:n.component,"clicks-context":h(n),class:w(l(we)(n)),route:n,"render-context":"overview"},null,8,["is","clicks-context","class","route"]),g(Se,{page:n.no},null,8,["page"])]),_:2},1024))],40,Ke),B(n)?(s(),y(Ne,{key:0,"mt-2":"","clicks-context":h(n),class:"w-full",onDblclick:a=>h(n).current=l(O)},null,8,["clicks-context","onDblclick"])):T("v-if",!0)]),i("div",Le,[g(W,{title:"Edit Note",class:w(["rounded-full w-9 h-9 text-sm",k.value===n.no?"important:op0":""]),onClick:a=>k.value=n.no},{default:H(()=>[g(ne)]),_:2},1032,["class","onClick"])]),g(Te,{no:n.no,class:"max-w-250 w-250 text-lg rounded p3","auto-height":!0,editing:k.value===n.no,"clicks-context":h(n),onDblclick:a=>k.value!==n.no?k.value=n.no:null,"onUpdate:editing":e[1]||(e[1]=a=>k.value=null),onMarkerClick:(a,V)=>Z(a,V,n)},null,8,["no","editing","clicks-context","onDblclick","onMarkerClick"]),p.value[f]>0?(s(),b("div",Pe,x(p.value[f])+" words ",1)):T("v-if",!0)],2)}),128))],36),i("div",Ue,[i("div",Re,x(l(v).length)+" slides · "+x(z.value+l(v).length-1)+" clicks · "+x(S.value)+" words ",1)])])}}}),ot=Y(qe,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/pages/overview.vue"]]);export{ot as default};
