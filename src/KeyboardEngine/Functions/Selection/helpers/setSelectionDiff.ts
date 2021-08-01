import { Placeholder } from "../../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../../KeyboardMemory";

export function setSelectionDiff(k: KeyboardMemory, diffWithCurrent: number){
    k.SelectionDiff = diffWithCurrent;
    if (diffWithCurrent == 0){
        k.InclusiveSelectionLeftBorder = null;
        k.InclusiveSelectionRightBorder = null;
        return;
    }
    
    if (k.Current instanceof Placeholder) {
        k.InclusiveSelectionLeftBorder = k.Current;
        k.InclusiveSelectionRightBorder = k.Current.Atoms[diffWithCurrent - 1];
    } else {
        let atoms = k.Current.ParentPlaceholder.Atoms;
        let indexOfCurrent = atoms.indexOf(k.Current);
        if (diffWithCurrent > 0) {
            k.InclusiveSelectionLeftBorder = atoms[indexOfCurrent + 1];
            k.InclusiveSelectionRightBorder = atoms[indexOfCurrent + diffWithCurrent];
        } else if (diffWithCurrent < 0) {
            let index = indexOfCurrent + diffWithCurrent + 1;
            if (index < 0) {
                k.InclusiveSelectionLeftBorder = k.Current.ParentPlaceholder;
            } else {
                k.InclusiveSelectionLeftBorder = atoms[index]
            }
            k.InclusiveSelectionRightBorder = k.Current;
        }
    }
}