import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholders/Placeholder";

export abstract class Atom {
    ParentPlaceholder! : Placeholder;

    abstract getLatex(latexConfiguration : LatexConfiguration, keyboardMemory : KeyboardMemory) : string;
}