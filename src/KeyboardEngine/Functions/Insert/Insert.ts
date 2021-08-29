import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function Insert(k: KeyboardMemory, newNode: TreeNode) : void {
    if (k.Current instanceof Placeholder) {
        k.Current.Nodes.unshift(newNode);
        newNode.ParentPlaceholder = k.Current;
    } else {
        const parent : Placeholder = k.Current.ParentPlaceholder;
        const indexOfCurrent = parent.Nodes.indexOf(k.Current);
        parent.Nodes.splice(indexOfCurrent + 1, 0, newNode);
        newNode.ParentPlaceholder = parent;
    }
    MoveRight(k);
}
    