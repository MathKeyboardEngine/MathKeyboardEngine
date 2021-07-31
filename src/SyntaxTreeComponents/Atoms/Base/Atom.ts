import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";

export abstract class Atom {
    ParentPlaceholder! : Placeholder;

    abstract provideLatex(latexConfiguration : LatexConfiguration, keyboardMemory : KeyboardMemory) : string;
    getLatex(latexConfiguration : LatexConfiguration, keyboardMemory : KeyboardMemory) : string {
        let latex = this.provideLatex(latexConfiguration, keyboardMemory);
        if (this === keyboardMemory.Current){
            return latex + latexConfiguration.getActivePlaceholderLatex();
        } else {
            return latex;
        }
    }
}