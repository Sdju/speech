import{E as A,F as B}from"../modules/unplugin-icons-DADCGqEf.js";import{d as E,t as L,aB as I,C as _,ac as N,y as v,aC as q,o as c,b as y,f as V,A as u,c as C,g as $,i as D,h as M}from"../modules/vue-CEhIG5sE.js";import{c as k,ar as z,au as R,as as U,_ as W}from"../index-CZgpy1Dd.js";import{u as j}from"./context-BbEXxekT.js";const F=["title"],K=E({__name:"CodeBlockWrapper",props:{ranges:{type:Array,default:()=>[]},finally:{type:[String,Number],default:"last"},startLine:{type:Number,default:1},lines:{type:Boolean,default:k.lineNumbers},at:{type:[String,Number],default:"+1"},maxHeight:{type:String,default:void 0}},setup(b){const e=b,{$clicksContext:a}=j(),s=L(),d=z();I(()=>{a.unregister(d)}),_(()=>{var t;(t=s.value)==null||t.classList.toggle("slidev-code-line-numbers",e.lines)}),N(()=>{var i;if(!a||!((i=e.ranges)!=null&&i.length))return;const t=a.calculateSince(e.at,e.ranges.length-1);a.register(d,t);const o=v(()=>Math.max(0,a.current-t.start+1)),n=v(()=>e.finally==="last"?e.ranges.at(-1):e.finally.toString());_(()=>{if(!s.value)return;let r=e.ranges[o.value]??n.value;const h=r==="hide";s.value.classList.toggle(R,h),h&&(r=e.ranges[o.value+1]??n.value);const g=s.value.querySelector(".shiki"),m=Array.from(g.querySelectorAll("code > .line")),H=m.length;if(U(r,H,e.startLine,l=>[m[l]]),e.maxHeight){const l=Array.from(g.querySelectorAll(".line.highlighted"));l.reduce((f,w)=>w.offsetHeight+f,0)>s.value.offsetHeight?l[0].scrollIntoView({behavior:"smooth",block:"start"}):l.length>0&&l[Math.round((l.length-1)/2)].scrollIntoView({behavior:"smooth",block:"center"})}})});const{copied:p,copy:S}=q();function x(){var o,n;const t=(n=(o=s.value)==null?void 0:o.querySelector(".slidev-code"))==null?void 0:n.textContent;t&&S(t)}return(t,o)=>{const n=A,i=B;return c(),y("div",{ref_key:"el",ref:s,class:D(["slidev-code-wrapper relative group",{"slidev-code-line-numbers":e.lines}]),style:M({"max-height":e.maxHeight,"overflow-y":e.maxHeight?"scroll":void 0,"--start":e.startLine})},[V(t.$slots,"default"),u(k).codeCopy?(c(),y("button",{key:0,class:"slidev-code-copy absolute top-0 right-0 transition opacity-0 group-hover:opacity-20 hover:!opacity-100",title:u(p)?"Copied":"Copy",onClick:o[0]||(o[0]=r=>x())},[u(p)?(c(),C(n,{key:0,class:"p-2 w-8 h-8"})):(c(),C(i,{key:1,class:"p-2 w-8 h-8"}))],8,F)):$("v-if",!0)],6)}}}),T=W(K,[["__file","C:/Users/DChernov/home/pr/test/speech/2024/3_msk-vuejs_50-shades-of-vue-reactivity/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/builtin/CodeBlockWrapper.vue"]]);export{T as _};
