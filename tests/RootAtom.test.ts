import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../src/KeyboardEngine/KeyboardMemory'
import { Placeholder } from '../src/SyntaxTreeComponents/Placeholders/Placeholder';
import { DeleteCurrent } from '../src/KeyboardEngine/Functions/DeleteCurrent'
import { Insert } from '../src/KeyboardEngine/Functions/Insert';
import { FractionAtom } from '../src/SyntaxTreeComponents/Atoms/FractionAtom'
import { MoveRight } from '../src/KeyboardEngine/Functions/MoveRight';
import { WritableAtom } from '../src/SyntaxTreeComponents/Atoms/Base/WritableAtom';

describe('RootAtom', () =>
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
  it('is reachable via the chain of parents - from Placeholder', () =>
  {
    let k = new KeyboardMemory();
    let originalRoot = k.Current;
    let fraction = new FractionAtom();
    Insert(k, fraction);
    assert.isTrue(originalRoot !== k.Current);
    assert.isTrue(k.Current == fraction.Numerator)
    assert.isTrue(k.Current instanceof Placeholder)
    let root = (k.Current as Placeholder).ParentAtom.ParentPlaceholder;
    assert.isNull(root.ParentAtom);
    expect(originalRoot).to.equal(root);
  });
  it('is reachable via the chain of parents - from Atom', () =>
  {
    let k = new KeyboardMemory();
    let originalRoot = k.Current;
    let fraction = new FractionAtom();
    Insert(k, fraction);
    MoveRight(k);
    MoveRight(k);
    assert.isTrue(originalRoot !== k.Current);
    assert.isTrue(k.Current == fraction)
    assert.isTrue(k.Current instanceof WritableAtom)
    let root = (k.Current as WritableAtom).ParentPlaceholder;
    assert.isNull(root.ParentAtom);
    expect(originalRoot).to.equal(root);
  });
});
