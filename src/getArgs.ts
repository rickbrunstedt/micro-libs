interface CliFlags {
  [key: string]: string | number | boolean;
}

type CliInput = string[];

export function getArgs() {
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
