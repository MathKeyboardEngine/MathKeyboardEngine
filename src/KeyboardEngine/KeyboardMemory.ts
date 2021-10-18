import { TreeNode } from '../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../SyntaxTreeComponents/Placeholder/Placeholder';

export class KeyboardMemory {
  readonly syntaxTreeRoot: Placeholder = new Placeholder();
  current: Placeholder | TreeNode = this.syntaxTreeRoot;

  selectionDiff: number | null = null;
  inclusiveSelectionRightBorder: TreeNode | null = null;
  inclusiveSelectionLeftBorder: TreeNode | Placeholder | null = null;
}
