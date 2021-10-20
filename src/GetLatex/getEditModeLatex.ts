import { KeyboardMemory } from '../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../LatexConfiguration';

export function getEditModeLatex(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
  return k.syntaxTreeRoot.getLatex(k, latexConfiguration);
}
