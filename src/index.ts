interface Options {
  aliases?: Record<string, string[]>;
  defaults?: Record<string, boolean | string>;
}
interface Parsed {
  _: string[];
  [key: string]: unknown;
}

export const larser = (
  argv: string[],
  options: Options = {
    aliases: {},
    defaults: {},
  },
): Parsed => {
  const { aliases, defaults } = options;
  let parsed: Parsed = {
    _: [],
    ...defaults,
  };

  for (let i = 2; i < argv.length; i++) {
    const cIndex = argv[i];

    if (cIndex.startsWith("--")) {
      const split = cIndex.trim().slice(2).split("=");

      if (aliases != null) {
        let main: string[] = [];
        if (Object.keys(aliases).includes(split[0])) {
          main = aliases[split[0]];
        } else if (Object.values(aliases).flat().includes(split[0])) {
          const mainstr = Object.keys(aliases).filter((k) =>
            aliases[k].includes(split[0])
          );
          if (mainstr.length > 1) {
            throw new Error("Duplicate Aliases");
          }
          main = aliases[mainstr[0]];
          parsed[mainstr[0]] = split[1];
        }
        for (let i = 0; i < main.length; i++) {
          parsed[main[i]] = split[1];
        }
      }

      parsed[split[0]] = split[1];
    } else if (cIndex.startsWith("-")) {
      parsed = {
        ...parsed,
        ...Object.assign(
          {},
          ...cIndex.trim().slice(1).split("").map((k) => ({ [k]: true })),
        ),
      };
    } else {
      parsed._.push(cIndex);
    }
  }

  return parsed;
};
