"use strict";

const fs = require("fs");
const path = require("path");
const test = require("eatest");
const assert = require("assert");
const encoder = require("../src");

// SynthDef(\sine, { |amp = 0.5, freq = 440|
//   Out.ar(0, SinOsc.ar(freq, 0, amp) ! 2);
// }, variants:(alpha:[amp:0.25,freq:880], beta:[freq:1760]))

const synthDef = [
  {
    name: "sine",
    consts: [ 0 ],
    paramValues: [ 0.5, 440 ],
    paramIndices: { amp: { index: 0, length: 1 }, freq: { index: 1, length: 1 } },
    units: [
      [ "Control"     , 1, 0, [                                ], [ 1, 1 ] ],
      [ "SinOsc"      , 2, 0, [ [  0, 1 ], [ -1, 0 ]           ], [ 2    ] ],
      [ "BinaryOpUGen", 2, 2, [ [  1, 0 ], [  0, 0 ]           ], [ 2    ] ],
      [ "Out"         , 2, 0, [ [ -1, 0 ], [  2, 0 ], [ 2, 0 ] ], [      ] ]
    ],
    variants: {
      beta : [ 0.50, 1760 ],
      alpha: [ 0.25,  880 ]
    }
  }
];

test("encode", () => {
  const actual = encoder.encode(synthDef);
  const expected = fs.readFileSync(path.join(__dirname, "v2.scsyndef"));
  const actual2 = Array.from(new Uint8Array(actual));
  const expected2 = Array.from(expected);

  assert.deepEqual(actual2, expected2);
});
