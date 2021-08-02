import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../src/KeyboardEngine/Functions/Insert/Insert';
import { LatexConfiguration } from '../src/LatexConfiguration';
import { PowerAtom } from '../src/SyntaxTreeComponents/Atoms/WritableAtoms/PowerAtom';
import { DigitAtom } from '../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { DecimalSeparatorAtom } from '../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom';

describe('LatexConfiguration', () =>
{
  it('allows customizing the shape of the "cursor" and placeholders', () =>
  {
    let myLatexConfiguration = new LatexConfiguration();
    myLatexConfiguration.activePlaceholderNucleus = 'myCursor';
    myLatexConfiguration.passivePlaceholderNucleus = 'myEmptyPlace';

    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    expect('myCursor^{myEmptyPlace}').to.equal(k.getLatex(myLatexConfiguration));
  });

    it('allows customizing the color of the "cursor" and placeholders', () =>
    {
        let myLatexConfiguration = new LatexConfiguration();
        myLatexConfiguration.activePlaceholderNucleus = '◼';
        myLatexConfiguration.passivePlaceholderNucleus = '◼';
        myLatexConfiguration.activePlaceholderColor = "orange";
        myLatexConfiguration.passivePlaceholderColor = "gray";

        let k = new KeyboardMemory();
        Insert(k, new PowerAtom());
        expect('\\color{orange}{◼}^{\\color{gray}{◼}}').to.equal(k.getLatex(myLatexConfiguration));
    });

    it('allows customizing the decimal separator', () =>
    {
        let myLatexConfiguration = new LatexConfiguration();
        myLatexConfiguration.decimalSeparator = '{,}';

        let k = new KeyboardMemory();
        Insert(k, new DigitAtom(1));
        Insert(k, new DecimalSeparatorAtom());
        Insert(k, new DigitAtom(2));
        expect('1{,}2◼').to.equal(k.getLatex(myLatexConfiguration));
    });
});