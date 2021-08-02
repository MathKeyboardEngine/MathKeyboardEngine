import { remove } from "../../../helpers/arrayhelpers/remove";
import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function TryEncapsulateCurrentBy(k: KeyboardMemory, encapsulatingPlaceholder: Placeholder) : boolean {
    let newAtom : WritableAtom = encapsulatingPlaceholder.ParentAtom as WritableAtom;
    if (k.Current instanceof Atom) {
        let siblingAtoms = k.Current.ParentPlaceholder.Atoms;
        let currentIndex = siblingAtoms.indexOf(k.Current);
        siblingAtoms[currentIndex] =  newAtom;
        encapsulatingPlaceholder.Atoms.push(k.Current);
        k.Current.ParentPlaceholder = encapsulatingPlaceholder;
        if (isEncapsulationPart(k.Current)) {
            let encapsulationWhole = k.Current.EncapsulationWhole;
            for (let i = currentIndex - 1; i >=0; i--) {
                let siblingAtom = siblingAtoms[i];
                if (isEncapsulationPart(siblingAtom) && siblingAtom.EncapsulationWhole === encapsulationWhole){
                    remove(siblingAtoms, siblingAtom);
                    encapsulatingPlaceholder.Atoms.unshift(siblingAtom);
                    siblingAtom.ParentPlaceholder = encapsulatingPlaceholder;
                } else{
                    break;
                }
            }
        }
        MoveRight(k);
        return true;
    } else {
        return false;
    }
}

export interface IEncapsulationPart {
    EncapsulationWhole : string;
}
function isEncapsulationPart(it: any) : it is IEncapsulationPart {
    return it.EncapsulationWhole != undefined;
}