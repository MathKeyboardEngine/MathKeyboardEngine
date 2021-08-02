import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { Atom } from "../Base/Atom";
import { WritableAtom } from "../Base/WritableAtom";

export class FractionAtom extends WritableAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory : KeyboardMemory): string {
        return `\\frac{${this.Numerator.getLatex(latexConfiguration, keyboardMemory)}}{${this.Denominator.getLatex(latexConfiguration, keyboardMemory)}}`;
    }

    readonly Numerator : Placeholder;
    readonly Denominator : Placeholder;
    
    constructor() {
        super([new Placeholder(), new Placeholder()]);
        this.Numerator = this.Placeholders[0];
        this.Denominator = this.Placeholders[1];
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