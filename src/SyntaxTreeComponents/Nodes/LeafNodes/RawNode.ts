import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { LeafNode } from "../Base/LeafNode";

/*
The RawNode is a LeafNode for which KeyboardEngine/Functions and LatexConfiguration do not have any special behaviour.
There is no need to create hundreds of predefined Nodes that output simple Latex like '+', '-', etc,
until one day those types of Nodes should be handled in a special way.
Whenever a new Node is defined with special behaviour,
developers can opt-in by using those new special classes instead of the RawNode.
*/
export class RawNode extends LeafNode {
    readonly Latex : (() => string );
    constructor(latex: string | (() => string )) {
        super();
        this.Latex = typeof latex === 'string' ? () => latex : latex;
    }
    override getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        return this.Latex();
    }
}