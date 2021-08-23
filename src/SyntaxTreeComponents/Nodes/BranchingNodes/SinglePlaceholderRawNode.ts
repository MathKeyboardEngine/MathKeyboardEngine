import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { BranchingNode } from "../Base/BranchingNode";

export class SinglePlaceholderRawNode extends BranchingNode {
    readonly Prefix : string;
    readonly Content : Placeholder;
    readonly Suffix : string;

    constructor(prefix: string, suffix : string) {
        super([new Placeholder()]);
        this.Prefix = prefix;
        this.Content = this.Placeholders[0];
        this.Suffix = suffix;
    }

    override getLatexPart(keyboardMemory : KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        return this.Prefix + this.Content.getLatex(keyboardMemory, latexConfiguration) + this.Suffix;
    }
}