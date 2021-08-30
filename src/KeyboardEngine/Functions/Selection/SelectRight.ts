import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function SelectRight(k: KeyboardMemory): void {
  const diff = k.SelectionDiff ?? 0;
  if (
    (k.Current instanceof Placeholder && diff < k.Current.Nodes.length) ||
    (k.Current instanceof TreeNode && k.Current.ParentPlaceholder.Nodes.indexOf(k.Current) + diff < k.Current.ParentPlaceholder.Nodes.length)
  ) {
    setSelectionDiff(k, diff + 1);
  }
}
