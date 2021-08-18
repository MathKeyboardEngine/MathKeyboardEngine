import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { TryInsertWithEncapsulateSelection } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateSelection';
import { MultiplePlaceholdersDescendingRawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersDescendingRawAtom';


describe(TryInsertWithEncapsulateSelection.name, () =>
{
  it('a single Atom, with left border is Atom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    expectLatex('12◼', k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    TryInsertWithEncapsulateSelection(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`1\frac{2}{◼}`, k);

  });

  it('a single Atom, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    expectLatex('1◼', k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    TryInsertWithEncapsulateSelection(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{1}{◼}`, k);
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
    TryInsertWithEncapsulateSelection(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`1\frac{23}{◼}`, k);
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
    TryInsertWithEncapsulateSelection(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{12}{◼}`, k);
  });
});