import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, BranchingNode, LatexConfiguration, Placeholder, moveUp, moveDown } from '../../../../../src/x';

describe(BranchingNode.name, () => {
  it(`calling ${moveUp.name} or ${moveDown.name} does not throw even if not implemented`, () => {
    const k = new KeyboardMemory();
    insert(k, new DummyBranchingNode());
    expectLatex('wow >> ▦ << wow', k);
    moveUp(k);
    expectLatex('wow >> ▦ << wow', k);
    moveDown(k);
    expectLatex('wow >> ▦ << wow', k);
  });
});

class DummyBranchingNode extends BranchingNode {
  constructor() {
    super([new Placeholder()]);
  }
  override getLatexPart(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    return 'wow >> ' + this.placeholders[0].getLatex(k, latexConfiguration) + ' << wow';
  }
}
