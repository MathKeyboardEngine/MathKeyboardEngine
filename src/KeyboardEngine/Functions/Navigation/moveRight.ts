import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { firstAfterOrNull } from '../../../helpers/arrayhelpers/firstAfterOrNull';

export function moveRight(k: KeyboardMemory): void {
  if (k.current instanceof Placeholder) {
    if (k.current.nodes.length > 0) {
      const nextNode = k.current.nodes[0];
      k.current = nextNode instanceof BranchingNode ? nextNode.placeholders[0] : nextNode;
    } else if (k.current.parentNode == null) {
      return;
    } else {
      k.current = firstAfterOrNull(k.current.parentNode.placeholders, k.current) ?? k.current.parentNode;
    }
  } else {
    const nextNode: TreeNode | null = firstAfterOrNull(k.current.parentPlaceholder.nodes, k.current);
    if (nextNode != null) {
      k.current = nextNode instanceof BranchingNode ? nextNode.placeholders[0] : nextNode;
    } else {
      const ancestorNode = k.current.parentPlaceholder.parentNode;
      if (ancestorNode != null) {
        const nextPlaceholder: Placeholder | null = firstAfterOrNull(ancestorNode.placeholders, k.current.parentPlaceholder);
        k.current = nextPlaceholder ?? ancestorNode;
      }
    }
  }
}
