"use strict";

class SynthDefEncoder2 {
  constructor(writer) {
    this.writer = writer;
  }

  encode(data) {
    this.writeNameOfSynthDef(data.name);
    this.writeConsts(data.consts);
    this.writeParamValues(data.paramValues);
    this.writeParamIndices(data.paramIndices);
    this.writeUnits(data.units);
    this.writeVariants(data.variants, data.name);
  }

  writeNameOfSynthDef(value) {
    if (typeof value !== "string") {
      value = "";
    }
    this.writer.writePascalString(value);
  }

  writeConsts(values) {
    if (!Array.isArray(values)) {
      values = [];
    }
    this.writeNumberOfConstants(values.length);
    values.forEach((value) => {
      this.writer.writeFloat32(value);
    });
  }

  writeNumberOfConstants(value) {
    this.writer.writeInt32(value);
  }

  writeParamValues(values) {
    if (!Array.isArray(values)) {
      values = [];
    }
    this.writeNumberOfParamValues(values.length);
    values.forEach((value) => {
      this.writer.writeFloat32(value);
    })
  }

  writeNumberOfParamValues(value) {
    this.writer.writeInt32(value);
  }

  writeParamIndices(values) {
    if (values === null || typeof values !== "object") {
      values = {};
    }
    const params = Object.keys(values);

    this.writeNumberOfParamIndices(params.length);
    params.forEach((name) => {
      this.writeParamName(name);
      this.writeParamNameIndex(values[name].index);
    });
  }

  writeNumberOfParamIndices(value) {
    this.writer.writeInt32(value);
  }

  writeParamName(value) {
    this.writer.writePascalString(value);
  }

  writeParamNameIndex(value) {
    this.writer.writeInt32(value);
  }

  writeUnits(values) {
    if (!Array.isArray(values)) {
      values = [];
    }
    this.writeNumberOfUnits(values.length);
    values.forEach(([ name, rate, specialIndex, inputSpecs, outputSpecs ]) => {
      this.writeUGenName(name);
      this.writeUGenRate(rate);
      this.writeUGenNumberOfInputs(inputSpecs.length);
      this.writeUGenNumberOfOutputs(outputSpecs.length);
      this.writeUGenSpecialIndex(specialIndex);
      this.writeUGenInputSpec(inputSpecs);
      this.writeUGenOutputSpec(outputSpecs);
    });
  }

  writeNumberOfUnits(value) {
    this.writer.writeInt32(value);
  }

  writeUGenName(value) {
    this.writer.writePascalString(value);
  }

  writeUGenRate(value) {
    this.writer.writeInt8(value);
  }

  writeUGenNumberOfInputs(value) {
    this.writer.writeInt32(value);
  }

  writeUGenNumberOfOutputs(value) {
    this.writer.writeInt32(value);
  }

  writeUGenSpecialIndex(value) {
    this.writer.writeInt16(value);
  }

  writeUGenInputSpec(values) {
    values.forEach(([ index1, index2 ]) => {
      this.writeIndexOfUGen(index1);
      this.writeIndexOfUGenOutput(index2);
    });
  }

  writeIndexOfUGen(value) {
    this.writer.writeInt32(value);
  }

  writeIndexOfUGenOutput(value) {
    this.writer.writeInt32(value);
  }

  writeUGenOutputSpec(values) {
    values.forEach((value) => {
      this.writer.writeInt8(value);
    });
  }

  writeVariants(values, synthDefName) {
    if (values === null || typeof values !== "object") {
      values = {};
    }
    if (typeof synthDefName !== "string") {
      synthDefName = "";
    }
    const variants = Object.keys(values);

    this.writeNumberOfVariants(variants.length);
    variants.forEach((name) => {
      this.writeVariantName(`${ synthDefName }.${ name }`);
      values[name].forEach((value) => {
        this.writeVariantValue(+value);
      });
    });
  }

  writeNumberOfVariants(value) {
    this.writer.writeInt16(value);
  }

  writeVariantName(value) {
    this.writer.writePascalString(value);
  }

  writeVariantValue(value) {
    this.writer.writeFloat32(value);
  }
}

module.exports = SynthDefEncoder2;
