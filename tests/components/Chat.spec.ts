import { helloTest } from "./test";
import { expect } from "chai";
import "mocha";

describe("First test", () => {
  it("should return true", () => {
    const result = helloTest();
    expect(result).to.equal(true);
  });
});

const a = "5";

console.info(a);
