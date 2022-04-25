import { isLetter } from './isLetter';

export function endsWithLatexCommand(latex: string): boolean {
  if (latex.length == 0) {
    return false;
  }

  if (isLetter(latex[latex.length - 1])) {
    for (let i = latex.length - 2; i >= 0; i--) {
      const c = latex[i];
      if (isLetter(c)) {
        continue;
      } else {
        return c == '\\';
      }
    }
  }
  return false;
}
