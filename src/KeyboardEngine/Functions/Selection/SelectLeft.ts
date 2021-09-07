import { TreeNode } from '../../../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';
import { setSelectionDiff } from './helpers/setSelectionDiff';

export function SelectLeft(k: KeyboardMemory): void {
  const diff = k.SelectionDiff ?? 0;
  if ((k.Current instanceof TreeNode && k.Current.ParentPlaceholder.Nodes.indexOf(k.Current) + diff >= 0) || (k.Current instanceof Placeholder && diff > 0)) {
    setSelectionDiff(k, diff - 1);
  }
}
