export class ProgramArgs {
  args: Map<string, undefined | string>;

  private parseArgs(argsStart: number) {
    process.argv.slice(argsStart).forEach((arg) => {
      const matches = /--([-\w]+)(?:=(.+))?/.exec(arg);
      if (matches) {
        const [, name, value] = matches;
        this.args.set(name, value);
      }
    });
  }

  get(arg: string) {
    return this.args.get(arg);
  }

  safeGet(arg: string) {
    this.assert(arg);
    return String(this.args.get(arg));
  }

  exists(arg: string) {
    return this.args.has(arg);
  }

  assert(arg: string) {
    if (!this.exists(arg)) throw new Error(`Missing required arg ${arg}`);
  }

  constructor(argsStart = 2) {
    this.args = new Map();
    this.parseArgs(argsStart);
  }
}
