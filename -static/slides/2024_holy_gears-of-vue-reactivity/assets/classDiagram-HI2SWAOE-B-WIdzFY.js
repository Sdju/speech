import{c as A,a as N,s as I}from"./chunk-RZWOMDKR-CpRiwOJ9.js";import{l as W}from"./chunk-CN5XARC6-BFEab-ow.js";import{G as P}from"./chunk-ULVYQCHC-F3qy4Ixk.js";import{a as f,f as S,m as u,l as B,n as R,E as X,F as Y,x as _,G as $}from"./Mermaid.vue_vue_type_script_setup_true_lang-DK-itLRO.js";import"./chunk-TZBO7MLI-CIKHLaE_.js";import"./modules/vue--jQnZVtx.js";import"./index-BMB48uBV.js";import"./modules/shiki-Bv45gz0-.js";import"./lz-string-D20wHtL1.js";import"./modules/file-saver-B315z_Em.js";var H=0,J=f(function(i,a,t,o,p){const g=f(function(e){switch(e){case p.db.relationType.AGGREGATION:return"aggregation";case p.db.relationType.EXTENSION:return"extension";case p.db.relationType.COMPOSITION:return"composition";case p.db.relationType.DEPENDENCY:return"dependency";case p.db.relationType.LOLLIPOP:return"lollipop"}},"getRelationType");a.points=a.points.filter(e=>!Number.isNaN(e.y));const s=a.points,c=X().x(function(e){return e.x}).y(function(e){return e.y}).curve(Y),n=i.append("path").attr("d",c(s)).attr("id","edge"+H).attr("class","relation");let r="";o.arrowMarkerAbsolute&&(r=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,r=r.replace(/\(/g,"\\("),r=r.replace(/\)/g,"\\)")),t.relation.lineType==1&&n.attr("class","relation dashed-line"),t.relation.lineType==10&&n.attr("class","relation dotted-line"),t.relation.type1!=="none"&&n.attr("marker-start","url("+r+"#"+g(t.relation.type1)+"Start)"),t.relation.type2!=="none"&&n.attr("marker-end","url("+r+"#"+g(t.relation.type2)+"End)");let m,h;const x=a.points.length;let k=_.calcLabelPosition(a.points);m=k.x,h=k.y;let y,w,b,v;if(x%2!==0&&x>1){let e=_.calcCardinalityPosition(t.relation.type1!=="none",a.points,a.points[0]),d=_.calcCardinalityPosition(t.relation.type2!=="none",a.points,a.points[x-1]);u.debug("cardinality_1_point "+JSON.stringify(e)),u.debug("cardinality_2_point "+JSON.stringify(d)),y=e.x,w=e.y,b=d.x,v=d.y}if(t.title!==void 0){const e=i.append("g").attr("class","classLabel"),d=e.append("text").attr("class","label").attr("x",m).attr("y",h).attr("fill","red").attr("text-anchor","middle").text(t.title);window.label=d;const l=d.node().getBBox();e.insert("rect",":first-child").attr("class","box").attr("x",l.x-o.padding/2).attr("y",l.y-o.padding/2).attr("width",l.width+o.padding).attr("height",l.height+o.padding)}u.info("Rendering relation "+JSON.stringify(t)),t.relationTitle1!==void 0&&t.relationTitle1!=="none"&&i.append("g").attr("class","cardinality").append("text").attr("class","type1").attr("x",y).attr("y",w).attr("fill","black").attr("font-size","6").text(t.relationTitle1),t.relationTitle2!==void 0&&t.relationTitle2!=="none"&&i.append("g").attr("class","cardinality").append("text").attr("class","type2").attr("x",b).attr("y",v).attr("fill","black").attr("font-size","6").text(t.relationTitle2),H++},"drawEdge"),O=f(function(i,a,t,o){u.debug("Rendering class ",a,t);const p=a.id,g={id:p,label:a.id,width:0,height:0},s=i.append("g").attr("id",o.db.lookUpDomId(p)).attr("class","classGroup");let c;a.link?c=s.append("svg:a").attr("xlink:href",a.link).attr("target",a.linkTarget).append("text").attr("y",t.textHeight+t.padding).attr("x",0):c=s.append("text").attr("y",t.textHeight+t.padding).attr("x",0);let n=!0;a.annotations.forEach(function(d){const l=c.append("tspan").text("«"+d+"»");n||l.attr("dy",t.textHeight),n=!1});let r=G(a);const m=c.append("tspan").text(r).attr("class","title");n||m.attr("dy",t.textHeight);const h=c.node().getBBox().height;let x,k,y;if(a.members.length>0){x=s.append("line").attr("x1",0).attr("y1",t.padding+h+t.dividerMargin/2).attr("y2",t.padding+h+t.dividerMargin/2);const d=s.append("text").attr("x",t.padding).attr("y",h+t.dividerMargin+t.textHeight).attr("fill","white").attr("class","classText");n=!0,a.members.forEach(function(l){C(d,l,n,t),n=!1}),k=d.node().getBBox()}if(a.methods.length>0){y=s.append("line").attr("x1",0).attr("y1",t.padding+h+t.dividerMargin+k.height).attr("y2",t.padding+h+t.dividerMargin+k.height);const d=s.append("text").attr("x",t.padding).attr("y",h+2*t.dividerMargin+k.height+t.textHeight).attr("fill","white").attr("class","classText");n=!0,a.methods.forEach(function(l){C(d,l,n,t),n=!1})}const w=s.node().getBBox();var b=" ";a.cssClasses.length>0&&(b=b+a.cssClasses.join(" "));const e=s.insert("rect",":first-child").attr("x",0).attr("y",0).attr("width",w.width+2*t.padding).attr("height",w.height+t.padding+.5*t.dividerMargin).attr("class",b).node().getBBox().width;return c.node().childNodes.forEach(function(d){d.setAttribute("x",(e-d.getBBox().width)/2)}),a.tooltip&&c.insert("title").text(a.tooltip),x&&x.attr("x2",e),y&&y.attr("x2",e),g.width=e,g.height=w.height+t.padding+.5*t.dividerMargin,g},"drawClass"),G=f(function(i){let a=i.id;return i.type&&(a+="<"+$(i.type)+">"),a},"getClassTitleString"),Z=f(function(i,a,t,o){u.debug("Rendering note ",a,t);const p=a.id,g={id:p,text:a.text,width:0,height:0},s=i.append("g").attr("id",p).attr("class","classGroup");let c=s.append("text").attr("y",t.textHeight+t.padding).attr("x",0);const n=JSON.parse(`"${a.text}"`).split(`
`);n.forEach(function(x){u.debug(`Adding line: ${x}`),c.append("tspan").text(x).attr("class","title").attr("dy",t.textHeight)});const r=s.node().getBBox(),h=s.insert("rect",":first-child").attr("x",0).attr("y",0).attr("width",r.width+2*t.padding).attr("height",r.height+n.length*t.textHeight+t.padding+.5*t.dividerMargin).node().getBBox().width;return c.node().childNodes.forEach(function(x){x.setAttribute("x",(h-x.getBBox().width)/2)}),g.width=h,g.height=r.height+n.length*t.textHeight+t.padding+.5*t.dividerMargin,g},"drawNote"),C=f(function(i,a,t,o){const{displayText:p,cssStyle:g}=a.getDisplayDetails(),s=i.append("tspan").attr("x",o.padding).text(p);g!==""&&s.attr("style",a.cssStyle),t||s.attr("dy",o.textHeight)},"addTspan"),M={getClassTitleString:G,drawClass:O,drawEdge:J,drawNote:Z},L={},E=20,T=f(function(i){const a=Object.entries(L).find(t=>t[1].label===i);if(a)return a[0]},"getGraphId"),F=f(function(i){i.append("defs").append("marker").attr("id","extensionStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 1,7 L18,13 V 1 Z"),i.append("defs").append("marker").attr("id","extensionEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 1,1 V 13 L18,7 Z"),i.append("defs").append("marker").attr("id","compositionStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),i.append("defs").append("marker").attr("id","compositionEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),i.append("defs").append("marker").attr("id","aggregationStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),i.append("defs").append("marker").attr("id","aggregationEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),i.append("defs").append("marker").attr("id","dependencyStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 5,7 L9,13 L1,7 L9,1 Z"),i.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L14,7 L9,1 Z")},"insertMarkers"),U=f(function(i,a,t,o){const p=S().class;L={},u.info("Rendering diagram "+i);const g=S().securityLevel;let s;g==="sandbox"&&(s=B("#i"+a));const c=g==="sandbox"?B(s.nodes()[0].contentDocument.body):B("body"),n=c.select(`[id='${a}']`);F(n);const r=new P({multigraph:!0});r.setGraph({isMultiGraph:!0}),r.setDefaultEdgeLabel(function(){return{}});const m=o.db.getClasses(),h=[...m.keys()];for(const e of h){const d=m.get(e),l=M.drawClass(n,d,p,o);L[l.id]=l,r.setNode(l.id,l),u.info("Org height: "+l.height)}o.db.getRelations().forEach(function(e){u.info("tjoho"+T(e.id1)+T(e.id2)+JSON.stringify(e)),r.setEdge(T(e.id1),T(e.id2),{relation:e},e.title||"DEFAULT")}),o.db.getNotes().forEach(function(e){u.debug(`Adding note: ${JSON.stringify(e)}`);const d=M.drawNote(n,e,p,o);L[d.id]=d,r.setNode(d.id,d),e.class&&m.has(e.class)&&r.setEdge(e.id,T(e.class),{relation:{id1:e.id,id2:e.class,relation:{type1:"none",type2:"none",lineType:10}}},"DEFAULT")}),W(r),r.nodes().forEach(function(e){e!==void 0&&r.node(e)!==void 0&&(u.debug("Node "+e+": "+JSON.stringify(r.node(e))),c.select("#"+(o.db.lookUpDomId(e)||e)).attr("transform","translate("+(r.node(e).x-r.node(e).width/2)+","+(r.node(e).y-r.node(e).height/2)+" )"))}),r.edges().forEach(function(e){e!==void 0&&r.edge(e)!==void 0&&(u.debug("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(r.edge(e))),M.drawEdge(n,r.edge(e),r.edge(e).relation,p,o))});const y=n.node().getBBox(),w=y.width+E*2,b=y.height+E*2;R(n,b,w,p.useMaxWidth);const v=`${y.x-E} ${y.y-E} ${w} ${b}`;u.debug(`viewBox ${v}`),n.attr("viewBox",v)},"draw"),z={draw:U},it={parser:A,db:N,renderer:z,styles:I,init:f(i=>{i.class||(i.class={}),i.class.arrowMarkerAbsolute=i.arrowMarkerAbsolute,N.clear()},"init")};export{it as diagram};
