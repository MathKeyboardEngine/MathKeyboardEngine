import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";

export abstract class Atom {
    ParentPlaceholder! : Placeholder;

    abstract provideLatex(keyboardMemory : KeyboardMemory, latexConfiguration : LatexConfiguration) : string;
    getLatex(keyboardMemory : KeyboardMemory, latexConfiguration : LatexConfiguration) : string {
        let latex = this.provideLatex(keyboardMemory, latexConfiguration);
        if (keyboardMemory.SelectionDiff != null && keyboardMemory.SelectionDiff != 0) {
            if (keyboardMemory.InclusiveSelectionLeftBorder === this) {
                latex = latexConfiguration.selectionHightlightStart + latex;
            }
            if (keyboardMemory.InclusiveSelectionRightBorder === this) {
                latex = latex + latexConfiguration.selectionHightlightEnd;
            }
            return latex;
        } else {
            if (keyboardMemory.Current === this){
                return latex + latexConfiguration.activePlaceholderLatex;
            } else {
                return latex;
            }
        }
    }
}