import{d as N,y as q,t as M,D as H,n as B,a8 as T,b as f,i as m,e as L,x as b,o as d}from"../modules/vue-D2lcLnn_.js";import{C as w,b as $}from"../index-BzHxaLMT.js";const I=["innerHTML"],P=["textContent"],K=["textContent"],k="slidev-note-fade",r="slidev-note-click-mark",R=N({__name:"NoteDisplay",props:{class:{type:String,required:!1},noteHtml:{type:String,required:!1},note:{type:String,required:!1},placeholder:{type:String,required:!1},clicksContext:{type:null,required:!1},autoScroll:{type:Boolean,required:!1}},emits:["markerDblclick","markerClick"],setup(A,{emit:D}){const l=A,v=D,y=q(()=>{var o,n;return((o=l.clicksContext)==null?void 0:o.current)!=null&&((n=l.noteHtml)==null?void 0:n.includes("slidev-note-click-mark"))}),a=M(null);function h(){var S;if(!a.value||!y.value)return;const o=Array.from(a.value.querySelectorAll(`.${r}`)),n=+(((S=l.clicksContext)==null?void 0:S.current)??w),c=n<0||n>=w,g=new Set;function C(e){!e||e===a.value||(g.add(e),e.parentElement&&C(e.parentElement))}const _=new Map;for(const e of o){const t=e.parentElement,s=Number(e.dataset.clicks);_.set(s,e),C(t),Array.from(t.childNodes).forEach(p=>{if(p.nodeType===3){const x=document.createElement("span");x.textContent=p.textContent,t.insertBefore(x,p),p.remove()}})}const E=Array.from(a.value.querySelectorAll("*"));let i=0;const u=new Map;for(const e of E)u.has(i)||u.set(i,[]),u.get(i).push(e),e.classList.contains(r)&&(i=Number(e.dataset.clicks)||i+1);for(const[e,t]of u)c?t.forEach(s=>s.classList.remove(k)):t.forEach(s=>s.classList.toggle(k,g.has(s)?!1:e!==n));for(const[e,t]of _)t.classList.remove(k),t.classList.toggle(`${r}-past`,c?!1:e<n),t.classList.toggle(`${r}-active`,c?!1:e===n),t.classList.toggle(`${r}-next`,c?!1:e===n+1),t.classList.toggle(`${r}-future`,c?!1:e>n+1),t.ondblclick=s=>{v("markerDblclick",s,e),!s.defaultPrevented&&(l.clicksContext.current=e,s.stopPropagation(),s.stopImmediatePropagation())},t.onclick=s=>{v("markerClick",s,e)},l.autoScroll&&e===n&&t.scrollIntoView({block:"center",behavior:"smooth"})}return H(()=>{var o;return[l.noteHtml,(o=l.clicksContext)==null?void 0:o.current]},()=>{B(()=>{h()})},{immediate:!0}),T(()=>{h()}),(o,n)=>o.noteHtml?(d(),f("div",{key:0,ref_key:"noteDisplay",ref:a,class:m(["prose overflow-auto outline-none slidev-note",[l.class,y.value?"slidev-note-with-clicks":""]]),innerHTML:o.noteHtml},null,10,I)):o.note?(d(),f("div",{key:1,class:m(["prose overflow-auto outline-none slidev-note",l.class])},[L("p",{textContent:b(o.note)},null,8,P)],2)):(d(),f("div",{key:2,class:m(["prose overflow-auto outline-none opacity-50 italic select-none slidev-note",l.class])},[L("p",{textContent:b(l.placeholder||"No notes.")},null,8,K)],2))}}),F=$(R,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/internals/NoteDisplay.vue"]]);export{F as N};
