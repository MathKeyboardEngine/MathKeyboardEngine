import { concatLatex } from '../../../helpers/stringhelpers/concatLatex';
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
        latex = concatLatex(latexConfiguration.selectionHightlightStart, latex);
      }
      if (k.inclusiveSelectionRightBorder === this) {
        latex = concatLatex(latex, latexConfiguration.selectionHightlightEnd);
      }
      return latex;
    } else {
      if (k.current === this) {
        return concatLatex(latex, latexConfiguration.activePlaceholderLatex);
      } else {
        return latex;
      }
    }
  }
}
