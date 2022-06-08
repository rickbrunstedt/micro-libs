export interface CliFlags {
  [key: string]: string | number | boolean;
}

export type CliInput = string[];

export interface CliArgs {
  input: CliInput;
  flags: CliFlags;
}

export function getArgs(): CliArgs {
  const [, , ...args] = process.argv;
  const flags: CliFlags = {};
  const input: CliInput = [];

  for (const arg of args) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      flags[key] = value ?? true;
    } else {
      input.push(arg);
    }
  }

  return {
    input,
    flags,
  };
}
