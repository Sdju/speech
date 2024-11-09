import{ag as x,ah as C,ai as z}from"../index-M9X0sFKf.js";import{d as S,K as I,M as B,o as M,c as V,F as $,aC as w,v as a,aF as f,aG as G,l as D,ae as F}from"../modules/vue-CS4oGUrH.js";import{u as E}from"./context-Cbd1vMrU.js";const L=S({__name:"VClickGap",props:{size:{type:[String,Number],default:1}},setup(d){const s=d,{$clicksContext:i}=E(),p=x();let o=+s.size;return Number.isNaN(o)&&(console.warn(`[slidev] Invalid size for VClickGap: ${s.size}`),o=1),I(()=>{const l=i.currentOffset+o-1;i.register(p,{max:l,delta:o})}),B(()=>{i.unregister(p)}),(l,r)=>(M(),V($))}}),b=["ul","ol"],R=S({props:{depth:{type:[Number,String],default:1},every:{type:[Number,String],default:1},at:{type:[Number,String],default:"+1"},hide:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},handleSpecialElements:{type:Boolean,default:!0}},render(){var g,A;const d=+this.every,s=C(this.at),i=typeof s=="string";if(!s){console.warn("[slidev] Invalid at prop for v-clicks component:",s);return}const p=w("click"),o=(n,e)=>F(n,[[p,e,"",{hide:this.hide,fade:this.fade}]]),l=n=>n.flatMap(e=>f(e)&&typeof e.type=="symbol"&&Array.isArray(e.children)?l(e.children):[e]);let r=(A=(g=this.$slots).default)==null?void 0:A.call(g);if(!r)return;r=l(z(r));const _=(n,e=1)=>l(n).map(t=>{if(!f(t))return t;if(b.includes(t.type)&&Array.isArray(t.children)){const c=u(t.children,e+1);return a(t,{},c)}return a(t)});let N=1,h=0;const u=(n,e=1)=>l(n).map(t=>{if(!f(t)||t.type===G)return t;const c=+s+Math.ceil(N++/d)-1;let m;e<+this.depth&&Array.isArray(t.children)?m=a(t,{},_(t.children,e)):m=a(t);const v=c-h;return h=c,o(m,i?v>=0?`+${v}`:`${v}`:c)}),y=()=>D(L,{size:+s+Math.ceil((N-1)/d)-1-h});if(this.handleSpecialElements){if(r.length===1&&b.includes(r[0].type)&&Array.isArray(r[0].children))return a(r[0],{},[...u(r[0].children),y()]);if(r.length===1&&r[0].type==="table"){const n=r[0];if(Array.isArray(n.children))return a(n,{},n.children.map(e=>f(e)?e.type==="tbody"&&Array.isArray(e.children)?a(e,{},[...u(e.children),y()]):a(e):e))}}return[...u(r),y()]}});export{R as _};
