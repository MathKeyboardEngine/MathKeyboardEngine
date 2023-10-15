import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { moveRight } from '../Navigation/moveRight';

export function insert(k: KeyboardMemory, toInsert: TreeNode | TreeNode[]): void {
  if (toInsert instanceof Array) {
    for (const node of toInsert) {
      insert(k, node);
      k.current = node;
    }
  } else {
    if (k.current instanceof Placeholder) {
      k.current.nodes.unshift(toInsert);
      toInsert.parentPlaceholder = k.current;
    } else {
      const parent: Placeholder = k.current.parentPlaceholder;
      const indexOfCurrent = parent.nodes.indexOf(k.current);
      parent.nodes.splice(indexOfCurrent + 1, 0, toInsert);
      toInsert.parentPlaceholder = parent;
    }
    moveRight(k);
  }
}
