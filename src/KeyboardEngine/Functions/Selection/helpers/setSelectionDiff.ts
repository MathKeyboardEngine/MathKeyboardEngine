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
        k.InclusiveSelectionRightBorder = k.Current.Nodes[diffWithCurrent - 1];
    } else {
        let nodes = k.Current.ParentPlaceholder.Nodes;
        let indexOfCurrent = nodes.indexOf(k.Current);
        if (diffWithCurrent > 0) {
            k.InclusiveSelectionLeftBorder = nodes[indexOfCurrent + 1];
            k.InclusiveSelectionRightBorder = nodes[indexOfCurrent + diffWithCurrent];
        } else if (diffWithCurrent < 0) {
            let index = indexOfCurrent + diffWithCurrent + 1;
            if (index < 0) {
                k.InclusiveSelectionLeftBorder = k.Current.ParentPlaceholder;
            } else {
                k.InclusiveSelectionLeftBorder = nodes[index]
            }
            k.InclusiveSelectionRightBorder = k.Current;
        }
    }
}