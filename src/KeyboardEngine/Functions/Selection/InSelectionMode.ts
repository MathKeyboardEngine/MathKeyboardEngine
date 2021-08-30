import { KeyboardMemory } from "../../KeyboardMemory";

export function InSelectionMode(k: KeyboardMemory): boolean {
  return k.SelectionDiff != null;
}
