import { firstBeforeOrNull } from '../../../helpers/arrayhelpers/firstBeforeOrNull';
import { last } from '../../../helpers/arrayhelpers/last';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function SelectRight(k: KeyboardMemory): void {
  const oldDiffWithCurrent = k.selectionDiff ?? 0;
  if (
    (k.current instanceof Placeholder && oldDiffWithCurrent < k.current.nodes.length) ||
    (k.current instanceof TreeNode && k.current.parentPlaceholder.nodes.indexOf(k.current) + oldDiffWithCurrent < k.current.parentPlaceholder.nodes.length - 1)
  ) {
    setSelectionDiff(k, oldDiffWithCurrent + 1);
  } else if (
    k.inclusiveSelectionRightBorder instanceof TreeNode &&
    last(k.inclusiveSelectionRightBorder.parentPlaceholder.nodes) == k.inclusiveSelectionRightBorder &&
    k.inclusiveSelectionRightBorder.parentPlaceholder.parentNode != null
  ) {
    const ancestorNode = k.inclusiveSelectionRightBorder.parentPlaceholder.parentNode;
    k.current = firstBeforeOrNull(ancestorNode.parentPlaceholder.nodes, ancestorNode) ?? ancestorNode.parentPlaceholder;
    setSelectionDiff(k, 1);
  }
}
