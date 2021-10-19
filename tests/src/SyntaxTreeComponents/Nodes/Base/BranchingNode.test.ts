import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { BranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { LatexConfiguration } from '../../../../../src/LatexConfiguration';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { moveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';

describe(BranchingNode.name, () => {
  it(`calling ${moveUp.name} or ${moveDown.name} does not throw even if not implemented`, () => {
    const k = new KeyboardMemory();
    insert(k, new DummyBranchingNode());
    expectLatex('wow >> ◼ << wow', k);
    moveUp(k);
    expectLatex('wow >> ◼ << wow', k);
    moveDown(k);
    expectLatex('wow >> ◼ << wow', k);
  });
});

class DummyBranchingNode extends BranchingNode {
  constructor() {
    super([new Placeholder()]);
  }
  override getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    return 'wow >> ' + this.placeholders[0].getLatex(keyboardMemory, latexConfiguration) + ' << wow';
  }
}
