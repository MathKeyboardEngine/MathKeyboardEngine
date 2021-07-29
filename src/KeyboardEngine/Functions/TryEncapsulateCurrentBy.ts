import { Atom } from "../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { Placeholder } from "../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../KeyboardMemory";
import { MoveRight } from "./MoveRight";

export function TryEncapsulateCurrentBy(k: KeyboardMemory, swallowingPlaceholder: Placeholder) : boolean {
    let newAtom : WritableAtom = swallowingPlaceholder.ParentAtom as WritableAtom;
    if (k.Current instanceof Atom) {
        k.Current.ParentPlaceholder.Atoms[k.Current.ParentPlaceholder.Atoms.indexOf(k.Current)] =  newAtom;
        swallowingPlaceholder.Atoms.push(k.Current);
        k.Current.ParentPlaceholder = swallowingPlaceholder;
        MoveRight(k);
        return true;
    } else {
        return false;
    }
}