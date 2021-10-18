import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { Placeholder } from '../../Placeholder/Placeholder';

export abstract class TreeNode {
  parentPlaceholder!: Placeholder;

  abstract getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string;
  getLatex(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    let latex = this.getLatexPart(keyboardMemory, latexConfiguration);
    if (keyboardMemory.selectionDiff != null && keyboardMemory.selectionDiff != 0) {
      if (keyboardMemory.inclusiveSelectionLeftBorder === this) {
        latex = latexConfiguration.selectionHightlightStart + latex;
      }
      if (keyboardMemory.inclusiveSelectionRightBorder === this) {
        latex = latex + latexConfiguration.selectionHightlightEnd;
      }
      return latex;
    } else {
      if (keyboardMemory.current === this) {
        return latex + latexConfiguration.activePlaceholderLatex;
      } else {
        return latex;
      }
    }
  }
}
