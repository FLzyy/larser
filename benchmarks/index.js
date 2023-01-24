// @ts-check

import benchmark from "benchmark";
import mri from "mri";
import nopt from "nopt";
import yargs from "yargs-parser";
import minimist from "minimist";
import file from "../dist/index.js";

process.stdout.write("\x1bc");
const args = [
  "C:\\Program Files\\nodejs\\node.exe",
  "C:\\larser\\tests\\index.test.js",
  "--bing=bong",
  "--this=that",
  "--tqa",
  "-zyxa",
  "-ghjk",
  "AXY",
  "YXA",
  "ansdjnj",
  "asnidqniw",
  "--aksnd=qnieasd",
  "--qwe=adf",
  "--xzc=thsd2at",
  "--asdw",
  "-zxcaw",
  "-qwegsc",
  "asdqwr",
  "ABFHUBZ",
  "qwhihuhasd",
  "qnwdksdqweubUBVBUha",
  "--nasbdwBHGB=abdjNUSBduqbn",
  "--adbjqwasd=qwdnjiansdwqwe",
  "--qwemldaskdjn=asdnqjwenj",
  "--wmwqiknw",
  "-nauqwbeyugbaf",
  "-bhvbashidvbpasd",
  "BNJBHFJ",
  "AIUIQ",
  "BHDFbhashgdw",
  "QNCJNSDZ",
  "--ABHUJFBJA=knasjdba",
  "--ABDHJbjq)=JBSJDaksd",
  "--bjzxc=THVAGHF",
  "--asldjnkjnFS",
  "-AnjjdnNJD",
  "-ASNQWNJsdadwKAnfn",
  "FJANDJWjiidbuwbuBUDBhj",
  "NDnnasndjwBASYHbhqwsa",
  "udjbahsdBWJU",
  "JBASJDabshdwqw",
  "--asdhvqwhbkasd=bjsdhvbqkwefvas",
];
console.log(`Benchmark with ${args.length} arguments:`);
const bench = new benchmark.Suite();

bench
  .add("minimist     ", () => minimist(args))
  .add("larser       ", () => file(args))
  .add("mri          ", () => mri(args))
  // @ts-expect-error
  .add("nopt         ", () => nopt(args))
  .add("yargs-parser ", () => yargs(args))
  .on("cycle", (/** @type {{ target: benchmark.Target; }} */ e) =>
    console.log(String(e.target))
  )
  .run();

console.log(`\nBenchmark with ${args.length} arguments (time):`);

console.time("minimist");
minimist(args);
console.timeEnd("minimist");

console.time("larser");
file(args);
console.timeEnd("larser");

console.time("mri");
mri(args);
console.timeEnd("mri");

console.time("nopt");
// @ts-expect-error
nopt(args);
console.timeEnd("nopt");

console.time("yargs");
yargs(args);
console.timeEnd("yargs");
