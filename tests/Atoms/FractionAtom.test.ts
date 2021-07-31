import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { FractionAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/FractionAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { MoveDown } from '../../src/KeyboardEngine/Functions/MoveDown';
import { TryEncapsulateCurrentBy } from '../../src/KeyboardEngine/Functions/TryEncapsulateCurrentBy';
import { LatexConfiguration } from '../../src/LatexConfiguration';

const defaultLatexConfiguration = new LatexConfiguration();
describe('Fractions', () =>
{
  it('frac 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new FractionAtom());
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('\\frac{3}{4⬛}').to.equal(latex);
  });

  it('frac 3 down 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new FractionAtom());
    Insert(k, new DigitAtom(3));
    MoveDown(k);
    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('\\frac{3}{4⬛}').to.equal(latex);
  });

  it('3 encapsulatedBy(frac.Numerator) 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(3));
    TryEncapsulateCurrentBy(k, new FractionAtom().Numerator);
    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('\\frac{3}{4⬛}').to.equal(latex);
  });
});