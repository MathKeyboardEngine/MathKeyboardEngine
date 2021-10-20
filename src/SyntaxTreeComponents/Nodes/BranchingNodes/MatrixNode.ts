import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { Placeholder } from '../../Placeholder/Placeholder';
import { BranchingNode } from '../Base/BranchingNode';

export class MatrixNode extends BranchingNode {
  private readonly matrixType: string;
  private readonly grid: Placeholder[][];

  constructor(matrixType: string, width: number, height: number) {
    const grid: Placeholder[][] = [];
    const leftToRight: Placeholder[] = [];
    for (let i = 0; i < height; i++) {
      const row: Placeholder[] = [];
      for (let j = 0; j < width; j++) {
        const placeholder = new Placeholder();
        row.push(placeholder);
        leftToRight.push(placeholder);
      }
      grid.push(row);
    }
    super(leftToRight);
    for (const placeholder of leftToRight) {
      placeholder.parentNode = this;
    }
    this.grid = grid;
    this.matrixType = matrixType;
  }

  override getLatexPart(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    let latex = String.raw`\begin{${this.matrixType}}`;
    latex += this.grid.map((row) => row.map((placeholder) => placeholder.getLatex(k, latexConfiguration)).join(' & ')).join(String.raw` \\ `);
    latex += String.raw`\end{${this.matrixType}}`;
    return latex;
  }

  override getMoveDownSuggestion(fromPlaceholder: Placeholder): Placeholder | null {
    const { rowNumber, indexInRow } = this.getPositionOf(fromPlaceholder);
    if (rowNumber + 1 < this.grid.length) {
      return this.grid[rowNumber + 1][indexInRow];
    } else {
      return null;
    }
  }

  override getMoveUpSuggestion(fromPlaceholder: Placeholder): Placeholder | null {
    const { rowNumber, indexInRow } = this.getPositionOf(fromPlaceholder);
    if (rowNumber - 1 >= 0) {
      return this.grid[rowNumber - 1][indexInRow];
    } else {
      return null;
    }
  }

  private getPositionOf(placeholder: Placeholder): {
    rowNumber: number;
    indexInRow: number;
  } {
    for (let rowNumber = 0; rowNumber < this.grid.length; rowNumber++) {
      const row = this.grid[rowNumber];
      for (let indexInRow = 0; indexInRow < row.length; indexInRow++) {
        if (row[indexInRow] === placeholder) {
          return { rowNumber, indexInRow };
        }
      }
    }
    throw 'The provided Placeholder is not part of this MatrixNode.';
  }
}
