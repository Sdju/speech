import{P as w,Q as A}from"../modules/unplugin-icons-CruXoHwn.js";import{d as I,t as B,M as E,D as y,K as N,z as v,aH as M,o as c,b as _,f as q,B as u,c as C,g as V,i as z,h as D}from"../modules/vue-CS4oGUrH.js";import{v as k,ag as K,C as $,al as R,ak as P}from"../index-4RptTZTa.js";import{u as Q}from"./context-D4G9Yz98.js";const U=["title"],J=I({__name:"CodeBlockWrapper",props:{ranges:{type:Array,default:()=>[]},finally:{type:[String,Number],default:"last"},startLine:{type:Number,default:1},lines:{type:Boolean,default:k.lineNumbers},at:{type:[String,Number],default:"+1"},maxHeight:{type:String,default:void 0}},setup(S){const e=S,{$clicksContext:a}=Q(),s=B(),d=K();E(()=>{a.unregister(d)}),y(()=>{var t;(t=s.value)==null||t.classList.toggle("slidev-code-line-numbers",e.lines)}),N(()=>{var r;if(!a||!((r=e.ranges)!=null&&r.length))return;const t=a.calculateSince(e.at,e.ranges.length-1);a.register(d,t);const o=v(()=>t?Math.max(0,a.current-t.start+1):$),l=v(()=>e.finally==="last"?e.ranges.at(-1):e.finally.toString());y(()=>{if(!s.value)return;let i=e.ranges[o.value]??l.value;const g=i==="hide";s.value.classList.toggle(R,g),g&&(i=e.ranges[o.value+1]??l.value);const h=s.value.querySelector(".shiki"),f=Array.from(h.querySelectorAll("code > .line")),H=f.length;if(P(i,H,e.startLine,n=>[f[n]]),e.maxHeight){const n=Array.from(h.querySelectorAll(".line.highlighted"));n.reduce((m,L)=>L.offsetHeight+m,0)>s.value.offsetHeight?n[0].scrollIntoView({behavior:"smooth",block:"start"}):n.length>0&&n[Math.round((n.length-1)/2)].scrollIntoView({behavior:"smooth",block:"center"})}})});const{copied:p,copy:b}=M();function x(){var o,l;const t=(l=(o=s.value)==null?void 0:o.querySelector(".slidev-code"))==null?void 0:l.textContent;t&&b(t)}return(t,o)=>{const l=w,r=A;return c(),_("div",{ref_key:"el",ref:s,class:z(["slidev-code-wrapper relative group",{"slidev-code-line-numbers":e.lines}]),style:D({"max-height":e.maxHeight,"overflow-y":e.maxHeight?"scroll":void 0,"--start":e.startLine})},[q(t.$slots,"default"),u(k).codeCopy?(c(),_("button",{key:0,class:"slidev-code-copy absolute top-0 right-0 transition opacity-0 group-hover:opacity-20 hover:!opacity-100",title:u(p)?"Copied":"Copy",onClick:o[0]||(o[0]=i=>x())},[u(p)?(c(),C(l,{key:0,class:"p-2 w-8 h-8"})):(c(),C(r,{key:1,class:"p-2 w-8 h-8"}))],8,U)):V("v-if",!0)],6)}}});export{J as _};
