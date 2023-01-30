# larser

[![npm version](https://img.shields.io/npm/v/larser)](https://www.npmjs.com/package/larser)
[![npm downloads](https://img.shields.io/npm/dw/larser.svg)](https://www.npmjs.com/package/larser)
[![CodeFactor](https://www.codefactor.io/repository/github/flzyy/larser/badge)](https://www.codefactor.io/repository/github/flzyy/larser)

A Minimal and lightweight, 0 dependency package for parsing command line arguments that's [only a few **bytes**](https://bundlephobia.com/package/larser).

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
Benchmark with 40 arguments:
minimist      x 11,799 ops/sec ±1.35% (88 runs sampled)
larser        x 37,481 ops/sec ±1.67% (87 runs sampled)
mri           x 46,089 ops/sec ±0.80% (93 runs sampled)
nopt          x 113,870 ops/sec ±1.94% (89 runs sampled)
yargs-parser  x 1,092 ops/sec ±6.00% (76 runs sampled)

Benchmark with 42 arguments (time):
minimist: 0.344ms
larser: 0.08ms
mri: 0.046ms
nopt: 0.032ms
yargs: 0.779ms
```

With the following hardware:

- Processor: _AMD Ryzen 5 3400G with Radeon Vega Graphics_
- Total Physical Memory: _14,246 MB_
- Windows version: _Windows 11 Pro 22H2_
