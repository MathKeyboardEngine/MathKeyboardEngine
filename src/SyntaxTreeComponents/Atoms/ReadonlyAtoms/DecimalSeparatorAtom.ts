import { IEncapsulationPart } from "../../../KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent";
import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { ReadonlyAtom } from "../Base/ReadonlyAtom";

export class DecimalSeparatorAtom extends ReadonlyAtom implements IEncapsulationPart {
    EncapsulationWhole: string = `numberpart`;
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return latexConfiguration.decimalSeparator;
    }
}