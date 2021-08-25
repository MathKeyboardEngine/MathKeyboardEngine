import { firstBefore } from "../../../helpers/arrayhelpers/firstBefore";
import { last } from "../../../helpers/arrayhelpers/last";
import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";

export function MoveLeft(k: KeyboardMemory) {
    if (k.Current instanceof Placeholder)
    {
        if (k.Current.ParentNode == null) {
            return;
        }

        let previousPlaceholder : Placeholder | null = firstBefore(k.Current.ParentNode.Placeholders, k.Current);
        if (previousPlaceholder !== null) {
            if (previousPlaceholder.Nodes.length == 0) {
                k.Current = previousPlaceholder;
            } else {
                k.Current = last(previousPlaceholder.Nodes);
            }
        } else {
            let ancestorPlaceholder = k.Current.ParentNode.ParentPlaceholder;
            let nodePreviousToParentOfCurrent : TreeNode | null = firstBefore(ancestorPlaceholder.Nodes, k.Current.ParentNode);
            if (nodePreviousToParentOfCurrent != null) {
                k.Current = nodePreviousToParentOfCurrent;
            } else {
                k.Current = ancestorPlaceholder;
            }
        }
    } else {
        if (k.Current instanceof BranchingNode) {
            let placeholder = last(k.Current.Placeholders);
            k.Current = last(placeholder.Nodes) ?? placeholder;
        } else {
            k.Current = firstBefore(k.Current.ParentPlaceholder.Nodes, k.Current) ?? k.Current.ParentPlaceholder;
        }
    } 
}