import { Atom } from "../../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../KeyboardMemory";
import { MoveRight } from "./MoveRight";

export function Insert(k: KeyboardMemory, newAtom: Atom) {
    if (k.Current instanceof Placeholder) {
        k.Current.Atoms.unshift(newAtom);
        newAtom.ParentPlaceholder = k.Current;
    } else {
        let parent : Placeholder = k.Current.ParentPlaceholder;
        let indexOfCurrent = parent.Atoms.indexOf(k.Current);
        parent.Atoms.splice(indexOfCurrent + 1, 0, newAtom);
        newAtom.ParentPlaceholder = parent;
    }
    MoveRight(k);
}
    