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
    _: [...argv.slice(2).filter((value) => !value.startsWith("-"))],
    ...defaults,
    ...Object.assign(
      {},
      ...argv.slice(2).map((value) => {
        if (value.startsWith("--")) {
          const split = value.slice(2).split("=");

          return ({ [split[0]]: split[1] });
        } else if (value.startsWith("-")) {
          return value.slice(1).split("").reduce(
            (ac, a) => ({ ...ac, [a]: true }),
            {},
          );
        }

        return undefined;
      }),
    ),
  };

  if (aliases) {
    for (const [key, value] of Object.entries(parsed)) {
      if (key in aliases) {
        parsed = {
          ...parsed,
          ...Object.assign({}, ...aliases[key].map((k) => ({ [k]: value }))),
        };
      } else if (Object.values(aliases).flat().includes(key)) {
        const keyn = Object.keys(aliases).find((k) => aliases[k].includes(key));
        if (keyn) {
          parsed = {
            ...parsed,
            ...Object.assign(
              { [keyn]: value },
              ...aliases[keyn].map((k) => ({ [k]: value })),
            ),
          };
        }
      }
    }
  }

  return parsed;
};
