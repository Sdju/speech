import{am as x,_ as S,aC as z,aD as V}from"../index-B3nmfwQ3.js";import{d as g,ac as I,C as w,o as G,c as $,F as B,az as D,v as a,aE as f,aF as M,l as F,aa as E}from"../modules/vue-DRJy-LFx.js";import{u as L}from"./context-VXnRLzRh.js";const T=g({__name:"VClickGap",props:{size:{type:[String,Number],default:1}},setup(d){const n=d,{$clicksContext:l}=L();return I(()=>{w(p=>{if(!l)return;let o=+n.size;Number.isNaN(o)&&(console.warn(`[slidev] Invalid size for VClickGap: ${n.size}`),o=1);const i=l.currentOffset+o-1,t=x();l.register(t,{max:i,delta:o}),p(()=>l.unregister(t))})}),(p,o)=>(G(),$(B))}}),j=S(T,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/builtin/VClickGap.vue"]]),b=["ul","ol"],H=g({props:{depth:{type:[Number,String],default:1},every:{type:[Number,String],default:1},at:{type:[Number,String],default:"+1"},hide:{type:Boolean,default:!1},fade:{type:Boolean,default:!1}},render(){var N,A;const d=+this.every,n=z(this.at),l=typeof n=="string";if(typeof n!="string"&&typeof n!="number"){console.warn("[slidev] Invalid at prop for v-clicks component:",n);return}const p=D("click"),o=(s,e)=>E(s,[[p,e,"",{hide:this.hide,fade:this.fade}]]),i=s=>s.flatMap(e=>f(e)&&typeof e.type=="symbol"&&Array.isArray(e.children)?i(e.children):[e]);let t=(A=(N=this.$slots).default)==null?void 0:A.call(N);if(!t)return;t=i(V(t));const k=(s,e=1)=>i(s).map(r=>{if(!f(r))return r;if(b.includes(r.type)&&Array.isArray(r.children)){const c=u(r.children,e+1);return a(r,{},c)}return a(r)});let _=1,h=0;const u=(s,e=1)=>i(s).map(r=>{if(!f(r)||r.type===M)return r;const c=+n+Math.ceil(_++/d)-1;let m;e<+this.depth&&Array.isArray(r.children)?m=a(r,{},k(r.children,e)):m=a(r);const v=c-h;return h=c,o(m,l?v>=0?`+${v}`:`${v}`:c)}),y=()=>F(j,{size:+n+Math.ceil((_-1)/d)-1-h});if(t.length===1&&b.includes(t[0].type)&&Array.isArray(t[0].children))return a(t[0],{},[...u(t[0].children),y()]);if(t.length===1&&t[0].type==="table"){const s=t[0];if(Array.isArray(s.children))return a(s,{},s.children.map(e=>f(e)?e.type==="tbody"&&Array.isArray(e.children)?a(e,{},[...u(e.children),y()]):a(e):e))}return[...u(t),y()]}});export{H as _};
