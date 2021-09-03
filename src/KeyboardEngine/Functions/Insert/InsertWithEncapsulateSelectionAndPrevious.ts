import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { popSelection } from '../Selection/helpers/popSelection';
import { encapsulate } from '../helpers/encapsulate';
import { InsertWithEncapsulateCurrent } from './InsertWithEncapsulateCurrent';

export function InsertWithEncapsulateSelectionAndPrevious(keyboardMemory: KeyboardMemory, newNode: BranchingNode): void {
  if (newNode.Placeholders.length < 2) {
    throw 'Expected 2 placeholders.';
  }
  const selection = popSelection(keyboardMemory);
  const secondPlaceholder = newNode.Placeholders[1];
  encapsulate(selection, secondPlaceholder);
  InsertWithEncapsulateCurrent(keyboardMemory, newNode);
  keyboardMemory.Current = lastOrNull(selection) ?? secondPlaceholder;
}
