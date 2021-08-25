import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { KeyboardMemory } from "../../KeyboardMemory";
import { setSelectionDiff } from "./helpers/setSelectionDiff";

export function SelectLeft(k : KeyboardMemory) {
    let diff = k.SelectionDiff ?? 0;
    if (k.Current instanceof TreeNode) {
        let nodes = k.Current.ParentPlaceholder.Nodes;
        let indexOfCurrent = nodes.indexOf(k.Current);
        if (indexOfCurrent + diff >= 0) {
            setSelectionDiff(k, diff - 1);
        }
    }
}