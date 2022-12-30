import larser from "./index.js";
const argv = process.argv;
console.log(argv);
console.log(larser(argv, {
  aliases: {
    test: ["t", "te", "tes"],
  },
}));
