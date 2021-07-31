import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { FractionAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/FractionAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { MoveDown } from '../../src/KeyboardEngine/Functions/MoveDown';
import { TryEncapsulateCurrentBy } from '../../src/KeyboardEngine/Functions/TryEncapsulateCurrentBy';
import { expectLatex } from '../TestHelpers/expectLatex';

describe('FractionAtom', () =>
{
  it('frac right right', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new FractionAtom());
    expectLatex('\\frac{◼}{◻}', k);

    MoveRight(k);
    expectLatex('\\frac{◻}{◼}', k);

    MoveRight(k);
    expectLatex('\\frac{◻}{◻}◼', k);
  });

  it('frac 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new FractionAtom());
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex('\\frac{3}{4◼}', k);
  });

  it('frac 3 down 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new FractionAtom());
    Insert(k, new DigitAtom(3));
    MoveDown(k);
    Insert(k, new DigitAtom(4));
    expectLatex('\\frac{3}{4◼}', k);
  });

  it('3 encapsulatedBy(frac.Numerator)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(3));
    TryEncapsulateCurrentBy(k, new FractionAtom().Numerator);
    expectLatex('\\frac{3}{◼}', k);
  });
});