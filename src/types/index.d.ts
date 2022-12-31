export function larser(
  argv: string[],
  options?: Options,
): Parsed;

export interface Options {
  aliases: Record<string, string[]>;
}

export interface Parsed {
  _: string[];
  [key: string]: unknown;
}
