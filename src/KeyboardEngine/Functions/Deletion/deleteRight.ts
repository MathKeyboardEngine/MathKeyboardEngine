import { firstAfterOrNull } from '../../../helpers/arrayhelpers/firstAfterOrNull';
import { firstBeforeOrNull } from '../../../helpers/arrayhelpers/firstBeforeOrNull';
import { remove } from '../../../helpers/arrayhelpers/remove';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { deleteOuterBranchingNodeButNotItsContents } from './helpers/deleteOuterBranchingNodeButNotItsContents';

export function deleteRight(k: KeyboardMemory): void {
  if (k.current instanceof Placeholder) {
    if (k.current.parentNode != null && k.current.parentNode.placeholders.every((ph) => ph.nodes.length == 0)) {
      const previousNode = firstBeforeOrNull(k.current.parentNode.parentPlaceholder.nodes, k.current.parentNode);
      remove(k.current.parentNode.parentPlaceholder.nodes, k.current.parentNode);
      k.current = previousNode ?? k.current.parentNode.parentPlaceholder;
    } else {
      const nodes = k.current.nodes;
      if (nodes.length > 0) {
        handleDeletion(k, nodes[0]);
      } else if (k.current.parentNode != null) {
        const parentNode = k.current.parentNode;
        const siblingPlaceholders = parentNode.placeholders;
        if (siblingPlaceholders[0] == k.current && siblingPlaceholders.length == 2) {
          const nonEmptyPlaceholder = siblingPlaceholders[1];
          k.current = firstBeforeOrNull(parentNode.parentPlaceholder.nodes, parentNode) ?? parentNode.parentPlaceholder;
          deleteOuterBranchingNodeButNotItsContents(nonEmptyPlaceholder);
        } else {
          for (let i = siblingPlaceholders.indexOf(k.current) + 1; i < siblingPlaceholders.length; i++) {
            if (siblingPlaceholders[i].nodes.length > 0) {
              k.current = siblingPlaceholders[i];
              deleteRight(k);
              return;
            }
          }
        }
      }
    }
  } else {
    const nextNode = firstAfterOrNull(k.current.parentPlaceholder.nodes, k.current);
    if (nextNode != null) {
      handleDeletion(k, nextNode);
    }
  }
}

function handleDeletion(k: KeyboardMemory, nextNode: TreeNode) {
  if (nextNode instanceof BranchingNode) {
    if (nextNode.placeholders.length == 1 && nextNode.placeholders[0].nodes.length > 0) {
      deleteOuterBranchingNodeButNotItsContents(nextNode.placeholders[0]);
    } else if (nextNode.placeholders.length == 2 && nextNode.placeholders[0].nodes.length == 0 && nextNode.placeholders[1].nodes.length > 0) {
      deleteOuterBranchingNodeButNotItsContents(nextNode.placeholders[1]);
    } else {
      k.current = nextNode.placeholders[0];
      deleteRight(k);
    }
  } else {
    remove(nextNode.parentPlaceholder.nodes, nextNode);
  }
}
