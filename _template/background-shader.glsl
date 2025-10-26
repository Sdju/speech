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

#define volsteps 15
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

  // Преобразование u_slideNumber в более динамичные координаты
  float phase = u_slideNumber * 0.1;  // Замедляем базовую частоту
  vec2 u_mouse = vec2(
      sin(phase) * 5.0 + cos(phase * 1.5) * 2.0,  // Смешиваем синус и косинус с разной частотой
      cos(phase) * 5.0 + sin(phase * 2.0 + time) * 3.0  // Добавляем u_time для анимации
  );

  // Рандомная вариация на основе u_slideNumber
  float randOffset = sin(u_slideNumber) * 0.5;  // Псевдо-рандом [0,1]
  u_mouse += vec2(randOffset * 2.0 - 1.0, randOffset * 2.0 - 1.0) * 1.0;  // Лёгкое случайное смещение

  // Углы ротации с нелинейным движением
  float a1 = 0.5 + sin(u_mouse.x / u_resolution.x * PI) * 1.0 + cos(time * 0.02) * 0.3;  // Динамичный yaw
  float a2 = 0.8 + cos(u_mouse.y / u_resolution.y * PI * 1.5) * 1.2 + sin(time * 0.015) * 0.4;  // Динамичный pitch
  float a3 = sin(u_slideNumber * 0.5) * 0.5;  // Roll для разнообразия

  // Матрицы вращения
  mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));  // Вращение по Z
  mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));  // Вращение по Y
  mat2 rot3 = mat2(cos(a3), sin(a3), -sin(a3), cos(a3));  // Вращение по X (roll)

  dir.xz *= rot1;
  dir.xy *= rot2;
  dir.yz *= rot3;  // Добавляем вращение по X
  vec3 from=vec3(1.,.5,0.5);
  from.xz *= rot1;
  from.xy *= rot2;
  from.yz *= rot3;

  // Анимация позиции камеры
  from += vec3(time * 2.0, sin(time) * 0.5, -2.0 + cos(time * 0.3) * 1.0);  // Нелинейное движение
	
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

	gl_FragColor = vec4(v*.01,1.);	
}