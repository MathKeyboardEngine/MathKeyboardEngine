import { firstBeforeOrNull } from '../../../../helpers/arrayhelpers/firstBeforeOrNull';
import { TreeNode } from '../../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../../KeyboardMemory';
import { leaveSelectionMode } from '../leaveSelectionMode_';

export function popSelection(k: KeyboardMemory): TreeNode[] {
  if (k.selectionDiff == null) {
    throw 'Enter selection mode before calling this method.';
  }
  if (k.selectionDiff == 0) {
    leaveSelectionMode(k);
    return [];
  }
  const diff = k.selectionDiff;
  if (k.current instanceof Placeholder) {
    leaveSelectionMode(k);
    return k.current.nodes.splice(0, diff);
  } else {
    const siblings = k.current.parentPlaceholder.nodes;
    const indexOfLeftBorder = siblings.indexOf(k.inclusiveSelectionLeftBorder as TreeNode);
    k.current = firstBeforeOrNull(siblings, k.inclusiveSelectionLeftBorder) ?? k.current.parentPlaceholder;
    leaveSelectionMode(k);
    return siblings.splice(indexOfLeftBorder, abs(diff));
  }
}

function abs(n: number): number {
  return n < 0 ? -n : n;
}
