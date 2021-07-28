import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Placeholder } from '../../src/SyntaxTreeComponents/Placeholders/Placeholder';
import { DeleteCurrent } from '../../src/KeyboardEngine/Functions/DeleteCurrent';
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { FractionAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/FractionAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { LatexConfiguration } from '../../src/LatexConfiguration';

const defaultLatexConfiguration = new LatexConfiguration();
describe('Fractions', () =>
{
  it('create basic fraction', () =>
  {
    let k = new KeyboardMemory();
    let fraction = new FractionAtom();
    Insert(k, fraction);
    let three = new DigitAtom(3);
    Insert(k, three);
    assert.isTrue(k.Current === three, "Current is 3.");

    MoveRight(k);
    assert.isTrue(k.Current === fraction.Denominator, "Current is empty denominator.");
    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('\\frac{3}{4}').to.equal(latex);
  });
});