export = larser;
declare function larser(
  argv: string[],
  options?: larser.Options,
): larser.Parsed;
declare namespace larser {
  export interface Options {
    aliases?: Record<string, string[]>;
    defaults?: Record<string, boolean | string>;
  }
  export interface Parsed {
    _: string[];
    [key: string]: unknown;
  }
}
