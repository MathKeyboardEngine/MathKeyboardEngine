import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { ReadonlyAtom } from "../Base/ReadonlyAtom";

export class PlusOperatorAtom extends ReadonlyAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return "+";
    }
}