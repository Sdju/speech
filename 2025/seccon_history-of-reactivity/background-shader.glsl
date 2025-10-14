#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_baseColor;
#define PI 3.14159265359


void main() {
  float d;
  float z = 0.0;
  float T = u_time * 0.4;  // Slow down time by 2.5x for smoother animation
  
  vec3 O = vec3(0.0);
  vec3 p;
  vec3 S;
  
  vec2 C = gl_FragCoord.xy;
  vec2 r = u_resolution.xy;
  vec2 Q;
  vec4 o;
  
  // FIX: Declare loop counter directly in the for statement
  for (float i = 0.0; i < 40.0; i++) {
    // Ray setup: convert 2D screen coordinate C to 3D ray direction
    p = z * normalize(vec3(C - 0.5 * r, r.y));  // Create ray from camera through pixel
    p.z -= 4.0;  // Move camera back 4 units from origin
    S = p;  // Save original ray position for later color calculations
    
    // Distance field animation: create wobbly, time-varying surface
    d = p.y - T;  // Base distance varies with height and time (makes it flow)
    p.x += 0.4 * (1.0 + p.y) * sin(d) * cos(0.34 * d);  // Add wavy distortion that varies with height
    
    // 2D rotation matrix applied to xz plane - makes the shape twist as it flows
    Q = p.xz * mat2(cos(p.y + vec4(0, 11, 33, 0) - T));
    p.xz = Q;
    
    // Distance field calculation: how far are we from the surface?
    d = abs(sqrt(length(Q * Q)) - 0.25 * (5.0 + S.y)) / 3.0 + 8e-4;  // "Square" cylindrical surface with varying radius
    z += d;
    
    // Color calculation: generate RGBA color based on position and movement
    o = vec4(1.0) + sin(S.y + p.z * 0.5 + S.z - length(S - p) + vec4(2.0, 1.0, 0.0, 8.0));
    
    // Accumulate color: blend current color into total, weighted by alpha and distance
    O += o.w / d * o.xyz;
  }
  
  // Tone mapping: convert accumulated brightness to visible range [0,1]
  vec3 color = 1.0 - exp(-O * 0.000143);  // tanh() prevents over-bright colors, /1e4 scales down accumulated values
  
  gl_FragColor = vec4(color * 0.3, 1.0);
}