import { IEncapsulationPart } from "../../../KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent";
import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { ReadonlyAtom } from "../Base/ReadonlyAtom";

export class DigitAtom extends ReadonlyAtom implements IEncapsulationPart {
    value : number;
    constructor(digit : number) {
        super();
        this.value = digit;
    }
    EncapsulationWhole: string = `numberpart`;
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return this.value.toString();
    }
}