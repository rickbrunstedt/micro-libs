#!/usr/bin/env node

import { copyFileSync, readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";

import { CliArgs, getArgs } from "../src/getArgs";
import log from "../src/Logging";

type Files = string[];

function getRootPath(type = "ts") {
  if (type === "ts") {
    return join(__dirname, "../../src");
  }

  return join(__dirname, "../src");
}

function readFileList(rootPath: string) {
  const files = readdirSync(rootPath);
  return files;
}

function printFiles(files: Files) {
  let index = 1;
  for (const file of files) {
    console.log(`${index++} - ${file}`);
  }
}

function isNumber(value: string) {
  return typeof Number(value) === "number";
}

let fileEndingRgx = new RegExp(/(.js|.jsx|.ts|.tsx)$/);

function handleCopyFile(rootPath: string, files: Files, args: CliArgs) {
  const input = args.input[1];
  const output = args.input[2];
  let fileName: string;
  if (isNumber(input)) {
    fileName = files[Number(input)];
  } else {
    fileName = input;
  }
  const filePath = join(rootPath, fileName);
  log.info(filePath);

  let outputPath: string;

  if (output.match(fileEndingRgx)) {
    outputPath = join(cwd(), output);
  } else {
    outputPath = join(cwd(), output, fileName);
  }

  try {
    copyFileSync(filePath, outputPath);
    log.info("Successfully copied file");
  } catch (err) {
    log.warn("Couldn't copy file");
    log.error(err);
  }
}

const commandList = `
  Micro Libs

  Commands:
    list, ls      List all libs
    copy, cp      Copy lib to other folder.
                  Input is either number from list or name of the file.
                  Output is the location where the file should be copied.

  flags:
    --help, -h    Show this dialog
`;

function main() {
  const rootPath = getRootPath();
  const files = readFileList(rootPath);
  const args = getArgs();

  if (args.flags.help || args.flags.h) {
    console.log(commandList);
  }

  switch (args.input[0]) {
    case "list":
    case "ls":
      printFiles(files);
      return;
    case "copy":
    case "cp":
      handleCopyFile(rootPath, files, args);
      return;
    default:
      log.info("No matching command");
      return;
  }
}

main();
