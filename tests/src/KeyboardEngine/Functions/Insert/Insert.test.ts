import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

describe(Insert.name, () =>
{
  it('inserts at the start of an Node[] - it prepends - if Current is a Placeholder', () =>
  {
    const k = new KeyboardMemory();
    const digitNode1 = new DigitNode("1");
    Insert(k, digitNode1);
    expectLatex('1◼', k);
    MoveLeft(k);
    expect(k.Current).to.equal(digitNode1.ParentPlaceholder);
    expectLatex('◼1', k);
    Insert(k, new DigitNode("2"));
    expectLatex('2◼1', k);
  });

  it('inserts at the right of an Node if Current is an Node', () =>
  {
    const k = new KeyboardMemory();
    const digitNode1 = new DigitNode("1");
    Insert(k, digitNode1);
    expect(k.Current).to.equal(digitNode1);
    expectLatex('1◼', k);
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    MoveLeft(k);
    expect(k.Current).to.equal(digitNode1);
    expectLatex('1◼2', k);
    Insert(k, new DigitNode("3"));
    expectLatex('13◼2', k);
  });

  it('sets the ParentPlaceholder of the inserted Node', () =>
  {
    const k = new KeyboardMemory();
    const node = new DigitNode("1");
    assert.isUndefined(node.ParentPlaceholder);
    Insert(k, node);
    assert.isNotNull(node.ParentPlaceholder);
  });

  it('sets Current', () =>
  {
    const k = new KeyboardMemory();
    const originalCurrent = k.Current;
    Insert(k, new DigitNode("1"));
    expect(originalCurrent).not.to.equal(k.Current);
  });
});