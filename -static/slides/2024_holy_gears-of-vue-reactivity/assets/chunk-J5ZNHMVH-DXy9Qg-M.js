import{b as o,r as c,a as n,o as x}from"./Mermaid.vue_vue_type_script_setup_true_lang-DK-itLRO.js";var l=o(c()),d=n((a,t)=>{const r=a.append("rect");if(r.attr("x",t.x),r.attr("y",t.y),r.attr("fill",t.fill),r.attr("stroke",t.stroke),r.attr("width",t.width),r.attr("height",t.height),t.name&&r.attr("name",t.name),t.rx&&r.attr("rx",t.rx),t.ry&&r.attr("ry",t.ry),t.attrs!==void 0)for(const e in t.attrs)r.attr(e,t.attrs[e]);return t.class&&r.attr("class",t.class),r},"drawRect"),m=n((a,t)=>{const r={x:t.startx,y:t.starty,width:t.stopx-t.startx,height:t.stopy-t.starty,fill:t.fill,stroke:t.stroke,class:"rect"};d(a,r).lower()},"drawBackgroundRect"),h=n((a,t)=>{const r=t.text.replace(x," "),e=a.append("text");e.attr("x",t.x),e.attr("y",t.y),e.attr("class","legend"),e.style("text-anchor",t.anchor),t.class&&e.attr("class",t.class);const s=e.append("tspan");return s.attr("x",t.x+t.textMargin*2),s.text(r),e},"drawText"),y=n((a,t,r,e)=>{const s=a.append("image");s.attr("x",t),s.attr("y",r);const i=(0,l.sanitizeUrl)(e);s.attr("xlink:href",i)},"drawImage"),p=n((a,t,r,e)=>{const s=a.append("use");s.attr("x",t),s.attr("y",r);const i=(0,l.sanitizeUrl)(e);s.attr("xlink:href",`#${i}`)},"drawEmbeddedImage"),f=n(()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),"getNoteRect"),w=n(()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0}),"getTextObj");export{w as a,m as b,p as c,d,y as e,h as f,f as g};
