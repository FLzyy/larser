/* eslint-disable @typescript-eslint/naming-convention */
import { copyFile, mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

const source = await readFile("./package.json", "utf-8");
const object = JSON.parse(source);
object.scripts = {};
object.devDependencies = {};

await writeFile(
  "./dist/package.json",
  Buffer.from(JSON.stringify(object), "utf-8"),
);

if (!existsSync("./dist/types")) {
  await mkdir("./dist/types");
}

await writeFile(
  "./dist/types/index.d.ts",
  await readFile("./src/types/index.d.ts", "utf-8"),
);

await copyFile(
  "./README.md",
  "./dist/README.md",
);
