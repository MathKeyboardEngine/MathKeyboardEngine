import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { getFirstNonEmptyOnLeftOf } from '../helpers/getFirstNonEmptyOnLeftOf';
import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { firstBeforeOrNull } from '../../../helpers/arrayhelpers/firstBeforeOrNull';
import { remove } from '../../../helpers/arrayhelpers/remove';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { last } from '../../../helpers/arrayhelpers/last';
import { PartOfNumberWithDigits } from '../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits';
import { encapsulateAllPartsOfNumberWithDigitsLeftOfIndex } from '../helpers/encapsulateAllPartsOfNumberWithDigitsLeftOfIndex';

export function deleteCurrent(k: KeyboardMemory): void {
  if (k.current instanceof Placeholder) {
    if (k.current.parentNode == null || k.current.nodes.length > 0) {
      return;
    } else {
      const nonEmptyPlaceholderOnLeft: Placeholder | null = getFirstNonEmptyOnLeftOf(k.current.parentNode.placeholders, k.current);
      if (nonEmptyPlaceholderOnLeft) {
        if (k.current.parentNode.placeholders.length == 2 && k.current === k.current.parentNode.placeholders[1] && k.current.nodes.length == 0) {
          deleteOuterBranchingNodeButNotItsContents(k, nonEmptyPlaceholderOnLeft);
        } else {
          nonEmptyPlaceholderOnLeft.nodes.pop();
          k.current = lastOrNull(nonEmptyPlaceholderOnLeft.nodes) ?? nonEmptyPlaceholderOnLeft;
        }
      } else if (k.current.parentNode.placeholders.every((ph) => ph.nodes.length == 0)) {
        const ancestorPlaceholder = k.current.parentNode.parentPlaceholder;
        const previousNode = firstBeforeOrNull(ancestorPlaceholder.nodes, k.current.parentNode);
        remove(ancestorPlaceholder.nodes, k.current.parentNode);
        k.current = previousNode ?? ancestorPlaceholder;
      } else if (k.current.parentNode.placeholders[0] === k.current && k.current.nodes.length == 0 && k.current.parentNode.placeholders.some((ph) => ph.nodes.length != 0)) {
        const previousNode = firstBeforeOrNull(k.current.parentNode!.parentPlaceholder.nodes, k.current.parentNode);
        if (previousNode != null) {
          encapsulatePreviousInto(previousNode, k.current);
          k.current = last(k.current.nodes);
        } else {
          const nonEmptySiblingPlaceholders = k.current.parentNode.placeholders.filter((p) => p.nodes.length != 0);
          if (nonEmptySiblingPlaceholders.length == 1) {
            const nodes = nonEmptySiblingPlaceholders[0].nodes;
            const ancestorPlaceholder = k.current.parentNode.parentPlaceholder;
            const indexOfParentNode = ancestorPlaceholder.nodes.indexOf(k.current.parentNode);
            for (const node of nodes) {
              node.parentPlaceholder = ancestorPlaceholder;
            }
            ancestorPlaceholder.nodes.splice(indexOfParentNode, 1, ...nodes);
            k.current = last(nodes);
          }
        }
      }
    }
  } else {
    if (k.current instanceof BranchingNode && k.current.placeholders.length == 1 && k.current.placeholders[0].nodes.length > 0) {
      deleteOuterBranchingNodeButNotItsContents(k, k.current.placeholders[0]);
    } else if (k.current instanceof BranchingNode && k.current.placeholders.some((ph) => ph.nodes.length > 0)) {
      let lastPlaceholderWithContent!: Placeholder;
      for (let i = k.current.placeholders.length - 1; i >= 0; i--) {
        const ph = k.current.placeholders[i];
        if (ph.nodes.length > 0) {
          lastPlaceholderWithContent = ph;
          break;
        }
      }
      k.current = last(lastPlaceholderWithContent.nodes);
      deleteCurrent(k);
    } else {
      const previousNode: TreeNode | null = firstBeforeOrNull(k.current.parentPlaceholder.nodes, k.current);
      remove(k.current.parentPlaceholder.nodes, k.current);
      k.current = previousNode ?? k.current.parentPlaceholder;
    }
  }
}

function encapsulatePreviousInto(previousNode: TreeNode, targetPlaceholder: Placeholder) {
  remove(targetPlaceholder.parentNode!.parentPlaceholder.nodes, previousNode);
  targetPlaceholder.nodes.push(previousNode);
  const previousNodeOldParentPlaceholder = previousNode.parentPlaceholder;
  previousNode.parentPlaceholder = targetPlaceholder;
  if (previousNode instanceof PartOfNumberWithDigits) {
    encapsulateAllPartsOfNumberWithDigitsLeftOfIndex(previousNodeOldParentPlaceholder.nodes.length - 1, previousNodeOldParentPlaceholder.nodes, targetPlaceholder);
  }
}

function deleteOuterBranchingNodeButNotItsContents(k: KeyboardMemory, nonEmptyPlaceholder: Placeholder) {
  const outerBranchingNode = nonEmptyPlaceholder.parentNode!;
  outerBranchingNode.parentPlaceholder.nodes.pop();
  for (const node of nonEmptyPlaceholder.nodes) {
    outerBranchingNode.parentPlaceholder.nodes.push(node);
    node.parentPlaceholder = outerBranchingNode.parentPlaceholder;
  }
  k.current = last(nonEmptyPlaceholder.nodes);
}
