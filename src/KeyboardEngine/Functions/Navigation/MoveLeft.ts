import { firstBefore } from "../../../helpers/arrayhelpers/firstBefore";
import { last } from "../../../helpers/arrayhelpers/last";
import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";

export function MoveLeft(k: KeyboardMemory) {
    if (k.Current instanceof Placeholder)
    {
        if (k.Current.ParentAtom == null) {
            return;
        }

        let previousPlaceholder : Placeholder | null = firstBefore(k.Current.ParentAtom.Placeholders, k.Current);
        if (previousPlaceholder !== null) {
            if (previousPlaceholder.Atoms.length == 0) {
                k.Current = previousPlaceholder;
            } else {
                k.Current = last(previousPlaceholder.Atoms);
            }
        } else {
            let ancestorPlaceholder = k.Current.ParentAtom.ParentPlaceholder;
            let atomPreviousToParentOfCurrent : Atom | null = firstBefore(ancestorPlaceholder.Atoms, k.Current.ParentAtom);
            if (atomPreviousToParentOfCurrent != null) {
                k.Current = atomPreviousToParentOfCurrent;
            } else {
                k.Current = ancestorPlaceholder;
            }
        }
    } else {
        if (k.Current instanceof WritableAtom) {
            let placeholder = last(k.Current.Placeholders);
            k.Current = last(placeholder.Atoms) ?? placeholder;
        } else {
            k.Current = firstBefore(k.Current.ParentPlaceholder.Atoms, k.Current) ?? k.Current.ParentPlaceholder;
        }
    } 
}