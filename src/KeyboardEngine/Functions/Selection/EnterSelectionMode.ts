import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function enterSelectionMode(k: KeyboardMemory): void {
  setSelectionDiff(k, 0);
}
