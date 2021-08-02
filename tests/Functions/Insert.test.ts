import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../TestHelpers/expectLatex';
import { Insert } from '../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveLeft } from '../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

describe(Insert.name, () =>
{
  it('inserts at the start of an Atom[] - it prepends - if Current is a Placeholder', () =>
  {
    let k = new KeyboardMemory();
    let digitAtom1 = new DigitAtom(1);
    Insert(k, digitAtom1);
    expectLatex('1◼', k);
    MoveLeft(k);
    expect(k.Current).to.equal(digitAtom1.ParentPlaceholder);
    expectLatex('◼1', k);
    Insert(k, new DigitAtom(2));
    expectLatex('2◼1', k);
  });

  it('inserts at the right of an Atom if Current is an Atom', () =>
  {
    let k = new KeyboardMemory();
    let digitAtom1 = new DigitAtom(1);
    Insert(k, digitAtom1);
    expect(k.Current).to.equal(digitAtom1);
    expectLatex('1◼', k);
    Insert(k, new DigitAtom(2));
    expectLatex('12◼', k);
    MoveLeft(k);
    expect(k.Current).to.equal(digitAtom1);
    expectLatex('1◼2', k);
    Insert(k, new DigitAtom(3));
    expectLatex('13◼2', k);
  });

  it('sets the ParentPlaceholder of the inserted Atom', () =>
  {
    let k = new KeyboardMemory();
    let atom = new DigitAtom(1);
    assert.isUndefined(atom.ParentPlaceholder);
    Insert(k, atom);
    assert.isNotNull(atom.ParentPlaceholder);
  });

  it('sets Current', () =>
  {
    let k = new KeyboardMemory();
    let originalCurrent = k.Current;
    Insert(k, new DigitAtom(1));
    expect(originalCurrent).not.to.equal(k.Current);
  });
});