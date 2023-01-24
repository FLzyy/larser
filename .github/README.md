# larser

[![npm version](https://img.shields.io/npm/v/larser)](https://www.npmjs.com/package/larser)
[![npm downloads](https://img.shields.io/npm/dw/larser.svg)](https://www.npmjs.com/package/larser)
[![CodeFactor](https://www.codefactor.io/repository/github/flzyy/larser/badge)](https://www.codefactor.io/repository/github/flzyy/larser)

A Lightweight, 0 dependency package for parsing command line arguments that's [only a few **bytes**](https://bundlephobia.com/package/larser).

## Basic Usage

The following is a basic example of using larser:

```js
import larser from "larser";

// Or for CJS

let larser;

import("larser").then((module) => {
  larser = module;
});

const argv = process.argv;
const parsed = larser(argv);

console.log(parsed);

/**
 * --testI=1233 --testII=3112
 *
 * Expected Output:
 *
 * { _: [], testI: '1233', testII: '3112' }
 */
```

## Aliases

Using aliases is also supported by larser:

```js
import larser from "larser";

const argv = process.argv;
const parsed = larser(argv, {
  aliases: {
    testI: ["t1", "te1"],
    testII: ["t2", "te2"],
  },
});

console.log(parsed);

/**
 * --t1=1233 --t2=3112
 *
 * Expected Output:
 *
 * {
 *  _: [],
 *  testI: '1233',
 *  t1: '1233',
 *  te1: '1233',
 *  testII: '3112',
 *  t2: '3112',
 *  te2: '3112'
 * }
 */
```

## Default

You can also set defaults when the user does not provide a value:

```js
import larser from "larser";

const argv = process.argv;
const parsed = larser(argv, {
  default: {
    t: "default",
    b: "default",
  },
});

console.log(parsed);

/**
 * --b=notdefault
 *
 * Expected Output:
 *
 * {
 *  _: [],
 *  t: "default",
 *  b: "notdefault"
 * }
 */
```

## CJS Usage

Though we do recommend using ESM, you can also import this module using `import()` that is available in most
CJS setups.

And then you can use it just as normal.

## Argument Types

### --X=Y

Having a double dash will result in a key-value
pair separated by `=`.

This should return, once parsed:

```
X: Y
```

### -XYZ

Having a single dash will result in a key-value pair with it's value being `true`.

This should return, once parsed:

```
X: true,
Y: true,
Z: true
```

### X YZ ZY

Having no dashes will result in the string being
pushed into the root variable `_`.

This should return once parsed:

```
_: ["X", "YZ", "ZY"]
```

## Benchmarks

```
Benchmark with 42 arguments:
minimist      x 11,671 ops/sec ±3.18% (85 runs sampled)
larser        x 7,619 ops/sec ±2.77% (82 runs sampled)
larser (file) x 6,772 ops/sec ±5.22% (75 runs sampled)
mri           x 35,552 ops/sec ±4.06% (78 runs sampled)
nopt          x 101,011 ops/sec ±4.33% (79 runs sampled)
yargs-parser  x 1,131 ops/sec ±1.34% (88 runs sampled)

Benchmark with 42 arguments (time):
minimist: 0.266ms
larser: 0.177ms
larser (file): 0.133ms
mri: 0.046ms
nopt: 0.031ms
yargs: 0.901ms
```

With the following hardware:

- Processor: _AMD Ryzen 5 3400G with Radeon Vega Graphics_
- Total Physical Memory: _14,246 MB_
- Windows version: _Windows 11 Pro 22H2_
