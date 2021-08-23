import { LatexConfiguration } from "../../LatexConfiguration";
import { KeyboardMemory } from "../../KeyboardEngine/KeyboardMemory";
import { Node } from "../Nodes/Base/Node";
import { BranchingNode } from "../Nodes/Base/BranchingNode";

export class Placeholder {
    ParentNode : BranchingNode | null = null;
    Nodes : Node[] = [];
    
    getLatex(keyboardMemory : KeyboardMemory, latexConfiguration : LatexConfiguration) : string {
        if (keyboardMemory.InclusiveSelectionLeftBorder === this) {
                return latexConfiguration.selectionHightlightStart + this.Nodes.map(node => node.getLatex(keyboardMemory, latexConfiguration)).join("");
        } else if (this === keyboardMemory.Current ) {
            if (this.Nodes.length == 0) {
                return latexConfiguration.activePlaceholderLatex;
            } else {
                return latexConfiguration.activePlaceholderLatex + this.Nodes.map(node => node.getLatex(keyboardMemory, latexConfiguration)).join("");
            }
        } else if (this.Nodes.length == 0) {
            return latexConfiguration.passivePlaceholderLatex;
        } else {
            return this.Nodes.map(node => node.getLatex(keyboardMemory, latexConfiguration)).join("");
        }
    }
}