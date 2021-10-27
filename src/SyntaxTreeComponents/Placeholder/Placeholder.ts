import { LatexConfiguration } from '../../LatexConfiguration';
import { KeyboardMemory } from '../../KeyboardEngine/KeyboardMemory';
import { TreeNode } from '../Nodes/Base/TreeNode';
import { BranchingNode } from '../Nodes/Base/BranchingNode';
import { concatLatex } from '../../helpers/stringhelpers/concatLatex';

export class Placeholder {
  parentNode: BranchingNode | null = null;
  nodes: TreeNode[] = [];

  getLatex(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    const concatNodes = () => concatLatex(...this.nodes.map((node) => node.getLatex(k, latexConfiguration)));
    if (k.inclusiveSelectionLeftBorder === this) {
      return concatLatex(latexConfiguration.selectionHightlightStart, concatNodes());
    } else if (this === k.current) {
      if (this.nodes.length == 0) {
        return latexConfiguration.activePlaceholderLatex;
      } else {
        return concatLatex(latexConfiguration.activePlaceholderLatex, concatNodes());
      }
    } else if (this.nodes.length == 0) {
      return latexConfiguration.passivePlaceholderLatex;
    } else {
      return concatNodes();
    }
  }
}
