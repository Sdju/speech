#ifdef GL_ES
precision highp float;
#endif

// https://www.shadertoy.com/view/XlfGRj

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_baseColor;
uniform float u_slideNumber;
#define PI 3.14159265359

#define iterations 15
#define formuparam 0.57

#define volsteps 20
#define stepsize 0.1

#define zoom   0.800
#define tile   0.750
#define speed  0.0001 

#define brightness 0.0017
#define darkmatter 0.600
#define distfading 0.660
#define saturation 0.850

void main()
{
	//get coords and direction
	vec2 uv=gl_FragCoord.xy/u_resolution.xy-.5;
	uv.y*=u_resolution.y/u_resolution.x;
	vec3 dir=vec3(uv*zoom,1.);
	float time=u_time*speed+.25;

  vec2 u_mouse = vec2(sin(u_slideNumber / 2.0) * 5.0, cos(u_slideNumber / 2.0) * 5.0);

	//mouse rotation
	float a1=.5+u_mouse.x/u_resolution.x*2.;
	float a2=.8+u_mouse.y/u_resolution.y*2.;
	mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
	mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
	dir.xz*=rot1;
	dir.xy*=rot2;
	vec3 from=vec3(1.,.5,0.5);
	from+=vec3(time*2.,time,-2.);
	from.xz*=rot1;
	from.xy*=rot2;
	
	//volumetric rendering
	float s=0.1,fade=1.;
	vec3 v=vec3(0.);
	for (int r=0; r<volsteps; r++) {
		vec3 p=from+s*dir*.5;
		p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) { 
			p=abs(p)/dot(p,p)-formuparam; // the magic formula
			a+=abs(length(p)-pa); // absolute sum of average change
			pa=length(p);
		}
		float dm=max(0.,darkmatter-a*a*.001); //dark matter
		a*=a*a; // add contrast
		if (r>6) fade*=1.-dm; // dark matter, don't render near
		//v+=vec3(dm,dm*.5,0.);
		v+=fade;
		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
		fade*=distfading; // distance fading
		s+=stepsize;
	}
	v=mix(vec3(length(v)),v,saturation); //color adjust

  vec3 stars[6];
  vec3 vuePos = from + dir * 2.5;
  stars[0] = vec3(-0.5, 0.5, 2.0) + vuePos;
  stars[1] = vec3(-0.3, 0.2, 2.0) + vuePos;
  stars[2] = vec3(-0.1, -0.1, 2.0) + vuePos;
  stars[3] = vec3(0.0, 0.1, 2.0) + vuePos;
  stars[4] = vec3(0.2, 0.4, 2.0) + vuePos;
  stars[5] = vec3(0.4, 0.7, 2.0) + vuePos;

  for (int i = 0; i < 6; i++) {
    float d = length(dir * 2.0 - (stars[i] - from)); // приближение к "лучу"
    float star = exp(-d * 40.0); // резкое затухание
    v += vec3(0.2, 0.9, 0.3) * star * 400.; // ярко-зелёный цвет Vue
  }

	gl_FragColor = vec4(v*.01,1.);	
}