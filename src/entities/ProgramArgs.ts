export class ProgramArgs {
  args: Map<string, undefined | string>;

  private parseArgs() {
    process.argv.forEach((arg) => {
      const matches = /-{1,2}([-\w]+)(?:=(.+))?/.exec(arg);
      if (matches) {
        const [, name, value] = matches;
        this.args.set(name, value);
      }
    });
  }

  get(args: string[]) {
    for (const arg of args) {
      const value = this.args.get(arg);
      if (value) return value;
    }
  }

  safeGet(args: string[]) {
    this.assert(args);
    return this.get(args) as string;
  }

  exists(arg: string) {
    return this.args.has(arg);
  }

  assert(args: string[]) {
    if (!args.some((arg) => this.exists(arg))) throw new Error(`Missing required argument ${args.join('|')}`);
  }

  constructor() {
    this.args = new Map();
    this.parseArgs();
  }
}
