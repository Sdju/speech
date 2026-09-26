import{$ as e,A as t,B as n,Ct as r,D as i,Et as a,G as o,H as s,I as c,J as l,K as u,M as d,R as f,S as p,St as m,T as h,Tt as g,U as _,V as v,W as y,b,dt as x,et as S,f as C,ft as w,g as T,i as E,it as D,l as ee,m as O,mt as k,nt as A,ot as j,rt as M,tt as te,v as N,w as P,x as F,y as I,yt as ne}from"./modules/shiki-CdtzxQK0.js";import{A as re,J as L,Q as R,Y as ie,q as ae,t as z,z as oe}from"./useNav-C4QS-RB9.js";import{t as se}from"./_plugin-vue_export-helper-BDNMzG2s.js";import{C as B,P as V,_ as ce,a as le,d as ue,g as de,m as fe,p as pe}from"./modules/vue-CXGeuFIF.js";import{_ as me,d as he,f as ge,g as _e,h as ve,m as ye,n as H,p as be,v as xe}from"./slidev/context-COtx_HMt.js";import{n as Se,r as Ce,t as we}from"./syncState-CTHXYEQl.js";import{a as Te,c as Ee,g as De,o as Oe,s as ke}from"./index-9FyZC_ds.js";import"./slidev/client-VNO2YWXl.js";import{t as Ae}from"./useDrawings-Bkyca-HQ.js";import{t as je}from"./screen-X04hah9F.js";import{n as Me}from"./modules/unplugin-icons-eJeX_233.js";import{A as Ne,C as Pe,D as Fe,E as Ie,F as Le,I as Re,L as U,M as ze,N as Be,O as Ve,P as He,R as Ue,S as We,T as Ge,_ as Ke,a as qe,b as Je,c as Ye,d as Xe,h as Ze,i as Qe,j as $e,k as et,l as tt,m as nt,n as rt,o as it,p as at,r as ot,s as st,t as ct,v as lt,w as ut,y as dt}from"./GLTFLoader-ld60osHx.js";import{a as ft,c as pt,i as mt,l as ht,n as gt,o as _t,s as vt,u as W}from"./scene-CaVdI54H.js";var yt=[`innerHTML`],bt=i({__name:`DrawingPreview`,props:{page:{}},setup(e){let{drawingState:t}=Ae();return(n,r)=>m(t)[e.page]?(s(),p(`svg`,{key:0,class:`w-full h-full absolute top-0 pointer-events-none`,innerHTML:m(t)[e.page]},null,8,yt)):F(`v-if`,!0)}}),xt=w({}),St=[],Ct=[];Se(xt,`$syncUp`,!0),Se(xt,`$syncDown`,!0),Se(xt,`$paused`,!1),Se(xt,`$onSet`,e=>St.push(e)),Se(xt,`$onPatch`,e=>Ct.push(e)),Ce(),Se(xt,`$patch`,async()=>!1);var wt=we(xt,xt,!0),Tt=window.navigator.userAgent.match(/Chrome\/(\d+)/)?.[1];Tt&&Number(Tt);var Et=window.navigator.userAgent.match(/Chrome\/(\d+)/)?.[1];Et&&Number(Et);var Dt=new class{_screenshotSession=null;getSnapshot(e,t){let n=e+(t?`-dark`:`-light`),r=wt.state[n];if(!r)return;let i=oe(e);if(i&&r?.revision===i?.meta.slide.revision)return r.image}async saveSnapshot(e,t,n){return!1}async startCapturing(e){return!1}},Ot=[`id`],kt=[`id`],At={class:`slidev-slide-container w-full h-full relative`},jt=[`src`],Mt=k(null),Nt=se(i({__name:`SlideContainer`,props:{width:{type:Number},meta:{default:()=>({})},isMain:{type:Boolean,default:!1},no:{type:Number,required:!1},useSnapshot:{type:Boolean,default:!1},contentStyle:{type:Object,default:()=>({})}},setup(e){let t=e,{isPrintMode:r}=z(),i=k(null),a=pe(i),c=k(null),l=N(()=>t.width??a.width.value),u=N(()=>t.width?t.width/ae.value:a.height.value),d=N(()=>re.value&&!r.value?+re.value:Math.min(l.value/ie.value,u.value/L.value)),f=N(()=>({...t.contentStyle,height:`${L.value}px`,width:`${ie.value}px`,"--slidev-slide-scale":d.value})),m=N(()=>t.width?{width:`${t.width}px`,height:`${t.width/ae.value}px`}:{});if(t.isMain){let e=document.documentElement.style;te(()=>e.setProperty(`--slidev-slide-scale`,d.value.toString())),v(()=>e.removeProperty(`--slidev-slide-scale`))}V(me,d),V(_e,c),A(()=>{t.isMain&&(Mt.value=c.value)}),n(()=>{S(()=>t.isMain&&d.value,()=>{E()})});let h=N(()=>{if(!(t.no==null||!t.useSnapshot))return Dt.getSnapshot(t.no,De.value)});return(t,n)=>h.value?(s(),p(O,{key:1},[F(` Image Snapshot `),I(`div`,At,[I(`img`,{src:h.value,class:`w-full h-full object-cover`,style:g(m.value)},null,12,jt),n[0]||=I(`div`,{absolute:``,"bottom-1":``,"right-1":``,"p0.5":``,"text-cyan:75":``,"bg-cyan:10":``,rounded:``,title:`Snapshot`},[I(`div`,{class:`i-carbon-camera`})],-1)])],2112)):(s(),p(`div`,{key:0,id:e.isMain?`slide-container`:void 0,ref_key:`container`,ref:i,class:`slidev-slide-container`,style:g(m.value)},[I(`div`,{id:e.isMain?`slide-content`:void 0,ref_key:`slideElement`,ref:c,class:`slidev-slide-content`,style:g(f.value)},[o(t.$slots,`default`,{},void 0,!0)],12,kt),o(t.$slots,`controls`,{},void 0,!0)],12,Ot))}}),[[`__scopeId`,`data-v-6032a637`]]),Pt=Object.assign({}),Ft=Object.assign({}),It=Symbol(`diContainer`);function Lt(e){let t=0,n,r,i=()=>{--t,r&&t<=0&&(r.stop(),n=void 0,r=void 0)};return((...a)=>(t+=1,r||(r=j(!0),n=r.run(()=>e(...a))),x(i),n))}function Rt(e){let t,n;return((...r)=>(n||(n=j(!0),t=n.run(()=>e(...r))),t))}function zt(){let e={services:w(new Map)};return _(It,e),{register:(t,n,r={shared:!0})=>{let i=r.shared?Lt(n):Rt(n);e.services.set(t,i)}}}function Bt(){let e=d(It);if(!e)throw Error(`Di container not found`);let t={inject:n=>{let r=e.services.get(n);if(!r)throw Error(`Service with key ${String(n)} not found`);return r(t)}};return t}function Vt(e){return Symbol.for(e.name)}function Ht(e){return typeof e==`number`?new Promise(t=>setTimeout(t,e)):new Promise(t=>{let n=Symbol(),r=setInterval(()=>{let i=e(n);i!==n&&(clearInterval(r),t(i))},100)})}var Ut=()=>{let e=k(),t=k(1),n=k(),r=k(0),i=k(0),a=k(0),o=k(0),s=k(0),c=[];function l(){for(;c.length;)c.pop().disconnect()}function u(e){if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>d());t.observe(e),c.push(t)}function d(){let c=e.value;if(!c)return;let l=c.getBoundingClientRect(),u=c.clientWidth?l.width/c.clientWidth:1;n.value=l,r.value=l.left,i.value=l.top,t.value=u,a.value=c.clientWidth,o.value=c.clientHeight,s.value++}function f(e){l(),d(),u(e),u(e.parentElement),u(document.getElementById(`page-root`))}return S(()=>e.value,async t=>{if(!t){e.value=await Ht(e=>document.querySelector(`#slide-content`)??e);return}f(t)},{immediate:!0}),fe(window,`resize`,d),fe(window,`scroll`,d,{capture:!0,passive:!0}),x(()=>{l()}),w({slideElement:e,rect:n,scale:t,left:r,top:i,width:a,height:o,revision:s,updateSlide:d})},Wt=Vt(Ut);function Gt(e,t){let n=e.closest(`[data-coord-root]`);if(n&&n!==e)return n;let r=e.parentElement;for(;r;){if(t&&r===t)return t;let e=getComputedStyle(r),n=e.position!==`static`,i=e.transform!==`none`||e.filter!==`none`||e.perspective!==`none`||e.willChange.split(`,`).some(e=>/transform|filter|perspective/.test(e.trim()));if(n||i)return r;r=r.parentElement}return t??document.body}function Kt(e,t,n){let r=t.getBoundingClientRect(),i=getComputedStyle(t),a=parseFloat(i.borderLeftWidth)||0,o=parseFloat(i.borderTopWidth)||0,s=n||1;return{x:(e.x-r.left)/s-a,y:(e.y-r.top)/s-o}}var qt=e=>{let t=e.inject(Wt),n=k(0),r=k(0),i=k(!1),a=k(!1),o=N(()=>(n.value-t.left)/t.scale),s=N(()=>(r.value-t.top)/t.scale),c=N(()=>{let e=t.width||1;return Math.round(o.value/e*1e4)/100}),l=N(()=>{let e=t.height||1;return Math.round(s.value/e*1e4)/100});fe(()=>t.slideElement,`mouseleave`,()=>{i.value=!1}),fe(()=>t.slideElement,`mouseenter`,()=>{i.value=!0}),fe(()=>t.slideElement,`mousedown`,()=>{a.value=!0}),fe(()=>t.slideElement,`mouseup`,()=>{a.value=!1}),fe(window,`mousemove`,e=>{n.value=e.clientX,r.value=e.clientY});function u({x:e,y:n}){return{x:(e-t.left)/t.scale,y:(n-t.top)/t.scale}}function d(e){return Gt(e,t.slideElement)}function f(e,n){return Kt(n,d(e),t.scale)}return w({globalX:N(()=>n.value),globalY:N(()=>r.value),inSlide:N(()=>i.value),isDown:N(()=>a.value),localX:o,localY:s,localXPercent:c,localYPercent:l,globalToLocal:u,coordRootOf:d,globalToElementLocal:f})},Jt=Vt(qt),Yt=()=>{let e=w({});return w({data:e})},Xt=Vt(Yt);function Zt(){let e=new AbortController,t=e.signal;return t.abort=()=>e.abort(),t}function Qt(e){let t=Zt();return e.addEventListener(`abort`,()=>{t.abort()}),t}function $t(e){return e?._object}function en(){let e=k(new Set),t=k(null),n=k(null),r=null;class i{element;signal=Zt();hoveredSignal=null;locked=!1;constructor(e){this.element=e,this.addListener(`mouseenter`,this.onEnter)}addListener(e,t,n=this.signal){this.element.addEventListener(e,t.bind(this),{signal:n})}onEnter(){this.hoveredSignal=Qt(this.signal),this.addListener(`click`,this.onClick,this.hoveredSignal),this.addListener(`mouseleave`,this.onLeave,this.hoveredSignal),t.value=this.element}onClick(){this.locked||(n.value=n.value===this.element?null:this.element)}onLeave(){this.hoveredSignal.abort(),this.hoveredSignal=null,t.value=null}dispose(){console.log(`dispose`),this.signal.abort()}}function a(e){let t=e.closest(`.slidev-page`);return t?getComputedStyle(t).display!==`none`:e.getClientRects().length>0}function o(){let t=[...document.querySelectorAll(`#slide-content .\\$obj`)].filter(e=>e instanceof HTMLElement&&a(e)),n=new Set(t);[...n].filter(t=>!e.value.has(t)).forEach(t=>{e.value.add(t),t._object=new i(t)}),[...e.value].filter(e=>!n.has(e)).forEach(t=>{e.value.delete(t),t._object?.dispose(),delete t._object})}return r=setInterval(o,1e3),x(()=>{r&&=(clearInterval(r),null)}),w({objects:e,hovered:t,active:n})}var tn=Vt(en),nn=i({__name:`CoordHelper`,setup(e){let{$slidev:t,$nav:n,$clicksContext:r,$clicks:i,$page:a,$renderContext:c,$frontmatter:l}=H(),u=zt();return u.register(Wt,Ut),u.register(Jt,qt),u.register(tn,en),u.register(Xt,Yt,{shared:!1}),(e,t)=>(s(),b(T,{to:`body`},[o(e.$slots,`default`)]))}}),rn=[`onClick`],an=[`onClick`],on=[`onClick`],sn=[`onClick`],cn=[`onClick`],ln=[`title`],un=[`onClick`],dn=[`onClick`],fn=[`onClick`],pn=[`onClick`],mn=[`onClick`],hn=[`onClick`],gn=[`onClick`],_n={key:0,class:`text-[10px] opacity-80 px-1 max-w-full break-all`},vn=i({__name:`MemoryEditor`,setup(e){let{$slidev:t,$nav:n,$clicksContext:r,$clicks:i,$page:o,$renderContext:c,$frontmatter:l}=H(),u=Bt().inject(Xt),{clicks:d,currentSlideRoute:f}=z(),_=k(``);function v(e){navigator.clipboard.writeText(e)}let b=k(),{style:x}=ue(b,{initialValue:{x:0,y:0}});function S(){u.data.savedPositions=[],u.data.savedChanges=new Map}function C(e){u.data.savedPositions=u.data.savedPositions.filter(t=>t!==e)}function w(e){let t=e.element.dataset.editname;if(t)return t;let n=[...e.element.classList].find(e=>e.startsWith(`editname-`));return n?n.slice(9):``}async function T(e,t,n=`pos`){let r=w(e);if(!r){_.value=`нет editName (v-bind="t.*", :class="t.*", или data-editname)`;return}let i=f.value.meta?.slide?.filepath;if(!i){_.value=`нет filepath у слайда`;return}let a=`${Math.round(t.x)}_${Math.round(t.y)}`,o=`${Math.round(t.width)}_${Math.round(t.height)}`;_.value=`пишем ${r}…`;try{let e=await(await fetch(`/__slides_parts_api/patch-edit`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({filePath:i,editName:r,clicks:d.value,pos:a,size:n===`sp`?o:void 0,mode:n})})).json();if(!e.success){_.value=e.error||`ошибка`;return}_.value=`ok ${e.strategy}: ${e.detail||r}`}catch(e){_.value=String(e)}}return(e,t)=>{let n=Me;return s(),p(`div`,{ref_key:`draggableElement`,ref:b,class:`fixed bg-black/40 p-2 rounded-xl h-auto w-auto z-100 max-w-[420px] flex flex-col gap-2 font-mono text-xs select-none`,style:g(m(x))},[(s(!0),p(O,null,y(m(u).data.savedPositions,e=>(s(),p(`div`,{key:e.x+`:`+e.y,class:`flex flex-wrap bg-blue-500/20 rounded-full overflow-hidden`},[I(`div`,{class:`record`,onClick:t=>v(`${e.x.toFixed(0)}`)},` x:`+a(e.x.toFixed(0)),9,rn),I(`div`,{class:`record`,onClick:t=>v(`${e.y.toFixed(0)}`)},` y:`+a(e.y.toFixed(0)),9,an),I(`div`,{class:`record`,onClick:t=>v(`${e.xPercent}%`)},` x%:`+a(e.xPercent),9,on),I(`div`,{class:`record`,onClick:t=>v(`${e.yPercent}%`)},` y%:`+a(e.yPercent),9,sn),I(`div`,{class:`record`,onClick:t=>C(e)},[h(n)],8,cn)]))),128)),(s(!0),p(O,null,y(m(u).data.savedChanges,([e,t])=>(s(),p(`div`,{key:w(e)+`:`+t.x+`:`+t.y,class:`flex flex-wrap bg-blue-500/20 rounded-full overflow-hidden items-center`},[w(e)?(s(),p(`div`,{key:0,class:`record opacity-80`,title:w(e)},a(w(e)),9,ln)):F(`v-if`,!0),I(`div`,{class:`record`,onClick:e=>v(`${t.x.toFixed(0)}`)},`x:`+a(t.x.toFixed(0)),9,un),I(`div`,{class:`record`,onClick:e=>v(`${t.y.toFixed(0)}`)},`y:`+a(t.y.toFixed(0)),9,dn),I(`div`,{class:`record`,onClick:e=>v(`size-${t.width.toFixed(0)}_${t.height.toFixed(0)}`)},` size `,8,fn),I(`div`,{class:`record`,onClick:e=>v(`pos-${t.x.toFixed(0)}_${t.y.toFixed(0)}`)},` pos `,8,pn),I(`div`,{class:`record`,onClick:e=>v(`sp-${t.x.toFixed(0)}_${t.y.toFixed(0)}_${t.width.toFixed(0)}_${t.height.toFixed(0)}`)},` sp `,8,mn),I(`div`,{class:`record bg-green-500/30 hover:bg-green-500/50`,title:`Записать pos в markdown (timeline key или data-editname)`,onClick:n=>T(e,t,`pos`)},` apply `,8,hn),I(`div`,{class:`record bg-green-500/20 hover:bg-green-500/40`,title:`Записать sp в markdown`,onClick:n=>T(e,t,`sp`)},` apply-sp `,8,gn)]))),128)),_.value?(s(),p(`div`,_n,a(_.value),1)):F(`v-if`,!0),I(`div`,{class:`bg-blue-500/30 active:bg-blue-500 px-2 py-1 rounded-full cursor-pointer duration-100 self-center`,onClick:t[0]||=e=>S()},[h(n)])],4)}}}),yn=i({__name:`ObjectEdit`,setup(e){let{$slidev:t,$nav:n,$clicksContext:r,$clicks:i,$page:a,$renderContext:o,$frontmatter:c}=H(),l=Bt(),u=l.inject(tn),d=l.inject(Jt),f=l.inject(Wt),h=l.inject(Xt);h.data.savedChanges=new Map;let _=new Set([`ArrowDown`,`ArrowUp`,`ArrowRight`,`ArrowLeft`]),v=N(()=>(f.revision,D.value??u.active?.getBoundingClientRect()??null)),y=N(()=>{f.revision;let e=u.hovered?.getBoundingClientRect();return e?{left:`${e.left}px`,top:`${e.top}px`,width:`${e.width}px`,height:`${e.height}px`}:null}),b=N(()=>v.value?{left:`${v.value.left}px`,top:`${v.value.top}px`,width:`${v.value.width}px`,height:`${v.value.height}px`}:{});function x(e){return{width:e.width/f.scale,height:e.height/f.scale}}function C(e,t){return d.globalToElementLocal(e,{x:t.left+t.width/2,y:t.top+t.height/2})}let w=null,T=null,E=null,D=k();return S(()=>$t(u.active),(e,t)=>{t&&(T?.abort(),T=null),e&&(T=Qt(e.signal),e._registered||(e._registered=!0,e.signal.addEventListener(`abort`,()=>{h.data.savedChanges.delete(e)})),document.body.addEventListener(`keydown`,t=>{if(t.key===`Escape`){u.active=null;return}if(!_.has(t.key))return;let n=e.element.getBoundingClientRect(),r=C(e.element,n),i=x(n),a=t.shiftKey?10:t.altKey?1:5;t.key===`ArrowDown`?r.y+=a:t.key===`ArrowUp`?r.y-=a:t.key===`ArrowRight`?r.x+=a:t.key===`ArrowLeft`&&(r.x-=a),e.element.style.transition=`none`,e.element.style.left=`${r.x}px`,e.element.style.top=`${r.y}px`,D.value=e.element.getBoundingClientRect(),h.data.savedChanges.set(e,{x:r.x,y:r.y,width:i.width,height:i.height}),t.stopImmediatePropagation()},{signal:T,capture:!0}),document.body.addEventListener(`keyup`,t=>{_.has(t.key)&&e.element.style.removeProperty(`transition`)},{signal:T,capture:!0}),e.addListener(`mousedown`,t=>{t.stopImmediatePropagation(),f.updateSlide(),w=Qt(T);let n=e.element.getBoundingClientRect();E={x:(t.clientX-n.left-n.width/2)/f.scale,y:(t.clientY-n.top-n.height/2)/f.scale},e.element.style.transition=`none`,w.addEventListener(`abort`,()=>{e.element.style.removeProperty(`transition`)}),window.addEventListener(`mousemove`,t=>{e.locked=!0;let n=d.globalToElementLocal(e.element,{x:t.clientX,y:t.clientY}),r=x(e.element.getBoundingClientRect()),i={x:n.x-E.x,y:n.y-E.y,width:r.width,height:r.height};e.element.style.left=`${i.x}px`,e.element.style.top=`${i.y}px`,D.value=e.element.getBoundingClientRect(),h.data.savedChanges.set(e,i)},{signal:w}),window.addEventListener(`mouseup`,()=>{w?.abort(),w=null,D.value=void 0,setTimeout(()=>{e.locked=!1},100)},{signal:w})},T))}),(e,t)=>(s(),p(O,null,[y.value&&m(u).active!==m(u).hovered?(s(),p(`div`,{key:0,class:`fixed pointer-events-none border-2 z-[999] border-blue-500`,style:g(y.value)},null,4)):F(`v-if`,!0),m(u).active?(s(),p(`div`,{key:1,class:`fixed pointer-events-none border-2 z-[999] border-green-500`,style:g(b.value)},null,4)):F(`v-if`,!0)],64))}}),bn=i({__name:`MouseSizeSelect`,setup(e){let{$slidev:t,$nav:n,$clicksContext:r,$clicks:i,$page:a,$renderContext:o,$frontmatter:c}=H(),l=Bt(),u=l.inject(Jt),d=l.inject(Xt),f=l.inject(Wt);return S(()=>u.isDown,e=>{e?d.data.selectSize={startX:u.globalX,startY:u.globalY}:d.data.selectSize=null}),S(()=>[u.globalX,u.globalY],([e,t])=>{d.data.selectSize&&(d.data.selectSize.width=Math.abs(e-d.data.selectSize.startX)/f.scale,d.data.selectSize.height=Math.abs(t-d.data.selectSize.startY)/f.scale,d.data.selectSize.widthPercent=Math.round(d.data.selectSize.width/(f.width??0)*1e4)/100,d.data.selectSize.heightPercent=Math.round(d.data.selectSize.height/(f.height??0)*1e4)/100)}),(e,t)=>m(d).data.selectSize?(s(),p(`div`,{key:0,ref:`selectionBox`,class:`fixed b-[1px] border-dashed border-white/50 pointer-events-none`,style:g({left:`${Math.min(m(d).data.selectSize.startX,m(u).globalX)}px`,top:`${Math.min(m(d).data.selectSize.startY,m(u).globalY)}px`,width:`${Math.abs(m(u).globalX-m(d).data.selectSize.startX)}px`,height:`${Math.abs(m(u).globalY-m(d).data.selectSize.startY)}px`})},null,4)):F(`v-if`,!0)}}),xn=i({__name:`MousePosTooltip`,setup(e){let{$slidev:t,$nav:n,$clicksContext:r,$clicks:i,$page:o,$renderContext:c,$frontmatter:l}=H(),u=Bt(),d=u.inject(Jt),f=u.inject(Xt),h=u.inject(tn),_=u.inject(Wt);f.data.savedPositions??=[];let v=N(()=>f.data.selectSize?{width:Math.round(f.data.selectSize.width)||0,height:Math.round(f.data.selectSize.height)||0,widthPercent:Math.round(f.data.selectSize.widthPercent*100)/100||0,heightPercent:Math.round(f.data.selectSize.heightPercent*100)/100||0}:null),y=N(()=>v.value?v.value.width!==0||v.value.height!==0:!1),b=N(()=>{d.globalX,d.globalY;let e=h.hovered??h.active;if(!e||d.coordRootOf(e)===_.slideElement)return null;let t=d.globalToElementLocal(e,{x:d.globalX,y:d.globalY});return{x:Math.round(t.x),y:Math.round(t.y)}}),{alt_q:x}=ce();return S(x,e=>{e&&f.data.savedPositions.push({x:d.globalX,y:d.globalY,xPercent:d.localXPercent,yPercent:d.localYPercent})}),(e,t)=>m(d).inSlide?(s(),p(`div`,{key:0,class:`fixed bg-[rgba(0,0,0,0.8)] text-white p-2 rounded-md text-sm pointer-events-none z-[1000] font-mono`,style:g({left:`${m(d).globalX+10}px`,top:`${m(d).globalY+10}px`})},[y.value?(s(),p(O,{key:0},[P(` width: `+a(v.value.width)+`px (`+a(v.value.widthPercent)+`%) `,1),t[0]||=I(`br`,null,null,-1),P(` height: `+a(v.value.height)+`px (`+a(v.value.heightPercent)+`%) `,1)],64)):(s(),p(O,{key:1},[P(` px `+a(Math.round(m(d).localX))+` `+a(Math.round(m(d).localY))+` `,1),t[2]||=I(`br`,null,null,-1),P(` % `+a(m(d).localXPercent)+` `+a(m(d).localYPercent)+` `,1),b.value?(s(),p(O,{key:0},[t[1]||=I(`br`,null,null,-1),P(` root `+a(b.value.x)+` `+a(b.value.y),1)],64)):F(`v-if`,!0)],64))],4)):F(`v-if`,!0)}}),Sn=de(`slidev-show-timeline-editor`,!1,{listenToStorageChanges:!1}),G=de(`slidev-timeline-editor-vertical`,!1,{listenToStorageChanges:!1}),Cn=de(`slidev-timeline-editor-width`,typeof window<`u`?window.innerWidth*.3:400,{listenToStorageChanges:!1}),wn=de(`slidev-timeline-editor-height`,typeof window<`u`?window.innerHeight*.3:250,{listenToStorageChanges:!1});k(0);var Tn={key:0,class:`edit-hint`},En={class:`edit-mode`},Dn=se(i({__name:`EditableValue`,props:{value:{},path:{},stepIndex:{},propertyName:{}},emits:[`update`],setup(e,{emit:t}){let{$slidev:n,$nav:i,$clicksContext:o,$clicks:c,$page:l,$renderContext:u,$frontmatter:d}=H(),f=e,m=t,h=k(!1),g=k(``),_=k(),v=N(()=>f.value===null?`null`:f.value===void 0?`undefined`:typeof f.value==`boolean`?`boolean`:typeof f.value==`number`?`number`:typeof f.value==`string`?`string`:Array.isArray(f.value)?`array`:typeof f.value==`object`?`object`:`unknown`),y=N(()=>f.value===null?`null`:f.value===void 0?`undefined`:typeof f.value==`boolean`?f.value?`true`:`false`:typeof f.value==`number`?String(f.value):typeof f.value==`string`?`"${f.value}"`:Array.isArray(f.value)?`[${f.value.length} items]`:typeof f.value==`object`?`{${Object.keys(f.value).length} keys}`:String(f.value)),b=N(()=>[`string`,`number`,`boolean`].includes(v.value));function x(){b.value&&(h.value=!0,v.value===`string`?g.value=f.value||``:g.value=String(f.value),setTimeout(()=>{_.value?.focus(),_.value?.select()},0))}function C(){h.value=!1,g.value=``}function w(){if(!b.value)return;let e;try{switch(v.value){case`string`:e=g.value.replace(/^"(.*)"$/,`$1`);break;case`number`:if(e=parseFloat(g.value),isNaN(e)){console.warn(`Invalid number:`,g.value);return}break;case`boolean`:if(g.value.toLowerCase()===`true`)e=!0;else if(g.value.toLowerCase()===`false`)e=!1;else{console.warn(`Invalid boolean:`,g.value);return}break;default:return}e!==f.value&&m(`update`,f.path,f.value,e,f.stepIndex,f.propertyName),h.value=!1,g.value=``}catch(e){console.error(`Error parsing value:`,e)}}function T(e){e.key===`Enter`?(e.preventDefault(),w()):e.key===`Escape`&&(e.preventDefault(),C())}function E(e){h.value&&!e.target?.closest(`.editable-value`)&&w()}return S(h,async e=>{await new Promise(e=>setTimeout(e,0)),e?document.addEventListener(`click`,E):document.removeEventListener(`click`,E)}),(e,t)=>(s(),p(`div`,{class:r([`editable-value`,{"is-editable":b.value}])},[F(` Режим отображения `),h.value?(s(),p(O,{key:1},[F(` Режим редактирования `),I(`div`,En,[D(I(`input`,{ref_key:`inputRef`,ref:_,"onUpdate:modelValue":t[0]||=e=>g.value=e,class:r([`edit-input`,`type-${v.value}`]),onKeydown:T,onBlur:w},null,34),[[ee,g.value]]),I(`div`,{class:`edit-actions`},[I(`button`,{onClick:w,class:`action-btn save`,title:`Сохранить (Enter)`},`✓`),I(`button`,{onClick:C,class:`action-btn cancel`,title:`Отменить (Esc)`},`✗`)])])],2112)):(s(),p(`div`,{key:0,class:r([`display-mode`,`type-${v.value}`]),onClick:x},[P(a(y.value)+` `,1),b.value?(s(),p(`span`,Tn,`✏️`)):F(`v-if`,!0)],2))],2))}}),[[`__scopeId`,`data-v-48053a41`]]),On={class:`object-properties flat-root`},kn={class:`property-line`},An={class:`property-key`},jn={key:3,class:`complex-container`},Mn={class:`expand-btn`},Nn={key:0,class:`i-carbon:chevron-down text-xs`},Pn={key:1,class:`i-carbon:chevron-right text-xs`},Fn={key:0,class:`object-name`},In={class:`object-type`},Ln={class:`object-size`},Rn={key:1,class:`object-preview`},zn={key:0,class:`complex-content`},Bn={key:0,class:`array-items`},Vn={class:`array-index`},Hn={key:1,class:`object-properties`},Un={class:`property-line`},Wn={class:`property-key`},Gn=se(i({__name:`ObjectViewer`,props:{data:{},depth:{},name:{},flat:{type:Boolean},editable:{type:Boolean},pathPrefix:{},basePath:{},stepIndex:{}},emits:[`update`],setup(e,{emit:t}){let{$slidev:n,$nav:i,$clicksContext:o,$clicks:c,$page:l,$renderContext:d,$frontmatter:f}=H(),_=e,v=t,x=_.depth??0,S=_.flat&&x===0,C=k(x<2||S),w=N(()=>_.editable&&_.stepIndex!=null);function T(){C.value=!C.value}function E(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function D(e){return Array.isArray(e)}function ee(e){return!E(e)&&!D(e)}function A(e){return e===null?`null`:e===void 0?`undefined`:typeof e==`boolean`?`boolean`:typeof e==`number`?`number`:typeof e==`string`?`string`:D(e)?`array`:E(e)?`object`:`unknown`}function j(e){return e===null?`null`:e===void 0?`undefined`:typeof e==`boolean`?e?`true`:`false`:typeof e==`number`?String(e):typeof e==`string`?e:String(e)}function M(e){return Object.keys(e)}function te(e){return D(e)?e.length:E(e)?Object.keys(e).length:0}function P(e){let t=_.basePath||``;return t?`${t}.${e}`:String(e)}function ne(e){let t=_.pathPrefix||``;return t?`${t}.${e}`:String(e)}function re(e,t,n,r,i){v(`update`,e,t,n,r,i)}return(t,n)=>{let i=u(`ObjectViewer`,!0);return s(),p(`div`,{class:`object-viewer`,style:g({paddingLeft:m(x)>0&&!m(S)?`12px`:`0`})},[ee(e.data)&&w.value?(s(),b(Dn,{key:0,value:e.data,path:e.basePath||e.pathPrefix||``,"step-index":e.stepIndex,"property-name":e.pathPrefix||e.name||``,onUpdate:re},null,8,[`value`,`path`,`step-index`,`property-name`])):ee(e.data)?(s(),p(`div`,{key:1,class:r([`primitive-value`,`type-${A(e.data)}`])},a(j(e.data)),3)):m(S)&&E(e.data)?(s(),p(O,{key:2},[F(` Flat root object: keys at top level, no Object (n) chrome `),I(`div`,On,[(s(!0),p(O,null,y(M(e.data),t=>(s(),p(`div`,{key:t,class:`object-property`},[I(`div`,kn,[I(`span`,An,a(t)+`:`,1),h(i,{data:e.data[t],depth:m(x)+1,editable:e.editable,"path-prefix":ne(t),"base-path":P(t),"step-index":e.stepIndex,onUpdate:re},null,8,[`data`,`depth`,`editable`,`path-prefix`,`base-path`,`step-index`])])]))),128))])],2112)):(s(),p(`div`,jn,[I(`div`,{class:`complex-header`,onClick:T},[I(`button`,Mn,[C.value?(s(),p(`div`,Nn)):(s(),p(`div`,Pn))]),e.name?(s(),p(`span`,Fn,a(e.name),1)):F(`v-if`,!0),I(`span`,In,a(D(e.data)?`Array`:`Object`),1),I(`span`,Ln,` (`+a(te(e.data))+`) `,1),C.value?F(`v-if`,!0):(s(),p(`div`,Rn,a(D(e.data)?`[...]`:`{...}`),1))]),C.value?(s(),p(`div`,zn,[D(e.data)?(s(),p(`div`,Bn,[(s(!0),p(O,null,y(e.data,(t,n)=>(s(),p(`div`,{key:n,class:`array-item`},[I(`span`,Vn,`[`+a(n)+`]`,1),h(i,{data:t,depth:m(x)+1,editable:e.editable,"path-prefix":ne(n),"base-path":P(n),"step-index":e.stepIndex,onUpdate:re},null,8,[`data`,`depth`,`editable`,`path-prefix`,`base-path`,`step-index`])]))),128))])):(s(),p(`div`,Hn,[(s(!0),p(O,null,y(M(e.data),t=>(s(),p(`div`,{key:t,class:`object-property`},[I(`div`,Un,[I(`span`,Wn,a(t)+`:`,1),h(i,{data:e.data[t],depth:m(x)+1,editable:e.editable,"path-prefix":ne(t),"base-path":P(t),"step-index":e.stepIndex,onUpdate:re},null,8,[`data`,`depth`,`editable`,`path-prefix`,`base-path`,`step-index`])])]))),128))]))])):F(`v-if`,!0)]))],4)}}}),[[`__scopeId`,`data-v-1f95f8f3`]]),Kn={class:`property-header`},qn={class:`property-name`},Jn={key:0,class:`change-indicator`},Yn={class:`property-content`},Xn=se(i({__name:`PropertyDiff`,props:{name:{},value:{},prevValue:{},showDiff:{type:Boolean},stepIndex:{},path:{},slideMeta:{}},emits:[`update`],setup(e,{emit:t}){let{$slidev:n,$nav:i,$clicksContext:o,$clicks:c,$page:l,$renderContext:u,$frontmatter:d}=H(),f=e,m=t,h=N(()=>f.prevValue===void 0||JSON.stringify(f.value)!==JSON.stringify(f.prevValue)),g=N(()=>f.prevValue===void 0?`new`:f.value===void 0?`removed`:`modified`);function _(e){return typeof e!=`object`||!e}function v(e){return e.replace(/^timeline\.\d+\./,``)}async function y(e,t,n,r,i){let a=v(e)||i;try{let o=await(await fetch(`/__slides_parts_api/timeline-patch-prop`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({filePath:f.slideMeta.filepath,slideStart:f.slideMeta.start,stepIndex:r,keyPath:a,newValue:n})})).json();if(!o.success){console.error(`timeline-patch-prop failed:`,o.error);return}m(`update`,e,t,n,r,i)}catch(e){console.error(`timeline-patch-prop error:`,e)}}return(t,n)=>(s(),p(`div`,{class:r([`property-diff`,{"is-changed":h.value&&e.showDiff,[`change-${g.value}`]:e.showDiff}])},[I(`div`,Kn,[I(`span`,qn,a(e.name),1),h.value&&e.showDiff?(s(),p(`span`,Jn,a(g.value===`new`?`✨`:g.value===`removed`?`❌`:`📝`),1)):F(`v-if`,!0)]),I(`div`,Yn,[_(e.value)?(s(),b(Dn,{key:0,value:e.value,path:e.path,"step-index":e.stepIndex,"property-name":e.name,onUpdate:y},null,8,[`value`,`path`,`step-index`,`property-name`])):(s(),b(Gn,{key:1,data:e.value,depth:0,flat:``,editable:``,"path-prefix":e.name,"step-index":e.stepIndex,"base-path":e.path,onUpdate:y},null,8,[`data`,`path-prefix`,`step-index`,`base-path`]))])],2))}}),[[`__scopeId`,`data-v-60169e14`]]),Zn={class:`flex pb-2 text-xl -mt-1 items-center`},Qn={class:`relative overflow-auto rounded bg-[#1a1a1a] p-2 min-h-0`},$n={key:0,class:`text-white/50 text-center py-8 text-sm`},er={key:1,class:`flex flex-col gap-2`},tr={class:`bg-blue-500/20 rounded p-2 border border-blue-500/50 flex items-center gap-2`},nr={class:`text-white font-bold text-lg font-mono`},rr={key:0,class:`text-[10px] text-white/60 px-1 break-all font-mono`},ir={class:`flex flex-col gap-1`},ar=[`onClick`],or={class:`step-number`},sr={class:`step-title`},cr={key:0,class:`text-xs opacity-70`},lr={class:`changes-badge`},ur=[`title`,`disabled`,`onClick`],dr={key:0,class:`i-carbon:warning-alt`},fr={key:1,class:`i-carbon:trash-can`},pr=[`onClick`],mr={key:0,class:`i-carbon:chevron-up`},hr={key:1,class:`i-carbon:chevron-down`},gr={key:0,class:`step-content`},_r={key:0,class:`text-xs text-white/40 font-mono px-1`},vr=[`onClick`],yr={class:`text-xs text-white/50`},br=se(i({__name:`SideTimelineEditor`,props:{resize:{type:Boolean}},setup(e){let{$slidev:t,$nav:n,$clicksContext:i,$clicks:o,$page:c,$renderContext:l,$frontmatter:u}=H(),d=e,{clicks:f,currentSlideRoute:h,go:_}=z(),v=k(``),x=N(()=>{let e=h.value.meta?.slide;return{filepath:e?.source?.filepath||e?.filepath||`slides.md`,start:e?.source?.start??e?.start??0}}),S=N(()=>h.value.meta?.slide?.frontmatter||{}),w=N(()=>S.value.timeline??[]),T=N(()=>(S.value.timeline??[]).length>0),E=N(()=>{if(!T.value)return[];let e=new Set;return w.value.forEach(t=>{Object.keys(t).forEach(t=>{t.startsWith(`$`)||e.add(t)})}),Array.from(e).sort()}),D=N(()=>Math.min(f.value,w.value.length-1)),ee=k({});function A(e){let t=ee.value[e];return t===void 0?!te(e):t}function j(e){ee.value={...ee.value,[e]:!A(e)}}function M(e){return E.value.filter(t=>R(e,t)).length}function te(e){return M(e)>3}function ne(e){e>=0&&e<w.value.length&&_(h.value.no,e,!0)}function re(e,t){return w.value[e]?.[t]}function L(e,t){if(e!==0)return w.value[e-1]?.[t]}function R(e,t){if(e===0)return!0;let n=w.value[e]?.[t],r=w.value[e-1]?.[t];return typeof n==`object`&&typeof r==`object`?JSON.stringify(n)!==JSON.stringify(r):n!==void 0&&n!==r}function ie(){Sn.value=!1}function ae(e,t,n,r,i){console.log(`🔄 Обновление свойства в timeline:`,{path:e,stepIndex:r,propertyName:i,oldValue:t,newValue:n})}async function oe(e,t){v.value=`…`;try{let n=await(await fetch(`/__slides_parts_api/${e}`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({filePath:x.value.filepath,slideStart:x.value.start,...t})})).json();return n.success?(v.value=n.detail||`ok`,n):(v.value=n.error||`ошибка`,null)}catch(e){return v.value=String(e),null}}async function se(){let e=await oe(`timeline-add-step`,{});if(!e?.stepCount)return;let t=e.stepCount-1;setTimeout(()=>{_(h.value.no,t,!0)},200)}let B=k(null),V=null;function ce(){B.value=null,V&&=(clearTimeout(V),null)}function le(e){if(w.value.length<=1){v.value=`нельзя удалить единственный шаг`;return}if(B.value===e){ce(),ue(e);return}ce(),B.value=e,v.value=`ещё раз нажмите 🗑 чтобы удалить шаг ${e+1}`,V=setTimeout(()=>{B.value===e&&(B.value=null,v.value.includes(`ещё раз нажмите`)&&(v.value=``))},3e3)}async function ue(e){let t=await oe(`timeline-delete-step`,{stepIndex:e});if(!t)return;let n=Math.min(e,(t.stepCount??1)-1);setTimeout(()=>{_(h.value.no,Math.max(0,n),!0)},200)}let de=k(!1);function pe(){de.value=!0}function me(e){G.value?wn.value=Math.min(Math.max(150,e??wn.value),window.innerHeight-200):Cn.value=Math.min(Math.max(300,e??Cn.value),window.innerWidth-200)}return d.resize&&(fe(`pointermove`,e=>{de.value&&me(G.value?window.innerHeight-e.pageY:window.innerWidth-e.pageX)},{passive:!0}),fe(`pointerup`,()=>{de.value=!1}),fe(`resize`,()=>{me()})),(t,n)=>(s(),p(O,null,[F(` Single root so Teleport adds one grid child (handle is fixed inside). `),I(`div`,{class:r([`timeline-dock overflow-hidden`,m(G)?`w-full min-h-0`:`h-full min-w-0`]),style:g(e.resize?{height:m(G)?`${m(wn)}px`:`100%`,width:m(G)?`100%`:`${m(Cn)}px`}:{})},[e.resize?(s(),p(`div`,{key:0,class:r([`fixed bg-gray-400 select-none opacity-0 hover:opacity-10 z-dragging`,m(G)?`left-0 right-0 w-full h-10px`:`top-0 bottom-0 w-10px h-full`]),style:g({opacity:de.value?`0.3`:void 0,bottom:m(G)?`${m(wn)-5}px`:void 0,right:m(G)?void 0:`${m(Cn)-5}px`,cursor:m(G)?`row-resize`:`col-resize`}),onPointerdown:pe},null,38)):F(`v-if`,!0),I(`div`,{class:r([`shadow bg-main p-2 pt-4 grid grid-rows-[max-content_1fr] h-full w-full overflow-hidden`,e.resize?m(G)?`border-t border-gray-400 border-opacity-20`:`border-l border-gray-400 border-opacity-20`:``])},[I(`div`,Zn,[n[5]||=I(`span`,{class:`text-2xl pt-1`},` Timeline `,-1),n[6]||=I(`div`,{class:`flex-auto`},null,-1),e.resize?(s(),p(O,{key:0},[m(G)?(s(),p(`button`,{key:0,title:`Dock to right`,class:`slidev-icon-btn`,onClick:n[0]||=e=>G.value=!1},[...n[2]||=[I(`div`,{class:`i-carbon:open-panel-right`},null,-1)]])):(s(),p(`button`,{key:1,title:`Dock to bottom`,class:`slidev-icon-btn`,onClick:n[1]||=e=>G.value=!0},[...n[3]||=[I(`div`,{class:`i-carbon:open-panel-bottom`},null,-1)]]))],64)):F(`v-if`,!0),I(`button`,{title:`Close`,class:`slidev-icon-btn`,onClick:ie},[...n[4]||=[I(`div`,{class:`i-carbon:close`},null,-1)]])]),I(`div`,Qn,[T.value?(s(),p(`div`,er,[I(`div`,tr,[I(`div`,nr,a(D.value+1)+` / `+a(w.value.length),1),n[9]||=I(`div`,{class:`flex-auto`},null,-1),I(`button`,{class:`step-action-btn add`,title:`Добавить пустой шаг в конец`,onClick:se},[...n[8]||=[I(`div`,{class:`i-carbon:add`},null,-1),I(`span`,null,`шаг`,-1)]])]),v.value?(s(),p(`div`,rr,a(v.value),1)):F(`v-if`,!0),I(`div`,ir,[(s(!0),p(O,null,y(w.value,(e,t)=>(s(),p(`div`,{key:t,class:r([`step-card`,{"step-active":t===D.value,"step-past":t<D.value,"step-future":t>D.value}])},[I(`div`,{class:`step-header`,onClick:e=>ne(t)},[I(`span`,or,a(t+1),1),I(`span`,sr,[P(` Шаг `+a(t+1)+` `,1),e.$clicksAlias?(s(),p(`span`,cr,` (`+a(Array.isArray(e.$clicksAlias)?e.$clicksAlias.join(`, `):e.$clicksAlias)+`) `,1)):F(`v-if`,!0)]),n[10]||=I(`div`,{class:`flex-auto`},null,-1),I(`span`,lr,a(M(t)),1),I(`button`,{class:r([`expand-btn delete-btn`,{"delete-confirm":B.value===t}]),title:B.value===t?`Нажмите ещё раз для удаления`:`Удалить шаг`,disabled:w.value.length<=1,onClick:C(e=>le(t),[`stop`])},[B.value===t?(s(),p(`div`,dr)):(s(),p(`div`,fr))],10,ur),I(`button`,{class:`expand-btn`,onClick:C(e=>j(t),[`stop`])},[A(t)?(s(),p(`div`,mr)):(s(),p(`div`,hr))],8,pr)],8,ar),A(t)?(s(),p(`div`,gr,[(s(!0),p(O,null,y(E.value.filter(e=>R(t,e)),e=>(s(),b(Xn,{key:e,name:e,value:re(t,e),"prev-value":L(t,e),"show-diff":t>0,"step-index":t,path:`timeline.${t}.${e}`,"slide-meta":x.value,onUpdate:ae},null,8,[`name`,`value`,`prev-value`,`show-diff`,`step-index`,`path`,`slide-meta`]))),128)),E.value.some(e=>R(t,e))?F(`v-if`,!0):(s(),p(`div`,_r,` пустой шаг `))])):(s(),p(`div`,{key:1,class:`step-content-collapsed`,onClick:e=>j(t)},[I(`div`,yr,a(M(t))+` изменений • Клик для раскрытия `,1)],8,vr))],2))),128))]),I(`button`,{class:`add-step-footer`,title:`Добавить пустой шаг в конец`,onClick:se},[...n[11]||=[I(`div`,{class:`i-carbon:add`},null,-1),P(` Добавить пустой шаг `,-1)]])])):(s(),p(`div`,$n,[...n[7]||=[P(` Нет таймлайна на этом слайде.`,-1),I(`br`,null,null,-1),P(` Добавьте frontmatter с `,-1),I(`code`,{class:`text-blue-400`},`timeline`,-1)]]))])],2)],6)],2112))}}),[[`__scopeId`,`data-v-99273b12`]]),xr=[{position:1,name:`style-proposal`,src:`./parts/00_style-proposal.md`,hidden:!1},{position:2,name:`intro`,src:`./parts/0_intro.md`,hidden:!1},{position:3,name:`what-is-mfe`,src:`./parts/1_what-is-mfe.md`,hidden:!1},{position:4,name:`modularity`,src:`./parts/2_modularity.md`,hidden:!1},{position:5,name:`monorepo`,src:`./parts/3_monorepo.md`,hidden:!1},{position:6,name:`distributed`,src:`./parts/4_distributed.md`,hidden:!1},{position:7,name:`mfe`,src:`./parts/5_mfe.md`,hidden:!1}],Sr={async renamePart(e,t){return(await fetch(`/__slides_parts_api/rename`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({oldSrc:e,newName:t})})).json()},async createPart(e,t){return(await fetch(`/__slides_parts_api/create`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:e,position:t})})).json()},async deletePart(e){return(await fetch(`/__slides_parts_api/delete`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({src:e})})).json()},async movePart(e,t){return(await fetch(`/__slides_parts_api/move`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({src:e,direction:t})})).json()},async toggleHide(e){return(await fetch(`/__slides_parts_api/toggle-hide`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({src:e})})).json()}},Cr=de(`slidev-show-parts-manager`,!1,{listenToStorageChanges:!1}),K=de(`slidev-parts-manager-vertical`,!1,{listenToStorageChanges:!1}),wr=de(`slidev-parts-manager-width`,typeof window<`u`?window.innerWidth*.3:400,{listenToStorageChanges:!1}),Tr=de(`slidev-parts-manager-height`,typeof window<`u`?window.innerHeight*.4:300,{listenToStorageChanges:!1}),Er={class:`flex pb-2 text-xl -mt-1 items-center`},Dr={class:`relative overflow-y-auto rounded bg-[#1a1a1a] p-2`},Or={key:0,class:`text-white/50 text-center py-8 text-sm`},kr={key:1,class:`flex flex-col gap-1`},Ar={class:`part-info`},jr={class:`part-num`},Mr={class:`part-name`},Nr={key:0,class:`hide-mark`},Pr={class:`part-actions`},Fr=[`onClick`,`disabled`],Ir=[`onClick`,`disabled`],Lr=[`onClick`,`title`],Rr={key:0,class:`i-carbon:view`},zr={key:1,class:`i-carbon:view-off`},Br=[`onClick`],Vr=[`onClick`],Hr={key:2,class:`absolute inset-0 bg-black/60 rounded flex items-center justify-center`},Ur=se(i({__name:`SidePartsManager`,props:{resize:{type:Boolean}},setup(e){let{$slidev:t,$nav:n,$clicksContext:i,$clicks:o,$page:c,$renderContext:l,$frontmatter:u}=H(),d=e,f=k(!1);async function h(){let e=prompt(`Введите имя новой части:`);if(!e)return;let t=prompt(`Введите позицию (оставьте пустым для добавления в конец):`),n=t?parseInt(t):void 0;f.value=!0;try{let t=await Sr.createPart(e,n);t.success||alert(`Ошибка: ${t.error}`)}catch(e){alert(`Ошибка при создании: ${e}`)}finally{f.value=!1}}async function _(e){let t=prompt(`Новое имя для "${e.name}":`,e.name);if(!(!t||t===e.name)){f.value=!0;try{let n=await Sr.renamePart(e.src,t);n.success||alert(`Ошибка: ${n.error}`)}catch(e){alert(`Ошибка при переименовании: ${e}`)}finally{f.value=!1}}}async function v(e){if(confirm(`Вы уверены, что хотите удалить часть "${e.name}"?\n\nФайл: ${e.src}\n\nЭто действие необратимо!`)){f.value=!0;try{let t=await Sr.deletePart(e.src);t.success||alert(`Ошибка: ${t.error}`)}catch(e){alert(`Ошибка при удалении: ${e}`)}finally{f.value=!1}}}async function b(e,t){f.value=!0;try{let n=await Sr.movePart(e.src,t);n.success||alert(`Ошибка: ${n.error}`)}catch(e){alert(`Ошибка при перемещении: ${e}`)}finally{f.value=!1}}async function x(e){f.value=!0;try{let t=await Sr.toggleHide(e.src);t.success||alert(`Ошибка: ${t.error}`)}catch(e){alert(`Ошибка при переключении видимости: ${e}`)}finally{f.value=!1}}function S(){Cr.value=!1}let C=k(!1);function w(){C.value=!0}function T(e){K.value?Tr.value=Math.min(Math.max(200,e??Tr.value),window.innerHeight-200):wr.value=Math.min(Math.max(300,e??wr.value),window.innerWidth-200)}return d.resize&&(fe(`pointermove`,e=>{C.value&&T(K.value?window.innerHeight-e.pageY:window.innerWidth-e.pageX)},{passive:!0}),fe(`pointerup`,()=>{C.value=!1}),fe(`resize`,()=>{T()})),(t,n)=>(s(),p(`div`,{class:r([`parts-dock overflow-hidden`,m(K)?`w-full min-h-0`:`h-full min-w-0`]),style:g(e.resize?{height:m(K)?`${m(Tr)}px`:`100%`,width:m(K)?`100%`:`${m(wr)}px`}:{})},[e.resize?(s(),p(`div`,{key:0,class:r([`fixed bg-gray-400 select-none opacity-0 hover:opacity-10 z-dragging`,m(K)?`left-0 right-0 w-full h-10px`:`top-0 bottom-0 w-10px h-full`]),style:g({opacity:C.value?`0.3`:void 0,bottom:m(K)?`${m(Tr)-5}px`:void 0,right:m(K)?void 0:`${m(wr)-5}px`,cursor:m(K)?`row-resize`:`col-resize`}),onPointerdown:w},null,38)):F(`v-if`,!0),I(`div`,{class:r([`shadow bg-main p-2 pt-4 grid grid-rows-[max-content_1fr] h-full w-full overflow-hidden`,e.resize?m(K)?`border-t border-gray-400 border-opacity-20`:`border-l border-gray-400 border-opacity-20`:``])},[I(`div`,Er,[n[6]||=I(`span`,{class:`text-2xl pt-1`},` Parts `,-1),n[7]||=I(`div`,{class:`flex-auto`},null,-1),e.resize?(s(),p(O,{key:0},[m(K)?(s(),p(`button`,{key:0,title:`Dock to right`,class:`slidev-icon-btn`,onClick:n[0]||=e=>K.value=!1},[...n[2]||=[I(`div`,{class:`i-carbon:open-panel-right`},null,-1)]])):(s(),p(`button`,{key:1,title:`Dock to bottom`,class:`slidev-icon-btn`,onClick:n[1]||=e=>K.value=!0},[...n[3]||=[I(`div`,{class:`i-carbon:open-panel-bottom`},null,-1)]]))],64)):F(`v-if`,!0),I(`button`,{title:`Create part`,class:`slidev-icon-btn`,onClick:h},[...n[4]||=[I(`div`,{class:`i-carbon:add`},null,-1)]]),I(`button`,{title:`Close`,class:`slidev-icon-btn`,onClick:S},[...n[5]||=[I(`div`,{class:`i-carbon:close`},null,-1)]])]),I(`div`,Dr,[m(xr).length===0?(s(),p(`div`,Or,[...n[8]||=[P(` Нет частей слайдов.`,-1),I(`br`,null,null,-1),P(`Нажмите + чтобы создать. `,-1)]])):(s(),p(`div`,kr,[(s(!0),p(O,null,y(m(xr),e=>(s(),p(`div`,{key:e.position,class:r([`part-row`,{"part-hidden":e.hidden}])},[I(`div`,Ar,[I(`span`,jr,a(e.position),1),I(`span`,Mr,[P(a(e.name)+` `,1),e.hidden?(s(),p(`span`,Nr,`⦻`)):F(`v-if`,!0)])]),I(`div`,Pr,[I(`button`,{class:`action`,onClick:t=>b(e,`up`),disabled:e.position===1,title:`⬆`},[...n[9]||=[I(`div`,{class:`i-carbon:arrow-up`},null,-1)]],8,Fr),I(`button`,{class:`action`,onClick:t=>b(e,`down`),disabled:e.position===m(xr).length,title:`⬇`},[...n[10]||=[I(`div`,{class:`i-carbon:arrow-down`},null,-1)]],8,Ir),I(`button`,{class:`action`,onClick:t=>x(e),title:e.hidden?`Показать`:`Скрыть`},[e.hidden?(s(),p(`div`,Rr)):(s(),p(`div`,zr))],8,Lr),I(`button`,{class:`action`,onClick:t=>_(e),title:`Переименовать`},[...n[11]||=[I(`div`,{class:`i-carbon:edit`},null,-1)]],8,Br),I(`button`,{class:`action action-danger`,onClick:t=>v(e),title:`Удалить`},[...n[12]||=[I(`div`,{class:`i-carbon:trash-can`},null,-1)]],8,Vr)])],2))),128))])),f.value?(s(),p(`div`,Hr,[...n[13]||=[I(`div`,{class:`text-2xl animate-spin`},`⏳`,-1)]])):F(`v-if`,!0)])],2)],6))}}),[[`__scopeId`,`data-v-1f399365`]]),Wr=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},Gr=(e,t)=>({classGroupId:e,validator:t}),Kr=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),qr=`-`,Jr=[],Yr=`arbitrary..`,Xr=e=>{let t=$r(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return Qr(e);let n=e.split(qr);return Zr(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?Wr(i,t):t:i||Jr}return n[e]||Jr}}},Zr=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=Zr(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(qr):e.slice(t).join(qr),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},Qr=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?Yr+r:void 0})(),$r=e=>{let{theme:t,classGroups:n}=e;return ei(n,t)},ei=(e,t)=>{let n=Kr();for(let r in e){let i=e[r];ti(i,n,r,t)}return n},ti=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];ni(i,t,n,r)}},ni=(e,t,n,r)=>{if(typeof e==`string`){ri(e,t,n);return}if(typeof e==`function`){ii(e,t,n,r);return}ai(e,t,n,r)},ri=(e,t,n)=>{let r=e===``?t:oi(t,e);r.classGroupId=n},ii=(e,t,n,r)=>{if(si(e)){ti(e(r),t,n,r);return}t.validators===null&&(t.validators=[]),t.validators.push(Gr(n,e))},ai=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];ti(o,oi(t,a),n,r)}},oi=(e,t)=>{let n=e,r=t.split(qr),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=Kr(),n.nextPart.set(t,i)),n=i}return n},si=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,ci=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},li=`!`,ui=`:`,di=[],fi=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),pi=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let o=e[s];if(n===0&&r===0){if(o===ui){t.push(e.slice(i,s)),i=s+1;continue}if(o===`/`){a=s;continue}}o===`[`?n++:o===`]`?n--:o===`(`?r++:o===`)`&&r--}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(li)?(c=s.slice(0,-1),l=!0):s.startsWith(li)&&(c=s.slice(1),l=!0);let u=a&&a>i?a-i:void 0;return fi(t,l,c,u)};if(t){let e=t+ui,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):fi(di,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},mi=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},hi=e=>({cache:ci(e.cacheSize),parseClassName:pi(e),sortModifiers:mi(e),postfixLookupClassGroupIds:gi(e),...Xr(e)}),gi=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},_i=/\s+/,vi=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(_i),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h){l=t+(l.length>0?` `+l:l);continue}if(g=r(p),!g){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+li:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},yi=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=bi(n))&&(i&&(i+=` `),i+=r);return i},bi=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=bi(e[r]))&&(n&&(n+=` `),n+=t);return n},xi=(e,...t)=>{let n,r,i,a,o=o=>(n=hi(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=vi(e,n);return i(e,a),a};return a=o,(...e)=>a(yi(...e))},Si=[],q=e=>{let t=t=>t[e]||Si;return t.isThemeGetter=!0,t},Ci=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,wi=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Ti=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,Ei=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Di=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Oi=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,ki=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ai=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,ji=e=>Ti.test(e),J=e=>!!e&&!Number.isNaN(Number(e)),Mi=e=>!!e&&Number.isInteger(Number(e)),Ni=e=>e.endsWith(`%`)&&J(e.slice(0,-1)),Pi=e=>Ei.test(e),Fi=()=>!0,Ii=e=>Di.test(e)&&!Oi.test(e),Li=()=>!1,Ri=e=>ki.test(e),zi=e=>Ai.test(e),Bi=e=>!Y(e)&&!X(e),Vi=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),Hi=e=>ra(e,sa,Li),Y=e=>Ci.test(e),Ui=e=>ra(e,ca,Ii),Wi=e=>ra(e,la,J),Gi=e=>ra(e,da,Fi),Ki=e=>ra(e,ua,Li),qi=e=>ra(e,aa,Li),Ji=e=>ra(e,oa,zi),Yi=e=>ra(e,fa,Ri),X=e=>wi.test(e),Xi=e=>ia(e,ca),Zi=e=>ia(e,ua),Qi=e=>ia(e,aa),$i=e=>ia(e,sa),ea=e=>ia(e,oa),ta=e=>ia(e,fa,!0),na=e=>ia(e,da,!0),ra=(e,t,n)=>{let r=Ci.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},ia=(e,t,n=!1)=>{let r=wi.exec(e);return r?r[1]?t(r[1]):n:!1},aa=e=>e===`position`||e===`percentage`,oa=e=>e===`image`||e===`url`,sa=e=>e===`length`||e===`size`||e===`bg-size`,ca=e=>e===`length`,la=e=>e===`number`,ua=e=>e===`family-name`,da=e=>e===`number`||e===`weight`,fa=e=>e===`shadow`,pa=xi(()=>{let e=q(`color`),t=q(`font`),n=q(`text`),r=q(`font-weight`),i=q(`tracking`),a=q(`leading`),o=q(`breakpoint`),s=q(`container`),c=q(`spacing`),l=q(`radius`),u=q(`shadow`),d=q(`inset-shadow`),f=q(`text-shadow`),p=q(`drop-shadow`),m=q(`blur`),h=q(`perspective`),g=q(`aspect`),_=q(`ease`),v=q(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],x=()=>[...b(),X,Y],S=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],C=()=>[`auto`,`contain`,`none`],w=()=>[X,Y,c],T=()=>[ji,`full`,`auto`,...w()],E=()=>[Mi,`none`,`subgrid`,X,Y],D=()=>[`auto`,{span:[`full`,Mi,X,Y]},Mi,X,Y],ee=()=>[Mi,`auto`,X,Y],O=()=>[`auto`,`min`,`max`,`fr`,X,Y],k=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],A=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],j=()=>[`auto`,...w()],M=()=>[ji,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...w()],te=()=>[ji,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...w()],N=()=>[ji,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...w()],P=()=>[e,X,Y],F=()=>[...b(),Qi,qi,{position:[X,Y]}],I=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],ne=()=>[`auto`,`cover`,`contain`,$i,Hi,{size:[X,Y]}],re=()=>[Ni,Xi,Ui],L=()=>[``,`none`,`full`,l,X,Y],R=()=>[``,J,Xi,Ui],ie=()=>[`solid`,`dashed`,`dotted`,`double`],ae=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],z=()=>[J,Ni,Qi,qi],oe=()=>[``,`none`,m,X,Y],se=()=>[`none`,J,X,Y],B=()=>[`none`,J,X,Y],V=()=>[J,X,Y],ce=()=>[ji,`full`,...w()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[Pi],breakpoint:[Pi],color:[Fi],container:[Pi],"drop-shadow":[Pi],ease:[`in`,`out`,`in-out`],font:[Bi],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[Pi],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[Pi],shadow:[Pi],spacing:[`px`,J],text:[Pi],"text-shadow":[Pi],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,ji,Y,X,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,X,Y]}],"container-named":[Vi],columns:[{columns:[J,Y,X,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`,`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:x()}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:T()}],"inset-x":[{"inset-x":T()}],"inset-y":[{"inset-y":T()}],start:[{"inset-s":T(),start:T()}],end:[{"inset-e":T(),end:T()}],"inset-bs":[{"inset-bs":T()}],"inset-be":[{"inset-be":T()}],top:[{top:T()}],right:[{right:T()}],bottom:[{bottom:T()}],left:[{left:T()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[Mi,`auto`,X,Y]}],basis:[{basis:[ji,`full`,`auto`,s,...w()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[J,ji,`auto`,`initial`,`none`,Y]}],grow:[{grow:[``,J,X,Y]}],shrink:[{shrink:[``,J,X,Y]}],order:[{order:[Mi,`first`,`last`,`none`,X,Y]}],"grid-cols":[{"grid-cols":E()}],"col-start-end":[{col:D()}],"col-start":[{"col-start":ee()}],"col-end":[{"col-end":ee()}],"grid-rows":[{"grid-rows":E()}],"row-start-end":[{row:D()}],"row-start":[{"row-start":ee()}],"row-end":[{"row-end":ee()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":O()}],"auto-rows":[{"auto-rows":O()}],gap:[{gap:w()}],"gap-x":[{"gap-x":w()}],"gap-y":[{"gap-y":w()}],"justify-content":[{justify:[...k(),`normal`]}],"justify-items":[{"justify-items":[...A(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...A()]}],"align-content":[{content:[`normal`,...k()]}],"align-items":[{items:[...A(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...A(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":k()}],"place-items":[{"place-items":[...A(),`baseline`]}],"place-self":[{"place-self":[`auto`,...A()]}],p:[{p:w()}],px:[{px:w()}],py:[{py:w()}],ps:[{ps:w()}],pe:[{pe:w()}],pbs:[{pbs:w()}],pbe:[{pbe:w()}],pt:[{pt:w()}],pr:[{pr:w()}],pb:[{pb:w()}],pl:[{pl:w()}],m:[{m:j()}],mx:[{mx:j()}],my:[{my:j()}],ms:[{ms:j()}],me:[{me:j()}],mbs:[{mbs:j()}],mbe:[{mbe:j()}],mt:[{mt:j()}],mr:[{mr:j()}],mb:[{mb:j()}],ml:[{ml:j()}],"space-x":[{"space-x":w()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":w()}],"space-y-reverse":[`space-y-reverse`],size:[{size:M()}],"inline-size":[{inline:[`auto`,...te()]}],"min-inline-size":[{"min-inline":[`auto`,...te()]}],"max-inline-size":[{"max-inline":[`none`,...te()]}],"block-size":[{block:[`auto`,...N()]}],"min-block-size":[{"min-block":[`auto`,...N()]}],"max-block-size":[{"max-block":[`none`,...N()]}],w:[{w:[s,`screen`,...M()]}],"min-w":[{"min-w":[s,`screen`,`none`,...M()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...M()]}],h:[{h:[`screen`,`lh`,...M()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...M()]}],"max-h":[{"max-h":[`screen`,`lh`,...M()]}],"font-size":[{text:[`base`,n,Xi,Ui]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,na,Gi]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,Ni,Y]}],"font-family":[{font:[Zi,Ki,t]}],"font-features":[{"font-features":[Y]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,X,Y]}],"line-clamp":[{"line-clamp":[J,`none`,X,Wi]}],leading:[{leading:[a,...w()]}],"list-image":[{"list-image":[`none`,X,Y]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,X,Y]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:P()}],"text-color":[{text:P()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...ie(),`wavy`]}],"text-decoration-thickness":[{decoration:[J,`from-font`,`auto`,X,Ui]}],"text-decoration-color":[{decoration:P()}],"underline-offset":[{"underline-offset":[J,`auto`,X,Y]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:w()}],"tab-size":[{tab:[Mi,X,Y]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,X,Y]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,X,Y]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:F()}],"bg-repeat":[{bg:I()}],"bg-size":[{bg:ne()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},Mi,X,Y],radial:[``,X,Y],conic:[Mi,X,Y]},ea,Ji]}],"bg-color":[{bg:P()}],"gradient-from-pos":[{from:re()}],"gradient-via-pos":[{via:re()}],"gradient-to-pos":[{to:re()}],"gradient-from":[{from:P()}],"gradient-via":[{via:P()}],"gradient-to":[{to:P()}],rounded:[{rounded:L()}],"rounded-s":[{"rounded-s":L()}],"rounded-e":[{"rounded-e":L()}],"rounded-t":[{"rounded-t":L()}],"rounded-r":[{"rounded-r":L()}],"rounded-b":[{"rounded-b":L()}],"rounded-l":[{"rounded-l":L()}],"rounded-ss":[{"rounded-ss":L()}],"rounded-se":[{"rounded-se":L()}],"rounded-ee":[{"rounded-ee":L()}],"rounded-es":[{"rounded-es":L()}],"rounded-tl":[{"rounded-tl":L()}],"rounded-tr":[{"rounded-tr":L()}],"rounded-br":[{"rounded-br":L()}],"rounded-bl":[{"rounded-bl":L()}],"border-w":[{border:R()}],"border-w-x":[{"border-x":R()}],"border-w-y":[{"border-y":R()}],"border-w-s":[{"border-s":R()}],"border-w-e":[{"border-e":R()}],"border-w-bs":[{"border-bs":R()}],"border-w-be":[{"border-be":R()}],"border-w-t":[{"border-t":R()}],"border-w-r":[{"border-r":R()}],"border-w-b":[{"border-b":R()}],"border-w-l":[{"border-l":R()}],"divide-x":[{"divide-x":R()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":R()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...ie(),`hidden`,`none`]}],"divide-style":[{divide:[...ie(),`hidden`,`none`]}],"border-color":[{border:P()}],"border-color-x":[{"border-x":P()}],"border-color-y":[{"border-y":P()}],"border-color-s":[{"border-s":P()}],"border-color-e":[{"border-e":P()}],"border-color-bs":[{"border-bs":P()}],"border-color-be":[{"border-be":P()}],"border-color-t":[{"border-t":P()}],"border-color-r":[{"border-r":P()}],"border-color-b":[{"border-b":P()}],"border-color-l":[{"border-l":P()}],"divide-color":[{divide:P()}],"outline-style":[{outline:[...ie(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[J,X,Y]}],"outline-w":[{outline:[``,J,Xi,Ui]}],"outline-color":[{outline:P()}],shadow:[{shadow:[``,`none`,u,ta,Yi]}],"shadow-color":[{shadow:P()}],"inset-shadow":[{"inset-shadow":[`none`,d,ta,Yi]}],"inset-shadow-color":[{"inset-shadow":P()}],"ring-w":[{ring:R()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:P()}],"ring-offset-w":[{"ring-offset":[J,Ui]}],"ring-offset-color":[{"ring-offset":P()}],"inset-ring-w":[{"inset-ring":R()}],"inset-ring-color":[{"inset-ring":P()}],"text-shadow":[{"text-shadow":[`none`,f,ta,Yi]}],"text-shadow-color":[{"text-shadow":P()}],opacity:[{opacity:[J,X,Y]}],"mix-blend":[{"mix-blend":[...ae(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":ae()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[J]}],"mask-image-linear-from-pos":[{"mask-linear-from":z()}],"mask-image-linear-to-pos":[{"mask-linear-to":z()}],"mask-image-linear-from-color":[{"mask-linear-from":P()}],"mask-image-linear-to-color":[{"mask-linear-to":P()}],"mask-image-t-from-pos":[{"mask-t-from":z()}],"mask-image-t-to-pos":[{"mask-t-to":z()}],"mask-image-t-from-color":[{"mask-t-from":P()}],"mask-image-t-to-color":[{"mask-t-to":P()}],"mask-image-r-from-pos":[{"mask-r-from":z()}],"mask-image-r-to-pos":[{"mask-r-to":z()}],"mask-image-r-from-color":[{"mask-r-from":P()}],"mask-image-r-to-color":[{"mask-r-to":P()}],"mask-image-b-from-pos":[{"mask-b-from":z()}],"mask-image-b-to-pos":[{"mask-b-to":z()}],"mask-image-b-from-color":[{"mask-b-from":P()}],"mask-image-b-to-color":[{"mask-b-to":P()}],"mask-image-l-from-pos":[{"mask-l-from":z()}],"mask-image-l-to-pos":[{"mask-l-to":z()}],"mask-image-l-from-color":[{"mask-l-from":P()}],"mask-image-l-to-color":[{"mask-l-to":P()}],"mask-image-x-from-pos":[{"mask-x-from":z()}],"mask-image-x-to-pos":[{"mask-x-to":z()}],"mask-image-x-from-color":[{"mask-x-from":P()}],"mask-image-x-to-color":[{"mask-x-to":P()}],"mask-image-y-from-pos":[{"mask-y-from":z()}],"mask-image-y-to-pos":[{"mask-y-to":z()}],"mask-image-y-from-color":[{"mask-y-from":P()}],"mask-image-y-to-color":[{"mask-y-to":P()}],"mask-image-radial":[{"mask-radial":[X,Y]}],"mask-image-radial-from-pos":[{"mask-radial-from":z()}],"mask-image-radial-to-pos":[{"mask-radial-to":z()}],"mask-image-radial-from-color":[{"mask-radial-from":P()}],"mask-image-radial-to-color":[{"mask-radial-to":P()}],"mask-image-radial-shape":[{"mask-radial":[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[J]}],"mask-image-conic-from-pos":[{"mask-conic-from":z()}],"mask-image-conic-to-pos":[{"mask-conic-to":z()}],"mask-image-conic-from-color":[{"mask-conic-from":P()}],"mask-image-conic-to-color":[{"mask-conic-to":P()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:F()}],"mask-repeat":[{mask:I()}],"mask-size":[{mask:ne()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,X,Y]}],filter:[{filter:[``,`none`,X,Y]}],blur:[{blur:oe()}],brightness:[{brightness:[J,X,Y]}],contrast:[{contrast:[J,X,Y]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,ta,Yi]}],"drop-shadow-color":[{"drop-shadow":P()}],grayscale:[{grayscale:[``,J,X,Y]}],"hue-rotate":[{"hue-rotate":[J,X,Y]}],invert:[{invert:[``,J,X,Y]}],saturate:[{saturate:[J,X,Y]}],sepia:[{sepia:[``,J,X,Y]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,X,Y]}],"backdrop-blur":[{"backdrop-blur":oe()}],"backdrop-brightness":[{"backdrop-brightness":[J,X,Y]}],"backdrop-contrast":[{"backdrop-contrast":[J,X,Y]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,J,X,Y]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[J,X,Y]}],"backdrop-invert":[{"backdrop-invert":[``,J,X,Y]}],"backdrop-opacity":[{"backdrop-opacity":[J,X,Y]}],"backdrop-saturate":[{"backdrop-saturate":[J,X,Y]}],"backdrop-sepia":[{"backdrop-sepia":[``,J,X,Y]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":w()}],"border-spacing-x":[{"border-spacing-x":w()}],"border-spacing-y":[{"border-spacing-y":w()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,X,Y]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[J,`initial`,X,Y]}],ease:[{ease:[`linear`,`initial`,_,X,Y]}],delay:[{delay:[J,X,Y]}],animate:[{animate:[`none`,v,X,Y]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,X,Y]}],"perspective-origin":[{"perspective-origin":x()}],rotate:[{rotate:se()}],"rotate-x":[{"rotate-x":se()}],"rotate-y":[{"rotate-y":se()}],"rotate-z":[{"rotate-z":se()}],scale:[{scale:B()}],"scale-x":[{"scale-x":B()}],"scale-y":[{"scale-y":B()}],"scale-z":[{"scale-z":B()}],"scale-3d":[`scale-3d`],skew:[{skew:V()}],"skew-x":[{"skew-x":V()}],"skew-y":[{"skew-y":V()}],transform:[{transform:[X,Y,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:x()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:ce()}],"translate-x":[{"translate-x":ce()}],"translate-y":[{"translate-y":ce()}],"translate-z":[{"translate-z":ce()}],"translate-none":[`translate-none`],zoom:[{zoom:[Mi,X,Y]}],accent:[{accent:P()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:P()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,X,Y]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":P()}],"scrollbar-track-color":[{"scrollbar-track":P()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":w()}],"scroll-mx":[{"scroll-mx":w()}],"scroll-my":[{"scroll-my":w()}],"scroll-ms":[{"scroll-ms":w()}],"scroll-me":[{"scroll-me":w()}],"scroll-mbs":[{"scroll-mbs":w()}],"scroll-mbe":[{"scroll-mbe":w()}],"scroll-mt":[{"scroll-mt":w()}],"scroll-mr":[{"scroll-mr":w()}],"scroll-mb":[{"scroll-mb":w()}],"scroll-ml":[{"scroll-ml":w()}],"scroll-p":[{"scroll-p":w()}],"scroll-px":[{"scroll-px":w()}],"scroll-py":[{"scroll-py":w()}],"scroll-ps":[{"scroll-ps":w()}],"scroll-pe":[{"scroll-pe":w()}],"scroll-pbs":[{"scroll-pbs":w()}],"scroll-pbe":[{"scroll-pbe":w()}],"scroll-pt":[{"scroll-pt":w()}],"scroll-pr":[{"scroll-pr":w()}],"scroll-pb":[{"scroll-pb":w()}],"scroll-pl":[{"scroll-pl":w()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,X,Y]}],fill:[{fill:[`none`,...P()]}],"stroke-w":[{stroke:[J,Xi,Ui,Wi]}],stroke:[{stroke:[`none`,...P()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`right`,`left`],"inset-y":[`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`pr`,`pl`],py:[`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`mr`,`ml`],my:[`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-r`,`border-w-l`],"border-w-y":[`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-r`,`border-color-l`],"border-color-y":[`border-color-t`,`border-color-b`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}}),ma={class:`bottom-20px right-20px absolute text-lg opacity-50 bg-black/50 px-3 py-1 rounded-full`},ha={key:1,class:`hud-stamp`},ga=Object.assign({"../../../global-top.vue":{__name:`global-top`,setup(e){let{$slidev:t,$nav:i,$clicksContext:o,$clicks:l,$page:u,$renderContext:d,$frontmatter:f}=H(),{currentSlideNo:g,currentSlideRoute:_,total:v}=z(),y=N(()=>_.value.meta?.slide?.frontmatter||{}),x=N(()=>!1),C=N(()=>Cr.value||Sn.value);function w(){let e=document.getElementById(`page-root`);if(e){if(!C.value){e.style.display=``,e.style.gridTemplateColumns=``,e.style.gridTemplateRows=``;return}e.style.display=`grid`,(Sn.value?G.value:K.value)?(e.style.gridTemplateColumns=`1fr`,e.style.gridTemplateRows=`1fr max-content`):(e.style.gridTemplateRows=`1fr`,e.style.gridTemplateColumns=`1fr max-content`)}}S([Cr,K,Sn,G],()=>{w()});let E=k(!1);return n(async()=>{await c();do await new Promise(e=>setTimeout(e,100));while(!document.getElementById(`page-root`));w(),E.value=!0}),(e,t)=>{let n=Ur,i=br,o=xn,c=bn,l=yn,u=vn,d=nn;return s(),p(`div`,{class:r(y.value.slideClass)},[(s(),b(T,{to:`#page-root`,defer:``,disabled:!E.value},[m(Cr)?(s(),b(n,{key:0,resize:``})):F(`v-if`,!0),m(Sn)?(s(),b(i,{key:1,resize:``})):F(`v-if`,!0)],8,[`disabled`])),x.value?(s(),b(d,{key:0},{default:M(()=>[h(o),h(c),h(l),h(u)]),_:1})):F(`v-if`,!0),I(`div`,ma,a(m(g))+` / `+a(m(v)),1),y.value.chapter?(s(),p(`div`,ha,[I(`span`,null,a(y.value.chapter),1)])):F(`v-if`,!0),I(`div`,{class:r(m(pa)([`absolute pos-20 text-[2.5em] transition-all duration-500`,y.value.topTitleClass]))},a(y.value.topTitle),3)],2)}}}}),_a=Object.assign({}),va=Object.assign({});function ya(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`Shader compilation failed:`,e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function ba(e,t,n){let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(console.error(`Program linking failed:`,e.getProgramInfoLog(r)),null)):null}function xa(e,t,n){let r=e.createFramebuffer(),i=e.createTexture();return!r||!i?null:(e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,n,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE?{fbo:r,texture:i}:(console.error(`Framebuffer not complete`),e.deleteFramebuffer(r),e.deleteTexture(i),null))}async function Sa(e,t,n){let r=e.createTexture();if(!r)return null;e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));try{let n=await Ca(t.source),i=t.options||{},a=i.wrap===`repeat`?e.REPEAT:i.wrap===`mirror`?e.MIRRORED_REPEAT:e.CLAMP_TO_EDGE;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,a);let o=i.filter===`nearest`?e.NEAREST:e.LINEAR;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r}catch(t){return console.error(`Error loading texture:`,t),e.deleteTexture(r),null}}function Ca(e){return typeof e==`string`?new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=n,r.src=e}):Promise.resolve(e)}function wa(e,t,n,r){let i=e.getUniformLocation(t,n);if(i)switch(r.type){case`float`:e.uniform1f(i,r.value);break;case`vec2`:e.uniform2fv(i,r.value);break;case`vec3`:e.uniform3fv(i,r.value);break;case`vec4`:e.uniform4fv(i,r.value);break;case`int`:e.uniform1i(i,r.value);break;case`bool`:e.uniform1i(i,+!!r.value)}}function Ta(e){let t=e.createBuffer();if(!t)return null;let n=new Float32Array([-1,-1,1,-1,-1,1,1,1]);return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),t}function Ea(e,t,n){let r=e.getAttribLocation(t,`aVertexPosition`);e.bindBuffer(e.ARRAY_BUFFER,n),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0)}var Da=class{gl;width;height;quadBuffer=null;programs=[];framebuffers=[];textures={};textureUnits={};uniformLocations={};defaultVertexShader=`
    attribute vec4 aVertexPosition;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = (aVertexPosition.xy + 1.0) / 2.0;
      gl_Position = aVertexPosition;
    }
  `;constructor(e,t,n){this.gl=e,this.width=t,this.height=n,this.quadBuffer=Ta(e),this.gl.enable(this.gl.BLEND),this.gl.getExtension(`OES_standard_derivatives`),this.gl.getExtension(`EXT_shader_texture_lod`),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}async initialize(e){this.cleanup();for(let t=0;t<e.stages.length-1;t++){let e=xa(this.gl,this.width,this.height);if(!e)return console.error(`Failed to create framebuffer for stage ${t}`),!1;this.framebuffers.push(e)}for(let t=0;t<e.stages.length;t++){let n=e.stages[t],r=ya(this.gl,this.gl.VERTEX_SHADER,this.defaultVertexShader),i=ya(this.gl,this.gl.FRAGMENT_SHADER,n.fragmentShader);if(!r||!i)return console.error(`Failed to create shaders for stage ${t}`),!1;let a=ba(this.gl,r,i);if(!a)return console.error(`Failed to create program for stage ${t}`),!1;this.programs.push(a),this.quadBuffer&&Ea(this.gl,a,this.quadBuffer),n.textures&&await this.loadStageTextures(n.textures,t)}return!0}async loadStageTextures(e,t){for(let n=0;n<e.length;n++){let r=e[n],i=r.name||`u_texture${t}_${n}`,a=Object.keys(this.textureUnits).length,o=await Sa(this.gl,r,a);if(o){this.textures[i]=o,this.textureUnits[i]=a;let e=this.programs[t],n=this.gl.getUniformLocation(e,i);n&&this.gl.uniform1i(n,a)}}}render(e,t,n){for(let r=0;r<e.stages.length;r++){let i=e.stages[r],a=this.programs[r];this.gl.useProgram(a),r===e.stages.length-1?this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.framebuffers[r].fbo),this.gl.viewport(0,0,this.width,this.height),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.setStageUniforms(a,i.uniforms||{}),this.setBaseUniforms(a,n),t&&this.setStageUniforms(a,t),this.bindInputTextures(i,r),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4)}}setStageUniforms(e,t){Object.entries(t).forEach(([t,n])=>{wa(this.gl,e,t,n)})}setBaseUniforms(e,t){let n=this.gl.getUniformLocation(e,`u_time`),r=this.gl.getUniformLocation(e,`u_resolution`),i=this.gl.getUniformLocation(e,`u_imageSize`);n&&this.gl.uniform1f(n,performance.now()/1e3),r&&this.gl.uniform2f(r,this.width,this.height),i&&t?.imageSize&&this.gl.uniform2f(i,t.imageSize[0],t.imageSize[1])}bindInputTextures(e,t){if(t>0){let e=this.gl.getUniformLocation(this.programs[t],`u_inputTexture`);if(e){let n=this.framebuffers[t-1];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,n.texture),this.gl.uniform1i(e,0)}}e.textures&&e.textures.forEach((e,n)=>{let r=e.name||`u_texture${t}_${n}`,i=this.textures[r],a=this.textureUnits[r];i!==void 0&&(this.gl.activeTexture(this.gl.TEXTURE0+a),this.gl.bindTexture(this.gl.TEXTURE_2D,i))})}resize(e,t){this.width=e,this.height=t,this.framebuffers.forEach(e=>{this.gl.deleteFramebuffer(e.fbo),this.gl.deleteTexture(e.texture)}),this.framebuffers=[]}cleanup(){this.programs.forEach(e=>{this.gl.deleteProgram(e)}),this.programs=[],this.framebuffers.forEach(e=>{this.gl.deleteFramebuffer(e.fbo),this.gl.deleteTexture(e.texture)}),this.framebuffers=[],Object.values(this.textures).forEach(e=>{this.gl.deleteTexture(e)}),this.textures={},this.textureUnits={},this.uniformLocations={}}destroy(){this.cleanup(),this.quadBuffer&&this.gl.deleteBuffer(this.quadBuffer)}};function Oa(e,t={}){switch(e){case`vignette`:return`
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        
        void main() {
          vec4 color = texture2D(u_texture0_0, v_texCoord);
          
          float borderSize = ${t.borderSize??.2};
          float blurWidth = ${t.blurWidth??.1};
          
          float left = smoothstep(0.0, blurWidth, v_texCoord.x);
          float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
          float top = smoothstep(0.0, blurWidth, v_texCoord.y);
          float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
          
          float vignette = min(min(left, right), min(top, bottom));
          
          gl_FragColor = vec4(color.rgb, color.a * vignette);
        }
      `;case`blur`:return`
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        uniform vec2 u_resolution;
        
        void main() {
          float blurAmount = ${t.blurAmount??1};
          vec2 offset = blurAmount / u_resolution;
          
          vec4 sum = vec4(0.0);
          sum += texture2D(u_texture0_0, v_texCoord + vec2(-2.0 * offset.x, -2.0 * offset.y)) * 0.0625;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(-1.0 * offset.x, -1.0 * offset.y)) * 0.125;
          sum += texture2D(u_texture0_0, v_texCoord) * 0.25;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(1.0 * offset.x, 1.0 * offset.y)) * 0.125;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(2.0 * offset.x, 2.0 * offset.y)) * 0.0625;
          
          gl_FragColor = sum;
        }
      `;default:return`
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        
        void main() {
          gl_FragColor = texture2D(u_texture0_0, v_texCoord);
        }
      `}}function ka(e,t){if(Array.isArray(e)&&e.length>0){let n=e[0];if(Array.isArray(n)&&n.length===2&&typeof n[0]==`string`)return e.map(e=>{let[n,r]=e,i={};r&&Object.entries(r).forEach(([e,t])=>{i[e]={type:`float`,value:t}});let a={fragmentShader:Oa(n,r),uniforms:Object.keys(i).length>0?i:void 0};return t&&(a.textures=[{source:t,options:{flipY:!0}}]),a})}return t?e.map(e=>e.textures&&e.textures.some(e=>e.source!==void 0)?e.textures&&e.textures.length>0&&!e.textures[0].source?{...e,textures:[{...e.textures[0],source:t}]}:e:{...e,textures:[...e.textures||[],{source:t,options:{flipY:!0}}]}):e}var Aa=i({__name:`GlslBackground`,props:{stages:{},resolutionScale:{default:1},fps:{default:60}},setup(e){let{$slidev:t,$nav:r,$clicksContext:i,$clicks:a,$page:o,$renderContext:c,$frontmatter:l}=H(),u=e,d=()=>({stages:ka(u.stages)}),m=k(null),h=k(null),g=null,_=null,v=null,y=0,b=async()=>{if(!g||!h.value)return;let e=d();_=new Da(g,h.value.width,h.value.height),await _.initialize(e)},x=async()=>{if(!h.value||!g||!m.value)return;let e=Math.round(m.value.clientWidth*u.resolutionScale),t=Math.round(m.value.clientHeight*u.resolutionScale);e!==0&&t!==0&&(h.value.width=e,h.value.height=t,g.viewport(0,0,e,t),_&&=(_.destroy(),null),await b())},C=e=>{v=requestAnimationFrame(C),!(!g||!h.value)&&h.value.width!==0&&h.value.height!==0&&(e-y<1e3/u.fps-1||(y=e,g.clearColor(0,0,0,1),g.clear(g.COLOR_BUFFER_BIT),_&&_.render(d(),void 0,{})))};return n(async()=>{if(h.value){if(g=h.value.getContext(`webgl`,{antialias:!1}),!g){console.error(`Unable to initialize WebGL`);return}await x(),window.addEventListener(`resize`,x),v=requestAnimationFrame(C)}}),f(()=>{window.removeEventListener(`resize`,x),v!==null&&cancelAnimationFrame(v),_&&_.destroy(),g?.getExtension(`WEBGL_lose_context`)?.loseContext()}),S(()=>ka(u.stages).map(e=>e.fragmentShader).join(`\0`),async()=>{g&&(_&&=(_.destroy(),null),await b())}),(e,t)=>(s(),p(`div`,{ref_key:`container`,ref:m,class:`absolute inset-0 z-[-10] w-full h-full`},[I(`canvas`,{ref_key:`canvas`,ref:h,id:`glsl-background`,class:`w-full h-full`},null,512)],512))}}),ja=`
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`,Ma=`
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                 mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                 mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

// LOD: число октав шума задаётся перед расчётом поверхности (мелкие тела — меньше октав)
int g_oct = 5;

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    if (i >= g_oct) break;
    v += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return v;
}

float hash1(float n) { return fract(sin(n) * 43758.5453); }
float noise1(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(hash1(i), hash1(i + 1.0), f * f * (3.0 - 2.0 * f));
}

float sphere(vec3 ro, vec3 rd, vec3 c, float r) {
  vec3 oc = ro - c;
  float b = dot(oc, rd);
  float h = b * b - dot(oc, oc) + r * r;
  if (h < 0.0) return -1.0;
  return -b - sqrt(h);
}

void basis(vec3 axis, out vec3 e1, out vec3 e2) {
  e1 = cross(axis, vec3(0.0, 0.0, 1.0));
  e1 = length(e1) < 1e-3 ? vec3(1.0, 0.0, 0.0) : normalize(e1);
  e2 = cross(e1, axis);
}

float ringDensity(float r, float inner, float outer) {
  if (inner <= 0.0 || r < inner || r > outer) return 0.0;
  float x = (r - inner) / (outer - inner);
  float d = 0.45 + 0.55 * noise1(r * 38.0 / inner * 1.32);
  d *= 0.6 + 0.4 * noise1(r * 140.0 / inner * 1.32);
  d *= smoothstep(0.0, 0.08, x) * smoothstep(1.0, 0.82, x);
  d *= 1.0 - 0.92 * smoothstep(0.012, 0.0, abs(x - 0.62));
  d *= 1.0 - 0.5 * smoothstep(0.03, 0.0, abs(x - 0.3));
  return d;
}

vec3 gasSurface(vec3 q, vec3 base, float time) {
  float lat = q.y;
  float w1 = fbm(q * 3.1 + vec3(0.0, 0.0, time * 0.008));
  float w2 = fbm(vec3(q.x * 5.0, lat * 22.0, q.z * 5.0) + w1 * 2.0);
  float y = lat + (w1 - 0.5) * 0.09 + (w2 - 0.5) * 0.035;
  float bandsWide = sin(y * 11.0) * 0.5 + 0.5;
  float bandsThin = sin(y * 47.0 + w2 * 3.0) * 0.5 + 0.5;
  float streaks = fbm(vec3(q.x * 9.0, y * 70.0, q.z * 9.0));
  vec2 sp = vec2(atan(q.z, q.x) - 1.2, (lat + 0.3) * 3.0);
  float storm = smoothstep(0.16, 0.0, length(sp * vec2(1.0, 1.6)));

  vec3 dusk = mix(base * 0.45, vec3(0.16, 0.12, 0.2), 0.45);
  vec3 cream = mix(vec3(0.93, 0.86, 0.84), base, 0.22);
  vec3 rust = mix(vec3(0.72, 0.46, 0.42), base, 0.3);

  vec3 col = mix(dusk, cream, smoothstep(0.15, 0.95, bandsWide));
  col = mix(col, rust, smoothstep(0.55, 1.0, bandsThin) * 0.35);
  col *= 0.82 + 0.3 * streaks;
  col = mix(col, vec3(0.95, 0.78, 0.72), storm * 0.6);
  col *= 1.0 - 0.3 * smoothstep(0.72, 0.98, abs(lat));
  return col;
}

// твёрдая планета: океан цвета base, материки, облака, шапки
vec3 rockySurface(vec3 q, vec3 base, float time, out float spec) {
  float h = fbm(q * 2.2 + 3.7);
  float detail = fbm(q * 9.0);
  float land = smoothstep(0.5, 0.53, h + (detail - 0.5) * 0.08);
  vec3 ocean = mix(base * 0.35, base * 0.75, smoothstep(0.3, 0.5, h));
  vec3 ground = mix(vec3(0.42, 0.38, 0.28), vec3(0.24, 0.34, 0.2), smoothstep(0.52, 0.7, h));
  ground *= 0.8 + 0.4 * detail;
  vec3 col = mix(ocean, ground, land);
  float ice = smoothstep(0.78, 0.9, abs(q.y) + (detail - 0.5) * 0.15);
  col = mix(col, vec3(0.92, 0.95, 1.0), ice);
  float clouds = smoothstep(0.5, 0.75, fbm(q * 3.4 + vec3(time * 0.02, 0.0, 0.0)));
  col = mix(col, vec3(1.0), clouds * 0.85);
  spec = (1.0 - land) * (1.0 - clouds) * (1.0 - ice);
  return col;
}

// кратеры: ячейка 3D-сетки → максимум один кратер (чаша + вал)
float craters(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float h = 0.0;
  for (int x = -1; x <= 1; x++)
  for (int y = -1; y <= 1; y++)
  for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 id = i + g;
    if (hash(id + 2.2) < 0.4) continue;
    vec3 o = vec3(hash(id), hash(id + 11.3), hash(id + 27.1));
    float rad = 0.2 + 0.3 * hash(id + 5.7);
    float d = length(g + o - f) / rad;
    if (d > 1.6) continue;
    float bowl = d < 1.0 ? (d * d - 1.0) * 0.7 : 0.0;
    float rim = 0.4 * exp(-(d - 1.0) * (d - 1.0) * 22.0);
    h += bowl + rim;
  }
  return h;
}

// высота поверхности луны в локальных координатах q (|q| = 1)
float moonHeight(vec3 q, float seed) {
  return 0.35 * fbm(q * 2.5 + seed) + 0.1 * craters(q * 2.6 + seed) + 0.025 * craters(q * 6.5 + seed * 1.7);
}

// WebGL1: uniform-массив индексируется только счётчиком цикла — ось и угол передаём значениями
vec3 satLocal(vec3 n, vec3 ax, float a) {
  vec3 e1; vec3 e2;
  basis(ax, e1, e2);
  vec3 q = vec3(dot(n, e1), dot(n, ax), dot(n, e2));
  q.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * q.xz;
  return q;
}

// альбедо луны (множитель к оттенку) и нормаль рельефа в локальных координатах
float moonAlbedo(vec3 q, float h0, float seed) {
  float maria = smoothstep(0.45, 0.62, fbm(q * 1.4 + seed + 4.0));
  return (0.55 + 0.6 * h0) * (1.0 - 0.35 * maria);
}

vec3 moonNormal(vec3 q, float h0, float seed) {
  vec3 t1 = normalize(cross(q, abs(q.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 t2 = cross(q, t1);
  float eps = 0.012;
  float h1 = moonHeight(normalize(q + t1 * eps), seed);
  float h2 = moonHeight(normalize(q + t2 * eps), seed);
  return normalize(q - 0.9 * ((h1 - h0) * t1 + (h2 - h0) * t2) / eps);
}
`;function Na(e){return`${e?`#extension GL_EXT_shader_texture_lod : enable
`:``}#define BAKED ${+!!e}
precision highp float;
#define MAX_P 3
#define MAX_S 6

uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_eye;
uniform vec3 u_right;
uniform vec3 u_up;
uniform vec3 u_fwd;
uniform float u_focal;
uniform vec2 u_shift;
uniform vec3 u_sun;

uniform vec4 u_pPos[MAX_P];    // xyz, radius (0 — слота нет)
uniform vec3 u_pColor[MAX_P];
uniform vec3 u_pAxis[MAX_P];
uniform vec4 u_pRing[MAX_P];   // inner, outer, orbit, style (0 газ, 1 твёрдая)
uniform vec4 u_pOrbits[MAX_P]; // радиусы орбит спутников планеты (до 4, 0 — нет)
uniform vec4 u_pOrbitA[MAX_P]; // где сейчас спутник на каждой орбите, рад (-1 — орбита без спутника)
uniform float u_pSpin[MAX_P];  // угол поворота, рад

uniform vec4 u_sPos[MAX_S];    // xyz, radius (0 — слота нет)
uniform vec3 u_sColor[MAX_S];
uniform vec3 u_sAxis[MAX_S];   // ось вращения спутника (= ось орбиты)
uniform float u_sRot[MAX_S];   // угол поворота поверхности, рад
uniform float u_fullDetail;    // 1 — процедурный режим без LOD октав (эталон для сравнения)

${Ma}
// тень от любой планеты по направлению на солнце
float planetShadow(vec3 p) {
  float s = 1.0;
  for (int i = 0; i < MAX_P; i++) {
    if (u_pPos[i].w <= 0.0) continue;
    if (sphere(p, u_sun, u_pPos[i].xyz, u_pPos[i].w) > 0.0) s = 0.0;
  }
  return s;
}

// обратное к satLocal: локальный вектор поверхности → мировой
vec3 satWorld(vec3 v, vec3 ax, float a) {
  vec3 e1; vec3 e2;
  basis(ax, e1, e2);
  v.xz = mat2(cos(a), sin(a), -sin(a), cos(a)) * v.xz;
  return v.x * e1 + v.y * ax + v.z * e2;
}


#if BAKED
// запечённые поверхности: A/B — два момента времени, u_pMix — доля B
uniform samplerCube u_pA0;
uniform samplerCube u_pA1;
uniform samplerCube u_pA2;
uniform samplerCube u_pB0;
uniform samplerCube u_pB1;
uniform samplerCube u_pB2;
uniform float u_pMix[MAX_P];
uniform samplerCube u_s0;
uniform samplerCube u_s1;
uniform samplerCube u_s2;
uniform samplerCube u_s3;
uniform samplerCube u_s4;
uniform samplerCube u_s5;
uniform float u_texelAngle;    // угловой размер текселя куб-карты, рад

// явный mip-уровень: след пикселя на поверхности (с учётом наклона) в текселях.
// Неявные производные внутри ветвящегося цикла не определены — поэтому LodEXT.
float texLod(float pxAngle, float facing) {
  return max(0.0, log2(pxAngle / max(facing, 0.15) / u_texelAngle));
}

vec4 planetTex(int i, vec3 q, float lod) {
  if (i == 0) return mix(textureCubeLodEXT(u_pA0, q, lod), textureCubeLodEXT(u_pB0, q, lod), u_pMix[0]);
  if (i == 1) return mix(textureCubeLodEXT(u_pA1, q, lod), textureCubeLodEXT(u_pB1, q, lod), u_pMix[1]);
  return mix(textureCubeLodEXT(u_pA2, q, lod), textureCubeLodEXT(u_pB2, q, lod), u_pMix[2]);
}

vec4 satTex(int i, vec3 q, float lod) {
  if (i == 0) return textureCubeLodEXT(u_s0, q, lod);
  if (i == 1) return textureCubeLodEXT(u_s1, q, lod);
  if (i == 2) return textureCubeLodEXT(u_s2, q, lod);
  if (i == 3) return textureCubeLodEXT(u_s3, q, lod);
  if (i == 4) return textureCubeLodEXT(u_s4, q, lod);
  return textureCubeLodEXT(u_s5, q, lod);
}
#endif

vec3 stars(vec3 rd, float pxAngle) {
  vec3 c = vec3(0.0);
  for (int k = 0; k < 3; k++) {
    float sc = k == 0 ? 90.0 : (k == 1 ? 200.0 : 420.0);
    vec3 p = rd * sc;
    vec3 id = floor(p);
    float h = hash(id + float(k) * 13.1);
    if (h < 0.95) continue;
    vec3 sp = id + vec3(hash(id + 3.1), hash(id + 7.7), hash(id + 1.9));
    float d = length(p - sp) / sc;               // угловое расстояние, рад
    float size = pxAngle * (0.7 + 1.6 * hash(id + 5.3)) * (k == 0 ? 1.4 : 1.0);
    float tw = 0.65 + 0.35 * sin(u_time * (1.5 + 3.0 * h) + h * 50.0);
    float b = smoothstep(size, 0.0, d) * (h - 0.95) * 20.0 * tw;
    vec3 tint = mix(vec3(0.75, 0.82, 1.0), vec3(1.0, 0.88, 0.75), hash(id + 9.9));
    c += tint * b;
  }
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y * 2.0 - u_shift;
  vec3 ro = u_eye;
  vec3 rd = normalize(uv.x * u_right + uv.y * u_up + u_focal * u_fwd);
  float pxK = 2.0 / u_res.y / u_focal; // размер пикселя на единицу дистанции

  // --- непрозрачное: ближайшая сфера
  float tOp = 1e9;
  vec4 op = vec4(0.0);
  for (int i = 0; i < MAX_P; i++) {
    float R = u_pPos[i].w;
    if (R <= 0.0) continue;
    vec3 c = u_pPos[i].xyz;
    float t = sphere(ro, rd, c, R);
    if (t <= 0.0 || t >= tOp) continue;
    tOp = t;
    vec3 p = ro + rd * t;
    vec3 n = normalize(p - c);
    vec3 ax = normalize(u_pAxis[i]);
    vec3 e1; vec3 e2;
    basis(ax, e1, e2);
    vec3 q = vec3(dot(n, e1), dot(n, ax), dot(n, e2));
    float a = u_pSpin[i];
    q.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * q.xz;

#if BAKED
    vec4 tex = planetTex(i, q, texLod(pxK * t / R, dot(n, -rd)));
    vec3 surf = tex.rgb;
    float spec = tex.a;
#else
    float pxR = R / (pxK * t);            // радиус на экране, px
    g_oct = u_fullDetail > 0.5 ? 5 : (pxR < 40.0 ? 3 : (pxR < 150.0 ? 4 : 5));
    float spec = 0.0;
    vec3 surf = u_pRing[i].w > 0.5 ? rockySurface(q, u_pColor[i], u_time, spec) : gasSurface(q, u_pColor[i], u_time);
#endif

    float ndl = dot(n, u_sun);
    float day = smoothstep(-0.08, 0.35, ndl);
    // тень собственных колец
    float rs = 1.0;
    float dn = dot(u_sun, ax);
    if (abs(dn) > 1e-4) {
      float tr = -dot(p - c, ax) / dn;
      if (tr > 0.0) rs = 1.0 - 0.75 * ringDensity(length(p - c + u_sun * tr), u_pRing[i].x, u_pRing[i].y);
    }
    float limb = pow(max(dot(n, -rd), 0.0), 0.35);
    vec3 col = surf * (0.03 + 1.05 * day * rs) * limb;
    vec3 hv = normalize(u_sun - rd);
    col += spec * pow(max(dot(n, hv), 0.0), 60.0) * 0.6 * day;
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    vec3 atmo = mix(u_pColor[i], vec3(0.6, 0.8, 1.0), 0.5);
    col += atmo * fres * smoothstep(-0.25, 0.4, ndl) * 1.1;

    float dmin = length(cross(rd, c - ro));
    float edge = smoothstep(0.0, pxK * t * 1.5, R - dmin);
    op = vec4(col * edge, edge);
  }
  for (int i = 0; i < MAX_S; i++) {
    float r = u_sPos[i].w;
    if (r <= 0.0) continue;
    vec3 c = u_sPos[i].xyz;
    float t = sphere(ro, rd, c, r);
    if (t <= 0.0 || t >= tOp) continue;
    tOp = t;
    vec3 p = ro + rd * t;
    vec3 n = normalize(p - c);
    float sh = planetShadow(p + n * r * 0.01);
    // луна: поверхность вращается вместе со спутником, рельеф — бамп по высоте
    float seed = float(i) * 7.3;
    vec3 sAx = normalize(u_sAxis[i]);
    float sRot = u_sRot[i];
    vec3 q = satLocal(n, sAx, sRot);
#if BAKED
    vec4 tex = satTex(i, q, texLod(pxK * t / r, dot(n, -rd)));
    vec3 nb = satWorld(normalize(tex.rgb * 2.0 - 1.0), sAx, sRot);
    float albedo = tex.a;
#else
    float pxR = r / (pxK * t);            // радиус на экране, px
    g_oct = u_fullDetail > 0.5 ? 5 : (pxR < 12.0 ? 2 : (pxR < 60.0 ? 4 : 5));
    float h0 = moonHeight(q, seed);
    vec3 nb = pxR > 12.0 || u_fullDetail > 0.5 ? satWorld(moonNormal(q, h0, seed), sAx, sRot) : n;
    float albedo = moonAlbedo(q, h0, seed);
#endif
    vec3 tint = mix(vec3(0.55, 0.55, 0.58), u_sColor[i], 0.7);
    vec3 base = tint * albedo;
    float geo = smoothstep(-0.05, 0.3, dot(n, u_sun));   // мягкий терминатор по сфере
    float diff = max(dot(nb, u_sun), 0.0);                // светотень рельефа
    float light = geo * (0.25 + 0.95 * diff) * sh;
    vec3 col = base * (0.02 + 1.15 * light);
    col += pow(1.0 - max(dot(n, -rd), 0.0), 3.0) * u_sColor[i] * 0.3 * (0.25 + 0.75 * geo * sh);
    float dmin = length(cross(rd, c - ro));
    float edge = smoothstep(0.0, pxK * t * 1.5, r - dmin);
    op = vec4(col * edge, edge);
  }

  // --- фон: звёзды и солнце (под непрозрачным телом не считаем)
  vec3 bg = vec3(0.0);
  if (op.a < 0.999) {
    bg = stars(rd, pxK);
    float sd = max(dot(rd, u_sun), 0.0);
    vec3 sunCol = vec3(1.0, 0.93, 0.82);
    bg += sunCol * (smoothstep(0.99985, 0.99995, sd) * 3.0 + pow(sd, 300.0) * 0.6 + pow(sd, 12.0) * 0.06);
  }

  // --- полупрозрачное: плоскость колец+орбиты каждой планеты
  vec4 l0 = vec4(0.0); vec4 l1 = vec4(0.0); vec4 l2 = vec4(0.0);
  float t0 = -1.0; float t1 = -1.0; float t2 = -1.0;
  for (int i = 0; i < MAX_P; i++) {
    float R = u_pPos[i].w;
    if (R <= 0.0) continue;
    vec3 c = u_pPos[i].xyz;
    vec3 ax = normalize(u_pAxis[i]);
    float dn = dot(rd, ax);
    if (abs(dn) < 1e-5) continue;
    float t = -dot(ro - c, ax) / dn;
    if (t <= 0.0 || t >= tOp) continue;
    vec3 q = ro + rd * t - c;
    float r = length(q);
    vec4 layer = vec4(0.0);

    float dens = ringDensity(r, u_pRing[i].x, u_pRing[i].y);
    if (dens > 0.0) {
      float lit = 0.25 + 0.75 * abs(dot(ax, u_sun));
      lit *= 0.15 + 0.85 * planetShadow(ro + rd * t);
      vec3 rc = mix(u_pColor[i], vec3(0.95, 0.88, 0.82), 0.72) * lit * (0.75 + 0.35 * noise1(r * 260.0));
      float a = dens * 0.72;
      layer = vec4(rc * a, a);
    }

    // орбиты спутников: у каждого своя. Сама орбита — едва заметный пунктир,
    // за спутником тянется светящийся шлейф: видно траекторию, но кадр не расчерчен
    vec4 orbits = u_pOrbits[i];
    if (orbits.x > 0.0) {
      vec3 e1; vec3 e2;
      basis(ax, e1, e2);
      float w = pxK * t;
      float phi = atan(dot(q, e2), dot(q, e1));
      vec4 orbitA = u_pOrbitA[i];
      float line = 0.0;
      for (int k = 0; k < 4; k++) {
        float orbit = k == 0 ? orbits.x : (k == 1 ? orbits.y : (k == 2 ? orbits.z : orbits.w));
        float a = k == 0 ? orbitA.x : (k == 1 ? orbitA.y : (k == 2 ? orbitA.z : orbitA.w));
        if (orbit <= 0.0) continue;
        float on = smoothstep(w * 1.6, 0.0, abs(r - orbit));
        float dash = step(0.35, fract(phi * orbit * 21.0 / 6.2831)) * 0.07;
        // угол позади спутника по ходу движения: 0 у спутника, растёт назад
        float behind = a < 0.0 ? 7.0 : mod(a - phi, 6.2831853);
        float trail = exp(-behind * 1.6) * 0.5 * smoothstep(0.0, 0.04, behind);
        line = max(line, on * max(dash, trail));
      }
      line *= 0.2 + 0.8 * planetShadow(ro + rd * t);
      layer = vec4(vec3(0.85, 0.85, 1.0) * line, line) + layer * (1.0 - line);
    }

    if (layer.a <= 0.0) continue;
    if (i == 0) { l0 = layer; t0 = t; }
    else if (i == 1) { l1 = layer; t1 = t; }
    else { l2 = layer; t2 = t; }
  }

  // --- свечение атмосфер и маяки спутников (аддитивно, с проверкой перекрытия)
  vec3 glow = vec3(0.0);
  for (int i = 0; i < MAX_P; i++) {
    float R = u_pPos[i].w;
    if (R <= 0.0) continue;
    vec3 c = u_pPos[i].xyz;
    float along = dot(c - ro, rd);
    if (along <= 0.0 || tOp < along - R) continue;
    float dmin = length(cross(rd, c - ro));
    if (dmin < R) continue;
    vec3 closest = ro + rd * along - c;
    float halo = exp(-(dmin - R) / R * 14.0) * smoothstep(-0.4, 0.6, dot(normalize(closest), u_sun));
    glow += mix(u_pColor[i], vec3(0.6, 0.8, 1.0), 0.5) * halo * 0.55;
  }
  for (int i = 0; i < MAX_S; i++) {
    float r = u_sPos[i].w;
    if (r <= 0.0) continue;
    vec3 c = u_sPos[i].xyz;
    float along = dot(c - ro, rd);
    if (along <= 0.0 || tOp < along - r) continue;
    float dist = length(cross(rd, c - ro));
    // маяк нужен издалека; вблизи, когда спутник крупный, гасим
    float far = smoothstep(0.09, 0.03, r / along * u_focal);
    glow += u_sColor[i] * exp(-dist / (r * 1.6)) * 0.55 * (0.3 + 0.7 * planetShadow(c)) * far;
  }

  // --- композиция: фон → непрозрачное → слои от дальнего к ближнему
  float bgA = clamp(dot(bg, vec3(0.333)), 0.0, 1.0);
  vec3 col = op.rgb + bg * (1.0 - op.a);
  float alpha = op.a + bgA * (1.0 - op.a);

  for (int k = 0; k < 3; k++) {
    float far = -1.0;
    int idx = -1;
    if (t0 > far) { far = t0; idx = 0; }
    if (t1 > far) { far = t1; idx = 1; }
    if (t2 > far) { far = t2; idx = 2; }
    if (idx < 0) break;
    vec4 l = idx == 0 ? l0 : (idx == 1 ? l1 : l2);
    col = l.rgb + col * (1.0 - l.a);
    alpha = l.a + alpha * (1.0 - l.a);
    if (idx == 0) t0 = -1.0;
    else if (idx == 1) t1 = -1.0;
    else t2 = -1.0;
  }

  col += glow;
  alpha = clamp(alpha + dot(glow, vec3(0.333)), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`}var Pa=`
precision highp float;
uniform int u_face;
uniform float u_size;
uniform int u_mode;
uniform vec3 u_color;
uniform float u_seed;
uniform float u_time;
${Ma}

vec3 faceDir(int face, vec2 st) {
  float s = st.x;
  float t = st.y;
  if (face == 0) return vec3(1.0, -t, -s);
  if (face == 1) return vec3(-1.0, -t, s);
  if (face == 2) return vec3(s, 1.0, t);
  if (face == 3) return vec3(s, -1.0, -t);
  if (face == 4) return vec3(s, -t, 1.0);
  return vec3(-s, -t, -1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_size * 2.0 - 1.0;
  vec3 q = normalize(faceDir(u_face, st));
  g_oct = 5;
  if (u_mode == 0) {
    gl_FragColor = vec4(gasSurface(q, u_color, u_time), 0.0);
  } else if (u_mode == 1) {
    float spec = 0.0;
    vec3 c = rockySurface(q, u_color, u_time, spec);
    gl_FragColor = vec4(c, spec);
  } else {
    float h0 = moonHeight(q, u_seed);
    vec3 nb = moonNormal(q, h0, u_seed);
    gl_FragColor = vec4(nb * 0.5 + 0.5, clamp(moonAlbedo(q, h0, u_seed), 0.0, 1.0));
  }
}
`,Fa=class{gl;program;fbo;buf;loc;U;planets=[];satellites=[];rr=0;constructor(e,t,n,r){this.gl=e;let i=e.createProgram(),a=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)||console.error(`[SurfaceBaker]`,e.getShaderInfoLog(r)),r};e.attachShader(i,a(e.VERTEX_SHADER,ja)),e.attachShader(i,a(e.FRAGMENT_SHADER,Pa)),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)||console.error(`[SurfaceBaker]`,e.getProgramInfoLog(i)),this.program=i,this.loc=e.getAttribLocation(i,`a_pos`),this.U=Object.fromEntries([`u_face`,`u_size`,`u_mode`,`u_color`,`u_seed`,`u_time`].map(t=>[t,e.getUniformLocation(i,t)])),this.fbo=e.createFramebuffer(),this.buf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.buf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),n.forEach((e,t)=>{let n=this.createCube();for(let r=0;r<6;r++)this.bakeFace(n,r,2,e.color,t*7.3,0);this.finish(n),this.satellites.push(n)});for(let e of t){let t=[this.createCube(),this.createCube(),this.createCube()];this.planets.push({def:e,tex:t,times:[r,r+4,r+8],progress:0})}this.rebakeAll(r)}rebakeAll(e){for(let t of this.planets){t.times=[e,e+4,e+8];for(let e of[0,1]){for(let n=0;n<6;n++)this.bakePlanetFace(t,e,n);this.finish(t.tex[e])}t.progress=0}}update(e,t=!1){if(!t){for(let t of this.planets)if(e>=t.times[1]&&t.progress>=6){let[n,r,i]=t.tex;t.tex=[r,i,n];let a=Math.max(t.times[2]+4,e+4);t.times=[t.times[1],t.times[2],a],t.progress=0}for(let e=0;e<this.planets.length;e++){let t=this.planets[(this.rr+e)%this.planets.length];if(t.progress<6){this.bakePlanetFace(t,2,t.progress),t.progress++,t.progress===6&&this.finish(t.tex[2]),this.rr=(this.rr+e+1)%this.planets.length;break}}}return this.planets.map(t=>Math.min(1,Math.max(0,(e-t.times[0])/(t.times[1]-t.times[0]))))}bakePlanetFace(e,t,n){this.bakeFace(e.tex[t],n,+(e.def.style===`rocky`),e.def.color,0,e.times[t])}createCube(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,t);for(let t=0;t<6;t++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,e.RGBA,512,512,0,e.RGBA,e.UNSIGNED_BYTE,null);return e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t}bakeFace(e,t,n,r,i,a){let o=this.gl;o.bindFramebuffer(o.FRAMEBUFFER,this.fbo),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+t,e,0),o.viewport(0,0,512,512),o.useProgram(this.program),o.bindBuffer(o.ARRAY_BUFFER,this.buf),o.enableVertexAttribArray(this.loc),o.vertexAttribPointer(this.loc,2,o.FLOAT,!1,0,0),o.uniform1i(this.U.u_face,t),o.uniform1f(this.U.u_size,512),o.uniform1i(this.U.u_mode,n),o.uniform3fv(this.U.u_color,r),o.uniform1f(this.U.u_seed,i),o.uniform1f(this.U.u_time,a),o.disable(o.BLEND),o.drawArrays(o.TRIANGLE_STRIP,0,4),o.bindFramebuffer(o.FRAMEBUFFER,null)}finish(e){let t=this.gl;t.bindTexture(t.TEXTURE_CUBE_MAP,e),t.generateMipmap(t.TEXTURE_CUBE_MAP)}dispose(){let e=this.gl;for(let t of this.planets)t.tex.forEach(t=>e.deleteTexture(t));this.satellites.forEach(t=>e.deleteTexture(t)),e.deleteFramebuffer(this.fbo),e.deleteBuffer(this.buf),e.deleteProgram(this.program)}},Ia=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],La=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],Z=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],Ra=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],za=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],Ba=e=>Math.sqrt(Ra(e,e)),Q=e=>Z(e,1/(Ba(e)||1)),Va=(e,t,n)=>e+(t-e)*n,Ha=(e,t,n)=>[Va(e[0],t[0],n),Va(e[1],t[1],n),Va(e[2],t[2],n)],Ua=Math.PI/180;function Wa(e){let t=Q(e),n=za(t,[0,0,1]);return Ba(n)<.001&&(n=[1,0,0]),n=Q(n),[t,n,za(n,t)]}function Ga(e,t){let n=ht.find(t=>t.id===e);if(!n)return;let r=vt.find(e=>e.id===n.parent),[,i,a]=Wa(r.axis),o=t*n.speed+n.phase;return Ia(r.pos,Z(Ia(Z(i,Math.cos(o)),Z(a,Math.sin(o))),n.orbit??r.orbit??2))}function Ka(e,t){let n=ht.find(t=>t.id===e);if(!n)return;let r=vt.find(e=>e.id===n.parent),i=t*n.speed+n.phase;return{axis:Q(r.axis),angle:-i-t*(n.spin??.125)}}function qa(e,t){let n=ht.find(t=>t.id===e);if(!n)return;let r=vt.find(e=>e.id===n.parent),i=Q(r.axis),a=Q(La(Ga(e,t),r.pos));return{radial:a,axis:i,tangent:za(i,a)}}var Ja=null;function Ya(e){Ja=e}function Xa(e,t){if(Array.isArray(e))return{pos:e,radius:1};if(typeof e==`string`&&(e===W.id||e.startsWith(`${W.id}.`)))return Ja?.(e)??{pos:W.pos,radius:W.radius};let n=vt.find(t=>t.id===e);if(n)return{pos:n.pos,radius:n.radius};let r=ht.find(t=>t.id===e);return r?{pos:Ga(r.id,t),radius:r.radius}:{pos:[0,0,0],radius:1}}function Za(e){if(e==null||typeof e==`string`)return e;if(Array.isArray(e))return e.map(Number);if(typeof e==`object`)return Object.keys(e).sort().map(t=>Number(e[t]))}function Qa(e){let t={...e};return t.shift!==void 0&&(t.shift=Za(t.shift)),t.focus!==void 0&&typeof t.focus!=`string`&&(t.focus=Za(t.focus)),t}function $a(e){return Qa(eo(e))}function eo(e){if(!e||e===`keep`)return{};if(typeof e==`string`)return{...pt[e]};let t=e.preset?pt[e.preset]??{}:{},{preset:n,...r}=e;return{...t,...r}}function to(e){let t=e?.meta?.slide?.filepath?.split(/[\\/]/).pop()?.replace(/\.md$/,``).replace(/^\d+_/,``);return t?_t[t]:void 0}function no(e,t){let n=e?.meta?.slide?.frontmatter??{},r=Array.isArray(n.timeline)?n.timeline:[],i=r.some(e=>e&&`camera`in e),a=n.camera??to(e);if(a===void 0&&!i)return null;let o=$a(a===`keep`?void 0:a);if(i){let e=t===`last`?r.length-1:Math.min(t,r.length-1);for(let t=e;t>=0;t--)if(r[t]&&`camera`in r[t]){o={...o,...$a(r[t].camera)};break}}return a===`keep`&&!i?`keep`:o}function ro(e,t,n){let r=no(e[t-1],n);for(let n=t-1;r===`keep`&&n>=1;n--)r=no(e[n-1],`last`);let i=r&&r!==`keep`?r:$a(gt),a=pt[gt];return{focus:i.focus??a.focus,distance:i.distance??a.distance,yaw:i.yaw??0,pitch:i.pitch??0,shift:i.shift??[0,0],fov:i.fov??a.fov,spin:i.spin??0,follow:i.follow??`world`,duration:i.duration??1.8}}function io(e,t){let n=e?.meta?.slide?.frontmatter??{},r=Array.isArray(n.timeline)?n.timeline:[],i=t===`last`?r.length-1:Math.min(t,r.length-1);for(let e=i;e>=0;e--)if(r[e]&&`station`in r[e])return r[e].station??{};return n.station===void 0?null:n.station??{}}function ao(e,t,n){let r=io(e[t-1],n);for(let n=t-1;r===null&&n>=1;n--)r=io(e[n-1],`last`);let i=e=>(Array.isArray(e)?e:typeof e==`object`&&e?Object.values(e):[]).map(String);return{detached:i(r?.detached),hidden:i(r?.hidden),blueprint:r?.blueprint===!0||String(r?.blueprint)===`true`,mf:r?.mf===!0||String(r?.mf)===`true`,duration:r?.duration??2.2,delay:Number(r?.delay??0)}}var oo=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2;function so(e,t,n){let r=Math.max(-1,Math.min(1,Ra(e,t))),i=Math.acos(r);if(i<1e-4)return Q(Ha(e,t,n));if(Math.PI-i<.001){let r=Q(za(e,Ba(za(e,[0,1,0]))>.001?[0,1,0]:[1,0,0]));return n<.5?so(e,za(r,e),n*2):so(za(r,e),t,n*2-1)}let a=Math.sin(i);return Ia(Z(e,Math.sin((1-n)*i)/a),Z(t,Math.sin(n*i)/a))}var co=e=>.5+e*W.spin;function lo(e,t,n){let r=(e.yaw+n)*Ua+(e.follow===`station`?co(t):0),i=e.pitch*Ua;if(e.follow===`module`&&typeof e.focus==`string`){let n=Xa(e.focus,t).dir;if(n){let e=Math.abs(n[1])>.9?[1,0,0]:[0,1,0],t=Q(La(n,Z(e,Ra(n,e)))),a=Q(za(e,t)),o=Ia(Z(t,Math.cos(r)),Z(a,Math.sin(r))),s=La(Q(mt),Z(e,Ra(Q(mt),e)));return o=Q(Ia(o,Z(Q(s),1.4))),Q(Ia(Z(o,Math.cos(i)),Z(e,Math.sin(i))))}}let a=e.follow===`orbit`&&typeof e.focus==`string`?qa(e.focus,t):void 0;return a?Q(Ia(Z(Ia(Z(a.radial,Math.cos(r)),Z(a.tangent,Math.sin(r))),Math.cos(i)),Z(a.axis,Math.sin(i)))):[Math.cos(i)*Math.sin(r),Math.sin(i),Math.cos(i)*Math.cos(r)]}var uo=class{spec=null;key=``;from=null;start=0;specStart=0;current=null;get moving(){return this.from!==null}setTarget(e,t,n=!1){let r=JSON.stringify(e);r!==this.key&&(this.key=r,this.from=n?null:this.current,this.spec=e,this.start=t,this.specStart=t)}goal(e,t){let n=this.spec,r=Xa(n.focus,e),i=Array.isArray(n.focus)?1:r.radius;return{target:r.pos,dir:lo(n,e,n.spin*(t-this.specStart)/1e3),dist:n.distance*i,shift:n.shift,fov:n.fov}}frame(e,t){if(!this.spec)return null;let n=this.goal(e,t),r=n;if(this.from){let e=Math.min(1,(t-this.start)/1e3/Math.max(.01,this.spec.duration)),i=oo(e),a=this.from,o=Ba(La(n.target,a.target)),s=Math.min(3,o/Math.max(a.dist,n.dist)*.35);r={target:Ha(a.target,n.target,i),dir:so(a.dir,n.dir,i),dist:Math.exp(Va(Math.log(a.dist),Math.log(n.dist),i))*(1+s*Math.sin(Math.PI*i)),shift:[Va(a.shift[0],n.shift[0],i),Va(a.shift[1],n.shift[1],i)],fov:Va(a.fov,n.fov,i)},e>=1&&(this.from=null)}this.current=r;let i=Ia(r.target,Z(r.dir,r.dist)),a=Q(La(r.target,i)),o=za(a,[0,1,0]);Ba(o)<.001&&(o=za(a,[0,0,-1])),o=Q(o);let s=za(o,a);return{eye:i,right:o,up:s,fwd:a,fov:r.fov,shift:r.shift}}},fo=`/speech/slides/2026_holyjs_you-dont-need-microfrontends/assets/station-CMhmkr7b.glb`,$=.05,po=$*1.35,mo=$*3.2,ho=$*.35,go={"+x":new U(1,0,0),"-x":new U(-1,0,0),"+z":new U(0,0,1),"-z":new U(0,0,-1),"-y":new U(0,-1,0)},_o=e=>new st().setRGB(e[0],e[1],e[2],et),vo=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2;function yo(e,t,n,r=!0){let i=document.createElement(`canvas`);i.width=e,i.height=t,n(i.getContext(`2d`));let a=new it(i);return r&&(a.colorSpace=et),a.anisotropy=4,a.wrapS=a.wrapT=Ve,a}var bo=7,xo=()=>(bo=bo*16807%2147483647)/2147483647,So=()=>yo(512,256,e=>{e.fillStyle=`#d4d6db`,e.fillRect(0,0,512,256);for(let t=0;t<512;t+=64)for(let n=0;n<256;n+=42){let r=204+Math.floor(xo()*14);e.fillStyle=`rgb(${r},${r+2},${r+5})`,e.fillRect(t+1,n+1,62,40)}e.strokeStyle=`rgba(60,64,72,0.28)`,e.lineWidth=1;for(let t=0;t<=512;t+=64)e.beginPath(),e.moveTo(t,0),e.lineTo(t,256),e.stroke();for(let t=0;t<=256;t+=42)e.beginPath(),e.moveTo(0,t),e.lineTo(512,t),e.stroke();e.fillStyle=`rgba(60,64,70,0.3)`;for(let t=0;t<400;t++)e.fillRect(Math.floor(xo()*512),Math.floor(xo()*256),2,2)}),Co=()=>yo(256,256,e=>{e.fillStyle=`#b8903c`,e.fillRect(0,0,256,256);for(let t=0;t<900;t++){let t=xo()*256,n=xo()*256,r=20+xo()*40,i=xo()*Math.PI,a=xo();e.strokeStyle=a>.5?`rgba(255,228,150,${.15+a*.25})`:`rgba(90,60,20,${.15+a*.3})`,e.lineWidth=1+xo()*2,e.beginPath(),e.moveTo(t,n),e.lineTo(t+Math.cos(i)*r,n+Math.sin(i)*r),e.stroke()}}),wo=()=>yo(256,512,e=>{e.fillStyle=`#9aa0aa`,e.fillRect(0,0,256,512);let t=512/24;for(let n=0;n<8;n++)for(let r=0;r<24;r++){let i=e.createLinearGradient(n*32,r*t,(n+1)*32,(r+1)*t),a=xo()*.15;i.addColorStop(0,`rgb(${46+a*60},${72+a*60},${150+a*60})`),i.addColorStop(1,`rgb(${26+a*40},${44+a*40},${104+a*50})`),e.fillStyle=i,e.fillRect(n*32+1.5,r*t+1.5,29,18.333333333333332)}}),To=()=>yo(64,64,e=>{let t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,`rgba(255,255,255,1)`),t.addColorStop(.25,`rgba(200,225,255,0.6)`),t.addColorStop(1,`rgba(120,170,255,0)`),e.fillStyle=t,e.fillRect(0,0,64,64)});function Eo(e,t){let n=vt[0],r=new U(...n.pos).sub(new U(...W.pos)).normalize(),i=e=>[(Math.atan2(e.z,e.x)/(2*Math.PI)+.5)*512,(1-(Math.asin(Je.clamp(e.y,-1,1))/Math.PI+.5))*256],a=yo(512,256,e=>{e.fillStyle=`#05050a`,e.fillRect(0,0,512,256);let a=(t,n,r)=>{let[a,o]=i(t);for(let t of[-512,0,512]){let i=e.createRadialGradient(a+t,o,0,a+t,o,n);i.addColorStop(0,r),i.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=i,e.fillRect(0,0,512,256)}},o=n.color.map(e=>Math.round(e*255));a(r,90,`rgba(${o[0]},${o[1]},${o[2]},0.55)`),a(t,40,`rgba(255,245,225,1)`)});a.mapping=303;let o=new rt(e),s=o.fromEquirectangular(a).texture;return o.dispose(),a.dispose(),s}function Do(){return{hull:new ut({map:So(),metalness:.25,roughness:.55}),foil:new ut({map:Co(),metalness:.85,roughness:.3}),dark:new ut({color:2829877,metalness:.6,roughness:.45}),truss:new ut({color:11843776,metalness:.75,roughness:.35}),solar:new ut({map:wo(),metalness:.25,roughness:.38,side:2}),radiator:new ut({color:15264236,metalness:.05,roughness:.75,side:2}),window:new Pe({color:new st(1,.9,.72),toneMapped:!1})}}function Oo(e,t){e.traverse(e=>{e instanceof We&&(e.material=Array.isArray(e.material)?e.material.map(e=>t(e.name)):t(e.material.name))})}var ko=new st(`#9fd8ff`),Ao=new st(`#0b1f3a`);function jo(e,t){return new $e({uniforms:{uLine:{value:e},uFill:{value:Ao.clone().lerp(e,.18)},uOpacity:{value:1},uScanDir:{value:new U(1,0,0)},uScanAt:{value:0}},vertexShader:`
      #include <clipping_planes_pars_vertex>
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
        #include <clipping_planes_vertex>
      }
    `,fragmentShader:`
      #include <clipping_planes_pars_fragment>
      uniform vec3 uLine;
      uniform vec3 uFill;
      uniform float uOpacity;
      uniform vec3 uScanDir;
      uniform float uScanAt;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vWorld;
      void main() {
        #include <clipping_planes_fragment>
        float facing = abs(dot(normalize(vNormal), normalize(vView)));
        // силуэт — только у самого края: плоскости под скользящим углом не выбеливаются
        float rim = pow(1.0 - facing, 3.0);
        float scan = exp(-max(0.0, uScanAt - dot(vWorld, uScanDir)) / 0.012);
        vec3 col = mix(uFill, uLine, rim * 0.75) + vec3(0.75, 0.9, 1.0) * scan;
        gl_FragColor = vec4(col, uOpacity * (0.3 + 0.5 * rim) + scan * 0.6);
      }
    `,transparent:!0,depthWrite:!0,clipping:!0,clippingPlanes:t,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}function Mo(e,t,n){let r=[],i=e/2;for(let n=0;n<=t;n++){let a=-i+e*n/t;r.push(a,0,-i,a,0,i,-i,0,a,i,0,a)}let a=new qe;a.setAttribute(`position`,new at(r,3));let o=new $e({uniforms:{uColor:{value:ko},uOpacity:{value:.16},uRadius:{value:i}},vertexShader:`
      #include <clipping_planes_pars_vertex>
      varying vec2 vXZ;
      void main() {
        vXZ = position.xz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        #include <clipping_planes_vertex>
      }
    `,fragmentShader:`
      #include <clipping_planes_pars_fragment>
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uRadius;
      varying vec2 vXZ;
      void main() {
        #include <clipping_planes_fragment>
        float fade = 1.0 - smoothstep(uRadius * 0.35, uRadius, length(vXZ));
        gl_FragColor = vec4(uColor, uOpacity * fade);
      }
    `,transparent:!0,depthWrite:!1,clipping:!0,clippingPlanes:n});return new dt(a,o)}function No(e,t,n,r){let i=jo(t,n),a=new Ke({color:t,transparent:!0,depthWrite:!1,clippingPlanes:n,toneMapped:!1}),o=new lt({color:t,transparent:!0,opacity:.3,dashSize:.18,gapSize:.14,depthWrite:!1,depthFunc:6,clippingPlanes:n,toneMapped:!1});r.fills.push(i),r.lines.push(a),r.hidden.push(o);let s=[];e.traverse(e=>e instanceof We&&s.push(e));for(let e of s){let t=new We(e.geometry,i);t.renderOrder=10;let n=new Xe(e.geometry,28),s=new dt(n,a);s.renderOrder=11;let c=new dt(n,o);c.computeLineDistances(),c.renderOrder=12;for(let n of[t,s,c])n.visible=!1,e.add(n),r.objects.push(n)}}var Po=new st(`#38bdf8`),Fo=new st(`#9589ea`),Io=(e,t)=>{let n=Math.min(1,Math.max(0,(t-e.start)/(e.duration*1e3)));return Je.lerp(e.from,e.to,vo(n))};function Lo(e){let t=document.createElement(`canvas`);t.width=1024,t.height=200;let n=new it(t);n.colorSpace=et,n.wrapS=Ve,n.repeat.set(3,1),n.anisotropy=8;let r=new Image;return r.onload=()=>{let e=t.getContext(`2d`);e.fillStyle=`#0d1424`,e.fillRect(0,0,t.width,t.height),e.fillStyle=`rgba(56,189,248,0.55)`,e.fillRect(0,10,t.width,4),e.fillRect(0,t.height-14,t.width,4);let i=t.width*.82,a=i*r.height/r.width;e.drawImage(r,(t.width-i)/2,(t.height-a)/2,i,a),n.needsUpdate=!0},r.src=e,n}var Ro=class{canvas;renderer;scene=new Ne;camera=new Ge(50,1,.01,400);root=new nt;body=new nt;modules=new Map;portLights=new Map;ready=!1;sunLight;occluders=[];sun;wasVisible=!1;get visible(){return this.wasVisible}tmp=new U;bp={from:0,to:0,start:-1e9,duration:1};scanReal=new Ie;scanDraft=new Ie;blueprintParts={fills:[],lines:[],hidden:[],objects:[]};realMaterials=new Set;grid=null;sprites=[];mf={from:0,to:0,start:-1e9,duration:1};engine=null;engineRings=[];engineCore=null;constructor(e,t){this.canvas=e,this.sun=new U(...t).normalize(),this.renderer=new ot({canvas:e,alpha:!0,antialias:!0,premultipliedAlpha:!0}),this.renderer.setClearColor(0,0),this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.05,this.renderer.localClippingEnabled=!0,this.scene.environment=Eo(this.renderer,this.sun),this.scene.environmentIntensity=.9,this.sunLight=new tt(16773596,3.2),this.scene.add(this.sunLight,this.sunLight.target),this.scene.add(new Ze(_o(vt[0].color),328968,.35));let n=Do();n.hull.map.repeat.set(2,1);for(let e of W.modules){let t=e.length*$,n=new nt,r=[-1,1].map(e=>{let r=new Be(new He({map:To(),color:12572927,blending:2,depthWrite:!1,transparent:!0,opacity:0}));return r.scale.setScalar($*2.2),this.sprites.push(r.material),r.position.set(e*(t/2+ho+$*.3),0,0),n.add(r),r});this.body.add(n);let i={def:e,pivot:n,length:t,mode:`docked`,from:this.target(e,t,`docked`),start:-1e9,duration:1,thrusters:r,phase:xo()*10};this.apply(i,i.from),this.modules.set(e.id,i)}new ct().loadAsync(fo).then(e=>this.attachModel(e.scene,n)).catch(e=>console.error(`[StationScene] модель станции не загрузилась`,e)),this.body.rotation.set(.32,.5,-.16),this.root.add(this.body),this.root.position.set(...W.pos),this.scene.add(this.root),this.buildEngine();let r=new Pe({colorWrite:!1}),i=new ze(1,64,32);for(let e=0;e<vt.length+ht.length;e++){let e=new We(i,r);e.renderOrder=-1,this.scene.add(e),this.occluders.push(e)}}buildEngine(){let e=new nt,t=new ut({color:2830400,metalness:.85,roughness:.32}),n=new ut({color:13159638,metalness:.7,roughness:.35}),r=$*1,i=$*1.25;for(let a of[-.0625,i]){let i=new We(new Ye(r,r,$*.28,48),t);i.position.y=a,e.add(i);let o=new We(new Le(r,$*.05,8,48),n);o.rotation.x=Math.PI/2,o.position.y=a+Math.sign(a)*-.05*.14,e.add(o)}for(let n=0;n<8;n++){let a=n/8*Math.PI*2,o=new We(new Qe($*.12,i*2,$*.12),t);o.position.set(Math.cos(a)*r*.97,0,Math.sin(a)*r*.97),o.rotation.y=-a,e.add(o)}let a=Lo(`/img/mfe.svg`),o=new We(new Ye(r*1.04,r*1.04,$*.46,96,1,!0),new ut({map:a,emissiveMap:a,emissive:16777215,emissiveIntensity:.8,metalness:.3,roughness:.5}));e.add(o);let s=new Pe({color:Po,toneMapped:!1}),c=new We(new Ye($*.18,$*.18,i*2,24),s);e.add(c);let l=new Be(new He({map:To(),color:Po,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}));l.scale.set($*2.2,$*4.2,1),e.add(l),this.engineCore=l;for(let[t,n]of[-.05*.75,$*.75].entries()){let i=new ut({color:t?Fo:Po,emissive:t?Fo:Po,emissiveIntensity:.9,metalness:.5,roughness:.3}),a=new We(new Le(r*.62,$*.07,10,48,Math.PI*1.6),i);a.rotation.x=Math.PI/2,a.position.y=n,e.add(a),this.engineRings.push(a)}let u=new Pe({color:Po,toneMapped:!1});for(let t of Object.keys(go)){let n=go[t],a=t===`-y`?i:r,o=(t===`-y`?mo/2:po*.97)-a,s=new We(new Ye($*.06,$*.06,o,12),u);s.quaternion.setFromUnitVectors(new U(0,1,0),n),s.position.copy(n).multiplyScalar(a+o/2),e.add(s)}e.visible=!1,this.body.add(e),this.engine=e}updateEngine(e,t){if(!this.engine)return;let n=Io(this.mf,e);this.engine.visible=n>.01,this.engine.visible&&(this.engineRings.forEach((e,r)=>{e.rotation.z=t*(r?-1.6:1.1)*n}),this.engineCore&&(this.engineCore.material.opacity=n*(.75+.2*Math.sin(t*4))),this.engine.scale.setScalar(.85+.15*n))}attachModel(e,t){let n=e=>t[e]??t.hull,r=e.getObjectByName(`hub`);Oo(r,n);for(let e of Object.keys(go)){let t=new Pe({color:16757575,toneMapped:!1});Oo(r.getObjectByName(`port_${e}`),()=>t),this.portLights.set(e,t)}let i=[this.scanDraft];No(r,ko,i,this.blueprintParts),r.removeFromParent(),r.scale.setScalar($),this.body.add(r);for(let t of this.modules.values()){let r=e.getObjectByName(`module_${t.def.id}`);if(!r)continue;let a=_o(t.def.color),o=new ut({color:a,emissive:a,emissiveIntensity:.45,metalness:.3,roughness:.4}),s=new Pe({color:a,toneMapped:!1});Oo(r,e=>e===`accent`?o:e===`navlight`?s:n(e)),No(r,a.clone().lerp(new st(1,1,1),.25),i,this.blueprintParts),r.removeFromParent(),r.position.set(0,0,0),r.scale.setScalar($),t.pivot.add(r)}this.body.traverse(e=>{if(!(!(e instanceof We)||this.blueprintParts.objects.includes(e))&&!this.engine?.getObjectById(e.id))for(let t of Array.isArray(e.material)?e.material:[e.material])t.clippingPlanes=[this.scanReal],this.realMaterials.add(t)});let a=Mo(W.radius*2.2,22,[this.scanDraft]);a.position.y=-W.radius*.8,a.renderOrder=9,a.visible=!1,this.root.add(a),this.grid=a,this.ready=!0}blueprintMix(e){let t=Math.min(1,Math.max(0,(e-this.bp.start)/(this.bp.duration*1e3)));return Je.lerp(this.bp.from,this.bp.to,vo(t))}updateBlueprint(e,t){let n=this.blueprintMix(e),r=this.root.position,i=W.radius*3,a=t.dot(r)-i+2*i*n;this.scanReal.set(t,-a),this.scanDraft.set(t.clone().negate(),a);let o=n>.001&&n<.999;for(let e of this.blueprintParts.fills)e.uniforms.uScanDir.value.copy(t),e.uniforms.uScanAt.value=o?a:1e6;let s=n>.001;for(let e of this.blueprintParts.objects)e.visible=s;this.grid&&(this.grid.visible=s);for(let e of this.sprites)e.visible=n<.999;for(let e of this.realMaterials)e.visible=n<.999}target(e,t,n){let r=go[e.port],i=(e.port===`-y`?new U(0,-.16000000000000003/2,0):r.clone().multiplyScalar(po)).clone().addScaledVector(r,.05+t/2),a=new Fe().setFromUnitVectors(new U(1,0,0),r);if(n===`docked`)return{pos:i,quat:a,scale:1};let o=new U(0,1,0);if(Math.abs(r.y)>.9&&o.set(1,0,0),n===`detached`){let e=new Fe().setFromAxisAngle(o.clone().cross(r).normalize(),.35);return{pos:i.clone().addScaledVector(r,t*.7+$*3).addScaledVector(o,$*1.2),quat:e.multiply(a),scale:1}}return{pos:i.clone().addScaledVector(r,$*60),quat:a,scale:.001}}apply(e,t){e.pivot.position.copy(t.pos),e.pivot.quaternion.copy(t.quat),e.pivot.scale.setScalar(t.scale)}setState(e,t,n=!1){let r=Math.max(0,e.delay||0)*1e3;n=!r&&(n||!this.wasVisible);let i=+!!e.blueprint;i!==this.bp.to&&(this.bp={from:n?i:this.blueprintMix(t),to:i,start:n?-1e9:t+r,duration:e.duration*.9});let a=(i,a)=>a===i.to?i:{from:n?a:Io(i,t),to:a,start:n?-1e9:t+r,duration:e.duration*.6};this.mf=a(this.mf,+!!e.mf);for(let i of this.modules.values()){let a=e.hidden.includes(i.def.id)?`hidden`:e.detached.includes(i.def.id)?`detached`:`docked`;a!==i.mode&&(i.from={pos:i.pivot.position.clone(),quat:i.pivot.quaternion.clone(),scale:i.pivot.scale.x},i.mode=a,i.start=n?-1e9:t+r,i.duration=e.duration*1e3*(a===`hidden`||i.from.scale<.5?1.4:1),n&&this.apply(i,this.target(i.def,i.length,a)))}}resolve(e){if(this.root.updateMatrixWorld(),e===W.id)return{pos:W.pos,radius:W.radius};let t=this.modules.get(e.slice(W.id.length+1));if(!t)return;let n=t.pivot.getWorldPosition(this.tmp),r=go[t.def.port].clone().transformDirection(this.body.matrixWorld);return{pos:[n.x,n.y,n.z],radius:t.length*.6,dir:[r.x,r.y,r.z]}}animate(e,t){this.body.rotation.y=co(e);for(let n of this.modules.values()){let r=this.target(n.def,n.length,n.mode),i=Math.min(1,Math.max(0,(t-n.start)/n.duration)),a=vo(i),o={pos:n.from.pos.clone().lerp(r.pos,a),quat:n.from.quat.clone().slerp(r.quat,a),scale:Je.lerp(n.from.scale,r.scale,a)};if(n.mode===`detached`){let t=Math.sin(e*.5+n.phase)*$*.4*a;o.pos.y+=t,o.quat.multiply(new Fe().setFromAxisAngle(new U(1,0,0),Math.sin(e*.3+n.phase)*.15*a))}this.apply(n,o);let s=i>0&&i<1,c=s?Math.max(0,1-i/.22)+Math.max(0,(i-.78)/.22):0,l=.75+.25*Math.sin(t*.07+n.phase);n.thrusters.forEach((e,t)=>{let r=n.mode!==`docked`,i=t===0===r?c:c*.35;e.material.opacity=Math.min(1,i)*l});let u=this.portLights.get(n.def.port);u&&(s?u.color.set(Math.sin(t*.02)>0?16777215:3158064):u.color.set(n.mode===`docked`?3794316:16753978))}}inView(e,t){let n=new U(...W.pos).sub(new U(...e.eye)),r=new U(...e.fwd),i=n.dot(r),a=W.radius*2.5;if(i<-a)return!1;if(i<a)return!0;let o=n.dot(new U(...e.right))/i*e.fov+e.shift[0],s=n.dot(new U(...e.up))/i*e.fov+e.shift[1],c=a/i*e.fov+.1;return Math.abs(o)<t+c&&Math.abs(s)<1+c}screen={};updateScreen(){let e=this.camera,t=t=>{let n=t.project(e);return[(n.x+1)/2,(1-n.y)/2]},n=new U;this.body.getWorldPosition(n);let r=e.position;for(let e of this.modules.values()){let i=go[e.def.port],a=e.def.port===`-y`?new U(0,-.16000000000000003/2,0):i.clone().multiplyScalar(po),o=this.body.localToWorld(a.addScaledVector(i,$*.3)),s=e.pivot.getWorldPosition(new U),c=s.distanceTo(r)<=n.distanceTo(r)+$*2;this.screen[e.def.id]={module:t(s),port:t(o),mode:e.mode,front:c}}}benchTarget=null;render(e,t,n,r,i,a=!1){let o=this.canvas.getBoundingClientRect(),s=Math.max(1,Math.round(o.width||this.canvas.clientWidth)),c=Math.max(1,Math.round(o.height||this.canvas.clientHeight)),l=Math.min(window.devicePixelRatio||1,1.5);this.renderer.getPixelRatio()!==l&&this.renderer.setPixelRatio(l);let u=this.renderer.getSize(new Re);if((u.x!==s||u.y!==c)&&this.renderer.setSize(s,c,!1),this.animate(t,n),!(this.ready&&this.inView(e,s/c))){this.wasVisible&&this.renderer.clear(),this.wasVisible=!1;return}this.wasVisible=!0;let d=this.camera;d.position.set(...e.eye),d.up.set(...e.up),d.lookAt(e.eye[0]+e.fwd[0],e.eye[1]+e.fwd[1],e.eye[2]+e.fwd[2]),d.fov=Je.radToDeg(2*Math.atan(1/e.fov)),d.aspect=s/c,d.updateProjectionMatrix(),d.projectionMatrix.elements[8]=-e.shift[0]/d.aspect,d.projectionMatrix.elements[9]=-e.shift[1],d.projectionMatrixInverse.copy(d.projectionMatrix).invert(),d.updateMatrixWorld(),this.body.updateMatrixWorld(),this.updateScreen(),this.updateBlueprint(n,new U(...e.right)),this.updateEngine(n,t);let f=0;for(let e=0;e<vt.length;e++,f++)this.occluders[f].position.set(r[e*4],r[e*4+1],r[e*4+2]),this.occluders[f].scale.setScalar(r[e*4+3]||1e-4);for(let e=0;e<ht.length;e++,f++)this.occluders[f].position.set(i[e*4],i[e*4+1],i[e*4+2]),this.occluders[f].scale.setScalar(i[e*4+3]||1e-4);let p=new U(...W.pos),m=1;for(let e of vt){let t=new U(...e.pos).sub(p),n=t.dot(this.sun);if(n<=0)continue;let r=t.clone().sub(this.sun.clone().multiplyScalar(n)).length();m=Math.min(m,Je.smoothstep(r,e.radius*.95,e.radius*1.08))}if(this.sunLight.position.copy(p).addScaledVector(this.sun,10),this.sunLight.target.position.copy(p),this.sunLight.intensity=3.2*m,a){let e=this.renderer.getDrawingBufferSize(new Re);(!this.benchTarget||this.benchTarget.width!==e.x||this.benchTarget.height!==e.y)&&(this.benchTarget?.dispose(),this.benchTarget=new Ue(e.x,e.y,{samples:4})),this.renderer.setRenderTarget(this.benchTarget),this.renderer.render(this.scene,d),this.renderer.setRenderTarget(null);return}this.renderer.render(this.scene,d)}sync(){let e=this.renderer.getContext();this.benchTarget&&this.renderer.setRenderTarget(this.benchTarget),e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array(4)),this.renderer.setRenderTarget(null)}dispose(){this.renderer.dispose(),this.renderer.forceContextLoss(),this.scene.traverse(e=>{e instanceof We&&e.geometry.dispose()})}},zo=i({__name:`UniverseLayer`,setup(t){let{$slidev:r,$nav:i,$clicksContext:a,$clicks:o,$page:c,$renderContext:l,$frontmatter:u}=H(),d=e(`canvas`),m=e(`stationCanvas`),h=z(),g=new uo,_=Q(mt),v=null,y=0,b=!0,x=()=>{},C=null;S(()=>ro(h.slides.value,h.currentSlideNo.value,h.clicks.value),e=>{g.setTarget(e,performance.now(),b),b=!1},{immediate:!0,deep:!0});let w=()=>ao(h.slides.value,h.currentSlideNo.value,h.clicks.value);S(w,e=>C?.setState(e,performance.now()),{deep:!0});let T=`u_res.u_time.u_eye.u_right.u_up.u_fwd.u_focal.u_shift.u_sun.u_pPos.u_pColor.u_pAxis.u_pRing.u_pOrbits.u_pOrbitA.u_pSpin.u_sPos.u_sColor.u_sAxis.u_sRot.u_pMix.u_texelAngle.u_fullDetail.u_pA0.u_pA1.u_pA2.u_pB0.u_pB1.u_pB2.u_s0.u_s1.u_s2.u_s3.u_s4.u_s5`.split(`.`);function E(e,t){let n=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)||console.error(`[UniverseLayer]`,e.getShaderInfoLog(r)),r},r=e.createProgram();if(e.attachShader(r,n(e.VERTEX_SHADER,ja)),e.attachShader(r,n(e.FRAGMENT_SHADER,t)),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))return console.error(`[UniverseLayer]`,e.getProgramInfoLog(r)),null;let i=Object.fromEntries(T.map(t=>[t,e.getUniformLocation(r,t)]));return{program:r,loc:e.getAttribLocation(r,`a_pos`),U:i}}return n(()=>{let e=d.value;if(v=e.getContext(`webgl`,{premultipliedAlpha:!0,alpha:!0,antialias:!1}),!v)return;let t=v,n=!!t.getExtension(`EXT_shader_texture_lod`)&&t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)>=12,r={procedural:E(t,Na(!1))??void 0};n&&(r.baked=E(t,Na(!0))??void 0);let i=r.baked?`baked`:`procedural`,a=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);let o=new Float32Array(12),s=new Float32Array(9),c=new Float32Array(9),l=new Float32Array(12),u=new Float32Array(12),f=new Float32Array(12).fill(-1),p=new Float32Array(3),h=new Float32Array(3);vt.slice(0,3).forEach((e,t)=>{o.set([...e.pos,e.radius],t*4),s.set(e.color,t*3),c.set(Q(e.axis),t*3),l.set([e.ring?.inner??0,e.ring?.outer??0,e.orbit??0,+(e.style===`rocky`)],t*4),u.set(ft(e).slice(0,4),t*4)});let b=new Float32Array(24),S=new Float32Array(18),T=new Float32Array(18),D=new Float32Array(6);ht.slice(0,6).forEach((e,t)=>S.set(e.color,t*3));for(let e of Object.values(r))t.useProgram(e.program),t.uniform4fv(e.U.u_pPos,o),t.uniform3fv(e.U.u_pColor,s),t.uniform3fv(e.U.u_pAxis,c),t.uniform4fv(e.U.u_pRing,l),t.uniform4fv(e.U.u_pOrbits,u),t.uniform3fv(e.U.u_sColor,S),t.uniform3fv(e.U.u_sun,_),[`u_pA0`,`u_pA1`,`u_pA2`,`u_pB0`,`u_pB1`,`u_pB2`,`u_s0`,`u_s1`,`u_s2`,`u_s3`,`u_s4`,`u_s5`].forEach((n,r)=>e.U[n]&&t.uniform1i(e.U[n],r)),t.uniform1f(e.U.u_texelAngle,Math.PI/2/512);let ee=performance.now(),O=e=>(e-ee)/1e3,k=performance.now(),A=r.baked?new Fa(t,vt.slice(0,3),ht.slice(0,6),0):null;A&&(t.finish(),console.info(`[UniverseLayer] поверхности запечены за ${(performance.now()-k).toFixed(0)} мс`)),C=new Ro(m.value,_),C.setState(w(),performance.now(),!0),Ya(e=>C?.resolve(e));let j=1,M=16,te=0,N=0,P=t=>{let n=Math.min(window.devicePixelRatio||1,1.25),r=e.getBoundingClientRect(),i=Math.max(1,Math.round((r.width||e.clientWidth)*n*t)),a=Math.max(1,Math.round((r.height||e.clientHeight)*n*t));(i!==e.width||a!==e.height)&&(e.width=i,e.height=a)},F=t=>{let n=e.width/e.height,r=vt.slice(0,3).map(e=>[e.pos,Math.max(e.radius*1.3,e.ring?.outer??0,Math.max(0,...ft(e))+.2)]);return r.push([W.pos,W.radius*2.5]),r.some(([e,r])=>{let i=La(e,t.eye),a=Ra(i,t.fwd);if(a<-r)return!1;if(a<r)return!0;let o=Ra(i,t.right)/a*t.fov+t.shift[0],s=Ra(i,t.up)/a*t.fov+t.shift[1],c=r/a*t.fov*1.3+.1;return Math.abs(o)<n+c&&Math.abs(s)<1+c})},I=e=>{vt.slice(0,3).forEach((t,n)=>{p[n]=e*t.spin,ft(t).slice(0,4).forEach((r,i)=>{let a=ht.find(e=>e.parent===t.id&&(e.orbit??t.orbit??2)===r),o=a?e*a.speed+a.phase:-1;f[n*4+i]=a?(o%(Math.PI*2)+Math.PI*2)%(Math.PI*2):-1})}),ht.slice(0,6).forEach((t,n)=>{b.set([...Xa(t.id,e).pos,t.radius],n*4);let r=Ka(t.id,e);T.set(r.axis,n*3),D[n]=r.angle})},ne=(n,i,o,s=null,c=!1)=>{let l=r[o];t.bindFramebuffer(t.FRAMEBUFFER,s),t.viewport(0,0,e.width,e.height),t.useProgram(l.program),t.bindBuffer(t.ARRAY_BUFFER,a),t.enableVertexAttribArray(l.loc),t.vertexAttribPointer(l.loc,2,t.FLOAT,!1,0,0),o===`baked`&&A&&(A.planets.forEach((e,n)=>{t.activeTexture(t.TEXTURE0+n),t.bindTexture(t.TEXTURE_CUBE_MAP,e.tex[0]),t.activeTexture(t.TEXTURE0+3+n),t.bindTexture(t.TEXTURE_CUBE_MAP,e.tex[1])}),A.satellites.forEach((e,n)=>{t.activeTexture(t.TEXTURE0+6+n),t.bindTexture(t.TEXTURE_CUBE_MAP,e)}),t.activeTexture(t.TEXTURE0),t.uniform1fv(l.U.u_pMix,h)),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.uniform2f(l.U.u_res,e.width,e.height),t.uniform1f(l.U.u_time,i),t.uniform3fv(l.U.u_eye,n.eye),t.uniform3fv(l.U.u_right,n.right),t.uniform3fv(l.U.u_up,n.up),t.uniform3fv(l.U.u_fwd,n.fwd),t.uniform1f(l.U.u_focal,n.fov),t.uniform2fv(l.U.u_shift,n.shift),t.uniform1fv(l.U.u_pSpin,p),t.uniform4fv(l.U.u_sPos,b),t.uniform4fv(l.U.u_pOrbitA,f),t.uniform3fv(l.U.u_sAxis,T),t.uniform1fv(l.U.u_sRot,D),t.uniform1f(l.U.u_fullDetail,+!!c),t.drawArrays(t.TRIANGLE_STRIP,0,4)},re=()=>{if(!(C?.visible??!1)){je.value&&(je.value=null);return}je.value={...C.screen}},L=e=>{y=requestAnimationFrame(L);let t=O(e),n=g.frame(t,e);if(!n)return;let r=!g.moving&&!F(n);if(r&&e-N<1e3/15)return;let a=N?e-N:16;N=e,r||(M=M*.9+a*.1,!g.moving&&e-te>500&&(te=e,M>24&&j>.55?j=Math.max(.55,j-.1):M<18&&j<1&&(j=Math.min(1,j+.05)))),I(t),A&&h.set(A.update(t,!1)),P(g.moving?j*.65:j);try{ne(n,t,i),C?.render(n,t,e,o,b),re()}catch(e){console.error(`[UniverseLayer]`,e)}};y=requestAnimationFrame(L),x=()=>{Ya(null),C?.dispose(),C=null,A?.dispose(),t.getExtension(`WEBGL_lose_context`)?.loseContext()}}),f(()=>{cancelAnimationFrame(y),x()}),(e,t)=>(s(),p(O,null,[I(`canvas`,{ref_key:`canvas`,ref:d,class:`universe-layer`},null,512),I(`canvas`,{ref_key:`stationCanvas`,ref:m,class:`universe-layer universe-layer--station`},null,512)],64))}}),Bo=`#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_baseColor;
uniform float u_slideNumber;

// Hash → value noise → FBM for soft generative fields
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.04;
  float slide = u_slideNumber * 0.37;

  // Domain warp — soft flowing ribbons
  vec2 q = p * 1.35 + vec2(slide * 0.15, -slide * 0.08);
  q += 0.35 * vec2(
    fbm(q + vec2(0.0, t)),
    fbm(q + vec2(5.2, -t * 0.7))
  );

  vec2 r = q * 1.1;
  r += 0.45 * vec2(
    fbm(r + vec2(1.7 + t * 0.3, 9.2)),
    fbm(r + vec2(8.3, 2.8 - t * 0.25))
  );

  float field = fbm(r * 1.2 + vec2(t * 0.2, slide));
  float ribbons = smoothstep(0.35, 0.75, field);
  float glow = pow(field, 1.8);

  // Soft vignette keeps edges quiet for slide content
  float vignette = 1.0 - smoothstep(0.35, 1.35, length(p));

  // Accent from theme color, kept muted so text stays readable
  vec3 base = u_baseColor.rgb;
  float lum = dot(base, vec3(0.299, 0.587, 0.114));
  vec3 deep = mix(vec3(0.02, 0.025, 0.04), base * 0.12, 0.55);
  vec3 mid = mix(deep, base * (0.35 + lum * 0.25), 0.65);
  vec3 highlight = mix(mid, base * 0.85 + vec3(0.08), 0.4);

  vec3 col = deep;
  col = mix(col, mid, ribbons * 0.85);
  col += highlight * glow * 0.35;
  col *= 0.55 + 0.45 * vignette;

  // Barely-there grain so flat regions don’t look dead
  float grain = (hash(uv * u_resolution.xy + fract(u_time)) - 0.5) * 0.025;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`,Vo=`
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;
uniform float u_shading;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = texture2D(u_inputTexture, uv).rgb;
    float shading = 1. - u_shading;
    gl_FragColor = vec4(color * shading, 1.0);
}
`,Ho=Object.assign({"../../../global-bottom.vue":i({__name:`global-bottom`,setup(e){let{$slidev:t,$nav:n,$clicksContext:i,$clicks:a,$page:o,$renderContext:c,$frontmatter:l}=H(),{currentSlideRoute:u,currentSlideNo:d}=z(),f=N(()=>u.value.meta?.slide?.frontmatter||{}),m=k([0,0,0,1]),g=B(m,{duration:2e3,transition:le.easeOutSine}),_=B(d,{duration:2e3,transition:le.easeOutSine}),v=B(N(()=>f.value.shading?.4:.25),{duration:2e3,transition:le.easeOutSine}),y=N(()=>[{fragmentShader:Bo,uniforms:{u_baseColor:{type:`vec4`,value:g.value},u_slideNumber:{type:`float`,value:_.value}}},{fragmentShader:Vo,uniforms:{u_shading:{type:`float`,value:v.value}}}]);function b(e){return new Promise(t=>setTimeout(t,e))}return S(d,async()=>{let e=`[data-slidev-no="${d.value}"] :is(.slidev-layout, .full)`;for(;!document.querySelector(e);)await b(100);let t=document.querySelector(e),n=getComputedStyle(t).getPropertyValue(`--v-color`);m.value=n.replace(`rgb(`,``).replace(`)`,``).split(`,`).map(e=>Number(e)/255).concat(1)},{immediate:!0}),(e,t)=>(s(),p(`div`,{class:r(f.value.slideClass)},[F(` туманность мягкая: половина разрешения и 30 fps незаметны глазу `),h(Aa,{stages:y.value,"resolution-scale":.5,fps:30},null,8,[`stages`]),h(zo)],2))}})}),Uo=Object.assign({}),Wo=Object.assign({}),Go=Object.assign({}),Ko=Object.assign({}),qo=Object.assign({});function Jo(e,t){if(typeof t!=`object`||!t)return t;(typeof e!=`object`||!e)&&(e={});let n=e;for(let e of Object.keys(t))Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=Jo(n[e],t[e]));return n}function Yo(e){let t=e.length,n=Array.from({length:t},()=>Jo({},e[0]??{})),r={},i=0;for(let a of e){let e=i++,o=t;if(a.$clicksAlias){let t=Array.isArray(a.$clicksAlias)?a.$clicksAlias:[a.$clicksAlias];for(let n of t)r[n]=[e,o]}for(let t=e;t<o;t++)n[t]=Jo(n[t],a)}return{states:n,aliases:r,total:t}}function Xo(e){return!!(e===`fx`||/[-[\]/%:]/.test(e)||/^\[--/.test(e)||/^(opacity|duration|animate|overflow|inset|pointer-events|hidden|absolute|relative|flex|grid)([\w.-]|$)/.test(e))}function Zo(e){let t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.every(Xo):!1}function Qo(e,t){return typeof t==`object`&&t&&!Array.isArray(t)?{...t,"data-editname":e}:typeof t==`string`&&Zo(t)?`${t} editname-${e}`.trim():t}function $o(e,t){let n=N(()=>Yo(e.value||[])),r=w({});return S(()=>{let t=e.value?.[0]??{},r=Object.keys(n.value.aliases);return`${Object.keys(t).join(`\0`)}::${r.join(`\0`)}`},()=>{for(let e of Object.keys(r))delete r[e];let i=e.value?.[0]??{},a=new Set(Object.keys(i));a.delete(`$clicksAlias`);for(let e of a)r[e]=N(()=>Qo(e,n.value.states[t.value]?.[e]));for(let e of Object.keys(n.value.aliases))r[e]=N(()=>n.value.aliases[e]?.[t.value]);r.$stepsCount=N(()=>n.value.total)},{immediate:!0}),r}var es={class:`hidden`,"aria-hidden":`true`},ts=Object.assign({"../../../slide-bottom.vue":i({__name:`slide-bottom`,setup(e){let t=z(),n=H(),r=N(()=>n.$frontmatter.timeline??[]),i=N(()=>r.value.length>0),a=N(()=>n.$page.value),o=N(()=>ke(a.value,n.$renderContext.value)),c=$o(r,N(()=>{if(!i.value)return 0;let e=Math.max(0,r.value.length-1),o=a.value-t.currentSlideNo.value;return o===0?Math.min(n.$clicksContext.current,e):o<0?e:0}));return te(()=>{i.value?Oe(o.value,c):Ee(o.value,c)}),v(()=>{Ee(o.value,c)}),(e,t)=>(s(),p(`span`,es))}})}),ns=[Object.values(Pt)[0],Object.values(Ft)[0],Object.values(ga)[0]].filter(Boolean),rs={render:()=>ns.map(e=>t(e))},is=[Object.values(_a)[0],Object.values(va)[0],Object.values(Ho)[0]].filter(Boolean),as={render:()=>is.map(e=>t(e))},os=[Object.values(Uo)[0],Object.values(Wo)[0],Object.values(Go)[0]].filter(Boolean),ss={render:()=>os.map(e=>t(e))},cs=[Object.values(Ko)[0],Object.values(qo)[0],Object.values(ts)[0]].filter(Boolean),ls={render:()=>cs.map(e=>t(e))},us=[`data-slidev-no`,`lang`],ds=se(i({__name:`SlideWrapper`,props:{clicksContext:{type:Object,required:!0},renderContext:{type:String,default:`slide`},route:{type:Object,required:!0}},setup(e){let t=e,n=N(()=>t.route.meta?.slide?.frontmatter.zoom??1);V(ve,t.route),V(be,t.route.meta.slide.frontmatter),V(ge,k(t.route.no)),V(ye,k(t.renderContext)),V(he,ne(t,`clicksContext`)),V(xe,n);let i=N(()=>({"user-select":R.selectable?void 0:`none`,"--slidev-slide-zoom-scale":n.value===1?void 0:n.value}));return(n,a)=>(s(),p(`div`,{"data-slidev-no":t.route.no,class:r(m(Te)(e.route,[`slide`,`presenter`].includes(t.renderContext)?``:`disable-view-transition`)),style:g(i.value),lang:t.route.meta.slide.frontmatter.lang},[h(m(ls)),(s(),b(l(t.route.component))),h(m(ss))],14,us))}}),[[`__scopeId`,`data-v-680b3375`]]);export{Sn as a,bt as c,Cr as i,as as n,Nt as o,rs as r,Mt as s,ds as t};