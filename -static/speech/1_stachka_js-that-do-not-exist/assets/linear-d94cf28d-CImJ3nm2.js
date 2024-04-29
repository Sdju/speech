import{aG as T,aH as un,aI as H,aJ as J,aK as fn}from"./slidev/Mermaid-DdFFrQWV.js";import{i as cn}from"./init-cc95ec8e-Gi6I4Gst.js";function F(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function hn(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function _(n){let t,i,r;n.length!==2?(t=F,i=(u,c)=>F(n(u),c),r=(u,c)=>n(u)-c):(t=n===F||n===hn?n:mn,i=n,r=n);function e(u,c,o=0,l=u.length){if(o<l){if(t(c,c)!==0)return l;do{const h=o+l>>>1;i(u[h],c)<0?o=h+1:l=h}while(o<l)}return o}function f(u,c,o=0,l=u.length){if(o<l){if(t(c,c)!==0)return l;do{const h=o+l>>>1;i(u[h],c)<=0?o=h+1:l=h}while(o<l)}return o}function a(u,c,o=0,l=u.length){const h=e(u,c,o,l-1);return h>o&&r(u[h-1],c)>-r(u[h],c)?h-1:h}return{left:e,center:a,right:f}}function mn(){return 0}function sn(n){return n===null?NaN:+n}const ln=_(F),gn=ln.right;_(sn).center;const dn=gn,yn=Math.sqrt(50),Mn=Math.sqrt(10),pn=Math.sqrt(2);function R(n,t,i){const r=(t-n)/Math.max(0,i),e=Math.floor(Math.log10(r)),f=r/Math.pow(10,e),a=f>=yn?10:f>=Mn?5:f>=pn?2:1;let u,c,o;return e<0?(o=Math.pow(10,-e)/a,u=Math.round(n*o),c=Math.round(t*o),u/o<n&&++u,c/o>t&&--c,o=-o):(o=Math.pow(10,e)*a,u=Math.round(n/o),c=Math.round(t/o),u*o<n&&++u,c*o>t&&--c),c<u&&.5<=i&&i<2?R(n,t,i*2):[u,c,o]}function wn(n,t,i){if(t=+t,n=+n,i=+i,!(i>0))return[];if(n===t)return[n];const r=t<n,[e,f,a]=r?R(t,n,i):R(n,t,i);if(!(f>=e))return[];const u=f-e+1,c=new Array(u);if(r)if(a<0)for(let o=0;o<u;++o)c[o]=(f-o)/-a;else for(let o=0;o<u;++o)c[o]=(f-o)*a;else if(a<0)for(let o=0;o<u;++o)c[o]=(e+o)/-a;else for(let o=0;o<u;++o)c[o]=(e+o)*a;return c}function L(n,t,i){return t=+t,n=+n,i=+i,R(n,t,i)[2]}function vn(n,t,i){t=+t,n=+n,i=+i;const r=t<n,e=r?L(t,n,i):L(n,t,i);return(r?-1:1)*(e<0?1/-e:e)}function Nn(n,t){t||(t=[]);var i=n?Math.min(t.length,n.length):0,r=t.slice(),e;return function(f){for(e=0;e<i;++e)r[e]=n[e]*(1-f)+t[e]*f;return r}}function kn(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function xn(n,t){var i=t?t.length:0,r=n?Math.min(i,n.length):0,e=new Array(r),f=new Array(i),a;for(a=0;a<r;++a)e[a]=C(n[a],t[a]);for(;a<i;++a)f[a]=t[a];return function(u){for(a=0;a<r;++a)f[a]=e[a](u);return f}}function An(n,t){var i=new Date;return n=+n,t=+t,function(r){return i.setTime(n*(1-r)+t*r),i}}function Sn(n,t){var i={},r={},e;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(e in t)e in n?i[e]=C(n[e],t[e]):r[e]=t[e];return function(f){for(e in i)r[e]=i[e](f);return r}}function C(n,t){var i=typeof t,r;return t==null||i==="boolean"?un(t):(i==="number"?T:i==="string"?(r=H(t))?(t=r,J):fn:t instanceof H?J:t instanceof Date?An:kn(t)?Nn:Array.isArray(t)?xn:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Sn:T)(n,t)}function bn(n,t){return n=+n,t=+t,function(i){return Math.round(n*(1-i)+t*i)}}function jn(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function E(n,t){if((i=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"))<0)return null;var i,r=n.slice(0,i);return[r.length>1?r[0]+r.slice(2):r,+n.slice(i+1)]}function A(n){return n=E(Math.abs(n)),n?n[1]:NaN}function Pn(n,t){return function(i,r){for(var e=i.length,f=[],a=0,u=n[0],c=0;e>0&&u>0&&(c+u+1>r&&(u=Math.max(1,r-c)),f.push(i.substring(e-=u,e+u)),!((c+=u+1)>r));)u=n[a=(a+1)%n.length];return f.reverse().join(t)}}function zn(n){return function(t){return t.replace(/[0-9]/g,function(i){return n[+i]})}}var $n=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function D(n){if(!(t=$n.exec(n)))throw new Error("invalid format: "+n);var t;return new G({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}D.prototype=G.prototype;function G(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}G.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Fn(n){n:for(var t=n.length,i=1,r=-1,e;i<t;++i)switch(n[i]){case".":r=e=i;break;case"0":r===0&&(r=i),e=i;break;default:if(!+n[i])break n;r>0&&(r=0);break}return r>0?n.slice(0,r)+n.slice(e+1):n}var nn;function Rn(n,t){var i=E(n,t);if(!i)return n+"";var r=i[0],e=i[1],f=e-(nn=Math.max(-8,Math.min(8,Math.floor(e/3)))*3)+1,a=r.length;return f===a?r:f>a?r+new Array(f-a+1).join("0"):f>0?r.slice(0,f)+"."+r.slice(f):"0."+new Array(1-f).join("0")+E(n,Math.max(0,t+f-1))[0]}function K(n,t){var i=E(n,t);if(!i)return n+"";var r=i[0],e=i[1];return e<0?"0."+new Array(-e).join("0")+r:r.length>e+1?r.slice(0,e+1)+"."+r.slice(e+1):r+new Array(e-r.length+2).join("0")}const U={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:jn,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>K(n*100,t),r:K,s:Rn,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Y(n){return n}var Z=Array.prototype.map,Q=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function En(n){var t=n.grouping===void 0||n.thousands===void 0?Y:Pn(Z.call(n.grouping,Number),n.thousands+""),i=n.currency===void 0?"":n.currency[0]+"",r=n.currency===void 0?"":n.currency[1]+"",e=n.decimal===void 0?".":n.decimal+"",f=n.numerals===void 0?Y:zn(Z.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",u=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function o(h){h=D(h);var s=h.fill,p=h.align,y=h.sign,S=h.symbol,N=h.zero,b=h.width,I=h.comma,w=h.precision,B=h.trim,g=h.type;g==="n"?(I=!0,g="g"):U[g]||(w===void 0&&(w=12),B=!0,g="g"),(N||s==="0"&&p==="=")&&(N=!0,s="0",p="=");var en=S==="$"?i:S==="#"&&/[boxX]/.test(g)?"0"+g.toLowerCase():"",on=S==="$"?r:/[%p]/.test(g)?a:"",O=U[g],an=/[defgprs%]/.test(g);w=w===void 0?6:/[gprs]/.test(g)?Math.max(1,Math.min(21,w)):Math.max(0,Math.min(20,w));function V(m){var v=en,d=on,k,X,j;if(g==="c")d=O(m)+d,m="";else{m=+m;var P=m<0||1/m<0;if(m=isNaN(m)?c:O(Math.abs(m),w),B&&(m=Fn(m)),P&&+m==0&&y!=="+"&&(P=!1),v=(P?y==="("?y:u:y==="-"||y==="("?"":y)+v,d=(g==="s"?Q[8+nn/3]:"")+d+(P&&y==="("?")":""),an){for(k=-1,X=m.length;++k<X;)if(j=m.charCodeAt(k),48>j||j>57){d=(j===46?e+m.slice(k+1):m.slice(k))+d,m=m.slice(0,k);break}}}I&&!N&&(m=t(m,1/0));var z=v.length+m.length+d.length,M=z<b?new Array(b-z+1).join(s):"";switch(I&&N&&(m=t(M+m,M.length?b-d.length:1/0),M=""),p){case"<":m=v+m+d+M;break;case"=":m=v+M+m+d;break;case"^":m=M.slice(0,z=M.length>>1)+v+m+d+M.slice(z);break;default:m=M+v+m+d;break}return f(m)}return V.toString=function(){return h+""},V}function l(h,s){var p=o((h=D(h),h.type="f",h)),y=Math.max(-8,Math.min(8,Math.floor(A(s)/3)))*3,S=Math.pow(10,-y),N=Q[8+y/3];return function(b){return p(S*b)+N}}return{format:o,formatPrefix:l}}var $,tn,rn;Dn({thousands:",",grouping:[3],currency:["$",""]});function Dn(n){return $=En(n),tn=$.format,rn=$.formatPrefix,$}function In(n){return Math.max(0,-A(Math.abs(n)))}function Tn(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(A(t)/3)))*3-A(Math.abs(n)))}function Ln(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,A(t)-A(n))+1}function qn(n){return function(){return n}}function Cn(n){return+n}var W=[0,1];function x(n){return n}function q(n,t){return(t-=n=+n)?function(i){return(i-n)/t}:qn(isNaN(t)?NaN:.5)}function Gn(n,t){var i;return n>t&&(i=n,n=t,t=i),function(r){return Math.max(n,Math.min(t,r))}}function Bn(n,t,i){var r=n[0],e=n[1],f=t[0],a=t[1];return e<r?(r=q(e,r),f=i(a,f)):(r=q(r,e),f=i(f,a)),function(u){return f(r(u))}}function On(n,t,i){var r=Math.min(n.length,t.length)-1,e=new Array(r),f=new Array(r),a=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<r;)e[a]=q(n[a],n[a+1]),f[a]=i(t[a],t[a+1]);return function(u){var c=dn(n,u,1,r)-1;return f[c](e[c](u))}}function Vn(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Xn(){var n=W,t=W,i=C,r,e,f,a=x,u,c,o;function l(){var s=Math.min(n.length,t.length);return a!==x&&(a=Gn(n[0],n[s-1])),u=s>2?On:Bn,c=o=null,h}function h(s){return s==null||isNaN(s=+s)?f:(c||(c=u(n.map(r),t,i)))(r(a(s)))}return h.invert=function(s){return a(e((o||(o=u(t,n.map(r),T)))(s)))},h.domain=function(s){return arguments.length?(n=Array.from(s,Cn),l()):n.slice()},h.range=function(s){return arguments.length?(t=Array.from(s),l()):t.slice()},h.rangeRound=function(s){return t=Array.from(s),i=bn,l()},h.clamp=function(s){return arguments.length?(a=s?!0:x,l()):a!==x},h.interpolate=function(s){return arguments.length?(i=s,l()):i},h.unknown=function(s){return arguments.length?(f=s,h):f},function(s,p){return r=s,e=p,l()}}function Hn(){return Xn()(x,x)}function Jn(n,t,i,r){var e=vn(n,t,i),f;switch(r=D(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return r.precision==null&&!isNaN(f=Tn(e,a))&&(r.precision=f),rn(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(f=Ln(e,Math.max(Math.abs(n),Math.abs(t))))&&(r.precision=f-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(f=In(e))&&(r.precision=f-(r.type==="%")*2);break}}return tn(r)}function Kn(n){var t=n.domain;return n.ticks=function(i){var r=t();return wn(r[0],r[r.length-1],i??10)},n.tickFormat=function(i,r){var e=t();return Jn(e[0],e[e.length-1],i??10,r)},n.nice=function(i){i==null&&(i=10);var r=t(),e=0,f=r.length-1,a=r[e],u=r[f],c,o,l=10;for(u<a&&(o=a,a=u,u=o,o=e,e=f,f=o);l-- >0;){if(o=L(a,u,i),o===c)return r[e]=a,r[f]=u,t(r);if(o>0)a=Math.floor(a/o)*o,u=Math.ceil(u/o)*o;else if(o<0)a=Math.ceil(a*o)/o,u=Math.floor(u*o)/o;else break;c=o}return n},n}function Un(){var n=Hn();return n.copy=function(){return Vn(n,Un())},cn.apply(n,arguments),Kn(n)}export{Vn as a,_ as b,Hn as c,Un as l,vn as t};
