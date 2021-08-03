import { remove } from "../../../helpers/arrayhelpers/remove";
import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { PartOfNumberWithDigits } from "../../../SyntaxTreeComponents/Atoms/ReadonlyAtoms/Base/PartOfNumberWithDigits";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function TryInsertWithEncapsulateCurrent(k: KeyboardMemory, encapsulatingPlaceholder: Placeholder) : boolean {
    let newAtom : WritableAtom = encapsulatingPlaceholder.ParentAtom as WritableAtom;
    if (k.Current instanceof Atom) {
        let siblingAtoms = k.Current.ParentPlaceholder.Atoms;
        let currentIndex = siblingAtoms.indexOf(k.Current);
        siblingAtoms[currentIndex] =  newAtom;
        encapsulatingPlaceholder.Atoms.push(k.Current);
        k.Current.ParentPlaceholder = encapsulatingPlaceholder;
        if (k.Current instanceof PartOfNumberWithDigits) {
            EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(currentIndex, siblingAtoms, encapsulatingPlaceholder);
        }
        MoveRight(k);
        return true;
    } else {
        return false;
    }
}

export function EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(exclusiveRightIndex : number, siblingAtoms : Atom[], toPlaceholder : Placeholder) {
    for (let i = exclusiveRightIndex - 1; i >=0; i--) {
        let siblingAtom = siblingAtoms[i];
        if (siblingAtom instanceof PartOfNumberWithDigits) {
            remove(siblingAtoms, siblingAtom);
            toPlaceholder.Atoms.unshift(siblingAtom);
            siblingAtom.ParentPlaceholder = toPlaceholder;
        } else{
            break;
        }
    }
}