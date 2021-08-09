import { firstBefore } from "../../../helpers/arrayhelpers/firstBefore";
import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { LeaveSelectionMode } from "../Selection/LeaveSelectionMode";

export function popSelection(k: KeyboardMemory, arg? :{andInsert : Atom}) : Atom[] {
    if (k.SelectionDiff == null) {
        throw 'Turn on selection mode before calling this method.';
    }
    if (k.SelectionDiff == 0) {
        LeaveSelectionMode(k);
        return [];
    }
    let diff = k.SelectionDiff;
    let insertAtom = arg == undefined ? [] : [arg.andInsert];
    if (k.Current instanceof Placeholder) {
        LeaveSelectionMode(k);
        return k.Current.Atoms.splice(0, diff, ...insertAtom);
    } else {
        let siblings = k.Current.ParentPlaceholder.Atoms;
        let indexOfLeftBorder = siblings.indexOf(k.InclusiveSelectionLeftBorder as Atom);
        k.Current = firstBefore(siblings, k.InclusiveSelectionLeftBorder) ?? k.Current.ParentPlaceholder;
        LeaveSelectionMode(k);
        return siblings.splice(indexOfLeftBorder, abs(diff), ...insertAtom);
    }
}

function abs(n : number ) : number {
    return n < 0 ? -n : n;
}