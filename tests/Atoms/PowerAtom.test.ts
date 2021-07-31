import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { PowerAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/PowerAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { MoveUp } from '../../src/KeyboardEngine/Functions/MoveUp';
import { TryEncapsulateCurrentBy } from '../../src/KeyboardEngine/Functions/TryEncapsulateCurrentBy';
import { expectLatex } from '../TestHelpers/expectLatex';
import { MoveDown } from '../../src/KeyboardEngine/Functions/MoveDown';

describe('PowerAtom', () =>
{
  it('pow 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex('3^{4◼}', k);
  });

  it('pow 3 up 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    Insert(k, new DigitAtom(3));
    MoveUp(k);
    Insert(k, new DigitAtom(4));
    expectLatex('3^{4◼}', k);
  });

  it('3 encapsulatedBy(pow.Base)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(3));
    TryEncapsulateCurrentBy(k, new PowerAtom().Base);
    expectLatex('3^{◼}', k);
  });

  it('pow 3 up down', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    Insert(k, new DigitAtom(3));
    MoveUp(k);
    Insert(k, new DigitAtom(4));
    MoveDown(k);
    expectLatex('3◼^{4}', k);
  });

  it('impossible up/down requests in empty power should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    MoveUp(k);
    expectLatex('◻^{◼}', k);
    MoveUp(k);
    expectLatex('◻^{◼}', k);
    MoveDown(k);
    expectLatex('◼^{◻}', k);
    MoveDown(k);
    expectLatex('◼^{◻}', k);
  });

  it('impossible up/down requests in filled power should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    Insert(k, new DigitAtom(3));
    expectLatex('3◼^{◻}', k);
    MoveDown(k);
    expectLatex('3◼^{◻}', k);
    MoveUp(k);
    expectLatex('3^{◼}', k);
    Insert(k, new DigitAtom(4));
    expectLatex('3^{4◼}', k);
    MoveUp(k);
    expectLatex('3^{4◼}', k);
    MoveDown(k);
    expectLatex('3◼^{4}', k);
  });
});