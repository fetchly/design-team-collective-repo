// Reference copy of Figma's first-party "Duotone" shader effect.
// id 387983ae-52a3-4033-898c-6f6e5559e972, version 73de12c7bcc1434e064daaa6581501d820048f67,
// read with get_shader (includeSource: true) on 2026-09-24.
// features.json: { "version": 2, "name": "Duotone", "isAnimated": false, "usesMouse": false }
// Reuse its module shape for create_shader + update_shader; replace the WGSL and the properties.
// The param helpers in render() document the runtime shape of every control type.
import { defineProperties } from "figma:shaders"

export default function Effect() {}

export function setup(device, frame) {
  var wgsl = `
diagnostic(off,derivative_uniformity);
struct Uniforms {
  frameData: vec4f,
  inputDimsData: vec4f,
  highlight: vec4f,
  shadow: vec4f,
  contrast: vec4f,
  midpoint: vec4f,
  blendMix: vec4f,
};
@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var inputTex: texture_2d<f32>;

struct VsIn {
  @location(0) pos: vec2f,
  @location(1) uv: vec2f,
};
struct VsOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

fn sampleInput(p: vec2f) -> vec4f {
  return textureSampleLevel(inputTex, samp, clamp(p, vec2f(0.0), vec2f(1.0)), 0.0);
}

// Like sampleInput but returns transparent (premultiplied zero) outside the
// input rect instead of repeating the edge texel.
fn sampleInputOrZero(p: vec2f) -> vec4f {
  let inside = step(vec2f(0.0), p) * step(p, vec2f(1.0));
  return sampleInput(p) * (inside.x * inside.y);
}

fn srgbToLinear(c: f32) -> f32 {

  return select(pow((c + 0.055) / 1.055, 2.4), c / 12.92, c <= 0.04045);

}

fn linearToSrgb(c: f32) -> f32 {

  return select(1.055 * pow(c, 1.0 / 2.4) - 0.055, c * 12.92, c <= 0.0031308);

}

@vertex fn vs_main(in: VsIn) -> VsOut {
  var out: VsOut;
  out.position = vec4f(in.pos, 0.0, 1.0);
  out.uv = in.uv;
  return out;
}

@fragment fn fs_main(@location(0) outputUv_in: vec2f) -> @location(0) vec4f {
  let time = u.frameData.x;
  let outputUv = outputUv_in;
  let dims = max(u.frameData.yz, vec2f(1.0));
  let inputDims = max(u.inputDimsData.xy, vec2f(1.0));
  let inputTexel = vec2f(1.0) / inputDims;
  let uv = outputUv;
  // texel and aspect are input-relative to match uv. Zoom fills rescale texel
  // alongside their uv redefinition below (see zoomLocal).
  let texel = inputTexel;
  let aspect = inputDims.x / max(inputDims.y, 1.0);
  let highlight = u.highlight;
  let shadow = u.shadow;
  let contrast = u.contrast.x;
  let midpoint = u.midpoint.x;
  let blendMix = u.blendMix.x;
  let inputColor = sampleInput(uv);
  let linR = srgbToLinear(inputColor.r / max(inputColor.a, 0.0001));
  let linG = srgbToLinear(inputColor.g / max(inputColor.a, 0.0001));
  let linB = srgbToLinear(inputColor.b / max(inputColor.a, 0.0001));
  let lum = 0.2126 * linR + 0.7152 * linG + 0.0722 * linB;
  let mp = mix(0.1, 0.9, midpoint / 100.0);
  let exp = mix(0.3, 3.0, contrast / 100.0);
  let shifted = clamp((lum - mp + 0.5), 0.0, 1.0);
  let curved = pow(shifted, exp);
  let hiLin = vec3f(srgbToLinear(highlight.r), srgbToLinear(highlight.g), srgbToLinear(highlight.b));
  let shLin = vec3f(srgbToLinear(shadow.r), srgbToLinear(shadow.g), srgbToLinear(shadow.b));
  let duo = mix(shLin, hiLin, curved);
  let outR = linearToSrgb(duo.r);
  let outG = linearToSrgb(duo.g);
  let outB = linearToSrgb(duo.b);
  let m = blendMix / 100.0;
  let unmul = vec3f(inputColor.rgb / max(inputColor.a, 0.0001));
  let blended = mix(unmul, vec3f(outR, outG, outB), m);
  return vec4f(blended * inputColor.a, inputColor.a);
}
`
  frame.state.module = device.createShaderModule({ code: wgsl })
  frame.state.pipeline = null
  frame.state.pipelineFormat = null

  frame.state.quad = device.createBuffer({
    size: 6 * 4 * 4,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  })
  new Float32Array(frame.state.quad.getMappedRange()).set([
    -1, -1,   0, 1,
     1, -1,   1, 1,
    -1,  1,   0, 0,
    -1,  1,   0, 0,
     1, -1,   1, 1,
     1,  1,   1, 0,
  ])
  frame.state.quad.unmap()

  frame.state.uniformBuf = device.createBuffer({
    size: 112,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  frame.state.sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
    addressModeU: 'clamp-to-edge',
    addressModeV: 'clamp-to-edge',
  })

  frame.state.placeholder = device.createTexture({
    size: [1, 1, 1],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  })
  device.queue.writeTexture(
    { texture: frame.state.placeholder },
    new Uint8Array([0, 0, 0, 0]),
    { bytesPerRow: 4 },
    { width: 1, height: 1, depthOrArrayLayers: 1 },
  )
}

export function render(device, frame) {
  var params = frame.params || {}
  function finiteNumber(value, fallback) {
    var num = Number(value)
    return Number.isFinite(num) ? num : fallback
  }
  function numberParam(name, fallback) {
    return finiteNumber(params[name], fallback)
  }
  function boolParam(name, fallback) {
    if (typeof params[name] === 'boolean') return params[name] ? 1 : 0
    return fallback ? 1 : 0
  }
  function selectParam(name, count, fallbackIndex) {
    // A select is a numeric dropdown: params[name] is the chosen option's index.
    var index = Math.round(Number(params[name]))
    return Number.isFinite(index) && index >= 0 && index < count ? index : fallbackIndex
  }
  function colorParam(name, fallback) {
    var value = params[name] || {}
    return [
      finiteNumber(value.r, fallback[0]),
      finiteNumber(value.g, fallback[1]),
      finiteNumber(value.b, fallback[2]),
      finiteNumber(value.a, fallback[3]),
    ]
  }
  function pointParam(name, fallback) {
    var value = params[name] || {}
    return [
      finiteNumber(value.x, fallback[0]),
      finiteNumber(value.y, fallback[1]),
    ]
  }
  function pointRadiusParam(name, fallback) {
    var value = params[name] || {}
    return [
      finiteNumber(value.x, fallback[0]),
      finiteNumber(value.y, fallback[1]),
      finiteNumber(value.radius, fallback[2]),
    ]
  }
  function pointPointLineParam(name, fallback) {
    var value = params[name] || {}
    return [
      finiteNumber(value.x, fallback[0]),
      finiteNumber(value.y, fallback[1]),
      finiteNumber(value.x2, fallback[2]),
      finiteNumber(value.y2, fallback[3]),
    ]
  }
  function pointAngleRadiusParam(name, fallback) {
    var value = params[name] || {}
    return [
      finiteNumber(value.x, fallback[0]),
      finiteNumber(value.y, fallback[1]),
      finiteNumber(value.radius, fallback[2]),
      finiteNumber(value.angle, fallback[3]),
    ]
  }
  function colorPointParam(name, fallback) {
    var value = params[name] || {}
    var color = value.color || {}
    return [
      finiteNumber(value.x, fallback[0]),
      finiteNumber(value.y, fallback[1]),
      0,
      0,
      finiteNumber(color.r, fallback[2]),
      finiteNumber(color.g, fallback[3]),
      finiteNumber(color.b, fallback[4]),
      finiteNumber(color.a, fallback[5]),
    ]
  }
  function gradientParam(name, fallback) {
    var value = params[name] || {}
    var stops = Array.isArray(value.stops) && value.stops.length > 0 ? value.stops : fallback
    // Layout: 8 stop colors (rgba), then 8 positions packed 4-per-vec4, then the live count.
    var out = new Array(44).fill(0)
    var count = Math.min(stops.length, 8)
    for (var i = 0; i < count; i++) {
      var stop = stops[i] || {}
      var color = stop.color || {}
      out[i * 4] = finiteNumber(color.r, 0)
      out[i * 4 + 1] = finiteNumber(color.g, 0)
      out[i * 4 + 2] = finiteNumber(color.b, 0)
      out[i * 4 + 3] = finiteNumber(color.a, 1)
      out[32 + i] = finiteNumber(stop.position, 0)
    }
    out[40] = count
    return out
  }

  var output = frame.output || {}
  var width = Math.max(1, finiteNumber(output.width, 1))
  var height = Math.max(1, finiteNumber(output.height, 1))
  var time = 0
  var inputWidth = width
  var inputHeight = height

  device.queue.writeBuffer(
    frame.state.uniformBuf,
    0,
    new Float32Array([
      time, width, height, 0,
      inputWidth, inputHeight, 0, 0,
      ...colorParam("highlight", [1,0.95,0.85,1]),
      ...colorParam("shadow", [0.05,0.05,0.2,1]),
      numberParam("contrast", 50), 0, 0, 0,
      numberParam("midpoint", 50), 0, 0, 0,
      numberParam("blendMix", 100), 0, 0, 0,
    ]),
  )

  var inputView = frame.input != null
    ? frame.input.createView()
    : frame.state.placeholder.createView()

  var outputFormat = frame.output.format
  if (frame.state.pipeline == null || frame.state.pipelineFormat !== outputFormat) {
    frame.state.pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: frame.state.module,
        entryPoint: 'vs_main',
        buffers: [{
          arrayStride: 16,
          attributes: [
            { shaderLocation: 0, format: 'float32x2', offset: 0 },
            { shaderLocation: 1, format: 'float32x2', offset: 8 },
          ],
        }],
      },
      fragment: {
        module: frame.state.module,
        entryPoint: 'fs_main',
        targets: [{ format: outputFormat }],
      },
      primitive: { topology: 'triangle-list' },
    })
    frame.state.pipelineFormat = outputFormat
  }

  var bindGroup = device.createBindGroup({
    layout: frame.state.pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: frame.state.uniformBuf } },
      { binding: 1, resource: frame.state.sampler },
      { binding: 2, resource: inputView },
    ],
  })

  var encoder = device.createCommandEncoder()
  var pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: frame.output.createView(),
      loadOp: 'clear',
      clearValue: { r: 0, g: 0, b: 0, a: 0 },
      storeOp: 'store',
    }],
  })
  pass.setPipeline(frame.state.pipeline)
  pass.setBindGroup(0, bindGroup)
  pass.setVertexBuffer(0, frame.state.quad)
  pass.draw(6)
  pass.end()
  device.queue.submit([encoder.finish()])
}

defineProperties(Effect, {
  "highlight": {
    type: "color",
    label: "Highlight",
    defaultValue: {"r":1,"g":0.95,"b":0.85,"a":1},
  },
  "shadow": {
    type: "color",
    label: "Shadow",
    defaultValue: {"r":0.05,"g":0.05,"b":0.2,"a":1},
  },
  "contrast": {
    type: "number",
    label: "Contrast",
    defaultValue: 50,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
  },
  "midpoint": {
    type: "number",
    label: "Midpoint",
    defaultValue: 50,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
  },
  "blendMix": {
    type: "number",
    label: "Mix",
    defaultValue: 100,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
  },
})
