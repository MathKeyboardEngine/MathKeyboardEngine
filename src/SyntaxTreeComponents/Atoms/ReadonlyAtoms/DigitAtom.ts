import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { AbstractPartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DigitAtom extends AbstractPartOfNumberWithDigits {
    readonly value : string;
    constructor(digit : string) {
        super();
        this.value = digit;
    }
    override getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        return this.value;
    }
}