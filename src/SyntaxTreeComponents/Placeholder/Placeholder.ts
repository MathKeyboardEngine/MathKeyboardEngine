import { LatexConfiguration } from '../../LatexConfiguration';
import { KeyboardMemory } from '../../KeyboardEngine/KeyboardMemory';
import { TreeNode } from '../Nodes/Base/TreeNode';
import { BranchingNode } from '../Nodes/Base/BranchingNode';

export class Placeholder {
  parentNode: BranchingNode | null = null;
  nodes: TreeNode[] = [];

  getLatex(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    const concatenateNodes = () => this.nodes.map((node) => node.getLatex(k, latexConfiguration)).join('');
    if (k.inclusiveSelectionLeftBorder === this) {
      return latexConfiguration.selectionHightlightStart + concatenateNodes();
    } else if (this === k.current) {
      if (this.nodes.length == 0) {
        return latexConfiguration.activePlaceholderLatex;
      } else {
        return latexConfiguration.activePlaceholderLatex + concatenateNodes();
      }
    } else if (this.nodes.length == 0) {
      return latexConfiguration.passivePlaceholderLatex;
    } else {
      return concatenateNodes();
    }
  }
}
