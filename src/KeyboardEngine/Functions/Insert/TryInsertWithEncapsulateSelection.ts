import { last } from "../../../helpers/arrayhelpers/last";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";
import { PopSelection } from "../Selection/PopSelection";
import { Encapsulate } from "./Encapsulate";
import { Insert } from "./Insert";

export function TryInsertWithEncapsulateSelection(k: KeyboardMemory, newNode: BranchingNode) : boolean {
    let nodes = PopSelection(k);
    Insert(k, newNode);
    if (nodes.length == 0) {
        return false;
    } else {
        let encapsulatingPlaceholder = newNode.Placeholders[0];
        Encapsulate(nodes, encapsulatingPlaceholder);
        k.Current = last(nodes);
        MoveRight(k);
        return true;
    }
}