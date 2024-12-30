export interface Visitor {
  visit(el: unknown): Promise<void>;
}
