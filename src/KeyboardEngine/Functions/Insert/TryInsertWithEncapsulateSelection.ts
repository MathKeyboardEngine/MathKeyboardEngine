import { last } from "../../../helpers/arrayhelpers/last";
import { WritableAtom } from "../../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";
import { popSelection } from "../Selection/helpers/popSelection";

export function TryInsertWithEncapsulateSelection(k: KeyboardMemory, newAtom: WritableAtom) : boolean {
    let atoms = popSelection(k, {andInsert: newAtom});
    if (atoms.length == 0) {
        return false;
    } else {
        let encapsulatingPlaceholder = newAtom.Placeholders[0];
        for (let atom of atoms) {
            atom.ParentPlaceholder = encapsulatingPlaceholder;
            encapsulatingPlaceholder.Atoms.push(atom);
        }
        k.Current = last(atoms);
        MoveRight(k);
        return true;
    }
}