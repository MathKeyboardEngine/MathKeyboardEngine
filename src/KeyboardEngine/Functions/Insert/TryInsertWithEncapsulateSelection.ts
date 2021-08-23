import { last } from "../../../helpers/arrayhelpers/last";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";
import { popSelection } from "../Selection/helpers/popSelection";

export function TryInsertWithEncapsulateSelection(k: KeyboardMemory, newNode: BranchingNode) : boolean {
    let nodes = popSelection(k, {andInsert: newNode});
    if (nodes.length == 0) {
        return false;
    } else {
        let encapsulatingPlaceholder = newNode.Placeholders[0];
        for (let node of nodes) {
            node.ParentPlaceholder = encapsulatingPlaceholder;
            encapsulatingPlaceholder.Nodes.push(node);
        }
        k.Current = last(nodes);
        MoveRight(k);
        return true;
    }
}