import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { moveRight } from '../Navigation/moveRight';

export function insert(k: KeyboardMemory, newNode: TreeNode): void {
  if (k.current instanceof Placeholder) {
    k.current.nodes.unshift(newNode);
    newNode.parentPlaceholder = k.current;
  } else {
    const parent: Placeholder = k.current.parentPlaceholder;
    const indexOfCurrent = parent.nodes.indexOf(k.current);
    parent.nodes.splice(indexOfCurrent + 1, 0, newNode);
    newNode.parentPlaceholder = parent;
  }
  moveRight(k);
}
