import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { DeleteSelection } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteSelection';


describe(DeleteSelection.name, () =>
{
  it('a single Atom, with left border is Atom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    expectLatex('12◼', k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    DeleteSelection(k);
    expectLatex('1◼', k);

  });

  it('a single Atom, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    expectLatex('1◼', k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    DeleteSelection(k);
    expectLatex('◼', k);
  });

  it('multiple Atoms, with left border is Atom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    Insert(k, new DigitAtom(3));
    expectLatex('123◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
    DeleteSelection(k);
    expectLatex('1◼', k);
  });

  it('multiple Atoms, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    expectLatex('12◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    DeleteSelection(k);
    expectLatex('◼', k);
  });
});