import { KeyboardMemory } from "../../KeyboardMemory";

export function LeaveSelectionMode(k: KeyboardMemory) : void {
    k.SelectionDiff = null;
    k.InclusiveSelectionRightBorder = null;
    k.InclusiveSelectionLeftBorder = null;
}