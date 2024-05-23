import{g as H,G as J,H as T,J as Y,K as W,L as X,M as Z,N as ee,O as ne,P as se,Q as te,R as oe}from"../modules/unplugin-icons-DADCGqEf.js";import{d as L,t as $,Q as le,aD as ae,o as g,b as B,f as re,h as M,A as e,c as h,k as o,l as n,i as l,e as i,x as ie,aa as m,ab as ue,ad as ce,F as de,an as b,g as _e}from"../modules/vue-CEhIG5sE.js";import{L as pe}from"../modules/shiki-BG8OyNGT.js";import{c as me}from"./DrawingPreview-zOW_LfvQ.js";import{V as x}from"./ContextMenu-BTrgbMI1.js";import{_ as z}from"../index-cSheY8bB.js";import{I as a}from"./IconButton-BiGVoWX6.js";import"./context-DnnVJTHb.js";import"../modules/file-saver-DY7lxZlc.js";const ge=L({__name:"Draggable",props:{storageKey:{type:String,required:!1},initial:{type:Object,required:!1}},setup(D){const u=D,v=$(null),f=u.initial??{x:0,y:0},k=u.storageKey?le(u.storageKey,f):$(f),{style:y}=ae(v,{initialValue:k});return(w,d)=>(g(),B("div",{ref_key:"el",ref:v,class:"fixed",style:M(e(y))},[re(w.$slots,"default")],4))}}),ve=z(ge,[["__file","C:/Users/DChernov/home/pr/test/speech/2024/3_msk-vuejs_50-shades-of-vue-reactivity/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/Draggable.vue"]]),fe=i("svg",{width:"1em",height:"1em",class:"-mt-0.5",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},[i("path",{d:"M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42z",fill:"currentColor"})],-1),we=i("svg",{viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"},[i("line",{x1:"2",y1:"15",x2:"22",y2:"4",stroke:"currentColor","stroke-width":"1","stroke-linecap":"round"}),i("line",{x1:"2",y1:"24",x2:"28",y2:"10",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"}),i("line",{x1:"7",y1:"31",x2:"29",y2:"19",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round"})],-1),be={class:"flex bg-main p-2"},ke={class:"inline-block w-7 text-center"},ye={class:"pt-.5"},Ce=L({__name:"DrawingControls",setup(D){const{brush:u,canClear:v,canRedo:f,canUndo:k,clear:y,drauu:w,drawingEnabled:d,drawingMode:r,drawingPinned:c,brushColors:S}=me();function V(){w.undo()}function U(){w.redo()}let C="stylus";function _(p){r.value=p,d.value=!0,p!=="eraseLine"&&(C=p)}function j(p){u.color=p,d.value=!0,r.value=C}return(p,s)=>{const K=H,N=J,R=T,A=Y,E=W,P=X,q=Z,F=ee,I=ne,O=se,Q=te,G=oe;return g(),h(ve,{class:l(["flex flex-wrap text-xl p-2 gap-1 rounded-md bg-main shadow transition-opacity duration-200 z-20 border border-main",e(d)?"":e(c)?"opacity-40 hover:opacity-90":"opacity-0 pointer-events-none"]),"storage-key":"slidev-drawing-pos","initial-x":10,"initial-y":10},{default:o(()=>[n(a,{title:"Draw with stylus",class:l({shallow:e(r)!=="stylus"}),onClick:s[0]||(s[0]=t=>_("stylus"))},{default:o(()=>[n(K)]),_:1},8,["class"]),n(a,{title:"Draw a line",class:l({shallow:e(r)!=="line"}),onClick:s[1]||(s[1]=t=>_("line"))},{default:o(()=>[fe]),_:1},8,["class"]),n(a,{title:"Draw an arrow",class:l({shallow:e(r)!=="arrow"}),onClick:s[2]||(s[2]=t=>_("arrow"))},{default:o(()=>[n(N)]),_:1},8,["class"]),n(a,{title:"Draw an ellipse",class:l({shallow:e(r)!=="ellipse"}),onClick:s[3]||(s[3]=t=>_("ellipse"))},{default:o(()=>[n(R)]),_:1},8,["class"]),n(a,{title:"Draw a rectangle",class:l({shallow:e(r)!=="rectangle"}),onClick:s[4]||(s[4]=t=>_("rectangle"))},{default:o(()=>[n(A)]),_:1},8,["class"]),n(a,{title:"Erase",class:l({shallow:e(r)!=="eraseLine"}),onClick:s[5]||(s[5]=t=>_("eraseLine"))},{default:o(()=>[n(E)]),_:1},8,["class"]),n(x),n(e(pe),null,{popper:o(()=>[i("div",be,[i("div",ke,ie(e(u).size),1),i("div",ye,[m(i("input",{"onUpdate:modelValue":s[6]||(s[6]=t=>e(u).size=t),type:"range",min:"1",max:"15",onChange:s[7]||(s[7]=t=>r.value=e(C))},null,544),[[ue,e(u).size]])])])]),default:o(()=>[n(a,{title:"Adjust stroke width",class:l({shallow:e(r)==="eraseLine"})},{default:o(()=>[we]),_:1},8,["class"])]),_:1}),(g(!0),B(de,null,ce(e(S),t=>(g(),h(a,{key:t,title:"Set brush color",class:l(e(u).color===t&&e(r)!=="eraseLine"?"active":"shallow"),onClick:he=>j(t)},{default:o(()=>[i("div",{class:l(["w-6 h-6 transition-all transform border",e(u).color!==t?"rounded-1/2 scale-85 border-white":"rounded-md border-gray-300/50"]),style:M(e(d)?{background:t}:{borderColor:t})},null,6)]),_:2},1032,["class","onClick"]))),128)),n(x),n(a,{title:"Undo",class:l({disabled:!e(k)}),onClick:s[8]||(s[8]=t=>V())},{default:o(()=>[n(P)]),_:1},8,["class"]),n(a,{title:"Redo",class:l({disabled:!e(f)}),onClick:s[9]||(s[9]=t=>U())},{default:o(()=>[n(q)]),_:1},8,["class"]),n(a,{title:"Delete",class:l({disabled:!e(v)}),onClick:s[10]||(s[10]=t=>e(y)())},{default:o(()=>[n(F)]),_:1},8,["class"]),n(x),n(a,{title:e(c)?"Unpin drawing":"Pin drawing",class:l({shallow:!e(c)}),onClick:s[11]||(s[11]=t=>c.value=!e(c))},{default:o(()=>[m(n(I,{class:"transform -rotate-45"},null,512),[[b,e(c)]]),m(n(O,null,null,512),[[b,!e(c)]])]),_:1},8,["title","class"]),e(d)?(g(),h(a,{key:0,title:e(c)?"Drawing pinned":"Drawing unpinned",class:l({shallow:!e(d)}),onClick:s[12]||(s[12]=t=>d.value=!e(d))},{default:o(()=>[m(n(Q,null,null,512),[[b,e(c)]]),m(n(G,null,null,512),[[b,!e(c)]])]),_:1},8,["title","class"])):_e("v-if",!0)]),_:1},8,["class"])}}}),Ue=z(Ce,[["__file","C:/Users/DChernov/home/pr/test/speech/2024/3_msk-vuejs_50-shades-of-vue-reactivity/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/internals/DrawingControls.vue"]]);export{Ue as default};
