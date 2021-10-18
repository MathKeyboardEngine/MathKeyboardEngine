import { firstBeforeOrNull } from '../../../helpers/arrayhelpers/firstBeforeOrNull';
import { last } from '../../../helpers/arrayhelpers/last';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function SelectRight(k: KeyboardMemory): void {
  const oldDiffWithCurrent = k.SelectionDiff ?? 0;
  if (
    (k.Current instanceof Placeholder && oldDiffWithCurrent < k.Current.Nodes.length) ||
    (k.Current instanceof TreeNode && k.Current.ParentPlaceholder.Nodes.indexOf(k.Current) + oldDiffWithCurrent < k.Current.ParentPlaceholder.Nodes.length - 1)
  ) {
    setSelectionDiff(k, oldDiffWithCurrent + 1);
  } else if (
    k.InclusiveSelectionRightBorder instanceof TreeNode &&
    last(k.InclusiveSelectionRightBorder.ParentPlaceholder.Nodes) == k.InclusiveSelectionRightBorder &&
    k.InclusiveSelectionRightBorder.ParentPlaceholder.ParentNode != null
  ) {
    const ancestorNode = k.InclusiveSelectionRightBorder.ParentPlaceholder.ParentNode;
    k.Current = firstBeforeOrNull(ancestorNode.ParentPlaceholder.Nodes, ancestorNode) ?? ancestorNode.ParentPlaceholder;
    setSelectionDiff(k, 1);
  }
}
