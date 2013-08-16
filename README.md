gl-render-text
==============
Renders text into a WebGL texture so you can draw it.

Example
=======

```javascript
var shell = require("gl-now")()
var createShader = require("gl-shader")
var drawTriangle = require("a-big-triangle")
var createText = require("gl-render-text")

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
```

Install
=======

    npm install gl-render-text
    
API
===

### `var text = require("gl-render-text")(gl, str[, options])`
Creates a [gl-texture2d object](https://github.com/mikolalysenko/gl-texture2d) containing a rendering of the given string.

* `gl` is the WebGL context you want to create the texture in.
* `str` is the string to be rendered
* `options` is an optional object that you can use to specify a list of the following pramaters:
    + `font` is the font-family/font name to use
    + `size` is the height of the font in pixels
    + `color` is the color of the font to render, represented as a 3d array of numbers in the range [0,255] inclusive representing the color rgb color value
    + `style` is an optional style string, like bold, italic, underline etc.

**Returns** A texture2d object containing the rendered text.

## Credits
(c) 2013 Mikola Lysenko. MIT License
