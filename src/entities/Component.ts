import { Visitor } from './Visitor';

export class Component {
  accept(visitor: Visitor) {
    return visitor.visit(this);
  }
}
