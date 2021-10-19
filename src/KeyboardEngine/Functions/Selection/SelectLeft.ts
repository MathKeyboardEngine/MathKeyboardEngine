import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function selectLeft(k: KeyboardMemory): void {
  const oldDiffWithCurrent = k.selectionDiff ?? 0;
  if ((k.current instanceof TreeNode && k.current.parentPlaceholder.nodes.indexOf(k.current) + oldDiffWithCurrent >= 0) || (k.current instanceof Placeholder && oldDiffWithCurrent > 0)) {
    setSelectionDiff(k, oldDiffWithCurrent - 1);
  } else if (
    k.inclusiveSelectionLeftBorder instanceof TreeNode &&
    k.inclusiveSelectionLeftBorder.parentPlaceholder.nodes.indexOf(k.inclusiveSelectionLeftBorder) == 0 &&
    k.inclusiveSelectionLeftBorder.parentPlaceholder.parentNode != null
  ) {
    k.current = k.inclusiveSelectionLeftBorder.parentPlaceholder.parentNode;
    setSelectionDiff(k, -1);
  }
}
