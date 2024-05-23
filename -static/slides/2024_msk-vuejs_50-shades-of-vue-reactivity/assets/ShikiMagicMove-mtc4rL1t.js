import{d as q,y as lt,v as j,t as U,ac as at,D as ct,n as Z,ad as ft,aB as pt,o as gt,b as yt,l as mt,A as D}from"./modules/vue-CEhIG5sE.js";import{a as dt}from"./modules/file-saver-DY7lxZlc.js";import{u as _t}from"./slidev/context-DnnVJTHb.js";import{a as bt,ar as vt,as as wt,_ as St}from"./index-cSheY8bB.js";const kt=Object.freeze({diffTimeout:1,diffEditCost:4,matchThreshold:.5,matchDistance:1e3,patchDeleteThreshold:.5,patchMargin:4,matchMaxBits:32});function Ct(e){if(e!=null&&e.__resolved)return e;const n={...kt,...e};return Object.defineProperty(n,"__resolved",{value:!0,enumerable:!1}),n}const B=-1,E=1,M=0;function A(e,n){return[e,n]}function O(e,n,r,s=!0,t){const i=Ct(r);typeof t>"u"&&(i.diffTimeout<=0?t=Number.MAX_VALUE:t=new Date().getTime()+i.diffTimeout*1e3);const h=t;if(e==null||n==null)throw new Error("Null input. (diff_main)");if(e===n)return e?[A(M,e)]:[];const p=s;let o=H(e,n);const l=e.substring(0,o);e=e.substring(o),n=n.substring(o),o=N(e,n);const u=e.substring(e.length-o);e=e.substring(0,e.length-o),n=n.substring(0,n.length-o);const a=At(e,n,i,p,h);return l&&a.unshift(A(M,l)),u&&a.push(A(M,u)),K(a),a}function At(e,n,r,s,t){let i;if(!e)return[A(E,n)];if(!n)return[A(B,e)];const h=e.length>n.length?e:n,p=e.length>n.length?n:e,o=h.indexOf(p);if(o!==-1)return i=[A(E,h.substring(0,o)),A(M,p),A(E,h.substring(o+p.length))],e.length>n.length&&(i[0][0]=i[2][0]=B),i;if(p.length===1)return[A(B,e),A(E,n)];const l=Tt(e,n,r);if(l){const u=l[0],a=l[1],f=l[2],c=l[3],y=l[4],k=O(u,f,r,s,t),C=O(a,c,r,s,t);return k.concat([A(M,y)],C)}return s&&e.length>100&&n.length>100?Mt(e,n,r,t):Et(e,n,r,t)}function Mt(e,n,r,s){const t=Lt(e,n);e=t.chars1,n=t.chars2;const i=t.lineArray,h=O(e,n,r,!1,s);Bt(h,i),Rt(h),h.push(A(M,""));let p=0,o=0,l=0,u="",a="";for(;p<h.length;){switch(h[p][0]){case E:l++,a+=h[p][1];break;case B:o++,u+=h[p][1];break;case M:if(o>=1&&l>=1){h.splice(p-o-l,o+l),p=p-o-l;const f=O(u,a,r,!1,s);for(let c=f.length-1;c>=0;c--)h.splice(p,0,f[c]);p=p+f.length}l=0,o=0,u="",a="";break}p++}return h.pop(),h}function Et(e,n,r,s){const t=e.length,i=n.length,h=Math.ceil((t+i)/2),p=h,o=2*h,l=new Array(o),u=new Array(o);for(let v=0;v<o;v++)l[v]=-1,u[v]=-1;l[p+1]=0,u[p+1]=0;const a=t-i,f=a%2!==0;let c=0,y=0,k=0,C=0;for(let v=0;v<h&&!(new Date().getTime()>s);v++){for(let w=-v+c;w<=v-y;w+=2){const S=p+w;let m;w===-v||w!==v&&l[S-1]<l[S+1]?m=l[S+1]:m=l[S-1]+1;let _=m-w;for(;m<t&&_<i&&e.charAt(m)===n.charAt(_);)m++,_++;if(l[S]=m,m>t)y+=2;else if(_>i)c+=2;else if(f){const g=p+a-w;if(g>=0&&g<o&&u[g]!==-1){const d=t-u[g];if(m>=d)return W(e,n,r,m,_,s)}}}for(let w=-v+k;w<=v-C;w+=2){const S=p+w;let m;w===-v||w!==v&&u[S-1]<u[S+1]?m=u[S+1]:m=u[S-1]+1;let _=m-w;for(;m<t&&_<i&&e.charAt(t-m-1)===n.charAt(i-_-1);)m++,_++;if(u[S]=m,m>t)C+=2;else if(_>i)k+=2;else if(!f){const g=p+a-w;if(g>=0&&g<o&&l[g]!==-1){const d=l[g],b=p+d-g;if(m=t-m,d>=m)return W(e,n,r,d,b,s)}}}}return[A(B,e),A(E,n)]}function W(e,n,r,s,t,i){const h=e.substring(0,s),p=n.substring(0,t),o=e.substring(s),l=n.substring(t),u=O(h,p,r,!1,i),a=O(o,l,r,!1,i);return u.concat(a)}function Lt(e,n){const r=[],s={};let t=4e4;r[0]="";function i(o){let l="",u=0,a=-1,f=r.length;for(;a<o.length-1;){a=o.indexOf(`
`,u),a===-1&&(a=o.length-1);let c=o.substring(u,a+1);(s.hasOwnProperty?Object.prototype.hasOwnProperty.call(s,c):s[c]!==void 0)?l+=String.fromCharCode(s[c]):(f===t&&(c=o.substring(u),a=o.length),l+=String.fromCharCode(f),s[c]=f,r[f++]=c),u=a+1}return l}const h=i(e);t=65535;const p=i(n);return{chars1:h,chars2:p,lineArray:r}}function Bt(e,n){for(let r=0;r<e.length;r++){const s=e[r][1],t=[];for(let i=0;i<s.length;i++)t[i]=n[s.charCodeAt(i)];e[r][1]=t.join("")}}function H(e,n){if(!e||!n||e.charAt(0)!==n.charAt(0))return 0;let r=0,s=Math.min(e.length,n.length),t=s,i=0;for(;r<t;)e.substring(i,t)===n.substring(i,t)?(r=t,i=r):s=t,t=Math.floor((s-r)/2+r);return t}function N(e,n){if(!e||!n||e.charAt(e.length-1)!==n.charAt(n.length-1))return 0;let r=0,s=Math.min(e.length,n.length),t=s,i=0;for(;r<t;)e.substring(e.length-t,e.length-i)===n.substring(n.length-t,n.length-i)?(r=t,i=r):s=t,t=Math.floor((s-r)/2+r);return t}function J(e,n){const r=e.length,s=n.length;if(r===0||s===0)return 0;r>s?e=e.substring(r-s):r<s&&(n=n.substring(0,r));const t=Math.min(r,s);if(e===n)return t;let i=0,h=1;for(;;){const p=e.substring(t-h),o=n.indexOf(p);if(o===-1)return i;h+=o,(o===0||e.substring(t-h)===n.substring(0,h))&&(i=h,h++)}}function Tt(e,n,r){if(r.diffTimeout<=0)return null;const s=e.length>n.length?e:n,t=e.length>n.length?n:e;if(s.length<4||t.length*2<s.length)return null;function i(y,k,C){const v=y.substring(C,C+Math.floor(y.length/4));let w=-1,S="",m,_,g,d;for(;(w=k.indexOf(v,w+1))!==-1;){const b=H(y.substring(C),k.substring(w)),P=N(y.substring(0,C),k.substring(0,w));S.length<P+b&&(S=k.substring(w-P,w)+k.substring(w,w+b),m=y.substring(0,C-P),_=y.substring(C+b),g=k.substring(0,w-P),d=k.substring(w+b))}return S.length*2>=y.length?[m,_,g,d,S]:null}const h=i(s,t,Math.ceil(s.length/4)),p=i(s,t,Math.ceil(s.length/2));let o;if(!h&&!p)return null;p?h?o=h[4].length>p[4].length?h:p:o=p:o=h;let l,u,a,f;e.length>n.length?(l=o[0],u=o[1],a=o[2],f=o[3]):(a=o[0],f=o[1],l=o[2],u=o[3]);const c=o[4];return[l,u,a,f,c]}function Rt(e){let n=!1;const r=[];let s=0,t=null,i=0,h=0,p=0,o=0,l=0;for(;i<e.length;)e[i][0]===M?(r[s++]=i,h=o,p=l,o=0,l=0,t=e[i][1]):(e[i][0]===E?o+=e[i][1].length:l+=e[i][1].length,t&&t.length<=Math.max(h,p)&&t.length<=Math.max(o,l)&&(e.splice(r[s-1],0,A(B,t)),e[r[s-1]+1][0]=E,s--,s--,i=s>0?r[s-1]:-1,h=0,p=0,o=0,l=0,t=null,n=!0)),i++;for(n&&K(e),Dt(e),i=1;i<e.length;){if(e[i-1][0]===B&&e[i][0]===E){const u=e[i-1][1],a=e[i][1],f=J(u,a),c=J(a,u);f>=c?(f>=u.length/2||f>=a.length/2)&&(e.splice(i,0,A(M,a.substring(0,f))),e[i-1][1]=u.substring(0,u.length-f),e[i+1][1]=a.substring(f),i++):(c>=u.length/2||c>=a.length/2)&&(e.splice(i,0,A(M,u.substring(0,c))),e[i-1][0]=E,e[i-1][1]=a.substring(0,a.length-c),e[i+1][0]=B,e[i+1][1]=u.substring(c),i++),i++}i++}}const V=/[^a-zA-Z0-9]/,Y=/\s/,X=/[\r\n]/,Ot=/\n\r?\n$/,$t=/^\r?\n\r?\n/;function Dt(e){function n(s,t){if(!s||!t)return 6;const i=s.charAt(s.length-1),h=t.charAt(0),p=i.match(V),o=h.match(V),l=p&&i.match(Y),u=o&&h.match(Y),a=l&&i.match(X),f=u&&h.match(X),c=a&&s.match(Ot),y=f&&t.match($t);return c||y?5:a||f?4:p&&!l&&u?3:l||u?2:p||o?1:0}let r=1;for(;r<e.length-1;){if(e[r-1][0]===M&&e[r+1][0]===M){let s=e[r-1][1],t=e[r][1],i=e[r+1][1];const h=N(s,t);if(h){const a=t.substring(t.length-h);s=s.substring(0,s.length-h),t=a+t.substring(0,t.length-h),i=a+i}let p=s,o=t,l=i,u=n(s,t)+n(t,i);for(;t.charAt(0)===i.charAt(0);){s+=t.charAt(0),t=t.substring(1)+i.charAt(0),i=i.substring(1);const a=n(s,t)+n(t,i);a>=u&&(u=a,p=s,o=t,l=i)}e[r-1][1]!==p&&(p?e[r-1][1]=p:(e.splice(r-1,1),r--),e[r][1]=o,l?e[r+1][1]=l:(e.splice(r+1,1),r--))}r++}}function K(e){e.push(A(M,""));let n=0,r=0,s=0,t="",i="",h;for(;n<e.length;)switch(e[n][0]){case E:s++,i+=e[n][1],n++;break;case B:r++,t+=e[n][1],n++;break;case M:r+s>1?(r!==0&&s!==0&&(h=H(i,t),h!==0&&(n-r-s>0&&e[n-r-s-1][0]===M?e[n-r-s-1][1]+=i.substring(0,h):(e.splice(0,0,A(M,i.substring(0,h))),n++),i=i.substring(h),t=t.substring(h)),h=N(i,t),h!==0&&(e[n][1]=i.substring(i.length-h)+e[n][1],i=i.substring(0,i.length-h),t=t.substring(0,t.length-h))),n-=r+s,e.splice(n,r+s),t.length&&(e.splice(n,0,A(B,t)),n++),i.length&&(e.splice(n,0,A(E,i)),n++),n++):n!==0&&e[n-1][0]===M?(e[n-1][1]+=e[n][1],e.splice(n,1)):n++,s=0,r=0,t="",i="";break}e[e.length-1][1]===""&&e.pop();let p=!1;for(n=1;n<e.length-1;)e[n-1][0]===M&&e[n+1][0]===M&&(e[n][1].substring(e[n][1].length-e[n-1][1].length)===e[n-1][1]?(e[n][1]=e[n-1][1]+e[n][1].substring(0,e[n][1].length-e[n-1][1].length),e[n+1][1]=e[n-1][1]+e[n+1][1],e.splice(n-1,1),p=!0):e[n][1].substring(0,e[n+1][1].length)===e[n+1][1]&&(e[n-1][1]+=e[n+1][1],e[n][1]=e[n][1].substring(e[n+1][1].length)+e[n+1][1],e.splice(n+1,1),p=!0)),n++;p&&K(e)}const Q=Object.freeze({ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1,excludeKeys:void 0,excludeValues:void 0,replacer:void 0});function Pt(e,n){n?n={...Q,...n}:n=Q;const r=ht(n);return r.dispatch(e),r.toString()}const jt=Object.freeze(["prototype","__proto__","constructor"]);function ht(e){let n="",r=new Map;const s=t=>{n+=t};return{toString(){return n},getContext(){return r},dispatch(t){return e.replacer&&(t=e.replacer(t)),this[t===null?"null":typeof t](t)},object(t){if(t&&typeof t.toJSON=="function")return this.object(t.toJSON());const i=Object.prototype.toString.call(t);let h="";const p=i.length;p<10?h="unknown:["+i+"]":h=i.slice(8,p-1),h=h.toLowerCase();let o=null;if((o=r.get(t))===void 0)r.set(t,r.size);else return this.dispatch("[CIRCULAR:"+o+"]");if(typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(t))return s("buffer:"),s(t.toString("utf8"));if(h!=="object"&&h!=="function"&&h!=="asyncfunction")this[h]?this[h](t):e.ignoreUnknown||this.unkown(t,h);else{let l=Object.keys(t);e.unorderedObjects&&(l=l.sort());let u=[];e.respectType!==!1&&!G(t)&&(u=jt),e.excludeKeys&&(l=l.filter(f=>!e.excludeKeys(f)),u=u.filter(f=>!e.excludeKeys(f))),s("object:"+(l.length+u.length)+":");const a=f=>{this.dispatch(f),s(":"),e.excludeValues||this.dispatch(t[f]),s(",")};for(const f of l)a(f);for(const f of u)a(f)}},array(t,i){if(i=i===void 0?e.unorderedArrays!==!1:i,s("array:"+t.length+":"),!i||t.length<=1){for(const o of t)this.dispatch(o);return}const h=new Map,p=t.map(o=>{const l=ht(e);l.dispatch(o);for(const[u,a]of l.getContext())h.set(u,a);return l.toString()});return r=h,p.sort(),this.array(p,!1)},date(t){return s("date:"+t.toJSON())},symbol(t){return s("symbol:"+t.toString())},unkown(t,i){if(s(i),!!t&&(s(":"),t&&typeof t.entries=="function"))return this.array(Array.from(t.entries()),!0)},error(t){return s("error:"+t.toString())},boolean(t){return s("bool:"+t)},string(t){s("string:"+t.length+":"),s(t)},function(t){s("fn:"),G(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this.object(t)},number(t){return s("number:"+t)},xml(t){return s("xml:"+t.toString())},null(){return s("Null")},undefined(){return s("Undefined")},regexp(t){return s("regex:"+t.toString())},uint8array(t){return s("uint8array:"),this.dispatch(Array.prototype.slice.call(t))},uint8clampedarray(t){return s("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(t))},int8array(t){return s("int8array:"),this.dispatch(Array.prototype.slice.call(t))},uint16array(t){return s("uint16array:"),this.dispatch(Array.prototype.slice.call(t))},int16array(t){return s("int16array:"),this.dispatch(Array.prototype.slice.call(t))},uint32array(t){return s("uint32array:"),this.dispatch(Array.prototype.slice.call(t))},int32array(t){return s("int32array:"),this.dispatch(Array.prototype.slice.call(t))},float32array(t){return s("float32array:"),this.dispatch(Array.prototype.slice.call(t))},float64array(t){return s("float64array:"),this.dispatch(Array.prototype.slice.call(t))},arraybuffer(t){return s("arraybuffer:"),this.dispatch(new Uint8Array(t))},url(t){return s("url:"+t.toString())},map(t){s("map:");const i=[...t];return this.array(i,e.unorderedSets!==!1)},set(t){s("set:");const i=[...t];return this.array(i,e.unorderedSets!==!1)},file(t){return s("file:"),this.dispatch([t.name,t.size,t.type,t.lastModfied])},blob(){if(e.ignoreUnknown)return s("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},domwindow(){return s("domwindow")},bigint(t){return s("bigint:"+t.toString())},process(){return s("process")},timer(){return s("timer")},pipe(){return s("pipe")},tcp(){return s("tcp")},udp(){return s("udp")},tty(){return s("tty")},statwatcher(){return s("statwatcher")},securecontext(){return s("securecontext")},connection(){return s("connection")},zlib(){return s("zlib")},context(){return s("context")},nodescript(){return s("nodescript")},httpparser(){return s("httpparser")},dataview(){return s("dataview")},signal(){return s("signal")},fsevent(){return s("fsevent")},tlswrap(){return s("tlswrap")}}}const ut="[native code] }",Nt=ut.length;function G(e){return typeof e!="function"?!1:Function.prototype.toString.call(e).slice(-Nt)===ut}class T{constructor(n,r){n=this.words=n||[],this.sigBytes=r===void 0?n.length*4:r}toString(n){return(n||zt).stringify(this)}concat(n){if(this.clamp(),this.sigBytes%4)for(let r=0;r<n.sigBytes;r++){const s=n.words[r>>>2]>>>24-r%4*8&255;this.words[this.sigBytes+r>>>2]|=s<<24-(this.sigBytes+r)%4*8}else for(let r=0;r<n.sigBytes;r+=4)this.words[this.sigBytes+r>>>2]=n.words[r>>>2];return this.sigBytes+=n.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new T([...this.words])}}const zt={stringify(e){const n=[];for(let r=0;r<e.sigBytes;r++){const s=e.words[r>>>2]>>>24-r%4*8&255;n.push((s>>>4).toString(16),(s&15).toString(16))}return n.join("")}},Ft={stringify(e){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=[];for(let s=0;s<e.sigBytes;s+=3){const t=e.words[s>>>2]>>>24-s%4*8&255,i=e.words[s+1>>>2]>>>24-(s+1)%4*8&255,h=e.words[s+2>>>2]>>>24-(s+2)%4*8&255,p=t<<16|i<<8|h;for(let o=0;o<4&&s*8+o*6<e.sigBytes*8;o++)r.push(n.charAt(p>>>6*(3-o)&63))}return r.join("")}},xt={parse(e){const n=e.length,r=[];for(let s=0;s<n;s++)r[s>>>2]|=(e.charCodeAt(s)&255)<<24-s%4*8;return new T(r,n)}},Ut={parse(e){return xt.parse(unescape(encodeURIComponent(e)))}};class qt{constructor(){this._data=new T,this._nDataBytes=0,this._minBufferSize=0,this.blockSize=512/32}reset(){this._data=new T,this._nDataBytes=0}_append(n){typeof n=="string"&&(n=Ut.parse(n)),this._data.concat(n),this._nDataBytes+=n.sigBytes}_doProcessBlock(n,r){}_process(n){let r,s=this._data.sigBytes/(this.blockSize*4);n?s=Math.ceil(s):s=Math.max((s|0)-this._minBufferSize,0);const t=s*this.blockSize,i=Math.min(t*4,this._data.sigBytes);if(t){for(let h=0;h<t;h+=this.blockSize)this._doProcessBlock(this._data.words,h);r=this._data.words.splice(0,t),this._data.sigBytes-=i}return new T(r,i)}}class Ht extends qt{update(n){return this._append(n),this._process(),this}finalize(n){n&&this._append(n)}}const tt=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],Kt=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],R=[];class It extends Ht{constructor(){super(...arguments),this._hash=new T([...tt])}reset(){super.reset(),this._hash=new T([...tt])}_doProcessBlock(n,r){const s=this._hash.words;let t=s[0],i=s[1],h=s[2],p=s[3],o=s[4],l=s[5],u=s[6],a=s[7];for(let f=0;f<64;f++){if(f<16)R[f]=n[r+f]|0;else{const S=R[f-15],m=(S<<25|S>>>7)^(S<<14|S>>>18)^S>>>3,_=R[f-2],g=(_<<15|_>>>17)^(_<<13|_>>>19)^_>>>10;R[f]=m+R[f-7]+g+R[f-16]}const c=o&l^~o&u,y=t&i^t&h^i&h,k=(t<<30|t>>>2)^(t<<19|t>>>13)^(t<<10|t>>>22),C=(o<<26|o>>>6)^(o<<21|o>>>11)^(o<<7|o>>>25),v=a+C+c+Kt[f]+R[f],w=k+y;a=u,u=l,l=o,o=p+v|0,p=h,h=i,i=t,t=v+w|0}s[0]=s[0]+t|0,s[1]=s[1]+i|0,s[2]=s[2]+h|0,s[3]=s[3]+p|0,s[4]=s[4]+o|0,s[5]=s[5]+l|0,s[6]=s[6]+u|0,s[7]=s[7]+a|0}finalize(n){super.finalize(n);const r=this._nDataBytes*8,s=this._data.sigBytes*8;return this._data.words[s>>>5]|=128<<24-s%32,this._data.words[(s+64>>>9<<4)+14]=Math.floor(r/4294967296),this._data.words[(s+64>>>9<<4)+15]=r,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function Zt(e){return new It().finalize(e).toString(Ft)}function Wt(e,n={}){const r=typeof e=="string"?e:Pt(e,n);return Zt(r).slice(0,10)}function Jt(e,n,r="",s=!1){const t=Wt(e+r);let i=0,h=0;const p=Math.ceil(Math.log10(n.length)),o=Vt(n).flatMap((l,u)=>{var c;h=((c=l[0])==null?void 0:c.offset)||i;const a=l[l.length-1];a?i=a.offset+a.content.length:i+=1;const f=[...l,{content:`
`,offset:i}];return s&&f.unshift({key:`${t}-ln-${u+1}`,content:`${String(u+1).padStart(p," ")}  `,offset:h,htmlClass:"shiki-magic-move-line-number"}),f}).map((l,u)=>{const a=l;return a.key||(a.key=`${t}-${u}`),a});return{code:e,hash:t,tokens:o,lineNumbers:s}}function Vt(e){return e.map(n=>n.flatMap(r=>{if(r.content.match(/^\s+$/))return r;const s=r.content.match(/^(\s*)(.*?)(\s*)$/);if(!s)return r;const[,t,i,h]=s;if(!t&&!h)return r;const p=[{...r,offset:r.offset+t.length,content:i}];return t&&p.unshift({content:t,offset:r.offset}),h&&p.push({content:h,offset:r.offset+t.length+i.length}),p}))}function Yt(e,n){let r=0;const s=e.key;let t=0;const i=[];function h(){return t===0?(t++,s):`${s}-${t++}`}for(const p of n)p>r&&i.push({...e,content:e.content.slice(r,p),offset:e.offset+r,key:h()}),r=p;return r<e.content.length&&i.push({...e,content:e.content.slice(r),offset:e.offset+r,key:h()}),i}function et(e,n){const r=Array.from(n instanceof Set?n:new Set(n)).sort((s,t)=>s-t);return r.length?e.flatMap(s=>{const t=r.filter(i=>s.offset<i&&i<s.offset+s.content.length).map(i=>i-s.offset).sort((i,h)=>i-h);return t.length?Yt(s,t):s}):e}function Xt(e,n,r={}){const{splitTokens:s=!1,enhanceMatching:t=!0}=r,i=Qt(e.code,n.code,r),h=s?et(e.tokens,i.flatMap(l=>l.from)):e.tokens,p=s?et(n.tokens,i.flatMap(l=>l.to)):n.tokens,o=new Set;if(i.forEach(l=>{var y,k;const u=h.filter(C=>C.offset>=l.from[0]&&C.offset+C.content.length<=l.from[1]),a=p.filter(C=>C.offset>=l.to[0]&&C.offset+C.content.length<=l.to[1]);let f=0,c=0;for(;f<u.length&&c<a.length&&!(!u[f]||!a[c]);)u[f].content===a[c].content?(a[c].key=u[f].key,o.add(u[f].key),f++,c++):((y=u[f+1])==null?void 0:y.content)===a[c].content?f++:(u[f].content===((k=a[c+1])==null?void 0:k.content)||f++,c++)}),t)for(const l of h){if(o.has(l.key)||l.content.length<3||!l.content.match(/^[\w\d_-]+$/))continue;const u=p.find(a=>a.content===l.content&&!o.has(a.key));u&&(u.key=l.key,o.add(l.key))}return{from:h.length===e.tokens.length?e:{...e,tokens:h},to:p.length===n.tokens.length?n:{...n,tokens:p}}}function Qt(e,n,r={}){var p;let s=O(e,n);s=((p=r.diffCleanup)==null?void 0:p.call(r,s))||s;let t="",i="";const h=[];for(const[o,l]of s)o===0?(h.push({from:[t.length,t.length+l.length],to:[i.length,i.length+l.length],content:l}),t+=l,i+=l):o===-1?t+=l:o===1&&(i+=l);if(t!==e||i!==n)throw new Error("Content mismatch");return h}var Gt=Object.defineProperty,te=(e,n,r)=>n in e?Gt(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,$=(e,n,r)=>(te(e,typeof n!="symbol"?n+"":n,r),r);const L="shiki-magic-move",z=`${L}-leave-from`,ee=`${L}-leave-to`,nt=`${L}-leave-active`,F=`${L}-enter-from`,x=`${L}-enter-to`,st=`${L}-enter-active`,rt=`${L}-move`,it=`${L}-container-resize`,ot=`${L}-container-restyle`,ne={globalScale:1,duration:500,delayMove:.3,delayLeave:.1,delayEnter:.7,delayContainer:.4,stagger:0,easing:"ease",animateContainer:!0,containerStyle:!0};class se{constructor(n,r={}){$(this,"mapDom",new Map),$(this,"container"),$(this,"anchor"),$(this,"previousPromises",[]),$(this,"options"),$(this,"isFirstRender",!0),this.options={...ne,...r},typeof n=="string"?this.container=document.querySelector(n):this.container=n,this.anchor=document.createElement("span"),this.anchor.style.position="absolute",this.anchor.style.top="0",this.anchor.style.left="0",this.anchor.style.height="1px",this.anchor.style.width="1px",this.container.prepend(this.anchor)}applyElementContent(n,r){r.content!==`
`&&(n.textContent=r.content,n.classList.add(`${L}-item`))}applyElementStyle(n,r){r.htmlStyle&&n.setAttribute("style",r.htmlStyle),r.htmlClass&&(n.className=[`${L}-item`,r.htmlClass].join(" ")),r.color&&(n.style.color=r.color),r.bgColor&&(n.style.backgroundColor=r.bgColor)}applyElement(n,r){this.applyElementContent(n,r),this.applyElementStyle(n,r)}applyNodeStyle(n,r){if(r.bg&&(n.style.backgroundColor=r.bg),r.fg&&(n.style.color=r.fg),r.rootStyle){const s=r.rootStyle.split(";");for(const t of s){const[i,h]=t.split(":");i&&h&&n.style.setProperty(i.trim(),h.trim())}}}applyContainerStyle(n){this.options.containerStyle&&this.applyNodeStyle(this.container,n)}checkContainerStyleChanged(n){if(!this.options.containerStyle)return!1;const r=this.container.cloneNode();this.applyNodeStyle(r,n);const s=r.style.backgroundColor!==this.container.style.backgroundColor,t=r.style.color!==this.container.style.color;let i=!1;if(n.rootStyle){const h=n.rootStyle.split(";");for(const p of h){const[o,l]=p.split(":");if(o&&l&&(i=i||this.container.style.getPropertyValue(o.trim())!==r.style.getPropertyValue(o.trim()),i))break}}return s||t||i}registerTransitionEnd(n,r){let s=!1,t=()=>{};const i=new Promise(h=>{const p=o=>{!o||o.target!==n||t()};t=()=>{s||(s=!0,n.removeEventListener("transitionend",p),r(),h())},n.addEventListener("transitionend",p)});return i.resolve=t,i}setCssVariables(){this.container.style.setProperty("--smm-duration",`${this.options.duration}ms`),this.container.style.setProperty("--smm-delay-move",`${this.options.delayMove}`),this.container.style.setProperty("--smm-delay-leave",`${this.options.delayLeave}`),this.container.style.setProperty("--smm-delay-enter",`${this.options.delayEnter}`),this.container.style.setProperty("--smm-delay-container",`${this.options.delayContainer}`),this.container.style.setProperty("--smm-easing",this.options.easing),this.container.style.setProperty("--smm-stagger","0")}replace(n){const r=new Map,s=n.tokens.map(t=>{if(this.mapDom.has(t.key)){const i=this.mapDom.get(t.key);return this.applyElement(i,t),r.set(t.key,i),this.mapDom.delete(t.key),i}else{const i=document.createElement(t.content===`
`?"br":"span");return this.applyElement(i,t),r.set(t.key,i),i}});this.container.replaceChildren(this.anchor,...s),this.applyContainerStyle(n),this.mapDom=r}render(n){this.setCssVariables();const r=new Map,s=[],t=[],i=[],h=[];this.previousPromises.forEach(c=>c.resolve()),this.previousPromises=[];const p=[],{globalScale:o}=this.options,l=new Map;let u=this.anchor.getBoundingClientRect();const a=this.container.getBoundingClientRect();for(const c of this.mapDom.values()){const y=c.getBoundingClientRect();l.set(c,{x:y.x-u.x,y:y.y-u.y})}const f=n.tokens.map(c=>{if(this.mapDom.has(c.key)){const y=this.mapDom.get(c.key);return this.applyElementContent(y,c),p.push(()=>{this.applyElementStyle(y,c)}),s.push(y),r.set(c.key,y),this.mapDom.delete(c.key),y}else{const y=document.createElement(c.content===`
`?"br":"span");return this.applyElement(y,c),t.push(y),r.set(c.key,y),y}});for(const[c,y]of this.mapDom)y.tagName!=="BR"&&i.push(y);for(const c of i)c.style.position="absolute";if(this.container.replaceChildren(this.anchor,...f,...i),this.mapDom=r,i.forEach((c,y)=>{c.style.position="absolute";const k=l.get(c);c.style.top=`${k.y/o}px`,c.style.left=`${k.x/o}px`,this.options.stagger?c.style.setProperty("--smm-stagger",`${y*this.options.stagger}ms`):c.style.removeProperty("--smm-stagger"),c.classList.add(z),c.classList.add(nt),p.unshift(()=>{c.classList.remove(z),c.classList.add(ee)}),h.push(this.registerTransitionEnd(c,()=>{c.classList.remove(z),c.classList.remove(nt),c.classList.remove(x),c.remove()}))}),this.isFirstRender||t.forEach((c,y)=>{c.classList.add(F),c.classList.add(st),this.options.stagger?c.style.setProperty("--smm-stagger",`${y*this.options.stagger}ms`):c.style.removeProperty("--smm-stagger"),p.push(()=>{c.classList.remove(F),c.classList.add(x)}),h.push(this.registerTransitionEnd(c,()=>{c.classList.remove(F),c.classList.remove(st),c.classList.remove(x)}))}),u=this.anchor.getBoundingClientRect(),s.forEach((c,y)=>{const k=c.getBoundingClientRect(),C={x:k.x-u.x,y:k.y-u.y},v=l.get(c);c.style.transitionDuration=c.style.transitionDelay="0ms";const w=(v.x-C.x)/o,S=(v.y-C.y)/o;c.style.transform=`translate(${w}px, ${S}px)`,this.options.stagger?c.style.setProperty("--smm-stagger",`${y*this.options.stagger}ms`):c.style.removeProperty("--smm-stagger"),p.unshift(()=>{c.classList.add(rt),c.style.transform=c.style.transitionDuration=c.style.transitionDelay=""}),h.push(this.registerTransitionEnd(c,()=>{c.classList.remove(rt)}))}),this.options.animateContainer&&!this.isFirstRender){const c=this.container.getBoundingClientRect();(c.width!==a.width||c.height!==a.height)&&(this.container.style.transitionDuration=this.container.style.transitionDelay="0ms",this.container.style.height=`${a.height/o}px`,this.container.style.width=`${a.width/o}px`,p.unshift(()=>{this.container.classList.add(it),this.container.style.transitionDuration=this.container.style.transitionDelay="",this.container.style.height=`${c.height/o}px`,this.container.style.width=`${c.width/o}px`}),h.push(this.registerTransitionEnd(this.container,()=>{this.container.classList.remove(it),this.container.style.height=this.container.style.width=""})))}return this.options.containerStyle&&(this.isFirstRender?this.applyContainerStyle(n):this.checkContainerStyleChanged(n)&&(p.push(()=>{this.container.classList.add(ot),this.applyContainerStyle(n)}),h.push(this.registerTransitionEnd(this.container,()=>{this.container.classList.remove(ot)})))),re(),p.forEach(c=>c()),this.isFirstRender=!1,this.previousPromises=h,Promise.all(h).then()}}function re(){return document.body.offsetHeight}const ie=q({name:"ShikiMagicMoveRenderer",props:{animate:{type:Boolean,default:!0},tokens:{type:Object,required:!0},previous:{type:Object,required:!1},options:{type:Object}},emits:["end","start"],setup(e,{emit:n}){const r=U();let s=!1;return at(()=>{r.value.innerHTML="",s=!0;const t=new se(r.value);ct(()=>e.tokens,async i=>{if(Object.assign(t.options,e.options),e.animate){e.previous&&t.replace(e.previous),await Z();const h=t.render(i);await Z(),n("start"),await h,n("end")}else t.replace(i)},{immediate:!0})}),()=>j("pre",{ref:r,class:"shiki-magic-move-container"},s?void 0:ft(e.tokens.tokens,t=>t.content===`
`?j("br",{key:t.key}):j("span",{style:[{color:t.color},t.htmlStyle],class:["shiki-magic-move-item",t.htmlClass],key:t.key},t.content)))}}),oe=q({name:"ShikiMagicMovePrecompiled",props:{steps:{type:Array,required:!0},step:{type:Number,default:0},animate:{type:Boolean,default:!0},options:{type:Object,default:()=>({})}},emits:["start","end"],setup(e,{emit:n}){let s=Jt("",[]);const t=lt(()=>{const i=Xt(s,e.steps[Math.min(e.step,e.steps.length-1)],e.options);return s=i.to,i});return()=>j(ie,{tokens:t.value.to,previous:t.value.from,options:e.options,animate:e.animate,onStart:()=>n("start"),onEnd:()=>n("end")})}});var I={exports:{}};I.exports;(function(e){var n=function(){var r=String.fromCharCode,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={};function h(o,l){if(!i[o]){i[o]={};for(var u=0;u<o.length;u++)i[o][o.charAt(u)]=u}return i[o][l]}var p={compressToBase64:function(o){if(o==null)return"";var l=p._compress(o,6,function(u){return s.charAt(u)});switch(l.length%4){default:case 0:return l;case 1:return l+"===";case 2:return l+"==";case 3:return l+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:p._decompress(o.length,32,function(l){return h(s,o.charAt(l))})},compressToUTF16:function(o){return o==null?"":p._compress(o,15,function(l){return r(l+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:p._decompress(o.length,16384,function(l){return o.charCodeAt(l)-32})},compressToUint8Array:function(o){for(var l=p.compress(o),u=new Uint8Array(l.length*2),a=0,f=l.length;a<f;a++){var c=l.charCodeAt(a);u[a*2]=c>>>8,u[a*2+1]=c%256}return u},decompressFromUint8Array:function(o){if(o==null)return p.decompress(o);for(var l=new Array(o.length/2),u=0,a=l.length;u<a;u++)l[u]=o[u*2]*256+o[u*2+1];var f=[];return l.forEach(function(c){f.push(r(c))}),p.decompress(f.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":p._compress(o,6,function(l){return t.charAt(l)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),p._decompress(o.length,32,function(l){return h(t,o.charAt(l))}))},compress:function(o){return p._compress(o,16,function(l){return r(l)})},_compress:function(o,l,u){if(o==null)return"";var a,f,c={},y={},k="",C="",v="",w=2,S=3,m=2,_=[],g=0,d=0,b;for(b=0;b<o.length;b+=1)if(k=o.charAt(b),Object.prototype.hasOwnProperty.call(c,k)||(c[k]=S++,y[k]=!0),C=v+k,Object.prototype.hasOwnProperty.call(c,C))v=C;else{if(Object.prototype.hasOwnProperty.call(y,v)){if(v.charCodeAt(0)<256){for(a=0;a<m;a++)g=g<<1,d==l-1?(d=0,_.push(u(g)),g=0):d++;for(f=v.charCodeAt(0),a=0;a<8;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1}else{for(f=1,a=0;a<m;a++)g=g<<1|f,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=0;for(f=v.charCodeAt(0),a=0;a<16;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1}w--,w==0&&(w=Math.pow(2,m),m++),delete y[v]}else for(f=c[v],a=0;a<m;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1;w--,w==0&&(w=Math.pow(2,m),m++),c[C]=S++,v=String(k)}if(v!==""){if(Object.prototype.hasOwnProperty.call(y,v)){if(v.charCodeAt(0)<256){for(a=0;a<m;a++)g=g<<1,d==l-1?(d=0,_.push(u(g)),g=0):d++;for(f=v.charCodeAt(0),a=0;a<8;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1}else{for(f=1,a=0;a<m;a++)g=g<<1|f,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=0;for(f=v.charCodeAt(0),a=0;a<16;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1}w--,w==0&&(w=Math.pow(2,m),m++),delete y[v]}else for(f=c[v],a=0;a<m;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1;w--,w==0&&(w=Math.pow(2,m),m++)}for(f=2,a=0;a<m;a++)g=g<<1|f&1,d==l-1?(d=0,_.push(u(g)),g=0):d++,f=f>>1;for(;;)if(g=g<<1,d==l-1){_.push(u(g));break}else d++;return _.join("")},decompress:function(o){return o==null?"":o==""?null:p._decompress(o.length,32768,function(l){return o.charCodeAt(l)})},_decompress:function(o,l,u){var a=[],f=4,c=4,y=3,k="",C=[],v,w,S,m,_,g,d,b={val:u(0),position:l,index:1};for(v=0;v<3;v+=1)a[v]=v;for(S=0,_=Math.pow(2,2),g=1;g!=_;)m=b.val&b.position,b.position>>=1,b.position==0&&(b.position=l,b.val=u(b.index++)),S|=(m>0?1:0)*g,g<<=1;switch(S){case 0:for(S=0,_=Math.pow(2,8),g=1;g!=_;)m=b.val&b.position,b.position>>=1,b.position==0&&(b.position=l,b.val=u(b.index++)),S|=(m>0?1:0)*g,g<<=1;d=r(S);break;case 1:for(S=0,_=Math.pow(2,16),g=1;g!=_;)m=b.val&b.position,b.position>>=1,b.position==0&&(b.position=l,b.val=u(b.index++)),S|=(m>0?1:0)*g,g<<=1;d=r(S);break;case 2:return""}for(a[3]=d,w=d,C.push(d);;){if(b.index>o)return"";for(S=0,_=Math.pow(2,y),g=1;g!=_;)m=b.val&b.position,b.position>>=1,b.position==0&&(b.position=l,b.val=u(b.index++)),S|=(m>0?1:0)*g,g<<=1;switch(d=S){case 0:for(S=0,_=Math.pow(2,8),g=1;g!=_;)m=b.val&b.position,b.position>>=1,b.position==0&&(b.position=l,b.val=u(b.index++)),S|=(m>0?1:0)*g,g<<=1;a[c++]=r(S),d=c-1,f--;break;case 1:for(S=0,_=Math.pow(2,16),g=1;g!=_;)m=b.val&b.position,b.position>>=1,b.position==0&&(b.position=l,b.val=u(b.index++)),S|=(m>0?1:0)*g,g<<=1;a[c++]=r(S),d=c-1,f--;break;case 2:return C.join("")}if(f==0&&(f=Math.pow(2,y),y++),a[d])k=a[d];else if(d===c)k=w+w.charAt(0);else return null;C.push(k),a[c++]=w+k.charAt(0),f--,w=k,f==0&&(f=Math.pow(2,y),y++)}}};return p}();e!=null?e.exports=n:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return n})})(I);var le=I.exports;const ae=dt(le),ce=q({__name:"ShikiMagicMove",props:{at:{type:[String,Number],required:!1},stepsLz:{type:String,required:!0},stepRanges:{type:Array,required:!0}},setup(e){const n=e,r=JSON.parse(ae.decompressFromBase64(n.stepsLz)),{$clicksContext:s,$scale:t,$zoom:i}=_t(),{isPrintMode:h}=bt(),p=vt(),o=U(0),l=U(),u=lt(()=>n.stepRanges.map(a=>a.length?a:["all"]));return pt(()=>{s==null||s.unregister(p)}),at(()=>{if(!s)return;if(u.value.length!==r.length)throw new Error("[slidev] The length of stepRanges does not match the length of steps, this is an internal error.");const a=u.value.map(c=>c.length).reduce((c,y)=>c+y,0),f=s.calculateSince(n.at??"+1",a-1);s.register(p,f),ct(()=>s.current,()=>{const c=s.current-f.start;let y=r.length-1,k=0,C="all";for(let v=0;v<u.value.length;v++){const w=u.value[v];if(c<k+w.length-1){y=v,C=w[c-k+1];break}k+=w.length||1}o.value=y,setTimeout(()=>{var m;const v=(m=l.value)==null?void 0:m.querySelector(".shiki");if(!v)return;const S=Array.from(v.children).slice(1).filter(_=>!_.className.includes("shiki-magic-move-leave")).reduce((_,g)=>(g.tagName==="BR"?_.push([]):_[_.length-1].push(g),_),[[]]);wt(C,S.length,1,_=>S[_])})},{immediate:!0})}),(a,f)=>(gt(),yt("div",{ref_key:"container",ref:l,class:"slidev-code-wrapper slidev-code-magic-move relative"},[mt(D(oe),{class:"slidev-code relative shiki overflow-visible",steps:D(r),step:o.value,animate:!D(h),options:{globalScale:D(t)*D(i),duration:800,stagger:1}},null,8,["steps","step","animate","options"])],512))}}),ge=St(ce,[["__file","C:/Users/DChernov/home/pr/test/speech/2024/3_msk-vuejs_50-shades-of-vue-reactivity/node_modules/.pnpm/@slidev+client@0.49.0-beta.4_postcss@8.4.38_vite@5.2.10/node_modules/@slidev/client/builtin/ShikiMagicMove.vue"]]);export{ge as _};
