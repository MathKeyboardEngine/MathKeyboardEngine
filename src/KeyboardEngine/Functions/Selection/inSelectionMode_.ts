import { KeyboardMemory } from '../../KeyboardMemory';

export function inSelectionMode(k: KeyboardMemory): boolean {
  return k.selectionDiff != null;
}
