import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { AbstractPartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DigitAtom extends AbstractPartOfNumberWithDigits {
    value : number;
    constructor(digit : number) {
        super();
        this.value = digit;
    }
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return this.value.toString();
    }
}