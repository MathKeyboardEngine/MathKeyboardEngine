import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert/Insert';
import { LatexConfiguration } from '../../src/LatexConfiguration';
import { MultiplePlaceholdersAscendingRawAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersAscendingRawAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { DecimalSeparatorAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom';
import { GetEditModeLatex } from '../../src/GetLatex/GetEditModeLatex';
import { GetViewModeLatex } from '../../src/GetLatex/GetViewModeLatex';

describe(LatexConfiguration.name, () =>
{
  it('allows customizing the shape of the "cursor" and placeholders', () =>
  {
    let myLatexConfiguration = new LatexConfiguration();
    myLatexConfiguration.activePlaceholderNucleus = 'myCursor';
    myLatexConfiguration.passivePlaceholderNucleus = 'myEmptyPlace';

    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    expect('myCursor^{myEmptyPlace}').to.equal(GetEditModeLatex(k, myLatexConfiguration));
  });

    it('allows customizing the color of the "cursor" and placeholders', () =>
    {
        let myLatexConfiguration = new LatexConfiguration();
        myLatexConfiguration.activePlaceholderNucleus = '◼';
        myLatexConfiguration.passivePlaceholderNucleus = '◼';
        myLatexConfiguration.activePlaceholderColor = "orange";
        myLatexConfiguration.passivePlaceholderColor = "gray";

        let k = new KeyboardMemory();
        Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
        expect(String.raw`\color{orange}{◼}^{\color{gray}{◼}}`).to.equal(GetEditModeLatex(k, myLatexConfiguration));
    });

    it('allows customizing the decimal separator', () =>
    {
        let myLatexConfiguration = new LatexConfiguration();
        myLatexConfiguration.decimalSeparator = '{,}';

        let k = new KeyboardMemory();
        Insert(k, new DigitAtom("1"));
        Insert(k, new DecimalSeparatorAtom());
        Insert(k, new DigitAtom("2"));
        expect('1{,}2').to.equal(GetViewModeLatex(k, myLatexConfiguration));
    });
});