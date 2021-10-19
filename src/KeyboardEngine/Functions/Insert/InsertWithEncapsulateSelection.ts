import { last } from '../../../helpers/arrayhelpers/last';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { moveRight } from '../Navigation/MoveRight';
import { popSelection } from '../Selection/helpers/popSelection';
import { encapsulate } from '../helpers/encapsulate';
import { insert } from './Insert';

export function insertWithEncapsulateSelection(k: KeyboardMemory, newNode: BranchingNode): void {
  const selection = popSelection(k);
  insert(k, newNode);
  if (selection.length > 0) {
    const encapsulatingPlaceholder = newNode.placeholders[0];
    encapsulate(selection, encapsulatingPlaceholder);
    k.current = last(selection);
    moveRight(k);
  }
}
