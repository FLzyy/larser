import larser from "./index.js";

const argv = { ...process.argv, b: "notdefault" };

console.time("defaults");
larser(argv, {
  defaults: {
    t: true,
    b: "defaulted",
  },
});
console.timeEnd("defaults");

console.time("aliased");
larser(argv, {
  aliases: {
    t: ["test", "tI"],
    b: ["b2", "be1"],
  },
});
console.timeEnd("aliased");

console.time("both");
larser(argv, {
  aliases: {
    t: ["test", "tI"],
    b: ["b2", "be1"],
  },
  defaults: {
    t: true,
    b: "defaulted",
  },
});
console.timeEnd("both");
