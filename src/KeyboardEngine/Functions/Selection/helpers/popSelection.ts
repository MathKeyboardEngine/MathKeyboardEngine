import { firstBefore } from "../../../../helpers/arrayhelpers/firstBefore";
import { Node } from "../../../../SyntaxTreeComponents/Nodes/Base/Node";
import { Placeholder } from "../../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../../KeyboardMemory";
import { LeaveSelectionMode } from "../LeaveSelectionMode";

export function popSelection(k: KeyboardMemory, arg? :{andInsert : Node}) : Node[] {
    if (k.SelectionDiff == null) {
        throw 'Turn on selection mode before calling this method.';
    }
    if (k.SelectionDiff == 0) {
        LeaveSelectionMode(k);
        return [];
    }
    let diff = k.SelectionDiff;
    let insertNode = arg == undefined ? [] : [arg.andInsert];
    if (k.Current instanceof Placeholder) {
        LeaveSelectionMode(k);
        return k.Current.Nodes.splice(0, diff, ...insertNode);
    } else {
        let siblings = k.Current.ParentPlaceholder.Nodes;
        let indexOfLeftBorder = siblings.indexOf(k.InclusiveSelectionLeftBorder as Node);
        k.Current = firstBefore(siblings, k.InclusiveSelectionLeftBorder) ?? k.Current.ParentPlaceholder;
        LeaveSelectionMode(k);
        return siblings.splice(indexOfLeftBorder, abs(diff), ...insertNode);
    }
}

function abs(n : number ) : number {
    return n < 0 ? -n : n;
}