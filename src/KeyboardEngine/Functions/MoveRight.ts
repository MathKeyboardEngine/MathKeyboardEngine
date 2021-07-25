import { Placeholder } from "../../SyntaxTreeComponents/Placeholders/Placeholder";
import { KeyboardMemory } from "../KeyboardMemory";
import { WritableAtom } from "../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { Atom } from "../../SyntaxTreeComponents/Atoms/Base/Atom";
import { firstAfter } from "../../helpers/arrayhelpers/firstAfter";

export function MoveRight(k: KeyboardMemory) {
    if (k.Current instanceof Placeholder)
    {
        if (k.Current.Atoms.length > 0) {
            let nextAtom = k.Current.Atoms[0];
            k.Current = nextAtom instanceof WritableAtom ? nextAtom.Placeholders[0] : nextAtom;
        } else if (k.Current.ParentAtom == null) {
            return;
        } else {
            k.Current = firstAfter(k.Current.ParentAtom.Placeholders, k.Current) ?? k.Current.ParentAtom;
        }
    } else {
        let nextAtom : Atom | null = firstAfter(k.Current.ParentPlaceholder.Atoms, k.Current);
        if (nextAtom != null) {
            k.Current = nextAtom;
        } else {
            let ancestorAtom = k.Current.ParentPlaceholder.ParentAtom;
            if  (ancestorAtom != null) {
                let nextPlaceholder : Placeholder | null = firstAfter(ancestorAtom.Placeholders, k.Current.ParentPlaceholder);
                if (nextPlaceholder != null) {
                    k.Current = nextPlaceholder;
                }
            }
        }
    }
}