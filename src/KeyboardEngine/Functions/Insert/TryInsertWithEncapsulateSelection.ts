import { last } from "../../../helpers/arrayhelpers/last";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";
import { popSelection } from "../Selection/helpers/popSelection";

export function TryInsertWithEncapsulateSelection(k: KeyboardMemory, encapsulatingPlaceholder: Placeholder) : boolean {
    let atoms = popSelection(k, {andInsert: encapsulatingPlaceholder.ParentAtom!});
    if (atoms.length == 0) {
        return false;
    } else {
        for (let atom of atoms) {
            atom.ParentPlaceholder = encapsulatingPlaceholder;
            encapsulatingPlaceholder.Atoms.push(atom);
        }
        k.Current = last(atoms);
        MoveRight(k);
        return true;
    }
}