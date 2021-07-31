import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { ReadonlyAtom } from "../Base/ReadonlyAtom";

export class DigitAtom extends ReadonlyAtom {
    value : number;
    constructor(digit : number) {
        super();
        this.value = digit;
    }
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return this.value.toString();
    }

}