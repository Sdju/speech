import{d as K,z as lt,v as z,t as q,K as ct,E as ht,n as H,ag as pt,M as gt,o as mt,b as yt,l as dt,B as D}from"./modules/vue-CS4oGUrH.js";import{v as bt,a as _t,ag as vt,C as wt,aj as St,ak as At}from"./index-DDFrjfzF.js";import{a as Mt}from"./modules/file-saver-igGfcqei.js";import{u as Ct}from"./slidev/context-lAbIHGW1.js";var I={exports:{}};I.exports;(function(t){var e=function(){var r=String.fromCharCode,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={};function c(o,a){if(!i[o]){i[o]={};for(var h=0;h<o.length;h++)i[o][o.charAt(h)]=h}return i[o][a]}var f={compressToBase64:function(o){if(o==null)return"";var a=f._compress(o,6,function(h){return s.charAt(h)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:f._decompress(o.length,32,function(a){return c(s,o.charAt(a))})},compressToUTF16:function(o){return o==null?"":f._compress(o,15,function(a){return r(a+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:f._decompress(o.length,16384,function(a){return o.charCodeAt(a)-32})},compressToUint8Array:function(o){for(var a=f.compress(o),h=new Uint8Array(a.length*2),l=0,u=a.length;l<u;l++){var m=a.charCodeAt(l);h[l*2]=m>>>8,h[l*2+1]=m%256}return h},decompressFromUint8Array:function(o){if(o==null)return f.decompress(o);for(var a=new Array(o.length/2),h=0,l=a.length;h<l;h++)a[h]=o[h*2]*256+o[h*2+1];var u=[];return a.forEach(function(m){u.push(r(m))}),f.decompress(u.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":f._compress(o,6,function(a){return n.charAt(a)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),f._decompress(o.length,32,function(a){return c(n,o.charAt(a))}))},compress:function(o){return f._compress(o,16,function(a){return r(a)})},_compress:function(o,a,h){if(o==null)return"";var l,u,m={},p={},d="",M="",S="",_=2,A=3,y=2,v=[],g=0,b=0,w;for(w=0;w<o.length;w+=1)if(d=o.charAt(w),Object.prototype.hasOwnProperty.call(m,d)||(m[d]=A++,p[d]=!0),M=S+d,Object.prototype.hasOwnProperty.call(m,M))S=M;else{if(Object.prototype.hasOwnProperty.call(p,S)){if(S.charCodeAt(0)<256){for(l=0;l<y;l++)g=g<<1,b==a-1?(b=0,v.push(h(g)),g=0):b++;for(u=S.charCodeAt(0),l=0;l<8;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1}else{for(u=1,l=0;l<y;l++)g=g<<1|u,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=0;for(u=S.charCodeAt(0),l=0;l<16;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1}_--,_==0&&(_=Math.pow(2,y),y++),delete p[S]}else for(u=m[S],l=0;l<y;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1;_--,_==0&&(_=Math.pow(2,y),y++),m[M]=A++,S=String(d)}if(S!==""){if(Object.prototype.hasOwnProperty.call(p,S)){if(S.charCodeAt(0)<256){for(l=0;l<y;l++)g=g<<1,b==a-1?(b=0,v.push(h(g)),g=0):b++;for(u=S.charCodeAt(0),l=0;l<8;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1}else{for(u=1,l=0;l<y;l++)g=g<<1|u,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=0;for(u=S.charCodeAt(0),l=0;l<16;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1}_--,_==0&&(_=Math.pow(2,y),y++),delete p[S]}else for(u=m[S],l=0;l<y;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1;_--,_==0&&(_=Math.pow(2,y),y++)}for(u=2,l=0;l<y;l++)g=g<<1|u&1,b==a-1?(b=0,v.push(h(g)),g=0):b++,u=u>>1;for(;;)if(g=g<<1,b==a-1){v.push(h(g));break}else b++;return v.join("")},decompress:function(o){return o==null?"":o==""?null:f._decompress(o.length,32768,function(a){return o.charCodeAt(a)})},_decompress:function(o,a,h){var l=[],u=4,m=4,p=3,d="",M=[],S,_,A,y,v,g,b,w={val:h(0),position:a,index:1};for(S=0;S<3;S+=1)l[S]=S;for(A=0,v=Math.pow(2,2),g=1;g!=v;)y=w.val&w.position,w.position>>=1,w.position==0&&(w.position=a,w.val=h(w.index++)),A|=(y>0?1:0)*g,g<<=1;switch(A){case 0:for(A=0,v=Math.pow(2,8),g=1;g!=v;)y=w.val&w.position,w.position>>=1,w.position==0&&(w.position=a,w.val=h(w.index++)),A|=(y>0?1:0)*g,g<<=1;b=r(A);break;case 1:for(A=0,v=Math.pow(2,16),g=1;g!=v;)y=w.val&w.position,w.position>>=1,w.position==0&&(w.position=a,w.val=h(w.index++)),A|=(y>0?1:0)*g,g<<=1;b=r(A);break;case 2:return""}for(l[3]=b,_=b,M.push(b);;){if(w.index>o)return"";for(A=0,v=Math.pow(2,p),g=1;g!=v;)y=w.val&w.position,w.position>>=1,w.position==0&&(w.position=a,w.val=h(w.index++)),A|=(y>0?1:0)*g,g<<=1;switch(b=A){case 0:for(A=0,v=Math.pow(2,8),g=1;g!=v;)y=w.val&w.position,w.position>>=1,w.position==0&&(w.position=a,w.val=h(w.index++)),A|=(y>0?1:0)*g,g<<=1;l[m++]=r(A),b=m-1,u--;break;case 1:for(A=0,v=Math.pow(2,16),g=1;g!=v;)y=w.val&w.position,w.position>>=1,w.position==0&&(w.position=a,w.val=h(w.index++)),A|=(y>0?1:0)*g,g<<=1;l[m++]=r(A),b=m-1,u--;break;case 2:return M.join("")}if(u==0&&(u=Math.pow(2,p),p++),l[b])d=l[b];else if(b===m)d=_+_.charAt(0);else return null;M.push(d),l[m++]=_+d.charAt(0),u--,_=d,u==0&&(u=Math.pow(2,p),p++)}}};return f}();t!=null?t.exports=e:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return e})})(I);var Et=I.exports;const kt=Mt(Et),Bt=Object.freeze({diffTimeout:1,diffEditCost:4,matchThreshold:.5,matchDistance:1e3,patchDeleteThreshold:.5,patchMargin:4,matchMaxBits:32});function Lt(t){if(t!=null&&t.__resolved)return t;const e={...Bt,...t};return Object.defineProperty(e,"__resolved",{value:!0,enumerable:!1}),e}const L=-1,k=1,E=0;function C(t,e){return[t,e]}function R(t,e,r,s=!0,n){const i=Lt(r);typeof n>"u"&&(i.diffTimeout<=0?n=Number.MAX_VALUE:n=new Date().getTime()+i.diffTimeout*1e3);const c=n;if(t==null||e==null)throw new Error("Null input. (diff_main)");if(t===e)return t?[C(E,t)]:[];const f=s;let o=Z(t,e);const a=t.substring(0,o);t=t.substring(o),e=e.substring(o),o=j(t,e);const h=t.substring(t.length-o);t=t.substring(0,t.length-o),e=e.substring(0,e.length-o);const l=Tt(t,e,i,f,c);return a&&l.unshift(C(E,a)),h&&l.push(C(E,h)),W(l),l}function Tt(t,e,r,s,n){let i;if(!t)return[C(k,e)];if(!e)return[C(L,t)];const c=t.length>e.length?t:e,f=t.length>e.length?e:t,o=c.indexOf(f);if(o!==-1)return i=[C(k,c.substring(0,o)),C(E,f),C(k,c.substring(o+f.length))],t.length>e.length&&(i[0][0]=i[2][0]=L),i;if(f.length===1)return[C(L,t),C(k,e)];const a=Dt(t,e,r);if(a){const h=a[0],l=a[1],u=a[2],m=a[3],p=a[4],d=R(h,u,r,s,n),M=R(l,m,r,s,n);return d.concat([C(E,p)],M)}return s&&t.length>100&&e.length>100?Ot(t,e,r,n):Rt(t,e,r,n)}function Ot(t,e,r,s){const n=$t(t,e);t=n.chars1,e=n.chars2;const i=n.lineArray,c=R(t,e,r,!1,s);Pt(c,i),Nt(c),c.push(C(E,""));let f=0,o=0,a=0,h="",l="";for(;f<c.length;){switch(c[f][0]){case k:a++,l+=c[f][1];break;case L:o++,h+=c[f][1];break;case E:if(o>=1&&a>=1){c.splice(f-o-a,o+a),f=f-o-a;const u=R(h,l,r,!1,s);for(let m=u.length-1;m>=0;m--)c.splice(f,0,u[m]);f=f+u.length}a=0,o=0,h="",l="";break}f++}return c.pop(),c}function Rt(t,e,r,s){const n=t.length,i=e.length,c=Math.ceil((n+i)/2),f=c,o=2*c,a=new Array(o),h=new Array(o);for(let S=0;S<o;S++)a[S]=-1,h[S]=-1;a[f+1]=0,h[f+1]=0;const l=n-i,u=l%2!==0;let m=0,p=0,d=0,M=0;for(let S=0;S<c&&!(new Date().getTime()>s);S++){for(let _=-S+m;_<=S-p;_+=2){const A=f+_;let y;_===-S||_!==S&&a[A-1]<a[A+1]?y=a[A+1]:y=a[A-1]+1;let v=y-_;for(;y<n&&v<i&&t.charAt(y)===e.charAt(v);)y++,v++;if(a[A]=y,y>n)p+=2;else if(v>i)m+=2;else if(u){const g=f+l-_;if(g>=0&&g<o&&h[g]!==-1){const b=n-h[g];if(y>=b)return J(t,e,r,y,v,s)}}}for(let _=-S+d;_<=S-M;_+=2){const A=f+_;let y;_===-S||_!==S&&h[A-1]<h[A+1]?y=h[A+1]:y=h[A-1]+1;let v=y-_;for(;y<n&&v<i&&t.charAt(n-y-1)===e.charAt(i-v-1);)y++,v++;if(h[A]=y,y>n)M+=2;else if(v>i)d+=2;else if(!u){const g=f+l-_;if(g>=0&&g<o&&a[g]!==-1){const b=a[g],w=f+b-g;if(y=n-y,b>=y)return J(t,e,r,b,w,s)}}}}return[C(L,t),C(k,e)]}function J(t,e,r,s,n,i){const c=t.substring(0,s),f=e.substring(0,n),o=t.substring(s),a=e.substring(n),h=R(c,f,r,!1,i),l=R(o,a,r,!1,i);return h.concat(l)}function $t(t,e){const r=[],s={};let n=4e4;r[0]="";function i(o){let a="",h=0,l=-1,u=r.length;for(;l<o.length-1;){l=o.indexOf(`
`,h),l===-1&&(l=o.length-1);let m=o.substring(h,l+1);(s.hasOwnProperty?Object.prototype.hasOwnProperty.call(s,m):s[m]!==void 0)?a+=String.fromCharCode(s[m]):(u===n&&(m=o.substring(h),l=o.length),a+=String.fromCharCode(u),s[m]=u,r[u++]=m),h=l+1}return a}const c=i(t);n=65535;const f=i(e);return{chars1:c,chars2:f,lineArray:r}}function Pt(t,e){for(let r=0;r<t.length;r++){const s=t[r][1],n=[];for(let i=0;i<s.length;i++)n[i]=e[s.charCodeAt(i)];t[r][1]=n.join("")}}function Z(t,e){if(!t||!e||t.charAt(0)!==e.charAt(0))return 0;let r=0,s=Math.min(t.length,e.length),n=s,i=0;for(;r<n;)t.substring(i,n)===e.substring(i,n)?(r=n,i=r):s=n,n=Math.floor((s-r)/2+r);return n}function j(t,e){if(!t||!e||t.charAt(t.length-1)!==e.charAt(e.length-1))return 0;let r=0,s=Math.min(t.length,e.length),n=s,i=0;for(;r<n;)t.substring(t.length-n,t.length-i)===e.substring(e.length-n,e.length-i)?(r=n,i=r):s=n,n=Math.floor((s-r)/2+r);return n}function X(t,e){const r=t.length,s=e.length;if(r===0||s===0)return 0;r>s?t=t.substring(r-s):r<s&&(e=e.substring(0,r));const n=Math.min(r,s);if(t===e)return n;let i=0,c=1;for(;;){const f=t.substring(n-c),o=e.indexOf(f);if(o===-1)return i;c+=o,(o===0||t.substring(n-c)===e.substring(0,c))&&(i=c,c++)}}function Dt(t,e,r){if(r.diffTimeout<=0)return null;const s=t.length>e.length?t:e,n=t.length>e.length?e:t;if(s.length<4||n.length*2<s.length)return null;function i(p,d,M){const S=p.substring(M,M+Math.floor(p.length/4));let _=-1,A="",y,v,g,b;for(;(_=d.indexOf(S,_+1))!==-1;){const w=Z(p.substring(M),d.substring(_)),N=j(p.substring(0,M),d.substring(0,_));A.length<N+w&&(A=d.substring(_-N,_)+d.substring(_,_+w),y=p.substring(0,M-N),v=p.substring(M+w),g=d.substring(0,_-N),b=d.substring(_+w))}return A.length*2>=p.length?[y,v,g,b,A]:null}const c=i(s,n,Math.ceil(s.length/4)),f=i(s,n,Math.ceil(s.length/2));let o;if(!c&&!f)return null;f?c?o=c[4].length>f[4].length?c:f:o=f:o=c;let a,h,l,u;t.length>e.length?(a=o[0],h=o[1],l=o[2],u=o[3]):(l=o[0],u=o[1],a=o[2],h=o[3]);const m=o[4];return[a,h,l,u,m]}function Nt(t){let e=!1;const r=[];let s=0,n=null,i=0,c=0,f=0,o=0,a=0;for(;i<t.length;)t[i][0]===E?(r[s++]=i,c=o,f=a,o=0,a=0,n=t[i][1]):(t[i][0]===k?o+=t[i][1].length:a+=t[i][1].length,n&&n.length<=Math.max(c,f)&&n.length<=Math.max(o,a)&&(t.splice(r[s-1],0,C(L,n)),t[r[s-1]+1][0]=k,s--,s--,i=s>0?r[s-1]:-1,c=0,f=0,o=0,a=0,n=null,e=!0)),i++;for(e&&W(t),Ft(t),i=1;i<t.length;){if(t[i-1][0]===L&&t[i][0]===k){const h=t[i-1][1],l=t[i][1],u=X(h,l),m=X(l,h);u>=m?(u>=h.length/2||u>=l.length/2)&&(t.splice(i,0,C(E,l.substring(0,u))),t[i-1][1]=h.substring(0,h.length-u),t[i+1][1]=l.substring(u),i++):(m>=h.length/2||m>=l.length/2)&&(t.splice(i,0,C(E,h.substring(0,m))),t[i-1][0]=k,t[i-1][1]=l.substring(0,l.length-m),t[i+1][0]=L,t[i+1][1]=h.substring(m),i++),i++}i++}}const Y=/[^a-zA-Z0-9]/,Q=/\s/,V=/[\r\n]/,zt=/\n\r?\n$/,jt=/^\r?\n\r?\n/;function Ft(t){function e(s,n){if(!s||!n)return 6;const i=s.charAt(s.length-1),c=n.charAt(0),f=i.match(Y),o=c.match(Y),a=f&&i.match(Q),h=o&&c.match(Q),l=a&&i.match(V),u=h&&c.match(V),m=l&&s.match(zt),p=u&&n.match(jt);return m||p?5:l||u?4:f&&!a&&h?3:a||h?2:f||o?1:0}let r=1;for(;r<t.length-1;){if(t[r-1][0]===E&&t[r+1][0]===E){let s=t[r-1][1],n=t[r][1],i=t[r+1][1];const c=j(s,n);if(c){const l=n.substring(n.length-c);s=s.substring(0,s.length-c),n=l+n.substring(0,n.length-c),i=l+i}let f=s,o=n,a=i,h=e(s,n)+e(n,i);for(;n.charAt(0)===i.charAt(0);){s+=n.charAt(0),n=n.substring(1)+i.charAt(0),i=i.substring(1);const l=e(s,n)+e(n,i);l>=h&&(h=l,f=s,o=n,a=i)}t[r-1][1]!==f&&(f?t[r-1][1]=f:(t.splice(r-1,1),r--),t[r][1]=o,a?t[r+1][1]=a:(t.splice(r+1,1),r--))}r++}}function W(t){t.push(C(E,""));let e=0,r=0,s=0,n="",i="",c;for(;e<t.length;)switch(t[e][0]){case k:s++,i+=t[e][1],e++;break;case L:r++,n+=t[e][1],e++;break;case E:r+s>1?(r!==0&&s!==0&&(c=Z(i,n),c!==0&&(e-r-s>0&&t[e-r-s-1][0]===E?t[e-r-s-1][1]+=i.substring(0,c):(t.splice(0,0,C(E,i.substring(0,c))),e++),i=i.substring(c),n=n.substring(c)),c=j(i,n),c!==0&&(t[e][1]=i.substring(i.length-c)+t[e][1],i=i.substring(0,i.length-c),n=n.substring(0,n.length-c))),e-=r+s,t.splice(e,r+s),n.length&&(t.splice(e,0,C(L,n)),e++),i.length&&(t.splice(e,0,C(k,i)),e++),e++):e!==0&&t[e-1][0]===E?(t[e-1][1]+=t[e][1],t.splice(e,1)):e++,s=0,r=0,n="",i="";break}t[t.length-1][1]===""&&t.pop();let f=!1;for(e=1;e<t.length-1;)t[e-1][0]===E&&t[e+1][0]===E&&(t[e][1].substring(t[e][1].length-t[e-1][1].length)===t[e-1][1]?(t[e][1]=t[e-1][1]+t[e][1].substring(0,t[e][1].length-t[e-1][1].length),t[e+1][1]=t[e-1][1]+t[e+1][1],t.splice(e-1,1),f=!0):t[e][1].substring(0,t[e+1][1].length)===t[e+1][1]&&(t[e-1][1]+=t[e+1][1],t[e][1]=t[e][1].substring(t[e+1][1].length)+t[e+1][1],t.splice(e+1,1),f=!0)),e++;f&&W(t)}const G=Object.freeze({ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1,excludeKeys:void 0,excludeValues:void 0,replacer:void 0});function xt(t,e){e?e={...G,...e}:e=G;const r=ut(e);return r.dispatch(t),r.toString()}const Ut=Object.freeze(["prototype","__proto__","constructor"]);function ut(t){let e="",r=new Map;const s=n=>{e+=n};return{toString(){return e},getContext(){return r},dispatch(n){return t.replacer&&(n=t.replacer(n)),this[n===null?"null":typeof n](n)},object(n){if(n&&typeof n.toJSON=="function")return this.object(n.toJSON());const i=Object.prototype.toString.call(n);let c="";const f=i.length;f<10?c="unknown:["+i+"]":c=i.slice(8,f-1),c=c.toLowerCase();let o=null;if((o=r.get(n))===void 0)r.set(n,r.size);else return this.dispatch("[CIRCULAR:"+o+"]");if(typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(n))return s("buffer:"),s(n.toString("utf8"));if(c!=="object"&&c!=="function"&&c!=="asyncfunction")this[c]?this[c](n):t.ignoreUnknown||this.unkown(n,c);else{let a=Object.keys(n);t.unorderedObjects&&(a=a.sort());let h=[];t.respectType!==!1&&!tt(n)&&(h=Ut),t.excludeKeys&&(a=a.filter(u=>!t.excludeKeys(u)),h=h.filter(u=>!t.excludeKeys(u))),s("object:"+(a.length+h.length)+":");const l=u=>{this.dispatch(u),s(":"),t.excludeValues||this.dispatch(n[u]),s(",")};for(const u of a)l(u);for(const u of h)l(u)}},array(n,i){if(i=i===void 0?t.unorderedArrays!==!1:i,s("array:"+n.length+":"),!i||n.length<=1){for(const o of n)this.dispatch(o);return}const c=new Map,f=n.map(o=>{const a=ut(t);a.dispatch(o);for(const[h,l]of a.getContext())c.set(h,l);return a.toString()});return r=c,f.sort(),this.array(f,!1)},date(n){return s("date:"+n.toJSON())},symbol(n){return s("symbol:"+n.toString())},unkown(n,i){if(s(i),!!n&&(s(":"),n&&typeof n.entries=="function"))return this.array(Array.from(n.entries()),!0)},error(n){return s("error:"+n.toString())},boolean(n){return s("bool:"+n)},string(n){s("string:"+n.length+":"),s(n)},function(n){s("fn:"),tt(n)?this.dispatch("[native]"):this.dispatch(n.toString()),t.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(n.name)),t.respectFunctionProperties&&this.object(n)},number(n){return s("number:"+n)},xml(n){return s("xml:"+n.toString())},null(){return s("Null")},undefined(){return s("Undefined")},regexp(n){return s("regex:"+n.toString())},uint8array(n){return s("uint8array:"),this.dispatch(Array.prototype.slice.call(n))},uint8clampedarray(n){return s("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(n))},int8array(n){return s("int8array:"),this.dispatch(Array.prototype.slice.call(n))},uint16array(n){return s("uint16array:"),this.dispatch(Array.prototype.slice.call(n))},int16array(n){return s("int16array:"),this.dispatch(Array.prototype.slice.call(n))},uint32array(n){return s("uint32array:"),this.dispatch(Array.prototype.slice.call(n))},int32array(n){return s("int32array:"),this.dispatch(Array.prototype.slice.call(n))},float32array(n){return s("float32array:"),this.dispatch(Array.prototype.slice.call(n))},float64array(n){return s("float64array:"),this.dispatch(Array.prototype.slice.call(n))},arraybuffer(n){return s("arraybuffer:"),this.dispatch(new Uint8Array(n))},url(n){return s("url:"+n.toString())},map(n){s("map:");const i=[...n];return this.array(i,t.unorderedSets!==!1)},set(n){s("set:");const i=[...n];return this.array(i,t.unorderedSets!==!1)},file(n){return s("file:"),this.dispatch([n.name,n.size,n.type,n.lastModfied])},blob(){if(t.ignoreUnknown)return s("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},domwindow(){return s("domwindow")},bigint(n){return s("bigint:"+n.toString())},process(){return s("process")},timer(){return s("timer")},pipe(){return s("pipe")},tcp(){return s("tcp")},udp(){return s("udp")},tty(){return s("tty")},statwatcher(){return s("statwatcher")},securecontext(){return s("securecontext")},connection(){return s("connection")},zlib(){return s("zlib")},context(){return s("context")},nodescript(){return s("nodescript")},httpparser(){return s("httpparser")},dataview(){return s("dataview")},signal(){return s("signal")},fsevent(){return s("fsevent")},tlswrap(){return s("tlswrap")}}}const ft="[native code] }",qt=ft.length;function tt(t){return typeof t!="function"?!1:Function.prototype.toString.call(t).slice(-qt)===ft}var Ht=Object.defineProperty,Kt=(t,e,r)=>e in t?Ht(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,P=(t,e,r)=>(Kt(t,typeof e!="symbol"?e+"":e,r),r);class T{constructor(e,r){P(this,"words"),P(this,"sigBytes"),e=this.words=e||[],this.sigBytes=r===void 0?e.length*4:r}toString(e){return(e||It).stringify(this)}concat(e){if(this.clamp(),this.sigBytes%4)for(let r=0;r<e.sigBytes;r++){const s=e.words[r>>>2]>>>24-r%4*8&255;this.words[this.sigBytes+r>>>2]|=s<<24-(this.sigBytes+r)%4*8}else for(let r=0;r<e.sigBytes;r+=4)this.words[this.sigBytes+r>>>2]=e.words[r>>>2];return this.sigBytes+=e.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new T([...this.words])}}const It={stringify(t){const e=[];for(let r=0;r<t.sigBytes;r++){const s=t.words[r>>>2]>>>24-r%4*8&255;e.push((s>>>4).toString(16),(s&15).toString(16))}return e.join("")}},Zt={stringify(t){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=[];for(let s=0;s<t.sigBytes;s+=3){const n=t.words[s>>>2]>>>24-s%4*8&255,i=t.words[s+1>>>2]>>>24-(s+1)%4*8&255,c=t.words[s+2>>>2]>>>24-(s+2)%4*8&255,f=n<<16|i<<8|c;for(let o=0;o<4&&s*8+o*6<t.sigBytes*8;o++)r.push(e.charAt(f>>>6*(3-o)&63))}return r.join("")}},Wt={parse(t){const e=t.length,r=[];for(let s=0;s<e;s++)r[s>>>2]|=(t.charCodeAt(s)&255)<<24-s%4*8;return new T(r,e)}},Jt={parse(t){return Wt.parse(unescape(encodeURIComponent(t)))}};class Xt{constructor(){P(this,"_data",new T),P(this,"_nDataBytes",0),P(this,"_minBufferSize",0),P(this,"blockSize",512/32)}reset(){this._data=new T,this._nDataBytes=0}_append(e){typeof e=="string"&&(e=Jt.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes}_doProcessBlock(e,r){}_process(e){let r,s=this._data.sigBytes/(this.blockSize*4);e?s=Math.ceil(s):s=Math.max((s|0)-this._minBufferSize,0);const n=s*this.blockSize,i=Math.min(n*4,this._data.sigBytes);if(n){for(let c=0;c<n;c+=this.blockSize)this._doProcessBlock(this._data.words,c);r=this._data.words.splice(0,n),this._data.sigBytes-=i}return new T(r,i)}}class Yt extends Xt{update(e){return this._append(e),this._process(),this}finalize(e){e&&this._append(e)}}var Qt=Object.defineProperty,Vt=(t,e,r)=>e in t?Qt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Gt=(t,e,r)=>(Vt(t,e+"",r),r);const et=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],te=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],O=[];class ee extends Yt{constructor(){super(...arguments),Gt(this,"_hash",new T([...et]))}reset(){super.reset(),this._hash=new T([...et])}_doProcessBlock(e,r){const s=this._hash.words;let n=s[0],i=s[1],c=s[2],f=s[3],o=s[4],a=s[5],h=s[6],l=s[7];for(let u=0;u<64;u++){if(u<16)O[u]=e[r+u]|0;else{const A=O[u-15],y=(A<<25|A>>>7)^(A<<14|A>>>18)^A>>>3,v=O[u-2],g=(v<<15|v>>>17)^(v<<13|v>>>19)^v>>>10;O[u]=y+O[u-7]+g+O[u-16]}const m=o&a^~o&h,p=n&i^n&c^i&c,d=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),M=(o<<26|o>>>6)^(o<<21|o>>>11)^(o<<7|o>>>25),S=l+M+m+te[u]+O[u],_=d+p;l=h,h=a,a=o,o=f+S|0,f=c,c=i,i=n,n=S+_|0}s[0]=s[0]+n|0,s[1]=s[1]+i|0,s[2]=s[2]+c|0,s[3]=s[3]+f|0,s[4]=s[4]+o|0,s[5]=s[5]+a|0,s[6]=s[6]+h|0,s[7]=s[7]+l|0}finalize(e){super.finalize(e);const r=this._nDataBytes*8,s=this._data.sigBytes*8;return this._data.words[s>>>5]|=128<<24-s%32,this._data.words[(s+64>>>9<<4)+14]=Math.floor(r/4294967296),this._data.words[(s+64>>>9<<4)+15]=r,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function ne(t){return new ee().finalize(t).toString(Zt)}function se(t,e={}){const r=typeof t=="string"?t:xt(t,e);return ne(r).slice(0,10)}function re(t,e,r="",s=!1){const n=se(t+r);let i=0,c=0;const f=Math.ceil(Math.log10(e.length)),o=ie(e).flatMap((a,h)=>{var m;c=((m=a[0])==null?void 0:m.offset)||i;const l=a[a.length-1];l?i=l.offset+l.content.length:i+=1;const u=[...a,{content:`
`,offset:i}];return s&&u.unshift({key:`${n}-ln-${h+1}`,content:`${String(h+1).padStart(f," ")}  `,offset:c,htmlClass:"shiki-magic-move-line-number"}),u}).map((a,h)=>{const l=a;return l.key||(l.key=`${n}-${h}`),l});return{code:t,hash:n,tokens:o,lineNumbers:s}}function ie(t){return t.map(e=>e.flatMap(r=>{if(r.content.match(/^\s+$/))return r;const s=r.content.match(/^(\s*)(.*?)(\s*)$/);if(!s)return r;const[,n,i,c]=s;if(!n&&!c)return r;const f=[{...r,offset:r.offset+n.length,content:i}];return n&&f.unshift({content:n,offset:r.offset}),c&&f.push({content:c,offset:r.offset+n.length+i.length}),f}))}function oe(t,e){let r=0;const s=t.key;let n=0;const i=[];function c(){return n===0?(n++,s):`${s}-${n++}`}for(const f of e)f>r&&i.push({...t,content:t.content.slice(r,f),offset:t.offset+r,key:c()}),r=f;return r<t.content.length&&i.push({...t,content:t.content.slice(r),offset:t.offset+r,key:c()}),i}function nt(t,e){const r=Array.from(e instanceof Set?e:new Set(e)).sort((s,n)=>s-n);return r.length?t.flatMap(s=>{const n=r.filter(i=>s.offset<i&&i<s.offset+s.content.length).map(i=>i-s.offset).sort((i,c)=>i-c);return n.length?oe(s,n):s}):t}function ae(t,e,r={}){const{splitTokens:s=!1,enhanceMatching:n=!0}=r,i=le(t.code,e.code,r),c=s?nt(t.tokens,i.flatMap(a=>a.from)):t.tokens,f=s?nt(e.tokens,i.flatMap(a=>a.to)):e.tokens,o=new Set;if(i.forEach(a=>{var p,d;const h=c.filter(M=>M.offset>=a.from[0]&&M.offset+M.content.length<=a.from[1]),l=f.filter(M=>M.offset>=a.to[0]&&M.offset+M.content.length<=a.to[1]);let u=0,m=0;for(;u<h.length&&m<l.length&&!(!h[u]||!l[m]);)h[u].content===l[m].content?(l[m].key=h[u].key,o.add(h[u].key),u++,m++):((p=h[u+1])==null?void 0:p.content)===l[m].content?u++:(h[u].content===((d=l[m+1])==null?void 0:d.content)||u++,m++)}),n)for(const a of c){if(o.has(a.key)||a.content.length<3||!a.content.match(/^[\w-]+$/))continue;const h=f.find(l=>l.content===a.content&&!o.has(l.key));h&&(h.key=a.key,o.add(a.key))}return{from:c.length===t.tokens.length?t:{...t,tokens:c},to:f.length===e.tokens.length?e:{...e,tokens:f}}}function le(t,e,r={}){var f;let s=R(t,e);s=((f=r.diffCleanup)==null?void 0:f.call(r,s))||s;let n="",i="";const c=[];for(const[o,a]of s)o===0?(c.push({from:[n.length,n.length+a.length],to:[i.length,i.length+a.length],content:a}),n+=a,i+=a):o===-1?n+=a:o===1&&(i+=a);if(n!==t||i!==e)throw new Error("Content mismatch");return c}var ce=Object.defineProperty,he=(t,e,r)=>e in t?ce(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,$=(t,e,r)=>(he(t,typeof e!="symbol"?e+"":e,r),r);const B="shiki-magic-move",F=`${B}-leave-from`,ue=`${B}-leave-to`,st=`${B}-leave-active`,x=`${B}-enter-from`,U=`${B}-enter-to`,rt=`${B}-enter-active`,it=`${B}-move`,ot=`${B}-container-resize`,at=`${B}-container-restyle`,fe={globalScale:1,duration:500,delayMove:.3,delayLeave:.1,delayEnter:.7,delayContainer:.4,stagger:0,easing:"ease",animateContainer:!0,containerStyle:!0};class pe{constructor(e,r={}){$(this,"mapDom",new Map),$(this,"container"),$(this,"anchor"),$(this,"previousPromises",[]),$(this,"options"),$(this,"isFirstRender",!0),this.options={...fe,...r},typeof e=="string"?this.container=document.querySelector(e):this.container=e,this.anchor=document.createElement("span"),this.anchor.style.position="absolute",this.anchor.style.top="0",this.anchor.style.left="0",this.anchor.style.height="1px",this.anchor.style.width="1px",this.container.prepend(this.anchor)}applyElementContent(e,r){r.content!==`
`&&(e.textContent=r.content,e.classList.add(`${B}-item`))}applyElementStyle(e,r){if(r.htmlStyle)if(typeof r.htmlStyle=="string")e.setAttribute("style",r.htmlStyle);else for(const[s,n]of Object.entries(r.htmlStyle))e.style.setProperty(s,n);r.htmlClass&&(e.className=[`${B}-item`,r.htmlClass].join(" ")),r.color&&(e.style.color=r.color),r.bgColor&&(e.style.backgroundColor=r.bgColor)}applyElement(e,r){this.applyElementContent(e,r),this.applyElementStyle(e,r)}applyNodeStyle(e,r){if(r.bg&&(e.style.backgroundColor=r.bg),r.fg&&(e.style.color=r.fg),r.rootStyle){const s=r.rootStyle.split(";");for(const n of s){const[i,c]=n.split(":");i&&c&&e.style.setProperty(i.trim(),c.trim())}}}applyContainerStyle(e){this.options.containerStyle&&this.applyNodeStyle(this.container,e)}registerTransitionEnd(e,r){return()=>{let s=!1,n=()=>{};const i=Promise.race([Promise.allSettled(e.getAnimations().map(c=>c.finished)).then(()=>r()),new Promise(c=>{n=()=>{s||(s=!0,r(),c())}})]);return i.resolve=n,i}}setCssVariables(){this.container.style.setProperty("--smm-duration",`${this.options.duration}ms`),this.container.style.setProperty("--smm-delay-move",`${this.options.delayMove}`),this.container.style.setProperty("--smm-delay-leave",`${this.options.delayLeave}`),this.container.style.setProperty("--smm-delay-enter",`${this.options.delayEnter}`),this.container.style.setProperty("--smm-delay-container",`${this.options.delayContainer}`),this.container.style.setProperty("--smm-easing",this.options.easing),this.container.style.setProperty("--smm-stagger","0")}replace(e){const r=new Map,s=e.tokens.map(n=>{if(this.mapDom.has(n.key)){const i=this.mapDom.get(n.key);return this.applyElement(i,n),r.set(n.key,i),this.mapDom.delete(n.key),i}else{const i=document.createElement(n.content===`
`?"br":"span");return this.applyElement(i,n),r.set(n.key,i),i}});this.container.replaceChildren(this.anchor,...s),this.applyContainerStyle(e),this.mapDom=r}render(e){this.setCssVariables();const r=new Map,s=[],n=[],i=[],c=[];this.previousPromises.forEach(p=>p.resolve()),this.previousPromises=[];const f=[],{globalScale:o}=this.options,a=new Map;let h=this.anchor.getBoundingClientRect();const l=this.container.getBoundingClientRect();for(const p of this.mapDom.values()){const d=p.getBoundingClientRect();a.set(p,{x:d.x-h.x,y:d.y-h.y})}const u=e.tokens.map(p=>{if(this.mapDom.has(p.key)){const d=this.mapDom.get(p.key);return this.applyElementContent(d,p),f.push(()=>{this.applyElementStyle(d,p)}),s.push(d),r.set(p.key,d),this.mapDom.delete(p.key),d}else{const d=document.createElement(p.content===`
`?"br":"span");return this.applyElement(d,p),n.push(d),r.set(p.key,d),d}});for(const[p,d]of this.mapDom)d.tagName!=="BR"&&i.push(d);for(const p of i)p.style.position="absolute";if(this.container.replaceChildren(this.anchor,...u,...i),this.mapDom=r,i.forEach((p,d)=>{p.style.position="absolute";const M=a.get(p);p.style.top=`${M.y/o}px`,p.style.left=`${M.x/o}px`,this.options.stagger?p.style.setProperty("--smm-stagger",`${d*this.options.stagger}ms`):p.style.removeProperty("--smm-stagger"),p.classList.add(F),p.classList.add(st),f.unshift(()=>{p.classList.remove(F),p.classList.add(ue)}),c.push(this.registerTransitionEnd(p,()=>{p.classList.remove(F),p.classList.remove(st),p.classList.remove(U),p.remove()}))}),this.isFirstRender||n.forEach((p,d)=>{p.classList.add(x),p.classList.add(rt),this.options.stagger?p.style.setProperty("--smm-stagger",`${d*this.options.stagger}ms`):p.style.removeProperty("--smm-stagger"),f.push(()=>{p.classList.remove(x),p.classList.add(U)}),c.push(this.registerTransitionEnd(p,()=>{p.classList.remove(x),p.classList.remove(rt),p.classList.remove(U)}))}),h=this.anchor.getBoundingClientRect(),s.forEach((p,d)=>{const M=p.getBoundingClientRect(),S={x:M.x-h.x,y:M.y-h.y},_=a.get(p);p.style.transitionDuration=p.style.transitionDelay="0ms";const A=(_.x-S.x)/o,y=(_.y-S.y)/o;p.style.transform=`translate(${A}px, ${y}px)`,this.options.stagger?p.style.setProperty("--smm-stagger",`${d*this.options.stagger}ms`):p.style.removeProperty("--smm-stagger"),f.unshift(()=>{p.classList.add(it),p.style.transform=p.style.transitionDuration=p.style.transitionDelay=""}),c.push(this.registerTransitionEnd(p,()=>{p.classList.remove(it)}))}),this.options.animateContainer&&!this.isFirstRender){const p=this.container.getBoundingClientRect();(p.width!==l.width||p.height!==l.height)&&(this.container.style.transitionDuration=this.container.style.transitionDelay="0ms",this.container.style.height=`${l.height/o}px`,this.container.style.width=`${l.width/o}px`,f.unshift(()=>{this.container.classList.add(ot),this.container.style.transitionDuration=this.container.style.transitionDelay="",this.container.style.height=`${p.height/o}px`,this.container.style.width=`${p.width/o}px`}),c.push(this.registerTransitionEnd(this.container,()=>{this.container.classList.remove(ot),this.container.style.height=this.container.style.width=""})))}this.options.containerStyle&&(this.isFirstRender?this.applyContainerStyle(e):(f.push(()=>{this.container.classList.add(at),this.applyContainerStyle(e)}),c.push(this.registerTransitionEnd(this.container,()=>{this.container.classList.remove(at)})))),ge(),f.forEach(p=>p());const m=c.map(p=>p());return this.isFirstRender=!1,this.previousPromises=m,Promise.all(m).then()}}function ge(){return document.body.offsetHeight}const me=K({name:"ShikiMagicMoveRenderer",props:{animate:{type:Boolean,default:!0},tokens:{type:Object,required:!0},previous:{type:Object,required:!1},options:{type:Object}},emits:["end","start"],setup(t,{emit:e}){const r=q();let s=!1;return ct(()=>{r.value.innerHTML="",s=!0;const n=new pe(r.value);ht(()=>t.tokens,async i=>{if(Object.assign(n.options,t.options),t.animate){t.previous&&n.replace(t.previous),await H();const c=n.render(i);await H(),e("start"),await c,e("end")}else n.replace(i)},{immediate:!0})}),()=>z("pre",{ref:r,class:"shiki-magic-move-container"},s?void 0:pt(t.tokens.tokens,n=>n.content===`
`?z("br",{key:n.key}):z("span",{style:[{color:n.color},n.htmlStyle],class:["shiki-magic-move-item",n.htmlClass],key:n.key},n.content)))}}),ye=K({name:"ShikiMagicMovePrecompiled",props:{steps:{type:Array,required:!0},step:{type:Number,default:0},animate:{type:Boolean,default:!0},options:{type:Object,default:()=>({})}},emits:["start","end"],setup(t,{emit:e}){let s=re("",[]);const n=lt(()=>{const i=ae(s,t.steps[Math.min(t.step,t.steps.length-1)],t.options);return s=i.to,i});return()=>z(me,{tokens:n.value.to,previous:n.value.from,options:t.options,animate:t.animate,onStart:()=>e("start"),onEnd:()=>e("end")})}}),we=K({__name:"ShikiMagicMove",props:{at:{type:[String,Number],default:"+1"},stepsLz:{type:String,required:!0},stepRanges:{type:Array,required:!0},lines:{type:Boolean,default:bt.lineNumbers}},setup(t){const e=t,r=JSON.parse(kt.decompressFromBase64(e.stepsLz)),{$clicksContext:s,$scale:n,$zoom:i}=Ct(),{isPrintMode:c}=_t(),f=vt(),o=q(0),a=q(),h=lt(()=>e.stepRanges.map(l=>l.length?l:["all"]));return gt(()=>{s==null||s.unregister(f)}),ct(()=>{if(!s)return;if(h.value.length!==r.length)throw new Error("[slidev] The length of stepRanges does not match the length of steps, this is an internal error.");const l=h.value.map(m=>m.length).reduce((m,p)=>m+p,0),u=s.calculateSince(e.at,l-1);s.register(f,u),ht(()=>s.current,()=>{const m=u?s.current-u.start:wt;let p=r.length-1,d=0,M="all";for(let S=0;S<h.value.length;S++){const _=h.value[S];if(m<d+_.length-1){p=S,M=_[m-d+1];break}d+=_.length||1}H(async()=>{var y;o.value=p,await St(0);const S=(y=a.value)==null?void 0:y.querySelector(".shiki");if(!S)return;const A=Array.from(S.children).slice(1).filter(v=>!v.className.includes("shiki-magic-move-leave")).reduce((v,g)=>(g.tagName==="BR"?v.push([]):v[v.length-1].push(g),v),[[]]);At(M,A.length,1,v=>A[v])})},{immediate:!0})}),(l,u)=>(mt(),yt("div",{ref_key:"container",ref:a,class:"slidev-code-wrapper slidev-code-magic-move relative"},[dt(D(ye),{class:"slidev-code relative shiki overflow-visible",steps:D(r),step:o.value,animate:!D(c),options:{globalScale:D(n)*D(i),duration:800,stagger:1}},null,8,["steps","step","animate","options"])],512))}});export{we as _};
