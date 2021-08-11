export class LatexConfiguration {
    activePlaceholderNucleus : string = '◼';
    activePlaceholderColor? : string;
    passivePlaceholderNucleus : string = '◻';
    passivePlaceholderColor? : string;
    decimalSeparator : '.' | '{,}' = '.';
    selectionHightlightStart : string = String.raw`\colorbox{#ADD8E6}{`;
    selectionHightlightEnd : string = '}';

    get activePlaceholderLatex() {
        if (this.activePlaceholderColor == null){
            return this.activePlaceholderNucleus;
        } else{
            return String.raw`\color{${this.activePlaceholderColor}}{${this.activePlaceholderNucleus}}`;
        }
    }

    get passivePlaceholderLatex() {
        if (this.passivePlaceholderColor == null){
            return this.passivePlaceholderNucleus;
        } else{
            return String.raw`\color{${this.passivePlaceholderColor}}{${this.passivePlaceholderNucleus}}`;
        }
    }
}