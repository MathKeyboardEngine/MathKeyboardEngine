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
        latex = latexConfiguration.selectionHightlightStart + latex;
      }
      if (k.inclusiveSelectionRightBorder === this) {
        latex = latex + latexConfiguration.selectionHightlightEnd;
      }
      return latex;
    } else {
      if (k.current === this) {
        return latex + latexConfiguration.activePlaceholderLatex;
      } else {
        return latex;
      }
    }
  }
}
