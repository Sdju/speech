import{d as v,aL as $,A as u,o as r,b as o,e as k,l as i,k as c,f as l,x as d,ar as x,i as p,F as m,ah as _,h as L,ab as h,g as B,at as C}from"./modules/vue-Q4s2-U04.js";import{u as N}from"./slidev/context-lgS2nqr9.js";import{t as S}from"./bundle-mjs-Dnoi3Axr.js";import{_ as T}from"./index-BbiOO84V.js";const V=v({__name:"node",props:{color:{default:"green"},form:{default:"rect"},inject:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},title:{}},setup(a){N();const f={green:{color:"bg-green/40 b-green c-green"},blue:{color:"bg-blue/40 b-blue c-blue"},red:{color:"bg-red/40 b-red c-red"},orange:{color:"bg-orange/40 b-orange c-orange"},purple:{color:"bg-purple/40 b-purple c-purple"}},g={circle:"rounded-[50%] px-4 py-2",rect:"rounded-[8px] px-4 py-2"},b=$(),s=u(()=>[S("fx b-1 grid place-items-center text-xl font-bold duration-200",f[a.color].color,g[a.form],b.class),{$obj:!a.inject}]),y=u(()=>Array.from({length:5},(e,t)=>({marginLeft:`${(t+1)*7}px`,marginTop:`-${(t+1)*7}px`,opacity:.5**(t+1),transitionDelay:`${t*100}ms`})));return(e,t)=>(r(),o(m,null,[k("div",{class:p(s.value)},[i(x,{name:"title",mode:"out-in"},{default:c(()=>[e.$slots.default?l(e.$slots,"default",{key:0},()=>[l(e.$slots,"default",{},void 0,!0)],!0):(r(),o("span",{key:e.title},d(e.title),1))]),_:3})],2),i(C,{name:"multiple"},{default:c(()=>[e.multiple?(r(!0),o(m,{key:0},_(y.value,n=>(r(),o("div",{key:n.marginLeft,class:p(s.value),style:L(n)},[l(e.$slots,"default",{},()=>[h(d(e.title),1)],!0)],6))),128)):B("v-if",!0)]),_:3})],64))}}),D=T(V,[["__scopeId","data-v-69b20066"]]);export{D as _};