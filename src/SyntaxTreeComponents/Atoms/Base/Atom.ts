import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";

export abstract class Atom {
    ParentPlaceholder! : Placeholder;

    abstract provideLatex(latexConfiguration : LatexConfiguration, keyboardMemory : KeyboardMemory) : string;
    getLatex(latexConfiguration : LatexConfiguration, keyboardMemory : KeyboardMemory) : string {
        let latex = this.provideLatex(latexConfiguration, keyboardMemory);
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
                return latex + latexConfiguration.getActivePlaceholderLatex();
            } else {
                return latex;
            }
        }
    }
}