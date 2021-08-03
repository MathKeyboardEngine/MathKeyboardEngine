import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { PartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DecimalSeparatorAtom extends PartOfNumberWithDigits {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return latexConfiguration.decimalSeparator;
    }
}