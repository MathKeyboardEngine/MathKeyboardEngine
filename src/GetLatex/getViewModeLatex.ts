import { KeyboardMemory } from '../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../LatexConfiguration';
import { TreeNode } from '../SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../SyntaxTreeComponents/Placeholder/Placeholder';

const emptyKeyboardMemory = new KeyboardMemory();
export function getViewModeLatex(x: TreeNode | Placeholder | KeyboardMemory, latexConfiguration: LatexConfiguration): string {
  const syntaxTreeComponent: TreeNode | Placeholder = x instanceof KeyboardMemory ? x.syntaxTreeRoot : x;
  return syntaxTreeComponent.getLatex(emptyKeyboardMemory, latexConfiguration);
}
