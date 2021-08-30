export class LatexConfiguration {
  activePlaceholderNucleus: string = String.raw`\blacksquare `;
  activePlaceholderColor?: string;
  passivePlaceholderNucleus: string = String.raw`\square `;
  passivePlaceholderColor?: string;
  selectionHightlightStart: string = String.raw`\colorbox{#ADD8E6}{`;
  selectionHightlightEnd = "}";

  get activePlaceholderLatex(): string {
    if (this.activePlaceholderColor == null) {
      return this.activePlaceholderNucleus;
    } else {
      return String.raw`\color{${this.activePlaceholderColor}}{${this.activePlaceholderNucleus}}`;
    }
  }

  get passivePlaceholderLatex(): string {
    if (this.passivePlaceholderColor == null) {
      return this.passivePlaceholderNucleus;
    } else {
      return String.raw`\color{${this.passivePlaceholderColor}}{${this.passivePlaceholderNucleus}}`;
    }
  }
}
