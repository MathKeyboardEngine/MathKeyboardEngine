import { LatexConfiguration } from "../LatexConfiguration";
import { Node } from "../SyntaxTreeComponents/Nodes/Base/Node";
import { Placeholder } from "../SyntaxTreeComponents/Placeholder/Placeholder";

export class KeyboardMemory {
    readonly SyntaxTreeRoot : Placeholder = new Placeholder();
    Current : Placeholder | Node = this.SyntaxTreeRoot;

    SelectionDiff: number | null = null;
    InclusiveSelectionRightBorder: Node | null = null;
    InclusiveSelectionLeftBorder: Node | Placeholder | null = null;
}