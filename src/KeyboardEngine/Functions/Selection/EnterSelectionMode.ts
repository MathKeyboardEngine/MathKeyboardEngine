import { KeyboardMemory } from "../../KeyboardMemory";
import { setSelectionDiff } from "./helpers/setSelectionDiff";

export function EnterSelectionMode(k: KeyboardMemory) : void {
    setSelectionDiff(k, 0);
}