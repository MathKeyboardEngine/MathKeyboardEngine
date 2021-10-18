import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { PartOfNumberWithDigits } from './Base/PartOfNumberWithDigits';

export class DigitNode extends PartOfNumberWithDigits {
  private readonly latex: string;
  constructor(digit: string) {
    super();
    this.latex = digit;
  }
  override getLatexPart(_keyboardMemory: KeyboardMemory, _latexConfiguration: LatexConfiguration): string {
    return this.latex;
  }
}
