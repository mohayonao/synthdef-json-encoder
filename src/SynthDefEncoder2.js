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

  writeConsts(consts) {
    if (!Array.isArray(consts)) {
      consts = [];
    }
    this.writeNumberOfConstants(consts.length);
    consts.forEach((value) => {
      this.writer.writeFloat32(value);
    });
  }

  writeNumberOfConstants(value) {
    this.writer.writeInt32(value);
  }

  writeParamValues(paramValues) {
    if (!Array.isArray(paramValues)) {
      paramValues = [];
    }
    this.writeNumberOfParamValues(paramValues.length);
    paramValues.forEach((value) => {
      this.writer.writeFloat32(value);
    })
  }

  writeNumberOfParamValues(value) {
    this.writer.writeInt32(value);
  }

  writeParamIndices(paramIndices) {
    if (paramIndices == null) {
      paramIndices = [];
    }
    if (!Array.isArray(paramIndices) && typeof paramIndices === "object") {
      paramIndices = Object.keys(paramIndices).map((name) => {
        return Object.assign({ name }, paramIndices[name]);
      }, []);
    }
    this.writeNumberOfParamIndices(paramIndices.length);
    paramIndices.forEach(({ name, index }) => {
      this.writeParamName(name);
      this.writeParamNameIndex(index);
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

  writeUnits(units) {
    if (!Array.isArray(units)) {
      units = [];
    }
    this.writeNumberOfUnits(units.length);
    units.forEach(([ name, rate, specialIndex, inputSpecs, outputSpecs ]) => {
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

  writeVariants(variants, synthDefName) {
    if (variants == null) {
      variants = [];
    }
    if (!Array.isArray(variants) && typeof variants === "object") {
      variants = Object.keys(variants).map((name) => {
        return { name, values: variants[name] };
      }, []);
    }
    if (typeof synthDefName !== "string") {
      synthDefName = "";
    }

    this.writeNumberOfVariants(variants.length);
    variants.forEach(({ name, values }) => {
      this.writeVariantName(`${ synthDefName }.${ name }`);
      values.forEach((value) => {
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
