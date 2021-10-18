import { LatexConfiguration } from '../../LatexConfiguration';
import { KeyboardMemory } from '../../KeyboardEngine/KeyboardMemory';
import { TreeNode } from '../Nodes/Base/TreeNode';
import { BranchingNode } from '../Nodes/Base/BranchingNode';

export class Placeholder {
  parentNode: BranchingNode | null = null;
  nodes: TreeNode[] = [];

  getLatex(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    if (keyboardMemory.inclusiveSelectionLeftBorder === this) {
      return latexConfiguration.selectionHightlightStart + this.nodes.map((node) => node.getLatex(keyboardMemory, latexConfiguration)).join('');
    } else if (this === keyboardMemory.current) {
      if (this.nodes.length == 0) {
        return latexConfiguration.activePlaceholderLatex;
      } else {
        return latexConfiguration.activePlaceholderLatex + this.nodes.map((node) => node.getLatex(keyboardMemory, latexConfiguration)).join('');
      }
    } else if (this.nodes.length == 0) {
      return latexConfiguration.passivePlaceholderLatex;
    } else {
      return this.nodes.map((node) => node.getLatex(keyboardMemory, latexConfiguration)).join('');
    }
  }
}
