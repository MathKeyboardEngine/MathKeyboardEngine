import { KeyboardMemory } from '../../KeyboardMemory';

export function leaveSelectionMode(k: KeyboardMemory): void {
  k.selectionDiff = null;
  k.inclusiveSelectionRightBorder = null;
  k.inclusiveSelectionLeftBorder = null;
}
