import { Atom } from "../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../SyntaxTreeComponents/Placeholders/Placeholder";

export class KeyboardMemory {
    Current : Placeholder | Atom = new Placeholder();
}