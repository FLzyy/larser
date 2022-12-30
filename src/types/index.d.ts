declare namespace larser {
  interface Options {
    aliases: Record<string, string[]>;
  }

  interface Parsed {
    _: string[];
    [key: string]: unknown;
  }
}
