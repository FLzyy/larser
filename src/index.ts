/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
      const split = cIndex.slice(2).split("=");

      if (aliases) {
        let main: string[] = [];

        if (split[0] in aliases) {
          main = aliases[split[0]];
        } else if (Object.values(aliases).flat().includes(split[0])) {
          const mainstr = Object.keys(aliases).find((k) =>
            aliases[k].includes(split[0])
          );
          if (!mainstr) throw new Error("Alias not found");
          main = aliases[mainstr];
          parsed[mainstr] = split[1];
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
          ...cIndex
            .slice(1)
            .split("")
            .map((k) => ({ [k]: true })),
        ),
      };
    } else {
      parsed._.push(cIndex);
    }
  }

  // TODO: optimize and refactor
  if (defaults && aliases) {
    for (const [key, value] of Object.entries(defaults)) {
      if (parsed[key] === value) {
        for (let i = 0; i < aliases[key].length; i++) {
          parsed[aliases[key][i]] = value;
        }
      }
    }
  }

  return parsed;
};
