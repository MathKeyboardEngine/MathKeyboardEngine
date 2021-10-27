import { LatexConfiguration } from '../../LatexConfiguration';
import { KeyboardMemory } from '../../KeyboardEngine/KeyboardMemory';
import { TreeNode } from '../Nodes/Base/TreeNode';
import { BranchingNode } from '../Nodes/Base/BranchingNode';
import { addLatex } from '../../helpers/stringhelpers/addLatex';

export class Placeholder {
  parentNode: BranchingNode | null = null;
  nodes: TreeNode[] = [];

  getLatex(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    const concatenateNodes = () => addLatex(...this.nodes.map((node) => node.getLatex(k, latexConfiguration)));
    if (k.inclusiveSelectionLeftBorder === this) {
      return addLatex(latexConfiguration.selectionHightlightStart, concatenateNodes());
    } else if (this === k.current) {
      if (this.nodes.length == 0) {
        return latexConfiguration.activePlaceholderLatex;
      } else {
        return addLatex(latexConfiguration.activePlaceholderLatex, concatenateNodes());
      }
    } else if (this.nodes.length == 0) {
      return latexConfiguration.passivePlaceholderLatex;
    } else {
      return concatenateNodes();
    }
  }
}
