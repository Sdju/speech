import{d as j,f as O,q as x,s as _,C as E,A as n,aK as p,O as w}from"./modules/vue-Q4s2-U04.js";import{u as K}from"./slidev/context-lgS2nqr9.js";import{a as P}from"./index-BbiOO84V.js";const M=j({__name:"Timeline",props:{steps:{}},setup(y){K();function k(l,a){if(a===null||typeof a!="object")return a;(l===null||typeof l!="object")&&(l={});for(const i in a)Object.prototype.hasOwnProperty.call(a,i)&&(l[i]=k(l[i],a[i]));return l}function A({steps:l}){let a=P(),i=n(()=>{const s=p(l);let u=0,t=new Set(Object.keys(s[0])),d=1+p(s).reduce((f,e)=>{var o,c;let r=((o=e.$clicks)==null?void 0:o[1])??((c=e.$clicks)==null?void 0:c[0])??e.$clicks??u++;return e.change&&Object.keys(e).forEach(b=>{t.add(b)}),Math.max(f,r)},a.clicksTotal.value);return t.delete("$clicks"),t.delete("$clicksAlias"),t.add("$stepsCount"),{maxClicks:d,keys:Array.from(t)}});const m=n(()=>{const s=i.value.maxClicks,u=p(l),t=Array.from({length:s},()=>k({},u[0]));let d=0,f={};return p(l).forEach(e=>{let r=0,o=s;e.$clicks===void 0?r=d++:typeof e.$clicks=="number"?r=e.$clicks:Array.isArray(e.$clicks)&&(r=e.$clicks[0]??0,o=e.$clicks[1]??s),e.$clicksAlias&&(Array.isArray(e.$clicksAlias)?e.$clicksAlias.forEach(c=>{f[c]=[r,o]}):f[e.$clicksAlias]=[r,o]);for(let c=r;c<o;c++)t[c]=k(t[c],e)}),{states:t,aliases:f}}),v=n(()=>m.value.aliases),$=n(()=>m.value.states[a.clicks.value]),C=[i.value.keys.map(s=>[s,n(()=>{var t;const u=(t=$.value)==null?void 0:t[s];return u===void 0&&console.warn(`Key ${s} not found in ${$.value} ${a.clicks.value}`),u})]),Object.keys(v.value).map(s=>[s,n(()=>v.value[s][a.clicks.value])]),[["$stepsCount",n(()=>m.value.states.length)]]].flat();return w(Object.fromEntries(C))}const h=A({steps:y.steps});return(l,a)=>O(l.$slots,"default",x(_(E(h))))}});export{M as _};
