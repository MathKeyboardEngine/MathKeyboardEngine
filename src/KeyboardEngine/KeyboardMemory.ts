import { LatexConfiguration } from "../LatexConfiguration";
import { Atom } from "../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../SyntaxTreeComponents/Placeholder/Placeholder";

export class KeyboardMemory {
    readonly SyntaxTreeRoot : Placeholder = new Placeholder();
    Current : Placeholder | Atom = this.SyntaxTreeRoot;
    getLatex(latexConfiguration: LatexConfiguration) {
        return this.SyntaxTreeRoot.getLatex(latexConfiguration, this);
    }
}