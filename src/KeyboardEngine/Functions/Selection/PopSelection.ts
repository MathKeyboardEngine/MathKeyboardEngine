import { firstBefore } from "../../../helpers/arrayhelpers/firstBefore";
import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { LeaveSelectionMode } from "./LeaveSelectionMode";

export function PopSelection(k: KeyboardMemory) : TreeNode[] {
    if (k.SelectionDiff == null) {
        throw 'Turn on selection mode before calling this method.';
    }
    if (k.SelectionDiff == 0) {
        LeaveSelectionMode(k);
        return [];
    }
    const diff = k.SelectionDiff;
    if (k.Current instanceof Placeholder) {
        LeaveSelectionMode(k);
        return k.Current.Nodes.splice(0, diff);
    } else {
        const siblings = k.Current.ParentPlaceholder.Nodes;
        const indexOfLeftBorder = siblings.indexOf(k.InclusiveSelectionLeftBorder as TreeNode);
        k.Current = firstBefore(siblings, k.InclusiveSelectionLeftBorder) ?? k.Current.ParentPlaceholder;
        LeaveSelectionMode(k);
        return siblings.splice(indexOfLeftBorder, abs(diff));
    }
}

function abs(n : number ) : number {
    return n < 0 ? -n : n;
}