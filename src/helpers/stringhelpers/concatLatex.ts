import { endsWithLatexCommand } from './endsWithLatexCommand';
import { isLetter } from './isLetter';

export function concatLatex(...latexArray: string[]): string {
  let s = '';
  for (let i = 0; i < latexArray.length; i++) {
    const latexToAdd = latexArray[i];
    if (endsWithLatexCommand(s) && isLetter(latexToAdd[0])) {
      s += ' ';
    }
    s += latexToAdd;
  }
  return s;
}
