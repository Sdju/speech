function h(e,i,r){const t=e.createShader(i);return t?(e.shaderSource(t,r),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.error("Shader compilation failed:",e.getShaderInfoLog(t)),e.deleteShader(t),null)):null}function c(e,i,r){const t=e.createProgram();return t?(e.attachShader(t,i),e.attachShader(t,r),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.error("Program linking failed:",e.getProgramInfoLog(t)),null)):null}function m(e,i,r){const t=e.createFramebuffer(),o=e.createTexture();return!t||!o?null:(e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,i,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE?(console.error("Framebuffer not complete"),e.deleteFramebuffer(t),e.deleteTexture(o),null):{fbo:t,texture:o})}async function E(e,i,r){const t=e.createTexture();if(!t)return null;e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));try{const o=await x(i.source),s=i.options||{},u=s.wrap==="repeat"?e.REPEAT:s.wrap==="mirror"?e.MIRRORED_REPEAT:e.CLAMP_TO_EDGE;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,u);const n=s.filter==="nearest"?e.NEAREST:e.LINEAR;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),t}catch(o){return console.error("Error loading texture:",o),e.deleteTexture(t),null}}function x(e){return typeof e=="string"?new Promise((i,r)=>{const t=new Image;t.onload=()=>i(t),t.onerror=r,t.src=e}):Promise.resolve(e)}function _(e,i,r,t){const o=e.getUniformLocation(i,r);if(o)switch(t.type){case"float":e.uniform1f(o,t.value);break;case"vec2":e.uniform2fv(o,t.value);break;case"vec3":e.uniform3fv(o,t.value);break;case"vec4":e.uniform4fv(o,t.value);break;case"int":e.uniform1i(o,t.value);break;case"bool":e.uniform1i(o,t.value?1:0);break}}function d(e){const i=e.createBuffer();if(!i)return null;const r=new Float32Array([-1,-1,1,-1,-1,1,1,1]);return e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),i}function T(e,i,r){const t=e.getAttribLocation(i,"aVertexPosition");e.bindBuffer(e.ARRAY_BUFFER,r),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,2,e.FLOAT,!1,0,0)}class R{constructor(i,r,t){this.quadBuffer=null,this.programs=[],this.framebuffers=[],this.textures={},this.textureUnits={},this.uniformLocations={},this.defaultVertexShader=`
    attribute vec4 aVertexPosition;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = (aVertexPosition.xy + 1.0) / 2.0;
      gl_Position = aVertexPosition;
    }
  `,this.gl=i,this.width=r,this.height=t,this.quadBuffer=d(i),this.gl.enable(this.gl.BLEND),this.gl.getExtension("OES_standard_derivatives"),this.gl.getExtension("EXT_shader_texture_lod"),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}async initialize(i){this.cleanup();for(let r=0;r<i.stages.length-1;r++){const t=m(this.gl,this.width,this.height);if(!t)return console.error(`Failed to create framebuffer for stage ${r}`),!1;this.framebuffers.push(t)}for(let r=0;r<i.stages.length;r++){const t=i.stages[r],o=h(this.gl,this.gl.VERTEX_SHADER,this.defaultVertexShader),s=h(this.gl,this.gl.FRAGMENT_SHADER,t.fragmentShader);if(!o||!s)return console.error(`Failed to create shaders for stage ${r}`),!1;const u=c(this.gl,o,s);if(!u)return console.error(`Failed to create program for stage ${r}`),!1;this.programs.push(u),this.quadBuffer&&T(this.gl,u,this.quadBuffer),t.textures&&await this.loadStageTextures(t.textures,r)}return!0}async loadStageTextures(i,r){for(let t=0;t<i.length;t++){const o=i[t],s=o.name||`u_texture${r}_${t}`,u=Object.keys(this.textureUnits).length,n=await E(this.gl,o,u);if(n){this.textures[s]=n,this.textureUnits[s]=u;const f=this.programs[r],a=this.gl.getUniformLocation(f,s);a&&this.gl.uniform1i(a,u)}}}render(i,r,t){for(let o=0;o<i.stages.length;o++){const s=i.stages[o],u=this.programs[o];this.gl.useProgram(u),o===i.stages.length-1?this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.framebuffers[o].fbo),this.gl.viewport(0,0,this.width,this.height),this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.setStageUniforms(u,s.uniforms||{}),this.setBaseUniforms(u,t),r&&this.setStageUniforms(u,r),this.bindInputTextures(s,o),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4)}}setStageUniforms(i,r){Object.entries(r).forEach(([t,o])=>{_(this.gl,i,t,o)})}setBaseUniforms(i,r){const t=this.gl.getUniformLocation(i,"u_time"),o=this.gl.getUniformLocation(i,"u_resolution"),s=this.gl.getUniformLocation(i,"u_imageSize");t&&this.gl.uniform1f(t,performance.now()/1e3),o&&this.gl.uniform2f(o,this.width,this.height),s&&r?.imageSize&&this.gl.uniform2f(s,r.imageSize[0],r.imageSize[1])}bindInputTextures(i,r){if(r>0){const o=this.gl.getUniformLocation(this.programs[r],"u_inputTexture");if(o){const s=this.framebuffers[r-1];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,s.texture),this.gl.uniform1i(o,0)}}i.textures&&i.textures.forEach((t,o)=>{const s=t.name||`u_texture${r}_${o}`,u=this.textures[s],n=this.textureUnits[s];u!==void 0&&(this.gl.activeTexture(this.gl.TEXTURE0+n),this.gl.bindTexture(this.gl.TEXTURE_2D,u))})}resize(i,r){this.width=i,this.height=r,this.framebuffers.forEach(t=>{this.gl.deleteFramebuffer(t.fbo),this.gl.deleteTexture(t.texture)}),this.framebuffers=[]}cleanup(){this.programs.forEach(i=>{this.gl.deleteProgram(i)}),this.programs=[],this.framebuffers.forEach(i=>{this.gl.deleteFramebuffer(i.fbo),this.gl.deleteTexture(i.texture)}),this.framebuffers=[],Object.values(this.textures).forEach(i=>{this.gl.deleteTexture(i)}),this.textures={},this.textureUnits={},this.uniformLocations={}}destroy(){this.cleanup(),this.quadBuffer&&this.gl.deleteBuffer(this.quadBuffer)}}function l(e,i={}){switch(e){case"vignette":const r=i.borderSize??.2,t=i.blurWidth??.1;return`
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        
        void main() {
          vec4 color = texture2D(u_texture0_0, v_texCoord);
          
          float borderSize = ${r};
          float blurWidth = ${t};
          
          float left = smoothstep(0.0, blurWidth, v_texCoord.x);
          float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
          float top = smoothstep(0.0, blurWidth, v_texCoord.y);
          float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
          
          float vignette = min(min(left, right), min(top, bottom));
          
          gl_FragColor = vec4(color.rgb, color.a * vignette);
        }
      `;case"blur":return`
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        uniform vec2 u_resolution;
        
        void main() {
          float blurAmount = ${i.blurAmount??1};
          vec2 offset = blurAmount / u_resolution;
          
          vec4 sum = vec4(0.0);
          sum += texture2D(u_texture0_0, v_texCoord + vec2(-2.0 * offset.x, -2.0 * offset.y)) * 0.0625;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(-1.0 * offset.x, -1.0 * offset.y)) * 0.125;
          sum += texture2D(u_texture0_0, v_texCoord) * 0.25;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(1.0 * offset.x, 1.0 * offset.y)) * 0.125;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(2.0 * offset.x, 2.0 * offset.y)) * 0.0625;
          
          gl_FragColor = sum;
        }
      `;case"copy":default:return`
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        
        void main() {
          gl_FragColor = texture2D(u_texture0_0, v_texCoord);
        }
      `}}function b(e,i){if(Array.isArray(e)&&e.length>0){const r=e[0];if(Array.isArray(r)&&r.length===2&&typeof r[0]=="string")return e.map(t=>{const[o,s]=t,u={};s&&Object.entries(s).forEach(([f,a])=>{u[f]={type:"float",value:a}});const n={fragmentShader:l(o,s),uniforms:Object.keys(u).length>0?u:void 0};return i&&(n.textures=[{source:i,options:{flipY:!0}}]),n})}return i?e.map(r=>r.textures&&r.textures.some(o=>typeof o.source<"u")?r.textures&&r.textures.length>0&&!r.textures[0].source?{...r,textures:[{...r.textures[0],source:i}]}:r:{...r,textures:[...r.textures||[],{source:i,options:{flipY:!0}}]}):e}export{R as P,b as n};
