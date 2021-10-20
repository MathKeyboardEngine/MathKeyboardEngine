import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { LeafNode } from '../Base/LeafNode';

export class StandardLeafNode extends LeafNode {
  private readonly latex: () => string;
  constructor(latex: string | (() => string)) {
    super();
    this.latex = typeof latex === 'string' ? () => latex : latex;
  }
  override getLatexPart(_k: KeyboardMemory, _latexConfiguration: LatexConfiguration): string {
    return this.latex();
  }
}
