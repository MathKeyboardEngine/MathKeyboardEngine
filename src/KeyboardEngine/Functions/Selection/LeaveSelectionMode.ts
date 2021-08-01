import { KeyboardMemory } from "../../KeyboardMemory";

export function LeaveSelectionMode(k: KeyboardMemory) {
    k.SelectionDiff = null;
    k.InclusiveSelectionRightBorder = null;
    k.InclusiveSelectionLeftBorder = null;
}