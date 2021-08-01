import { last } from "../../../helpers/arrayhelpers/last";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../MoveRight";
import { popSelection } from "./helpers/popSelection";

export function EncapsulateSelection(k: KeyboardMemory, encapsulatingPlaceholder: Placeholder) {
    let atoms = popSelection(k, {andInsert: encapsulatingPlaceholder.ParentAtom!});
    if (atoms.length == 0) {
        return
    }
    for (let atom of atoms) {
        atom.ParentPlaceholder = encapsulatingPlaceholder;
        encapsulatingPlaceholder.Atoms.push(atom);
    }
    k.Current = last(atoms);
    MoveRight(k);
}