import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { AbstractPartOfNumberWithDigits } from "./Base/PartOfNumberWithDigits";

export class DecimalSeparatorNode extends AbstractPartOfNumberWithDigits {
    readonly Latex : (() => string );
    constructor(latex: string | (() => string ) = '.') {
        super();
        this.Latex = typeof latex === 'string' ? () => latex : latex;
    }
    override getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        return this.Latex();
    }
}