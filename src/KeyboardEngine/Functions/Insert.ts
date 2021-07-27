import { Atom } from "../../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../../SyntaxTreeComponents/Placeholders/Placeholder";
import { KeyboardMemory } from "../KeyboardMemory";
import { MoveRight } from "./MoveRight";

export interface IEncapsulateCurrentAtomOnInsert {
    // k.Current.ParentPlaceholder = newValue;
    EncapsulateOnInsert(
    currentAtom: Atom) :void;
}

function handlesEncapsulation(atom : Atom | IEncapsulateCurrentAtomOnInsert) : atom is IEncapsulateCurrentAtomOnInsert {
    return (atom as IEncapsulateCurrentAtomOnInsert).EncapsulateOnInsert != undefined;
}
    

export function Insert(k: KeyboardMemory, newAtom: Atom) {
    if (k.Current instanceof Placeholder) {
        k.Current.Atoms.unshift(newAtom);
        newAtom.ParentPlaceholder = k.Current;
    } else {
        if (handlesEncapsulation(newAtom)) {
            k.Current.ParentPlaceholder.Atoms[k.Current.ParentPlaceholder.Atoms.indexOf(k.Current)]=  newAtom;
            newAtom.EncapsulateOnInsert(k.Current);
            newAtom.ParentPlaceholder = k.Current.ParentPlaceholder;
        } else {
            let parent : Placeholder = k.Current.ParentPlaceholder;
            let indexOfCurrent = parent.Atoms.indexOf(k.Current);
            parent.Atoms.splice(indexOfCurrent + 1, 0, newAtom);
            newAtom.ParentPlaceholder = parent;
        }
    }
    MoveRight(k);
}
    