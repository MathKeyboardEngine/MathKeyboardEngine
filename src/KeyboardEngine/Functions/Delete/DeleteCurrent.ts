import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { getFirstNonEmptyOnLeftOf } from '../helpers/getFirstNonEmptyOnLeftOf';
import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { firstBefore } from '../../../helpers/arrayhelpers/firstBefore';
import { remove } from '../../../helpers/arrayhelpers/remove';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { last } from '../../../helpers/arrayhelpers/last';
import { PartOfNumberWithDigits } from '../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits';
import { encapsulateAllPartsOfNumberWithDigitsLeftOfIndex } from '../helpers/encapsulateAllPartsOfNumberWithDigitsLeftOfIndex';

export function DeleteCurrent(k: KeyboardMemory): void {
  if (k.Current instanceof Placeholder) {
    if (k.Current.ParentNode == null || k.Current.Nodes.length > 0) {
      return;
    } else {
      const nonEmptyPlaceholderOnLeft: Placeholder | null = getFirstNonEmptyOnLeftOf(k.Current.ParentNode.Placeholders, k.Current);
      if (nonEmptyPlaceholderOnLeft) {
        if (k.Current.ParentNode.Placeholders.length == 2 && k.Current === k.Current.ParentNode.Placeholders[1] && k.Current.Nodes.length == 0) {
          k.Current.ParentNode.ParentPlaceholder.Nodes.pop();
          for (const node of nonEmptyPlaceholderOnLeft.Nodes) {
            k.Current.ParentNode.ParentPlaceholder.Nodes.push(node);
            node.ParentPlaceholder = k.Current.ParentNode.ParentPlaceholder;
          }
          k.Current = last(nonEmptyPlaceholderOnLeft.Nodes);
        } else {
          nonEmptyPlaceholderOnLeft.Nodes.pop();
          k.Current = lastOrNull(nonEmptyPlaceholderOnLeft.Nodes) ?? nonEmptyPlaceholderOnLeft;
        }
      } else if (k.Current.ParentNode.Placeholders.every((ph) => ph.Nodes.length == 0)) {
        const ancestorPlaceholder = k.Current.ParentNode.ParentPlaceholder;
        const previousNode = firstBefore(ancestorPlaceholder.Nodes, k.Current.ParentNode);
        remove(ancestorPlaceholder.Nodes, k.Current.ParentNode);
        k.Current = previousNode ?? ancestorPlaceholder;
      } else if (k.Current.ParentNode.Placeholders[0] === k.Current && k.Current.Nodes.length == 0 && k.Current.ParentNode.Placeholders.some((ph) => ph.Nodes.length != 0)) {
        const previousNode = firstBefore(k.Current.ParentNode!.ParentPlaceholder.Nodes, k.Current.ParentNode);
        if (previousNode != null) {
          encapsulatePreviousInto(previousNode, k.Current);
          k.Current = last(k.Current.Nodes);
        } else {
          const nonEmptySiblingPlaceholders = k.Current.ParentNode.Placeholders.filter((p) => p.Nodes.length != 0);
          if (nonEmptySiblingPlaceholders.length == 1) {
            const nodes = nonEmptySiblingPlaceholders[0].Nodes;
            const ancestorPlaceholder = k.Current.ParentNode.ParentPlaceholder;
            const indexOfParentNode = ancestorPlaceholder.Nodes.indexOf(k.Current.ParentNode);
            for (const node of nodes) {
              node.ParentPlaceholder = ancestorPlaceholder;
            }
            ancestorPlaceholder.Nodes.splice(indexOfParentNode, 1, ...nodes);
            k.Current = last(nodes);
          }
        }
      }
    }
  } else {
    if (k.Current instanceof BranchingNode && k.Current.Placeholders.some((ph) => ph.Nodes.length > 0)) {
      let lastPlaceholderWithContent!: Placeholder;
      for (let i = k.Current.Placeholders.length - 1; i >= 0; i--) {
        const ph = k.Current.Placeholders[i];
        if (ph.Nodes.length > 0) {
          lastPlaceholderWithContent = ph;
          break;
        }
      }
      lastPlaceholderWithContent.Nodes.pop();
      k.Current = lastPlaceholderWithContent.Nodes.length == 0 ? lastPlaceholderWithContent : last(lastPlaceholderWithContent.Nodes);
    } else {
      const previousNode: TreeNode | null = firstBefore(k.Current.ParentPlaceholder.Nodes, k.Current);
      remove(k.Current.ParentPlaceholder.Nodes, k.Current);
      k.Current = previousNode ?? k.Current.ParentPlaceholder;
    }
  }
}

function encapsulatePreviousInto(previousNode: TreeNode, targetPlaceholder: Placeholder) {
  remove(targetPlaceholder.ParentNode!.ParentPlaceholder.Nodes, previousNode);
  targetPlaceholder.Nodes.push(previousNode);
  previousNode.ParentPlaceholder = targetPlaceholder;
  if (previousNode instanceof PartOfNumberWithDigits) {
    encapsulateAllPartsOfNumberWithDigitsLeftOfIndex(previousNode.ParentPlaceholder.Nodes.length, previousNode.ParentPlaceholder.Nodes, targetPlaceholder);
  }
}
