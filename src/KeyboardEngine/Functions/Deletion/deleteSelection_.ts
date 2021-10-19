import { KeyboardMemory } from '../../KeyboardMemory';
import { popSelection } from '../Selection/helpers/popSelection';

export function deleteSelection(k: KeyboardMemory): void {
  popSelection(k);
}
