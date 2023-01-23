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
  let parsed: Parsed = { _: [], ...defaults };

  for (let i = 2, n = argv.length; i < n; i++) {
    const cIndex = argv[i];

    if (cIndex.startsWith("--")) {
      const split = cIndex.replace("--", "").split("=");
      parsed[split[0]] = split[1] ?? true;
    } else if (cIndex.startsWith("-")) {
      parsed = Object.assign(
        {},
        parsed,
        ...[...cIndex.replace("-", "")].map((k) => ({ [k]: true }))
      );
    } else {
      parsed._.push(cIndex);
    }
  }

  if (aliases) {
    for (const [key, value] of Object.entries(parsed)) {
      if (key in aliases) {
        parsed = Object.assign(
          {},
          parsed,
          ...aliases[key].map((k) => ({ [k]: value }))
        );
      } else if (Object.values(aliases).flat().includes(key)) {
        const keyn = Object.keys(aliases).find((k) => aliases[k].includes(key));
        if (keyn) {
          parsed = Object.assign(
            { [keyn]: value },
            parsed,
            ...aliases[keyn].map((k) => ({ [k]: value }))
          );
        }
      }
    }
  }

  return parsed;
};
