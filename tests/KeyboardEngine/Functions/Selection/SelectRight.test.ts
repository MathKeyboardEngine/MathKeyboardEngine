import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../TestHelpers/expectLatex';
import { Insert } from '../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitAtom } from '../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveLeft } from '../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { SelectRight} from '../../../../src/KeyboardEngine/Functions/Selection/SelectRight';

describe(SelectRight.name, () =>
{
  it('a single Atom, with left border is Atom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    MoveLeft(k);
    expectLatex('1◼2', k);
    SelectRight(k);
    expectLatex('1\\colorbox{blue}{2}', k);
  });

  it('a single Atom, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    MoveLeft(k);
    expectLatex('◼1', k);
    SelectRight(k);
    expectLatex('\\colorbox{blue}{1}', k);
  });

  it('multiple Atoms, with left border is Atom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    Insert(k, new DigitAtom(3));
    MoveLeft(k);
    MoveLeft(k);
    expectLatex('1◼23', k);
    SelectRight(k);
    SelectRight(k);
    expectLatex('1\\colorbox{blue}{23}', k);
  });

  it('multiple Atoms, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    MoveLeft(k);
    MoveLeft(k);
    expectLatex('◼12', k);
    SelectRight(k);
    SelectRight(k);
    expectLatex('\\colorbox{blue}{12}', k);
  });
});