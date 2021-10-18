import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';

export function encapsulate(nodes: TreeNode[], encapsulatingPlaceholder: Placeholder): void {
  for (const node of nodes) {
    node.parentPlaceholder = encapsulatingPlaceholder;
    encapsulatingPlaceholder.nodes.push(node);
  }
}
