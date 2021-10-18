import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { PartOfNumberWithDigits } from './Base/PartOfNumberWithDigits';

export class DecimalSeparatorNode extends PartOfNumberWithDigits {
  private readonly latex: () => string;
  constructor(latex: string | (() => string) = '.') {
    super();
    this.latex = typeof latex === 'string' ? () => latex : latex;
  }
  override getLatexPart(_keyboardMemory: KeyboardMemory, _latexConfiguration: LatexConfiguration): string {
    return this.latex();
  }
}
