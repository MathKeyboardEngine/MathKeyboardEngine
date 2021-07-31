import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../src/KeyboardEngine/Functions/Insert';
import { LatexConfiguration } from '../src/LatexConfiguration';
import { PowerAtom } from '../src/SyntaxTreeComponents/Atoms/WritableAtoms/PowerAtom';

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
});