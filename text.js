"use strict"

var createTexture = require("gl-texture2d")
var bits = require("bit-twiddle")
var drawCanvas = document.createElement("canvas")
var drawContext = drawCanvas.getContext("2d")

function makeColorString(rgb) {
  return "#" + rgb.map(function(x) {
    if(x < 0) {
      return "00"
    } else if(x < 16) {
      return "0" + (x|0).toString(16)
    } else if(x >= 255) {
      return "ff"
    }
    return (x|0).toString(16)
  }).join("")
}

function createText(gl, str, options) {
  options = options || {}
  
  var fontFamily = options.font ? " " + options.font : " monospace"
  var fontSize = options.size || 56
  var fontColor = options.color || [0,0,0]
  var fontStyle = options.style ? options.style + " " : ""
  var font = [fontStyle, fontSize, "px", fontFamily].join("")

  drawContext.font = font
  drawContext.textAlign = "center"
  drawContext.textBaseline = "middle"
  var dims = drawContext.measureText(str)
  
  var w = bits.nextPow2(dims.width)
  var h = bits.nextPow2(2 * (fontSize|0))
  
  drawCanvas.width = w
  drawCanvas.height = h
  
  drawContext.fillStyle = "rgba(0,0,0,0)"
  drawContext.fillRect(0, 0, w, h)
  
  drawContext.fillStyle = makeColorString(fontColor)
  drawContext.font = font
  drawContext.textAlign = "center"
  drawContext.textBaseline = "middle"
  drawContext.fillText(str, w/2, h/2)
  
  var texture = createTexture(gl, drawCanvas)
  texture.generateMipmap()
  texture.magFilter = gl.LINEAR
  texture.minFilter = gl.LINEAR_MIPMAP_LINEAR
  
  return texture
}

module.exports = createText