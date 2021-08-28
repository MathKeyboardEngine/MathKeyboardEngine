import { last } from "../../../helpers/arrayhelpers/last";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";
import { PopSelection } from "../Selection/PopSelection";
import { Encapsulate } from "./Encapsulate";
import { Insert } from "./Insert";

export function InsertWithEncapsulateSelection(k: KeyboardMemory, newNode: BranchingNode) {
    let selection = PopSelection(k);
    Insert(k, newNode);
    if (selection.length > 0) {
        let encapsulatingPlaceholder = newNode.Placeholders[0];
        Encapsulate(selection, encapsulatingPlaceholder);
        k.Current = last(selection);
        MoveRight(k);
    }
}