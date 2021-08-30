import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { PartOfNumberWithDigits } from './Base/PartOfNumberWithDigits';

export class DecimalSeparatorNode extends PartOfNumberWithDigits {
  readonly Latex: () => string;
  constructor(latex: string | (() => string) = '.') {
    super();
    this.Latex = typeof latex === 'string' ? () => latex : latex;
  }
  override getLatexPart(_keyboardMemory: KeyboardMemory, _latexConfiguration: LatexConfiguration): string {
    return this.Latex();
  }
}
