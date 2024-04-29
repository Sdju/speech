import{d,a9 as u,y as h,b as a,e as t,x as s,A as r,F as v,a7 as f,o as n,aa as g,l as x,g as b}from"../modules/vue-DWLVE48c.js";import{u as y,j as N,c as m,b as k}from"../index-lQ9glULa.js";import{N as w}from"./NoteDisplay-l7nocjxt.js";import"../modules/shiki-cMibciSt.js";const L={id:"page-root"},T={class:"m-4"},V={class:"mb-10"},B={class:"text-4xl font-bold mt-2"},C={class:"opacity-50"},D={class:"text-lg"},H={class:"font-bold flex gap-2"},S={class:"opacity-50"},j=t("div",{class:"flex-auto"},null,-1),A={key:0,class:"border-main mb-8"},F=d({__name:"print",setup(M){const{slides:p,total:_}=y();u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),N({title:`Notes - ${m.title}`});const i=h(()=>p.value.map(o=>{var l;return(l=o.meta)==null?void 0:l.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,l)=>(n(),a("div",L,[t("div",T,[t("div",V,[t("h1",B,s(r(m).title),1),t("div",C,s(new Date().toLocaleString()),1)]),(n(!0),a(v,null,f(i.value,(e,c)=>(n(),a("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",D,[t("div",H,[t("div",S,s(e==null?void 0:e.no)+"/"+s(r(_)),1),g(" "+s(e==null?void 0:e.title)+" ",1),j])]),x(w,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<i.value.length-1?(n(),a("hr",A)):b("v-if",!0)]))),128))])]))}}),q=k(F,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/node_modules/.pnpm/@slidev+client@0.49.0-beta.2_postcss@8.4.38_vite@5.2.8/node_modules/@slidev/client/pages/presenter/print.vue"]]);export{q as default};
