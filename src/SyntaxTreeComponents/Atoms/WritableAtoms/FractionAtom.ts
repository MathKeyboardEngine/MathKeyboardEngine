import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { WritableAtom } from "../Base/WritableAtom";

export class FractionAtom extends WritableAtom {
    readonly Numerator : Placeholder;
    readonly Denominator : Placeholder;
    
    constructor() {
        super([new Placeholder(), new Placeholder()]);
        this.Numerator = this.Placeholders[0];
        this.Denominator = this.Placeholders[1];
    }

    override getLatexPart(keyboardMemory : KeyboardMemory, latexConfiguration: LatexConfiguration,): string {
        return String.raw`\frac{${this.Numerator.getLatex(keyboardMemory, latexConfiguration)}}{${this.Denominator.getLatex(keyboardMemory, latexConfiguration)}}`;
    }
    
    override GetMoveDownSuggestion(current : Placeholder) : Placeholder | null {
        if (current === this.Numerator) {
            return this.Denominator;
        } else {
            return null;
        }
    }
    
    override GetMoveUpSuggestion(current : Placeholder) : Placeholder | null {
        if (current === this.Denominator) {
            return this.Numerator;
        } else {
            return null;
        }
    }
}