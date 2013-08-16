"use strict"

var shell = require("gl-now")()
var createShader = require("gl-shader")
var drawTriangle = require("a-big-triangle")
var createText = require("../text.js")

var shader, text

shell.on("gl-init", function() {
  var gl = shell.gl
  
  shader = createShader(gl,
  "attribute vec2 position;\
  varying vec2 tc;\
  void main() {\
    gl_Position=vec4(position,0.0,1.0);\
    tc=0.5*(vec2(1.0+position.x, 1.0-position.y));\
  }",
  "precision highp float;\
  uniform sampler2D texture;\
  varying vec2 tc;\
  void main() {\
    vec4 color = texture2D(texture, tc);\
    gl_FragColor = vec4(tc, color.a, 1.0);\
  }")

  text = createText(gl, "test string")
})

shell.on("gl-render", function() {
  shader.bind()
  shader.uniforms.texture = text
  drawTriangle(shell.gl)
})
