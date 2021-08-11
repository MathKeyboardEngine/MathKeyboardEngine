import { LatexConfiguration } from "../LatexConfiguration";
import { Atom } from "../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../SyntaxTreeComponents/Placeholder/Placeholder";

export class KeyboardMemory {
    readonly SyntaxTreeRoot : Placeholder = new Placeholder();
    Current : Placeholder | Atom = this.SyntaxTreeRoot;

    SelectionDiff: number | null = null;
    InclusiveSelectionRightBorder: Atom | null = null;
    InclusiveSelectionLeftBorder: Atom | Placeholder | null = null;

    getLatex(latexConfiguration: LatexConfiguration) {
        return this.SyntaxTreeRoot.getLatex(this, latexConfiguration);
    }
}