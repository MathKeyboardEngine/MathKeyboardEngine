import { KeyboardMemory } from '../../KeyboardMemory';

export function LeaveSelectionMode(k: KeyboardMemory): void {
  k.selectionDiff = null;
  k.inclusiveSelectionRightBorder = null;
  k.inclusiveSelectionLeftBorder = null;
}
