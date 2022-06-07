class Logging {
  log(type: string, ...args: any[]) {
    console.log(`    ${type}:`, ...args);
  }

  info(...args: any[]) {
    this.log("Info", ...args);
  }

  debug(...args: any[]) {
    this.log("Debug", ...args);
  }

  error(...args: any[]) {
    this.log("Error", ...args);
  }

  warn(...args: any[]) {
    this.log("Warning", ...args);
  }
}

const log = new Logging();
export default log;
