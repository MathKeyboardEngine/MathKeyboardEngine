import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";

export abstract class Atom {
    ParentPlaceholder! : Placeholder;

    abstract getLatex(latexConfiguration : LatexConfiguration, keyboardMemory : KeyboardMemory) : string;
}