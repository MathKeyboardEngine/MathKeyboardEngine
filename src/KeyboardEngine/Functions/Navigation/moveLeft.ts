import { firstBeforeOrNull } from '../../../helpers/arrayhelpers/firstBeforeOrNull';
import { last } from '../../../helpers/arrayhelpers/last';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';

export function moveLeft(k: KeyboardMemory): void {
  if (k.current instanceof Placeholder) {
    if (k.current.parentNode == null) {
      return;
    }

    const previousPlaceholder: Placeholder | null = firstBeforeOrNull(k.current.parentNode.placeholders, k.current);
    if (previousPlaceholder !== null) {
      k.current = lastOrNull(previousPlaceholder.nodes) ?? previousPlaceholder;
    } else {
      const ancestorPlaceholder = k.current.parentNode.parentPlaceholder;
      const nodePreviousToParentOfCurrent: TreeNode | null = firstBeforeOrNull(ancestorPlaceholder.nodes, k.current.parentNode);
      k.current = nodePreviousToParentOfCurrent ?? ancestorPlaceholder;
    }
  } else {
    if (k.current instanceof BranchingNode) {
      const placeholder = last(k.current.placeholders);
      k.current = last(placeholder.nodes) ?? placeholder;
    } else {
      k.current = firstBeforeOrNull(k.current.parentPlaceholder.nodes, k.current) ?? k.current.parentPlaceholder;
    }
  }
}
