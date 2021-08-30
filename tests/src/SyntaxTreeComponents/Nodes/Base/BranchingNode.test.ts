import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { BranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { LatexConfiguration } from '../../../../../src/LatexConfiguration';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';

describe(BranchingNode.name, () => {
  it('calling MoveUp or MoveDown does not throw even if not implemented', () => {
    const k = new KeyboardMemory();
    Insert(k, new DummyBranchingNode());
    expectLatex('wow >> ◼ << wow', k);
    MoveUp(k);
    expectLatex('wow >> ◼ << wow', k);
    MoveDown(k);
    expectLatex('wow >> ◼ << wow', k);
  });
});

class DummyBranchingNode extends BranchingNode {
  Base: Placeholder;
  constructor() {
    super([new Placeholder()]);
    this.Base = this.Placeholders[0];
  }
  override getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    return 'wow >> ' + this.Base.getLatex(keyboardMemory, latexConfiguration) + ' << wow';
  }
}
