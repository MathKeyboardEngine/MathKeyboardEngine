import { addLatex } from '../../../helpers/stringhelpers/addLatex';
import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { Placeholder } from '../../Placeholder/Placeholder';

export abstract class TreeNode {
  parentPlaceholder!: Placeholder;

  abstract getLatexPart(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string;
  getLatex(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    let latex = this.getLatexPart(k, latexConfiguration);
    if (k.selectionDiff != null && k.selectionDiff != 0) {
      if (k.inclusiveSelectionLeftBorder === this) {
        latex = addLatex(latexConfiguration.selectionHightlightStart, latex);
      }
      if (k.inclusiveSelectionRightBorder === this) {
        latex = addLatex(latex, latexConfiguration.selectionHightlightEnd);
      }
      return latex;
    } else {
      if (k.current === this) {
        return addLatex(latex, latexConfiguration.activePlaceholderLatex);
      } else {
        return latex;
      }
    }
  }
}
