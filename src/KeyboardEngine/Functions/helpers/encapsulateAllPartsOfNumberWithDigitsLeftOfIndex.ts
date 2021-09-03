import { remove } from '../../../helpers/arrayhelpers/remove';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { PartOfNumberWithDigits } from '../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';

export function encapsulateAllPartsOfNumberWithDigitsLeftOfIndex(exclusiveRightIndex: number, siblingNodes: TreeNode[], toPlaceholder: Placeholder): void {
  for (let i = exclusiveRightIndex - 1; i >= 0; i--) {
    const siblingNode = siblingNodes[i];
    if (siblingNode instanceof PartOfNumberWithDigits) {
      remove(siblingNodes, siblingNode);
      toPlaceholder.Nodes.unshift(siblingNode);
      siblingNode.ParentPlaceholder = toPlaceholder;
    } else {
      break;
    }
  }
}
