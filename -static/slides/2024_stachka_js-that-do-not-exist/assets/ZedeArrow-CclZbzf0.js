import{d as p,y as t,o as h,b as c,e as o,A as u,h as y}from"./modules/vue-j0Y6FmN0.js";import{u as f}from"./slidev/context-ByBTBn7y.js";import{_ as v}from"./index-BMedB7mq.js";const k=["viewBox"],g=["id"],_=["fill"],S=["d","stroke","stroke-dasharray","marker-end"],x=p({__name:"ZedeArrow",props:{x1:{type:[Number,String],required:!0},y1:{type:[Number,String],required:!0},x2:{type:[Number,String],required:!0},y2:{type:[Number,String],required:!0},width:{type:[Number,String],required:!1},stroke:{type:String,required:!1},color:{type:String,required:!1}},setup(d){f();const e=d,a=t(()=>Math.abs(+e.x1-+e.x2)),i=t(()=>Math.abs(+e.y1-+e.y2)),s=t(()=>Math.min(+e.x1,+e.x2)),n=t(()=>Math.min(+e.y1,+e.y2)),m=t(()=>({width:a.value+10,height:i.value+10,left:`${+s.value-5}px`,top:`${+n.value-5}px`})),l=`svg-${Math.random()}`;return(r,$)=>(h(),c("svg",{class:"absolute pointer-events-none",style:y(m.value),viewBox:`0 0 ${a.value+10} ${i.value+10}`},[o("defs",null,[o("marker",{id:u(l),markerUnits:"strokeWidth",markerWidth:10,markerHeight:7,refX:"9",refY:"3.5",orient:"auto"},[o("polygon",{points:"0 0, 10 3.5, 0 7",fill:r.color||"currentColor"},null,8,_)],8,g)]),o("path",{d:`M${5+ +r.x1-s.value} ${5+ +r.y1-n.value}, L${5+ +r.x2-s.value} ${5+ +r.y2-n.value}`,stroke:r.color||"currentColor","stroke-dasharray":r.stroke==="dashed"?"5,5":"none",fill:"none","stroke-width":"1.5","marker-end":`url(#${u(l)})`},null,8,S)],12,k))}}),M=v(x,[["__file","C:/pr/my/vue/speech/2024/1_stachka_js-that-do-not-exist/components/ZedeArrow.vue"]]);export{M as Z};