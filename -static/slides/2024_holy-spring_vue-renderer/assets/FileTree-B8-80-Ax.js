import{d as L,y as n,o as c,b as d,e as T,F as x,a7 as V,i as B,h as E,c as w,an as I,aa as N,x as S,g as o}from"./modules/vue-D2lcLnn_.js";import{u as j}from"./slidev/context-D39_U8h1.js";import{G as q,T as z,V as A}from"./modules/unplugin-icons-CF1HqLX2.js";import{b as D}from"./index-uA0L1AT0.js";const $={class:"bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-2 text-xs line-height-[150%] c-[#CCC]"},G=L({__name:"FileTree",props:{files:{type:Array,required:!0},classes:{type:Object,required:!1}},setup(f){j();const _={folder:q,typescript:z,vue:A},l=f;function g(e){const a={},t=[];e.forEach(i=>{let r=t,s="";const v=i.name.split("/");v.slice(0,-1).forEach(h=>{if(s+=`/${h}`,!a[s]){const y={type:"folder",id:s,name:h,content:[]};a[s]=y,r.push(y)}r=a[s].content});const p={...i,id:i.name,name:v.at(-1)};a[p.id]=p,r.push(p)});const u=[],m=(i,r=0)=>i.forEach(s=>{u.push({...s,level:r}),s.type==="folder"&&s.content&&m(s.content,r+1)});return m(t,0),u}const b=n(()=>{var e;return((e=l.classes)==null?void 0:e.highlighted)||"c-white"}),C=n(()=>{var e;return((e=l.classes)==null?void 0:e.default)||"opacity-80"}),k=n(()=>g(l.files)),F=n(()=>k.value.map(e=>({icon:_[e.type],title:e.name,id:e.id,style:{paddingLeft:`${19*e.level}px`},class:e.highlighted?b.value:C.value})));return(e,a)=>(c(),d(x,null,[T("div",$,[(c(!0),d(x,null,V(F.value,t=>(c(),d("div",{key:t.id,class:B(t.class),style:E(t.style)},[(c(),w(I(t.icon),{mr:"2px"})),N(" "+S(t.title),1)],6))),128))]),o('  <div class="bg-[var(&#45;&#45;slidev-code-background)] my-[4px] rd-[4px] p-2 text-xs line-height-[150%] c-[#CCC]">'),o('    <div opacity-80><ph-folder-simple-duotone mr="2px"/> src</div>'),o('    <div opacity-80 class="blur-[1px]"><ph-folder-simple-duotone mr="2px" ml-5 /> assets</div>'),o('    <div opacity-80><ph-folder-simple-duotone mr="2px" ml-5 /> renderer</div>'),o('    <div c-white><tabler-brand-typescript mr="2px" ml-10 /> index.ts</div>'),o('    <div opacity-80 class="blur-[1px]"><uim-vuejs mr="2px" ml-5 /> App.vue</div>'),o('    <div opacity-80 class="blur-[1px]"><tabler-brand-typescript mr="2px" ml-5 /> main.ts</div>'),o("  </div>")],2112))}}),M=D(G,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/components/FileTree.vue"]]);export{M as _};