import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { AbstractPartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DecimalSeparatorAtom extends AbstractPartOfNumberWithDigits {
    override provideLatex(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        return latexConfiguration.decimalSeparator;
    }
}