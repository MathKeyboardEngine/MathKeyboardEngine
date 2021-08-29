import { Placeholder } from "../../Placeholder/Placeholder";
import { StandardBranchingNode } from "./StandardBranchingNode";

export class DescendingBranchingNode extends StandardBranchingNode {
    override GetMoveDownSuggestion(current : Placeholder) : Placeholder | null {
        const currentPlaceholderIndex = this.Placeholders.indexOf(current);
        if (currentPlaceholderIndex < this.Placeholders.length - 1) {
            return this.Placeholders[currentPlaceholderIndex + 1];
        } else {
            return null;
        }
    }
    
    override GetMoveUpSuggestion(current : Placeholder) : Placeholder | null {
        const currentPlaceholderIndex = this.Placeholders.indexOf(current);
        if (currentPlaceholderIndex > 0) {
            return this.Placeholders[currentPlaceholderIndex - 1];
        } else {
            return null;
        }
    } 
}