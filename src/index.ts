/* eslint-disable @typescript-eslint/strict-boolean-expressions */
interface Options {
  aliases?: Record<string, string[]>;
  defaults?: Record<string, boolean | string>;
}
interface Parsed {
  _: string[];
  [key: string]: unknown;
}

export default (
  argv: string[],
  options: Options = {
    aliases: {},
    defaults: {},
  }
): Parsed => {
  const { aliases, defaults } = options;
  let parsed: Parsed = Object.assign({ _: [] }, defaults);

  for (let i = 2, n = argv.length; i < n; i++) {
    const cIndex = argv[i];

    switch (true) {
      case cIndex.startsWith("--"):
        // eslint-disable-next-line no-case-declarations
        const split = cIndex.slice(2).split("=");
        parsed[split[0]] = split[1] ?? true;
        break;
      case cIndex.startsWith("-"):
        parsed = Object.assign(
          {},
          parsed,
          ...cIndex
            .slice(1)
            .split("")
            .map((k) => ({ [k]: true }))
        );
        break;
      default:
        parsed._.push(cIndex);
    }
  }

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
              ...aliases[keyn].map((k) => ({ [k]: value }))
            ),
          };
        }
      }
    }
  }

  return parsed;
};
