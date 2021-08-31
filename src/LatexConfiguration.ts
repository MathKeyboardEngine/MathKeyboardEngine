export class LatexConfiguration {
  activePlaceholderShape: string = String.raw`\blacksquare `;
  activePlaceholderColor?: string;
  passivePlaceholderShape: string = String.raw`\square `;
  passivePlaceholderColor?: string;
  selectionHightlightStart: string = String.raw`\colorbox{#ADD8E6}{`;
  selectionHightlightEnd = '}';

  get activePlaceholderLatex(): string {
    if (this.activePlaceholderColor == null) {
      return this.activePlaceholderShape;
    } else {
      return String.raw`\color{${this.activePlaceholderColor}}{${this.activePlaceholderShape}}`;
    }
  }

  get passivePlaceholderLatex(): string {
    if (this.passivePlaceholderColor == null) {
      return this.passivePlaceholderShape;
    } else {
      return String.raw`\color{${this.passivePlaceholderColor}}{${this.passivePlaceholderShape}}`;
    }
  }
}
