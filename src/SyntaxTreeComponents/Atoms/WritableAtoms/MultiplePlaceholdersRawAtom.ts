import { Placeholder } from "../../Placeholder/Placeholder";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { WritableAtom } from "../Base/WritableAtom";
import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";


export class MultiplePlaceholdersRawAtom extends WritableAtom {
    private before: string;
    private between: string[];
    private after: string;

    constructor(
        before: string,
        between: string | string[],
        after: string
    ) {
        let placeholderCount = (typeof between === 'string') ? 2 : between.length + 1;
        let placeholders = new Array<Placeholder>();
        for (let i = 0; i < placeholderCount; i++) {
            placeholders.push(new Placeholder());
        }
        super(placeholders);
        this.before = before;
        this.between = (typeof between === 'string') ? [between] : between;
        this.after = after;
    }

    getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        let latex = this.before;
        for (let i = 0; i < this.between.length; i++) {
            latex += this.Placeholders[0].getLatex(keyboardMemory, latexConfiguration);
            latex += this.between[0];
        }
        latex += this.Placeholders[this.Placeholders.length - 1].getLatex(keyboardMemory, latexConfiguration);
        latex += this.after;
        return latex;
    }
}
