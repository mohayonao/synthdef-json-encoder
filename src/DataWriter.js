"use strict";

class DataWriter {
  constructor() {
    this._buffer = [];
  }

  writeInt8(data) {
    this._buffer.push(data);
  }

  writeInt16(data) {
    this._buffer.push(...toBytes(new Int16Array([ data|0 ])));
  }

  writeInt32(data) {
    this._buffer.push(...toBytes(new Int32Array([ data|0 ])));
  }

  writeFloat32(data) {
    this._buffer.push(...toBytes(new Float32Array([ +data ])));
  }

  writePascalString(data) {
    this._buffer.push(data.length, ...data.split("").map(x => x.charCodeAt(0)));
  }

  toArrayBuffer() {
    return new Uint8Array(this._buffer).buffer;
  }
}

function toBytes(data) {
  return Array.prototype.slice.call(new Int8Array(data.buffer)).reverse();
}

module.exports = DataWriter;
