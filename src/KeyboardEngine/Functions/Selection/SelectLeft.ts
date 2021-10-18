import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function SelectLeft(k: KeyboardMemory): void {
  const oldDiffWithCurrent = k.SelectionDiff ?? 0;
  if ((k.Current instanceof TreeNode && k.Current.ParentPlaceholder.Nodes.indexOf(k.Current) + oldDiffWithCurrent >= 0) || (k.Current instanceof Placeholder && oldDiffWithCurrent > 0)) {
    setSelectionDiff(k, oldDiffWithCurrent - 1);
  } else if (
    k.InclusiveSelectionLeftBorder instanceof TreeNode &&
    k.InclusiveSelectionLeftBorder.ParentPlaceholder.Nodes.indexOf(k.InclusiveSelectionLeftBorder) == 0 &&
    k.InclusiveSelectionLeftBorder.ParentPlaceholder.ParentNode != null
  ) {
    k.Current = k.InclusiveSelectionLeftBorder.ParentPlaceholder.ParentNode;
    setSelectionDiff(k, -1);
  }
}
