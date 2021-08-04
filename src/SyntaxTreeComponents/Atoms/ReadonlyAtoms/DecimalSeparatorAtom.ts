import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { AbstractPartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DecimalSeparatorAtom extends AbstractPartOfNumberWithDigits {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return latexConfiguration.decimalSeparator;
    }
}