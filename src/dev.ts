import { larser } from "./index.js";

const parsed = larser([
  "C:\\Program Files\\nodejs\\node.exe",
  "C:\\larser\\tests\\index.test.js",
  "--bi=bong",
  "--th=that",
  "-zyxa",
  "-ghjk",
  "AXY",
  "YXA",
], {
  aliases: {
    bing: ["bi", "bin"],
    this: ["th", "thi"],
  },
  defaults: {
    bing: "default",
    this: "default",
  },
});

console.log(parsed);
