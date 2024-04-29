import{D as F,o as O,c as w,k as M,q as D,s as x,A as I,e as L,I as B}from"./modules/vue-D2lcLnn_.js";import{I as k}from"./cover-B4jmUf5k.js";import{b as z,aT as S,u as q}from"./index-BzHxaLMT.js";import{p as U,u as X,f as W}from"./slidev/context-DHRpk6fg.js";import"./modules/shiki-DuhqrmLp.js";function p(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function g(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function C(t,i,e){return i&&g(t.prototype,i),e&&g(t,e),t}function N(t){return+t.replace(/px/,"")}function H(t){var i=window.devicePixelRatio,e=getComputedStyle(t),n=N(e.getPropertyValue("width")),a=N(e.getPropertyValue("height"));t.setAttribute("width",(n*i).toString()),t.setAttribute("height",(a*i).toString())}function c(t,i){var e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,n=Math.random()*(i-t)+t;return Math.floor(n*Math.pow(10,e))/Math.pow(10,e)}function A(t){return t[c(0,t.length)]}var V=.00125,$=5e-4,G=9e-4,Y=1e-5,J=6,Z=80,K=.9,Q=1.7,ee=.2,te=.6,ie=.03,ne=.07,y=15,E=82,ae=150,oe=100,se=250,re=40,ue=["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"];function T(t){var i=1920;return Math.log(t)/Math.log(i)}var P=function(){function t(i){p(this,t);var e=i.initialPosition,n=i.direction,a=i.confettiRadius,o=i.confettiColors,s=i.emojis,h=i.emojiSize,u=i.canvasWidth,f=c(K,Q,3),r=f*T(u);this.confettiSpeed={x:r,y:r},this.finalConfettiSpeedX=c(ee,te,3),this.rotationSpeed=s.length?.01:c(ie,ne,3)*T(u),this.dragForceCoefficient=c($,G,6),this.radius={x:a,y:a},this.initialRadius=a,this.rotationAngle=n==="left"?c(0,.2,3):c(-.2,0,3),this.emojiSize=h,this.emojiRotationAngle=c(0,2*Math.PI),this.radiusYUpdateDirection="down";var d=n==="left"?c(E,y)*Math.PI/180:c(-y,-E)*Math.PI/180;this.absCos=Math.abs(Math.cos(d)),this.absSin=Math.abs(Math.sin(d));var l=c(-ae,0),m={x:e.x+(n==="left"?-l:l)*this.absCos,y:e.y-l*this.absSin};this.currentPosition=Object.assign({},m),this.initialPosition=Object.assign({},m),this.color=s.length?null:A(o),this.emoji=s.length?A(s):null,this.createdAt=new Date().getTime(),this.direction=n}return C(t,[{key:"draw",value:function(e){var n=this.currentPosition,a=this.radius,o=this.color,s=this.emoji,h=this.rotationAngle,u=this.emojiRotationAngle,f=this.emojiSize,r=window.devicePixelRatio;o?(e.fillStyle=o,e.beginPath(),e.ellipse(n.x*r,n.y*r,a.x*r,a.y*r,h,0,2*Math.PI),e.fill()):s&&(e.font="".concat(f,"px serif"),e.save(),e.translate(r*n.x,r*n.y),e.rotate(u),e.textAlign="center",e.fillText(s,0,0),e.restore())}},{key:"updatePosition",value:function(e,n){var a=this.confettiSpeed,o=this.dragForceCoefficient,s=this.finalConfettiSpeedX,h=this.radiusYUpdateDirection,u=this.rotationSpeed,f=this.createdAt,r=this.direction,d=n-f;if(a.x>s&&(this.confettiSpeed.x-=o*e),this.currentPosition.x+=a.x*(r==="left"?-this.absCos:this.absCos)*e,this.currentPosition.y=this.initialPosition.y-a.y*this.absSin*d+V*Math.pow(d,2)/2,this.rotationSpeed-=this.emoji?1e-4:Y*e,this.rotationSpeed<0&&(this.rotationSpeed=0),this.emoji){this.emojiRotationAngle+=this.rotationSpeed*e%(2*Math.PI);return}h==="down"?(this.radius.y-=e*u,this.radius.y<=0&&(this.radius.y=0,this.radiusYUpdateDirection="up")):(this.radius.y+=e*u,this.radius.y>=this.initialRadius&&(this.radius.y=this.initialRadius,this.radiusYUpdateDirection="down"))}},{key:"getIsVisibleOnCanvas",value:function(e){return this.currentPosition.y<e+oe}}]),t}();function he(){var t=document.createElement("canvas");return t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.top="0",t.style.left="0",t.style.zIndex="1000",t.style.pointerEvents="none",document.body.appendChild(t),t}function fe(t){var i=t.confettiRadius,e=i===void 0?J:i,n=t.confettiNumber,a=n===void 0?t.confettiesNumber||(t.emojis?re:se):n,o=t.confettiColors,s=o===void 0?ue:o,h=t.emojis,u=h===void 0?t.emojies||[]:h,f=t.emojiSize,r=f===void 0?Z:f;return t.emojies&&console.error("emojies argument is deprecated, please use emojis instead"),t.confettiesNumber&&console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"),{confettiRadius:e,confettiNumber:a,confettiColors:s,emojis:u,emojiSize:r}}var ce=function(){function t(i){var e=this;p(this,t),this.canvasContext=i,this.shapes=[],this.promise=new Promise(function(n){return e.resolvePromise=n})}return C(t,[{key:"getBatchCompletePromise",value:function(){return this.promise}},{key:"addShapes",value:function(){var e;(e=this.shapes).push.apply(e,arguments)}},{key:"complete",value:function(){var e;return this.shapes.length?!1:((e=this.resolvePromise)===null||e===void 0||e.call(this),!0)}},{key:"processShapes",value:function(e,n,a){var o=this,s=e.timeDelta,h=e.currentTime;this.shapes=this.shapes.filter(function(u){return u.updatePosition(s,h),u.draw(o.canvasContext),a?u.getIsVisibleOnCanvas(n):!0})}}]),t}(),de=function(){function t(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};p(this,t),this.activeConfettiBatches=[],this.canvas=i.canvas||he(),this.canvasContext=this.canvas.getContext("2d"),this.requestAnimationFrameRequested=!1,this.lastUpdated=new Date().getTime(),this.iterationIndex=0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}return C(t,[{key:"loop",value:function(){this.requestAnimationFrameRequested=!1,H(this.canvas);var e=new Date().getTime(),n=e-this.lastUpdated,a=this.canvas.offsetHeight,o=this.iterationIndex%10===0;this.activeConfettiBatches=this.activeConfettiBatches.filter(function(s){return s.processShapes({timeDelta:n,currentTime:e},a,o),o?!s.complete():!0}),this.iterationIndex++,this.queueAnimationFrameIfNeeded(e)}},{key:"queueAnimationFrameIfNeeded",value:function(e){this.requestAnimationFrameRequested||this.activeConfettiBatches.length<1||(this.requestAnimationFrameRequested=!0,this.lastUpdated=e||new Date().getTime(),requestAnimationFrame(this.loop))}},{key:"addConfetti",value:function(){for(var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=fe(e),a=n.confettiRadius,o=n.confettiNumber,s=n.confettiColors,h=n.emojis,u=n.emojiSize,f=this.canvas.getBoundingClientRect(),r=f.width,d=f.height,l=d*5/7,m={x:0,y:l},R={x:r,y:l},v=new ce(this.canvasContext),_=0;_<o/2;_++){var j=new P({initialPosition:m,direction:"right",confettiRadius:a,confettiColors:s,confettiNumber:o,emojis:h,emojiSize:u,canvasWidth:r}),b=new P({initialPosition:R,direction:"left",confettiRadius:a,confettiColors:s,confettiNumber:o,emojis:h,emojiSize:u,canvasWidth:r});v.addShapes(j,b)}return this.activeConfettiBatches.push(v),this.queueAnimationFrameIfNeeded(),v.getBatchCompletePromise()}},{key:"clearCanvas",value:function(){this.activeConfettiBatches=[]}},{key:"destroyCanvas",value:function(){this.canvas.remove()}}]),t}();const le=L("h1",null,"Поздравления!!!",-1),me={__name:"40",setup(t){U(S),X();const i=new de,e=B(),{currentSlideNo:n}=q();return F(n,a=>{a===e.setupState.$page&&i.addConfetti({confettiColors:["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"],confettiRadius:10,confettiNumber:150})}),(a,o)=>(O(),w(k,D(x(I(W)(I(S),39))),{default:M(()=>[le]),_:1},16))}},Se=z(me,[["__file","/@slidev/slides/40.md"]]);export{Se as default};
