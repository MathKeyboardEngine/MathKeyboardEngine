import { LatexConfiguration } from "../../LatexConfiguration";
import { KeyboardMemory } from "../../KeyboardEngine/KeyboardMemory";
import { Atom } from "../Atoms/Base/Atom";
import { WritableAtom } from "../Atoms/Base/WritableAtom";

export class Placeholder {
    ParentAtom : WritableAtom | null = null;
    Atoms : Atom[] = [];
    
    getLatex(keyboardMemory : KeyboardMemory, latexConfiguration : LatexConfiguration) : string {
        if (keyboardMemory.InclusiveSelectionLeftBorder === this) {
                return latexConfiguration.selectionHightlightStart + this.Atoms.map(atom => atom.getLatex(keyboardMemory, latexConfiguration)).join("");
        } else if (this === keyboardMemory.Current ) {
            if (this.Atoms.length == 0) {
                return latexConfiguration.activePlaceholderLatex;
            } else {
                return latexConfiguration.activePlaceholderLatex + this.Atoms.map(atom => atom.getLatex(keyboardMemory, latexConfiguration)).join("");
            }
        } else if (this.Atoms.length == 0) {
            return latexConfiguration.passivePlaceholderLatex;
        } else {
            return this.Atoms.map(atom => atom.getLatex(keyboardMemory, latexConfiguration)).join("");
        }
    }
}