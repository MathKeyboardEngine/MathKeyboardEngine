import { firstAfter } from "../../../helpers/arrayhelpers/firstAfter";
import { lastOrNull } from "../../../helpers/arrayhelpers/lastOrNull";
import { remove } from "../../../helpers/arrayhelpers/remove";
import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { AbstractPartOfNumberWithDigits } from "../../../SyntaxTreeComponents/Atoms/ReadonlyAtoms/Base/PartOfNumberWithDigits";
import { RoundBracketsAtom } from "../../../SyntaxTreeComponents/Atoms/WritableAtoms/RoundBracketsAtom";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function TryInsertWithEncapsulateCurrent(k: KeyboardMemory, newAtom: WritableAtom, config?: {deleteOuterRoundBracketsIfAny? : boolean}) : boolean {
    let encapsulatingPlaceholder = newAtom.Placeholders[0];
    if (k.Current instanceof Atom) {
        let siblingAtoms = k.Current.ParentPlaceholder.Atoms;
        let currentIndex = siblingAtoms.indexOf(k.Current);
        siblingAtoms[currentIndex] = newAtom;
        newAtom.ParentPlaceholder = k.Current.ParentPlaceholder;
        if (k.Current instanceof RoundBracketsAtom && config?.deleteOuterRoundBracketsIfAny) {
            let betweenBracketsPlaceholder = k.Current.Content;
            for (let atom of betweenBracketsPlaceholder.Atoms) {
                atom.ParentPlaceholder = encapsulatingPlaceholder;
                encapsulatingPlaceholder.Atoms.push(atom);
                k.Current = firstAfter(newAtom.Placeholders, encapsulatingPlaceholder) ?? newAtom;
            }
        } else if (k.Current instanceof AbstractPartOfNumberWithDigits) {
            encapsulatingPlaceholder.Atoms.push(k.Current);
            k.Current.ParentPlaceholder = encapsulatingPlaceholder;
            EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(currentIndex, siblingAtoms, encapsulatingPlaceholder);
            MoveRight(k);
        } else {
            encapsulatingPlaceholder.Atoms.push(k.Current);
            k.Current.ParentPlaceholder = encapsulatingPlaceholder;
            MoveRight(k);
        }
        return true;
    } else {
        return false;
    }
}

export function EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(exclusiveRightIndex : number, siblingAtoms : Atom[], toPlaceholder : Placeholder) {
    for (let i = exclusiveRightIndex - 1; i >=0; i--) {
        let siblingAtom = siblingAtoms[i];
        if (siblingAtom instanceof AbstractPartOfNumberWithDigits) {
            remove(siblingAtoms, siblingAtom);
            toPlaceholder.Atoms.unshift(siblingAtom);
            siblingAtom.ParentPlaceholder = toPlaceholder;
        } else {
            break;
        }
    }
}