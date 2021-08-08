import { firstBefore } from "../../../helpers/arrayhelpers/firstBefore";
import { remove } from "../../../helpers/arrayhelpers/remove";
import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { AbstractRoundBracketLeftAtom, AbstractRoundBracketRightAtom, AbstractBracketLeftAtom, AbstractBracketRightAtom } from "../../../SyntaxTreeComponents/Atoms/ReadonlyAtoms/Base/BracketAtoms";
import { AbstractPartOfNumberWithDigits } from "../../../SyntaxTreeComponents/Atoms/ReadonlyAtoms/Base/PartOfNumberWithDigits";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function TryInsertWithEncapsulateCurrent(k: KeyboardMemory, encapsulatingPlaceholder: Placeholder, config?: {deleteOuterRoundBracketsIfAny? : boolean}) : boolean {
    let newAtom : WritableAtom = encapsulatingPlaceholder.ParentAtom as WritableAtom;
    if (k.Current instanceof Atom) {
        let siblingAtoms = k.Current.ParentPlaceholder.Atoms;
        let currentIndex = siblingAtoms.indexOf(k.Current);
        siblingAtoms[currentIndex] =  newAtom;
        newAtom.ParentPlaceholder = k.Current.ParentPlaceholder;
        encapsulatingPlaceholder.Atoms.push(k.Current);
        k.Current.ParentPlaceholder = encapsulatingPlaceholder;
        if (k.Current instanceof AbstractPartOfNumberWithDigits) {
            EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(currentIndex, siblingAtoms, encapsulatingPlaceholder);
        } else if (k.Current instanceof AbstractBracketRightAtom){
            EncapsulateAllUntilInclusive_RoundBracketLeftAtom_LeftOfIndex(currentIndex, siblingAtoms, encapsulatingPlaceholder);
            if (config != null && config.deleteOuterRoundBracketsIfAny) {
                if (encapsulatingPlaceholder.Atoms[0] instanceof AbstractRoundBracketLeftAtom && k.Current instanceof AbstractRoundBracketRightAtom){
                    encapsulatingPlaceholder.Atoms.shift();
                    let previousAtom = firstBefore(encapsulatingPlaceholder.Atoms, k.Current);
                    if (previousAtom != null){
                        remove(encapsulatingPlaceholder.Atoms, k.Current);
                        k.Current = previousAtom;
                    }
                }
            }
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
        if (siblingAtom instanceof AbstractPartOfNumberWithDigits) {
            remove(siblingAtoms, siblingAtom);
            toPlaceholder.Atoms.unshift(siblingAtom);
            siblingAtom.ParentPlaceholder = toPlaceholder;
        } else {
            break;
        }
    }
}

function EncapsulateAllUntilInclusive_RoundBracketLeftAtom_LeftOfIndex(exclusiveRightIndex : number, siblingAtoms : Atom[], toPlaceholder : Placeholder) {
    let nested = 0;
    for (let i = exclusiveRightIndex - 1; i >=0; i--) {
        let siblingAtom = siblingAtoms[i];
        remove(siblingAtoms, siblingAtom);
        toPlaceholder.Atoms.unshift(siblingAtom);
        siblingAtom.ParentPlaceholder = toPlaceholder;
        if (siblingAtom instanceof AbstractBracketLeftAtom) {
            if (nested == 0){
                break;
            } else{
                nested--;
            }
        } else if (siblingAtom instanceof AbstractBracketRightAtom){
            nested++;
        }
    }
}