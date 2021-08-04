export class LatexConfiguration {
    activePlaceholderNucleus : string = '◼';
    activePlaceholderColor? : string;
    passivePlaceholderNucleus : string = '◻';
    passivePlaceholderColor? : string;
    decimalSeparator : '.' | '{,}' = '.';
    selectionHightlightStart : string = String.raw`\colorbox{#ADD8E6}{`;
    selectionHightlightEnd : string = '}';

    getActivePlaceholderLatex() {
        if (this.activePlaceholderColor == null){
            return this.activePlaceholderNucleus;
        } else{
            return String.raw`\color{${this.activePlaceholderColor}}{${this.activePlaceholderNucleus}}`;
        }
    }

    getPassivePlaceholderLatex() {
        if (this.passivePlaceholderColor == null){
            return this.passivePlaceholderNucleus;
        } else{
            return String.raw`\color{${this.passivePlaceholderColor}}{${this.passivePlaceholderNucleus}}`;
        }
    }
}