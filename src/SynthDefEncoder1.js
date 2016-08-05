"use strict";

const SynthDefEncoder2 = require("./SynthDefEncoder2");

class SynthDefEncoder1 extends SynthDefEncoder2 {
  writeNumberOfConstants(value) {
    this.writer.writeInt16(value);
  }

  writeNumberOfParamValues(value) {
    this.writer.writeInt16(value);
  }

  writeNumberOfParamIndices(value) {
    this.writer.writeInt16(value);
  }

  writeParamNameIndex(value) {
    this.writer.writeInt16(value);
  }

  writeNumberOfUnits(value) {
    this.writer.writeInt16(value);
  }

  writeUGenNumberOfInputs(value) {
    this.writer.writeInt16(value);
  }

  writeUGenNumberOfOutputs(value) {
    this.writer.writeInt16(value);
  }

  writeIndexOfUGen(value) {
    this.writer.writeInt16(value);
  }

  writeIndexOfUGenOutput(value) {
    this.writer.writeInt16(value);
  }
}

module.exports = SynthDefEncoder1;
