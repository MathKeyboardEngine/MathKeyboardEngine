import { Placeholder } from '../../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../../KeyboardMemory';

export function setSelectionDiff(k: KeyboardMemory, diffWithCurrent: number): void {
  k.SelectionDiff = diffWithCurrent;
  if (diffWithCurrent == 0) {
    k.InclusiveSelectionLeftBorder = null;
    k.InclusiveSelectionRightBorder = null;
  } else if (k.Current instanceof Placeholder) {
    k.InclusiveSelectionLeftBorder = k.Current;
    k.InclusiveSelectionRightBorder = k.Current.Nodes[diffWithCurrent - 1];
  } else {
    const nodes = k.Current.ParentPlaceholder.Nodes;
    const indexOfCurrent = nodes.indexOf(k.Current);
    if (diffWithCurrent > 0) {
      k.InclusiveSelectionLeftBorder = nodes[indexOfCurrent + 1];
      k.InclusiveSelectionRightBorder = nodes[indexOfCurrent + diffWithCurrent];
    } else {
      const indexOfNewInclusiveSelectionLeftBorder = indexOfCurrent + diffWithCurrent + 1;
      if (indexOfNewInclusiveSelectionLeftBorder < 0) {
        throw 'The node at index 0 of the current Placeholder is as far as you can left if Current is a TreeNode.';
      }
      k.InclusiveSelectionLeftBorder = nodes[indexOfNewInclusiveSelectionLeftBorder];
      k.InclusiveSelectionRightBorder = k.Current;
    }
  }
}
