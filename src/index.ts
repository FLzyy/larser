import { Options, Parsed } from "./types/index.js";

export default (
  argv: string[],
  options: Options = {
    aliases: {},
    defaults: {},
  },
): Parsed => {
  console.log(options);
  const { aliases, defaults } = options;
  let parsed: Parsed = {
    _: [],
    ...defaults,
  };

  const length = argv.length;
  for (let i = 2; i < length; i++) {
    const cIndex = argv[i];

    if (cIndex.startsWith("--")) {
      const split = cIndex.trim().slice(2).split("=");

      if (aliases != null) {
        if (Object.keys(aliases).includes(split[0])) {
          const main = aliases[split[0]];
          const length = main.length;
          for (let i = 0; i < length; i++) {
            parsed[main[i]] = split[1];
          }
          parsed[split[0]] = split[1];
        } else if (Object.values(aliases).flat().includes(split[0])) {
          const mainstr = Object.keys(aliases).filter((k) =>
            aliases[k].includes(split[0])
          );
          if (mainstr.length > 1) {
            throw new Error("Duplicate Aliases");
          }
          const main = aliases[mainstr[0]];
          parsed[mainstr[0]] = split[1];
          const length = main.length;
          for (let i = 0; i < length; i++) {
            parsed[main[i]] = split[1];
          }
        }
      } else {
        parsed[split[0]] = split[1];
      }
    } else if (cIndex.startsWith("-")) {
      const split = cIndex.trim().slice(1).split("");
      const object = split.reduce((m, v) => {
        m[v] = true;
        return (m);
      }, {});
      parsed = { ...parsed, ...object };
    } else {
      parsed._.push(cIndex);
    }
  }

  return parsed;
};
