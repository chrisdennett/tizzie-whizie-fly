attribute vec2 a_texCoord;
attribute vec2 a_position;

uniform vec2 u_resolution;
varying vec2 v_texCoord;

void main(){
  gl_Position=vec4(a_position*vec2(1,-1),0,1);
  
  // pass the texCoord to the fragment shader
  // The GPU will interpolate this value between points
  v_texCoord=a_texCoord;
}