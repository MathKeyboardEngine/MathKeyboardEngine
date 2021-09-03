import { firstAfter } from '../../../helpers/arrayhelpers/firstAfter';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { PartOfNumberWithDigits } from '../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits';
import { RoundBracketsNode } from '../../../SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';
import { KeyboardMemory } from '../../KeyboardMemory';
import { MoveRight } from '../Navigation/MoveRight';
import { encapsulate } from '../helpers/encapsulate';
import { Insert } from './Insert';
import { encapsulateAllPartsOfNumberWithDigitsLeftOfIndex } from '../helpers/encapsulateAllPartsOfNumberWithDigitsLeftOfIndex';

export function InsertWithEncapsulateCurrent(k: KeyboardMemory, newNode: BranchingNode, config?: { deleteOuterRoundBracketsIfAny?: boolean }): void {
  const encapsulatingPlaceholder = newNode.Placeholders[0];
  if (k.Current instanceof TreeNode) {
    const siblingNodes = k.Current.ParentPlaceholder.Nodes;
    const currentIndex = siblingNodes.indexOf(k.Current);
    siblingNodes[currentIndex] = newNode;
    newNode.ParentPlaceholder = k.Current.ParentPlaceholder;
    if (k.Current instanceof RoundBracketsNode && config?.deleteOuterRoundBracketsIfAny) {
      encapsulate(k.Current.Placeholders[0].Nodes, encapsulatingPlaceholder);
      k.Current = firstAfter(newNode.Placeholders, encapsulatingPlaceholder) ?? newNode;
    } else if (k.Current instanceof PartOfNumberWithDigits) {
      encapsulatingPlaceholder.Nodes.push(k.Current);
      k.Current.ParentPlaceholder = encapsulatingPlaceholder;
      encapsulateAllPartsOfNumberWithDigitsLeftOfIndex(currentIndex, siblingNodes, encapsulatingPlaceholder);
      MoveRight(k);
    } else {
      encapsulatingPlaceholder.Nodes.push(k.Current);
      k.Current.ParentPlaceholder = encapsulatingPlaceholder;
      MoveRight(k);
    }
  } else {
    Insert(k, newNode);
  }
}
