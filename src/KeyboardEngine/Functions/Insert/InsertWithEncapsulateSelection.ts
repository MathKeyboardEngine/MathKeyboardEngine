import { last } from '../../../helpers/arrayhelpers/last';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { MoveRight } from '../Navigation/MoveRight';
import { popSelection } from '../Selection/helpers/popSelection';
import { encapsulate } from '../helpers/encapsulate';
import { Insert } from './Insert';

export function InsertWithEncapsulateSelection(k: KeyboardMemory, newNode: BranchingNode): void {
  const selection = popSelection(k);
  Insert(k, newNode);
  if (selection.length > 0) {
    const encapsulatingPlaceholder = newNode.Placeholders[0];
    encapsulate(selection, encapsulatingPlaceholder);
    k.Current = last(selection);
    MoveRight(k);
  }
}
