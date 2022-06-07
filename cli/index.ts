import { readdirSync } from "fs";
import { join } from "path";

import { getArgs } from "../src/getArgs";
import InteractiveInterface from "../src/InteractiveInterface";
import log from "../src/Logging";

function getRootPath(type = "ts") {
  if (type === "ts") {
    return join(__dirname, "../../src");
  }

  return join(__dirname, "../src");
}

function listFiles(rootPath: string) {
  const files = readdirSync(rootPath);

  for (const file of files) {
    log.debug(file);
  }
}

// const rootPath = getRootPath();
// listFiles(rootPath);
// const args = getArgs();
// log.info(args);

// const readline = require("readline");

async function testit() {
  const ii = new InteractiveInterface();

  const a1 = await ii.ask("Time to sleep?");
  console.log(a1);

  ii.close();
}

testit();
