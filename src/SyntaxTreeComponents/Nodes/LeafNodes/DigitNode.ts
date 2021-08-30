import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { PartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DigitNode extends PartOfNumberWithDigits {
  readonly value: string;
  constructor(digit: string) {
    super();
    this.value = digit;
  }
  override getLatexPart(_keyboardMemory: KeyboardMemory, _latexConfiguration: LatexConfiguration): string {
    return this.value;
  }
}
