import assert from "assert";
import { encode, decode } from "../src";

describe("decodeMulti", () => {
  it("decodes multiple objects in a single binary", () => {
    const items = [
      "foo",
      10,
      {
        name: "bar",
      },
      [1, 2, 3],
    ];

    const encodedItems = items.map((item) => encode(item));
    const encoded = new Uint8Array(encodedItems.reduce((p, c) => p + c.byteLength, 0));
    let offset = 0;
    for (const encodedItem of encodedItems) {
      encoded.set(encodedItem, offset);
      offset += encodedItem.byteLength;
    }
    const result = decode(encoded, undefined, true);
    assert.deepStrictEqual(result, items);
  });
});
