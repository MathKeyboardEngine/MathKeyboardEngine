﻿export class LatexConfiguration {
    activePlaceholderNucleus : string = '⬛';
    activePlaceholderColor? : string;
    passivePlaceholderNucleus : string = '\\square';
    passivePlaceholderColor? : string;

    getActivePlaceholderLatex() {
        if (this.activePlaceholderColor == null){
            return this.activePlaceholderNucleus;
        } else{
            return `\\color{${this.activePlaceholderColor}}{${this.activePlaceholderNucleus}}`;
        }
    }

    getPassivePlaceholderLatex() {
        if (this.passivePlaceholderColor == null){
            return this.passivePlaceholderNucleus;
        } else{
            return `\\color{${this.passivePlaceholderColor}}{${this.passivePlaceholderNucleus}}`;
        }
    }
}