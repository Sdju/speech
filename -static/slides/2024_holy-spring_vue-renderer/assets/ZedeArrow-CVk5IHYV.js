import{d as m,y as t,o as h,b as c,e as o,A as u,h as y}from"./modules/vue-D2lcLnn_.js";import{u as f}from"./slidev/context-D39_U8h1.js";import{b as v}from"./index-uA0L1AT0.js";const _=["viewBox"],g=["id"],k=["fill"],S=["d","stroke","stroke-dasharray","marker-end"],b=m({__name:"ZedeArrow",props:{x1:{type:[Number,String],required:!0},y1:{type:[Number,String],required:!0},x2:{type:[Number,String],required:!0},y2:{type:[Number,String],required:!0},inert:{type:Boolean,required:!1},width:{type:[Number,String],required:!1},stroke:{type:String,required:!1},color:{type:String,required:!1}},setup(d){f();const e=d,i=t(()=>Math.abs(+e.x1-+e.x2)),a=t(()=>Math.abs(+e.y1-+e.y2)),n=t(()=>Math.min(+e.x1,+e.x2)),s=t(()=>Math.min(+e.y1,+e.y2)),p=t(()=>e.inert?{}:{width:i.value+10,height:a.value+10,left:`${+n.value-5}px`,top:`${+s.value-5}px`}),l=`svg-${Math.random()}`;return(r,$)=>(h(),c("svg",{class:"absolute pointer-events-none",style:y(p.value),viewBox:`0 0 ${i.value+10} ${a.value+10}`},[o("defs",null,[o("marker",{id:u(l),markerUnits:"strokeWidth",markerWidth:10,markerHeight:7,refX:"9",refY:"3.5",orient:"auto"},[o("polygon",{points:"0 0, 10 3.5, 0 7",fill:r.color||"currentColor"},null,8,k)],8,g)]),o("path",{d:`M${5+ +r.x1-n.value} ${5+ +r.y1-s.value}, L${5+ +r.x2-n.value} ${5+ +r.y2-s.value}`,stroke:r.color||"currentColor","stroke-dasharray":r.stroke==="dashed"?"5,5":"none",fill:"none","stroke-width":"1.5","marker-end":`url(#${u(l)})`},null,8,S)],12,_))}}),B=v(b,[["__file","C:/pr/my/vue/speech/2024/2_holy-spring_vue-renderer/slides/theme/components/ZedeArrow.vue"]]);export{B as _};
