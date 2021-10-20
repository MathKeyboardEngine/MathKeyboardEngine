import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { popSelection } from '../Selection/helpers/popSelection';
import { encapsulate } from '../helpers/encapsulate';
import { insertWithEncapsulateCurrent } from './insertWithEncapsulateCurrent';

export function insertWithEncapsulateSelectionAndPrevious(k: KeyboardMemory, newNode: BranchingNode): void {
  if (newNode.placeholders.length < 2) {
    throw 'Expected 2 placeholders.';
  }
  const selection = popSelection(k);
  const secondPlaceholder = newNode.placeholders[1];
  encapsulate(selection, secondPlaceholder);
  insertWithEncapsulateCurrent(k, newNode);
  k.current = lastOrNull(selection) ?? secondPlaceholder;
}
