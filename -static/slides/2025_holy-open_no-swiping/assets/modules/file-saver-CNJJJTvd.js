function _(o,u){for(var i=0;i<u.length;i++){const r=u[i];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in o)){const f=Object.getOwnPropertyDescriptor(r,s);f&&Object.defineProperty(o,s,f.get?f:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}))}var v=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function A(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}function F(o){if(Object.prototype.hasOwnProperty.call(o,"__esModule"))return o;var u=o.default;if(typeof u=="function"){var i=function r(){return this instanceof r?Reflect.construct(u,arguments,this.constructor):u.apply(this,arguments)};i.prototype=u.prototype}else i={};return Object.defineProperty(i,"__esModule",{value:!0}),Object.keys(o).forEach(function(r){var s=Object.getOwnPropertyDescriptor(o,r);Object.defineProperty(i,r,s.get?s:{enumerable:!0,get:function(){return o[r]}})}),i}var y={exports:{}},E=y.exports,j;function R(){return j||(j=1,function(o,u){(function(i,r){r()})(E,function(){function i(e,t){return typeof t>"u"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function r(e,t,l){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){p(n.response,t,l)},n.onerror=function(){console.error("could not download file")},n.send()}function s(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function f(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var c=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof v=="object"&&v.global===v?v:void 0,b=c.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),p=c.saveAs||(typeof window!="object"||window!==c?function(){}:"download"in HTMLAnchorElement.prototype&&!b?function(e,t,l){var n=c.URL||c.webkitURL,a=document.createElement("a");t=t||e.name||"download",a.download=t,a.rel="noopener",typeof e=="string"?(a.href=e,a.origin===location.origin?f(a):s(a.href)?r(e,t,l):f(a,a.target="_blank")):(a.href=n.createObjectURL(e),setTimeout(function(){n.revokeObjectURL(a.href)},4e4),setTimeout(function(){f(a)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,l){if(t=t||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(i(e,l),t);else if(s(e))r(e,t,l);else{var n=document.createElement("a");n.href=e,n.target="_blank",setTimeout(function(){f(n)})}}:function(e,t,l,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof e=="string")return r(e,t,l);var a=e.type==="application/octet-stream",O=/constructor/i.test(c.HTMLElement)||c.safari,g=/CriOS\/[\d]+/.test(navigator.userAgent);if((g||a&&O||b)&&typeof FileReader<"u"){var m=new FileReader;m.onloadend=function(){var d=m.result;d=g?d:d.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=d:location=d,n=null},m.readAsDataURL(e)}else{var h=c.URL||c.webkitURL,w=h.createObjectURL(e);n?n.location=w:location.href=w,n=null,setTimeout(function(){h.revokeObjectURL(w)},4e4)}});c.saveAs=p.saveAs=p,o.exports=p})}(y)),y.exports}var S=R();const L=_({__proto__:null},[S]);export{L as F,A as a,F as g};
