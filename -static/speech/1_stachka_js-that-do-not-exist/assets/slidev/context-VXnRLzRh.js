import{a2 as n,a8 as r,t as u,y as j,ax as $,aD as v}from"../modules/vue-DRJy-LFx.js";import{T as p,a5 as x,ay as C,a4 as S,a1 as T,a2 as R,az as l,a0 as k,aA as E,aB as F}from"../index-B3nmfwQ3.js";function g(){const t=n(C),a=r(t,"nav"),s=n(S).value,e=r(s,"current"),i=n(T),c=n(R),o=n(l,{}),d=n(k,void 0),m=n(p,u(1)),f=n(x,j(()=>1));return{$slidev:t,$nav:a,$clicksContext:s,$clicks:e,$page:i,$route:d,$renderContext:c,$frontmatter:o,$scale:m,$zoom:f}}function D(t){var i,c;$(l,t);const{$slidev:a,$page:s}=g(),e=a.nav.slides.find(o=>o.no===s.value);if((c=(i=e==null?void 0:e.meta)==null?void 0:i.slide)!=null&&c.frontmatter){for(const o of Object.keys(e.meta.slide.frontmatter))o in t||delete e.meta.slide.frontmatter[o];Object.assign(e.meta.slide.frontmatter,t)}}function L(t,a){return{...v(t,a===0?E:F),frontmatter:t}}export{L as f,D as p,g as u};
