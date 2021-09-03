import { KeyboardMemory } from '../../KeyboardMemory';
import { popSelection } from '../Selection/helpers/popSelection';

export function DeleteSelection(k: KeyboardMemory): void {
  popSelection(k);
}
