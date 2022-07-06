// import assert from "assert";
// import { encode, decode, ExtensionCodec } from "../src";

// const extensionCodec = new ExtensionCodec();
// extensionCodec.register({
//   type: 0,
//   encode: (input: unknown) => {
//     // eslint-disable-next-line valid-typeof
//     if (typeof input === "bigint") {
//       return encode(input.toString());
//     } else {
//       return null;
//     }
//   },
//   decode: (data: Uint8Array) => {
//     return BigInt(decode(data));
//   },
// });

// describe("codec BigInt", () => {
//   before(function () {
//     if (typeof BigInt === "undefined") {
//       this.skip();
//     }
//   });

//   context("extension", () => {
//     it("encodes and decodes 0n", () => {
//       return; //this fork does not need to support "string-style" bigint encode/decode
//       const value = BigInt(0);
//       const encoded = encode(value, { extensionCodec });
//       assert.deepStrictEqual(decode(encoded, { extensionCodec }), value);
//     });

//     it("encodes and decodes MAX_SAFE_INTEGER+1", () => {
//       const value = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
//       const encoded = encode(value, { extensionCodec });
//       assert.deepStrictEqual(decode(encoded, { extensionCodec }), value);
//     });

//     it("encodes and decodes MIN_SAFE_INTEGER-1", () => {
//       const value = BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1);
//       const encoded = encode(value, { extensionCodec });
//       assert.deepStrictEqual(decode(encoded, { extensionCodec }), value);
//     });
//   });

//   context("native", () => {
//     const UINT64_TYPE = 0xcf;
//     const INT64_TYPE = 0xd3;

//     const BIGINTSPECS = {
//       ZERO: {
//         value: BigInt(0),
//         expectedEncoding: encode(0),
//         expectedDecoding: 0,
//       },
//       POSITIVE_VALUE: {
//         value: BigInt(100),
//         expectedEncoding: encode(100),
//         expectedDecoding: 100,
//       },
//       NEGATIVE_VALUE: {
//         value: BigInt(-117),
//         expectedEncoding: encode(-117),
//         expectedDecoding: -117,
//       },
//       MAX_SAFE_INTEGER: {
//         value: BigInt(Number.MAX_SAFE_INTEGER),
//         expectedEncoding: encode(Number.MAX_SAFE_INTEGER),
//         expectedDecoding: Number.MAX_SAFE_INTEGER,
//       },
//       MIN_SAFE_INTEGER: {
//         value: BigInt(Number.MIN_SAFE_INTEGER),
//         expectedEncoding: encode(Number.MIN_SAFE_INTEGER),
//         expectedDecoding: Number.MIN_SAFE_INTEGER,
//       },
//       MAX_SAFE_INTEGER_PLUS_ONE: {
//         value: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1),
//         expectedEncoding: Uint8Array.from([UINT64_TYPE, 0, 32, 0, 0, 0, 0, 0, 0]), // 2^53
//         expectedDecoding: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1),
//       },
//       MIN_SAFE_INTEGER_MINUS_ONE: {
//         value: BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1),
//         expectedEncoding: Uint8Array.from([INT64_TYPE, 255, 224, 0, 0, 0, 0, 0, 0]), // -(2^53)
//         expectedDecoding: BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1),
//       },
//       MAX_UINT64: {
//         value: BigInt("0xffffffffffffffff"),
//         expectedEncoding: Uint8Array.from([UINT64_TYPE, 255, 255, 255, 255, 255, 255, 255, 255]), // 2^64 - 1
//         expectedDecoding: BigInt("0xffffffffffffffff"),
//       },
//       MIN_INT64: {
//         value: -BigInt("0x8000000000000000"),
//         expectedEncoding: Uint8Array.from([INT64_TYPE, 128, 0, 0, 0, 0, 0, 0, 0]), // -(2^63)
//         expectedDecoding: -BigInt("0x8000000000000000"),
//       },
//     } as Record<string, { value: bigint; expectedEncoding: Uint8Array; expectedDecoding: any }>;

//     for (const name of Object.keys(BIGINTSPECS)) {
//       const { value, expectedEncoding, expectedDecoding } = BIGINTSPECS[name];
//       const sign = value < BigInt(0) ? BigInt(-1) : BigInt(1);

//       it(`encodes and decodes ${name} (${sign === BigInt(-1) ? "-" : ""}0x${(sign * value).toString(16)})`, () => {
//         const encoded = encode(value);
//         assert.deepStrictEqual(encoded, expectedEncoding);
//         assert.deepStrictEqual(decode(encoded), expectedDecoding);
//       });
//     }
//   });
// });
