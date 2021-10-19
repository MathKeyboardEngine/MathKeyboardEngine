import { firstAfterOrNull } from '../../../helpers/arrayhelpers/firstAfterOrNull';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { PartOfNumberWithDigits } from '../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits';
import { RoundBracketsNode } from '../../../SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { moveRight } from '../Navigation/MoveRight';
import { encapsulate } from '../helpers/encapsulate';
import { insert } from './Insert';
import { encapsulateAllPartsOfNumberWithDigitsLeftOfIndex } from '../helpers/encapsulateAllPartsOfNumberWithDigitsLeftOfIndex';

export function insertWithEncapsulateCurrent(k: KeyboardMemory, newNode: BranchingNode, config?: { deleteOuterRoundBracketsIfAny?: boolean }): void {
  const encapsulatingPlaceholder = newNode.placeholders[0];
  if (k.current instanceof TreeNode) {
    const siblingNodes = k.current.parentPlaceholder.nodes;
    const currentIndex = siblingNodes.indexOf(k.current);
    siblingNodes[currentIndex] = newNode;
    newNode.parentPlaceholder = k.current.parentPlaceholder;
    if (k.current instanceof RoundBracketsNode && config?.deleteOuterRoundBracketsIfAny) {
      encapsulate(k.current.placeholders[0].nodes, encapsulatingPlaceholder);
      k.current = firstAfterOrNull(newNode.placeholders, encapsulatingPlaceholder) ?? newNode;
    } else if (k.current instanceof PartOfNumberWithDigits) {
      encapsulatingPlaceholder.nodes.push(k.current);
      k.current.parentPlaceholder = encapsulatingPlaceholder;
      encapsulateAllPartsOfNumberWithDigitsLeftOfIndex(currentIndex, siblingNodes, encapsulatingPlaceholder);
      moveRight(k);
    } else {
      encapsulatingPlaceholder.nodes.push(k.current);
      k.current.parentPlaceholder = encapsulatingPlaceholder;
      moveRight(k);
    }
  } else {
    insert(k, newNode);
  }
}
