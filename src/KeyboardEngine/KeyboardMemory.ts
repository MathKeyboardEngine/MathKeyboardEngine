import { TreeNode } from '../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../SyntaxTreeComponents/Placeholder/Placeholder';

export class KeyboardMemory {
  readonly SyntaxTreeRoot: Placeholder = new Placeholder();
  Current: Placeholder | TreeNode = this.SyntaxTreeRoot;

  SelectionDiff: number | null = null;
  InclusiveSelectionRightBorder: TreeNode | null = null;
  InclusiveSelectionLeftBorder: TreeNode | Placeholder | null = null;
}
