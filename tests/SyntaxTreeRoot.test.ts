import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../src/KeyboardEngine/KeyboardMemory'
import { Placeholder } from '../src/SyntaxTreeComponents/Placeholders/Placeholder';
import { DeleteCurrent } from '../src/KeyboardEngine/Functions/DeleteCurrent'
import { Insert } from '../src/KeyboardEngine/Functions/Insert';
import { FractionAtom } from '../src/SyntaxTreeComponents/Atoms/WritableAtoms/FractionAtom'

describe('SyntaxTreeRoot', () =>
{
  it('is a Placeholder', () =>
  {
    let k = new KeyboardMemory();
    assert.isNotNull(k.Current);
    assert.isTrue(k.Current instanceof Placeholder);
  });

  it('cannot be deleted', () =>
  {
    let k = new KeyboardMemory();
    DeleteCurrent(k);
    assert.isNotNull(k.Current);
    assert.isTrue(k.Current instanceof Placeholder);
  });

  it('is reachable via the chain of parents', () =>
  {
    let k = new KeyboardMemory();
    let originalRoot = k.Current;

    let fraction1 = new FractionAtom();
    Insert(k, fraction1);
    assert.isTrue(k.Current === fraction1.Numerator)

    let fraction2 = new FractionAtom();
    Insert(k, fraction2);
    assert.isTrue(k.Current === fraction2.Numerator)

    assert.isTrue(k.Current instanceof Placeholder)
    let calculatedRoot = (k.Current as Placeholder).ParentAtom.ParentPlaceholder.ParentAtom.ParentPlaceholder;
    assert.isNull(calculatedRoot.ParentAtom);
    expect(originalRoot).to.equal(calculatedRoot);
  });
});
