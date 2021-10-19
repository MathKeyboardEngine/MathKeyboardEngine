import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { popSelection } from '../Selection/helpers/popSelection';
import { encapsulate } from '../helpers/encapsulate';
import { insertWithEncapsulateCurrent } from './insertWithEncapsulateCurrent';

export function insertWithEncapsulateSelectionAndPrevious(keyboardMemory: KeyboardMemory, newNode: BranchingNode): void {
  if (newNode.placeholders.length < 2) {
    throw 'Expected 2 placeholders.';
  }
  const selection = popSelection(keyboardMemory);
  const secondPlaceholder = newNode.placeholders[1];
  encapsulate(selection, secondPlaceholder);
  insertWithEncapsulateCurrent(keyboardMemory, newNode);
  keyboardMemory.current = lastOrNull(selection) ?? secondPlaceholder;
}
