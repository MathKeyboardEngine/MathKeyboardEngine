import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { WritableAtom } from "../Base/WritableAtom";

export class SubscriptAtom extends WritableAtom {
    readonly Base : Placeholder;
    readonly Subscript : Placeholder;
    
    constructor() {
        super([new Placeholder(), new Placeholder()]);
        this.Base = this.Placeholders[0];
        this.Subscript = this.Placeholders[1];
    }

    override getLatexPart(keyboardInfo: KeyboardMemory, latexConfiguration: LatexConfiguration) : string {
        return `${this.Base.getLatex(keyboardInfo, latexConfiguration)}_{${this.Subscript.getLatex(keyboardInfo, latexConfiguration)}}`;
    }

    override GetMoveDownSuggestion(current : Placeholder) : Placeholder | null {
        if (current === this.Base) {
            return this.Subscript;
        } else {
            return null;
        }
    }
    
    override GetMoveUpSuggestion(current : Placeholder) : Placeholder | null {
        if (current === this.Subscript) {
            return this.Base;
        } else {
            return null;
        }
    }
}