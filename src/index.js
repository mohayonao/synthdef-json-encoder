"use strict";

const DataWriter = require("./DataWriter");
const SynthDefEncoder2 = require("./SynthDefEncoder2");
const SynthDefEncoder1 = require("./SynthDefEncoder1");

function encodeSynthDef(data, opts = {}) {
  const writer = new DataWriter();
  const version = opts.version === 1 ? 1 : 2;
  const SytnhDefEncoder = version === 1 ? SynthDefEncoder1 : SynthDefEncoder2;
  const synthDefList = Array.isArray(data) ? data : [ data ];

  // SCgf
  writer.writeInt32(0x53436766);
  writer.writeInt32(version);
  writer.writeInt16(synthDefList.length);

  const encoder = new SytnhDefEncoder(writer);

  synthDefList.forEach((synthDef) => {
    encoder.encode(synthDef);
  });

  return writer.toArrayBuffer();
}

module.exports = {
  encode: (data, opts) => encodeSynthDef(data, opts)
};
