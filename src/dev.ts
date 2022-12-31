import larser from "./index.js";

const argv = process.argv;
const parsed = larser(argv, {
  defaults: {
    t: true,
    b: "defaulted",
  },
});

console.log(argv);
console.log(parsed);
