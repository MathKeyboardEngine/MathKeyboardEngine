import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { KeyboardMemory } from "../../KeyboardMemory";
import { setSelectionDiff } from "./helpers/setSelectionDiff";

export function SelectLeft(k : KeyboardMemory) {
    let diff = k.SelectionDiff ?? 0;
    if (k.Current instanceof Atom) {
        let atoms = k.Current.ParentPlaceholder.Atoms;
        let indexOfCurrent = atoms.indexOf(k.Current);
        if (indexOfCurrent + diff >= 0) {
            setSelectionDiff(k, diff - 1);
        }
    }
}
  