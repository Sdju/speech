import{d,J as h,o as n,b as i,c as l,i as t,A as c,E as v,x as p,g as y,h as k}from"./modules/vue--jQnZVtx.js";import{u as w}from"./slidev/context-z35ddS6i.js";import{h as x,i as a,j as _,e as r,m,L as f,k as C,b as S,l as $,n as B}from"./modules/unplugin-icons-DuYYHIwL.js";const V={key:0,class:"inline-flex flex-row items-center gap-1"},b={key:0,class:"text-center text-shadow-xl"},z=d({__name:"gear",props:{name:{},pos:{},inline:{type:Boolean},headless:{type:Boolean}},setup(u){w();const o={ref:{class:"animate-[spin_17s_linear_infinite]",icon:x},reactive:{class:"animate-[spin_17s_linear_infinite]",icon:a},computed:{class:"animate-[spin_31s_linear_infinite]",icon:_},watch:{class:"animate-[spin_17s_linear_infinite]",icon:r},watchEffect:{class:"animate-[spin_17s_linear_infinite]",icon:m},vModel:{class:"animate-[spin_17s_linear_infinite]",icon:a},props:{class:"animate-[spin_17s_linear_infinite]",icon:f},effectScope:{class:"animate-[spin_17s_linear_infinite]",icon:r},customRef:{class:"animate-[spin_17s_linear_infinite]",icon:f},Dep:{class:"animate-[spin_11s_linear_infinite]",icon:C},Track:{class:"animate-[spin_31s_linear_infinite]",icon:a},Trigger:{class:"animate-[spin_31s_linear_infinite]",icon:_},activeSub:{class:"animate-[spin_17s_linear_infinite]",icon:m},Vue:{class:"",icon:S},VueUse:{class:"",icon:$},Pinia:{class:"",icon:B}},g=u,s=h(()=>o[g.name]??o.ref);return(e,L)=>e.inline?(n(),i("span",V,[(n(),l(c(s.value.icon),{class:t(["w-[1em] h-[1em]",s.value.class])},null,8,["class"])),v(" "+p(e.headless?"":e.name),1)])):(n(),i("div",{key:1,flex:"~ col gap-[-10px] items-stretch",style:k(e.pos?{position:"absolute",left:`${e.pos[0]}px`,top:`${e.pos[1]}px`,width:`${e.pos[2]}px`,height:`${e.pos[3]}px`}:"")},[e.headless?y("v-if",!0):(n(),i("div",b,p(e.name),1)),(n(),l(c(s.value.icon),{class:t(["w-full flex-1",s.value.class])},null,8,["class"]))],4))}});export{z as _};
