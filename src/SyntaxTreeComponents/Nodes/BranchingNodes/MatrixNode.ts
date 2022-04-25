import { KeyboardMemory } from '../../../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../../LatexConfiguration';
import { Placeholder } from '../../Placeholder/Placeholder';
import { BranchingNode } from '../Base/BranchingNode';

export class MatrixNode extends BranchingNode {
  private readonly matrixType: string;
  private readonly grid: Placeholder[][];
  private readonly width: number;
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
    this.grid = grid;
    this.matrixType = matrixType;
    this.width = width;
  }

  override getLatexPart(k: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    let latex = String.raw`\begin{${this.matrixType}}`;
    latex += this.grid.map((row) => row.map((placeholder) => placeholder.getLatex(k, latexConfiguration)).join(' & ')).join(String.raw` \\ `);
    latex += String.raw`\end{${this.matrixType}}`;
    return latex;
  }

  override getMoveDownSuggestion(fromPlaceholder: Placeholder): Placeholder | null {
    const { rowIndex, columnIndex } = this.getPositionOf(fromPlaceholder);
    if (rowIndex + 1 < this.grid.length) {
      return this.grid[rowIndex + 1][columnIndex];
    } else {
      return null;
    }
  }

  override getMoveUpSuggestion(fromPlaceholder: Placeholder): Placeholder | null {
    const { rowIndex, columnIndex } = this.getPositionOf(fromPlaceholder);
    if (rowIndex - 1 >= 0) {
      return this.grid[rowIndex - 1][columnIndex];
    } else {
      return null;
    }
  }

  private getPositionOf(placeholder: Placeholder): {
    rowIndex: number;
    columnIndex: number;
  } {
    const index = this.placeholders.indexOf(placeholder);
    if (index == -1) {
      throw 'The provided Placeholder is not part of this MatrixNode.';
    }
    const rowIndex = Math.floor(index / this.width);
    const columnIndex = index - rowIndex * this.width;
    return { rowIndex, columnIndex };
  }
}
