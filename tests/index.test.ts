import { describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { larser } from "../src/index.js";

// First two are "mocks" of what process.argv would actually return.

const argv = [
  "C:\\Program Files\\nodejs\\node.exe",
  "C:\\larser\\tests\\index.test.js",
  "--bing=bong",
  "--this=that",
  "-zyxa",
  "-ghjk",
  "AXY",
  "YXA",
];

const argvAliased = [
  "C:\\Program Files\\nodejs\\node.exe",
  "C:\\larser\\tests\\index.test.js",
  "--bing=bong",
  "--th=that",
];

describe("Key Value Arguments", () => {
  const parsed = larser(argv.slice(0, 4));

  const expected = {
    _: [],
    bing: "bong",
    this: "that",
  };

  it("should return empty root variable", () => {
    strictEqual(parsed._.length, 0);
  });

  it("should return as expected", () => {
    deepStrictEqual(parsed, expected);
  });

  describe("Aliased", () => {
    const parsed = larser(argvAliased, {
      aliases: {
        bing: ["bi", "bin"],
        this: ["th", "thi"],
      },
    });

    const expected = {
      _: [],
      bing: "bong",
      bi: "bong",
      bin: "bong",
      this: "that",
      th: "that",
      thi: "that",
    };

    it("should return as expected", () => {
      deepStrictEqual(parsed, expected);
    });
  });

  describe("Defaults", () => {
    const parsed = larser(argv.slice(0, 3), {
      defaults: {
        bing: "default",
        this: "default",
      },
    });

    const expected = {
      _: [],
      bing: "bong",
      this: "default",
    };

    it("should return as expected", () => {
      deepStrictEqual(parsed, expected);
    });
  });

  describe("Aliased and Defaults", () => {
    const parsed = larser(argvAliased.slice(0, 3), {
      aliases: {
        bing: ["bi", "bin"],
        this: ["th", "thi"],
      },
      defaults: {
        bing: "default",
        this: "default",
      },
    });

    const expected = {
      _: [],
      bing: "bong",
      bi: "bong",
      bin: "bong",
      this: "default",
      th: "default",
      thi: "default",
    };

    console.log(parsed);

    it("should return as expected", () => {
      deepStrictEqual(parsed, expected);
    });
  });
});

describe("Boolean Arguments", () => {
  const parsed = larser([argv[0], argv[1], argv[4], argv[5]]);

  const expected = {
    _: [],
    z: true,
    y: true,
    x: true,
    a: true,
    g: true,
    h: true,
    j: true,
    k: true,
  };

  it("should return empty root variable", () => {
    strictEqual(parsed._.length, 0);
  });

  it("should return as expected", () => {
    deepStrictEqual(parsed, expected);
  });

  describe("Defaults", () => {
    const parsed = larser([argv[0], argv[1], argv[4]], {
      defaults: {
        g: true,
        h: true,
        j: true,
        k: true,
      },
    });

    it("should return as expected", () => {
      deepStrictEqual(parsed, expected);
    });
  });
});

describe("Root Arguments", () => {
  const parsed = larser([argv[0], argv[1], argv[6], argv[7]]);

  const expected = {
    _: ["AXY", "YXA"],
  };

  it("should return as expected", () => {
    deepStrictEqual(parsed, expected);
  });
});
