import readline, { ReadLine } from "readline";

export default class InteractiveInterface {
  rl: ReadLine;

  constructor(onClose?: () => void) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on("close", function () {
      if (onClose) {
        onClose();
      } else {
        process.exit(0);
      }
    });
  }

  ask(text: string, cb?: (answer: string) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rl.question(text, (answer) => {
        if (cb) cb(answer);
        resolve(answer);
      });
    });
  }

  close() {
    this.rl.close();
  }
}
