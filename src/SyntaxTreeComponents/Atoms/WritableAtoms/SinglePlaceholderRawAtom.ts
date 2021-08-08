import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { WritableAtom } from "../Base/WritableAtom";

export class SinglePlaceholderRawAtom extends WritableAtom {
    readonly Prefix : string;
    readonly Content : Placeholder;
    readonly Suffix : string;

    constructor(prefix: string, suffix : string) {
        super([new Placeholder()]);
        this.Prefix = prefix;
        this.Content = this.Placeholders[0];
        this.Suffix = suffix;
    }

    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory : KeyboardMemory): string {
        return this.Prefix + this.Content.getLatex(latexConfiguration, keyboardMemory) + this.Suffix;
    }
}