import { IEncapsulateCurrentAtomOnInsert } from "../../../KeyboardEngine/Functions/Insert";
import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholders/Placeholder";
import { Atom } from "../Base/Atom";
import { WritableAtom } from "../Base/WritableAtom";

export class FractionAtom extends WritableAtom implements IEncapsulateCurrentAtomOnInsert {
    override getLatex(latexConfiguration: LatexConfiguration, keyboardMemory : KeyboardMemory): string {
        return `\\frac{${this.Numerator.getLatex(latexConfiguration, keyboardMemory)}}{${this.Denominator.getLatex(latexConfiguration, keyboardMemory)}}`;
    }

    readonly Numerator : Placeholder;
    readonly Denominator : Placeholder;
    
    constructor() {
        super([new Placeholder(), new Placeholder()]);
        this.Numerator = this.Placeholders[0];
        this.Denominator = this.Placeholders[1];
    }
    
    override GetMoveDownSuggestion(current : Atom | Placeholder) : Atom | Placeholder | null {
        if (current === this.Numerator || current instanceof Atom && this.Numerator.Atoms.includes(current)) {
            return this.Denominator;
        } else {
            return null;
        }
    }
    
    override GetMoveUpSuggestion(current : Atom | Placeholder) : Atom | Placeholder | null {
        if (current === this.Denominator || current instanceof Atom && this.Denominator.Atoms.includes(current)) {
            return this.Numerator;
        } else {
            return null;
        }
    }
    
    EncapsulateOnInsert(currentAtom: Atom) : void {
        this.Numerator.Atoms.push(currentAtom);
    }
}