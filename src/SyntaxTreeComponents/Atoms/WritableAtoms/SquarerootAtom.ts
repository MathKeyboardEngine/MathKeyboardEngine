import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { WritableAtom } from "../Base/WritableAtom";

export class SquarerootAtom extends WritableAtom {
    readonly Content : Placeholder;

    constructor() {
        super([new Placeholder()]);
        this.Content = this.Placeholders[0];
    }
    
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory : KeyboardMemory): string {
        return String.raw`\sqrt{${this.Content.getLatex(latexConfiguration, keyboardMemory)}}`;
    }
}