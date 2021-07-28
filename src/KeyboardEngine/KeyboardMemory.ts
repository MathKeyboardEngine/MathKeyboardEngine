import { Atom } from "../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../SyntaxTreeComponents/Placeholders/Placeholder";

export class KeyboardMemory {
    readonly SyntaxTreeRoot : Placeholder = new Placeholder();
    Current : Placeholder | Atom = this.SyntaxTreeRoot;
}