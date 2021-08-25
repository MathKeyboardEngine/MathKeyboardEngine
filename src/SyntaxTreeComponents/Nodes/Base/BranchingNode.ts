import { TreeNode } from "./TreeNode";
import { Placeholder } from "../../Placeholder/Placeholder";

export abstract class BranchingNode extends TreeNode {
    Placeholders : Placeholder[];

    constructor(leftToRight : Placeholder[]) {
        super();
        this.Placeholders = leftToRight;
        this.Placeholders.forEach(ph => {
            ph.ParentNode = this;
        });
    }
    
    GetMoveDownSuggestion(from : Placeholder) : Placeholder | null {
        return null;
    }
    
    GetMoveUpSuggestion(from : Placeholder) : Placeholder | null {
        return null;
    }
}