import { Placeholder } from '../../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../../KeyboardMemory';

export function setSelectionDiff(k: KeyboardMemory, diffWithCurrent: number): void {
  k.selectionDiff = diffWithCurrent;
  if (diffWithCurrent == 0) {
    k.inclusiveSelectionLeftBorder = null;
    k.inclusiveSelectionRightBorder = null;
  } else if (k.current instanceof Placeholder) {
    k.inclusiveSelectionLeftBorder = k.current;
    k.inclusiveSelectionRightBorder = k.current.nodes[diffWithCurrent - 1];
  } else {
    const nodes = k.current.parentPlaceholder.nodes;
    const indexOfCurrent = nodes.indexOf(k.current);
    if (diffWithCurrent > 0) {
      k.inclusiveSelectionLeftBorder = nodes[indexOfCurrent + 1];
      k.inclusiveSelectionRightBorder = nodes[indexOfCurrent + diffWithCurrent];
    } else {
      const indexOfNewInclusiveSelectionLeftBorder = indexOfCurrent + diffWithCurrent + 1;
      if (indexOfNewInclusiveSelectionLeftBorder < 0) {
        throw 'The node at index 0 of the current Placeholder is as far as you can left if Current is a TreeNode.';
      }
      k.inclusiveSelectionLeftBorder = nodes[indexOfNewInclusiveSelectionLeftBorder];
      k.inclusiveSelectionRightBorder = k.current;
    }
  }
}
