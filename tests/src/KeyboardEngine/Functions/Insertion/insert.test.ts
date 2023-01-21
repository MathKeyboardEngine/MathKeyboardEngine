import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { expectLatex } from '../../../../helpers/expectLatex';
import { nameof } from '../../../../helpers/nameof';
import { KeyboardMemory, insert, DigitNode, moveLeft, TreeNode, Placeholder } from '../../../../../src/x';

describe(insert.name, () => {
  it(`inserts at the start of a ${TreeNode.name}[] (it "prepends") if ${nameof<KeyboardMemory>('current')} is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    const digitNode1 = new DigitNode('1');
    insert(k, digitNode1);
    expectLatex('1▦', k);
    moveLeft(k);
    expect(k.current).to.equal(digitNode1.parentPlaceholder);
    expectLatex('▦1', k);
    // Act
    insert(k, new DigitNode('2'));
    // Assert
    expectLatex('2▦1', k);
  });

  it(`inserts at the right of a ${TreeNode.name} if ${nameof<KeyboardMemory>('current')} is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    const digitNode1 = new DigitNode('1');
    insert(k, digitNode1);
    expect(k.current).to.equal(digitNode1);
    expectLatex('1▦', k);
    // Act 1
    insert(k, new DigitNode('2'));
    // Assert 1
    expectLatex('12▦', k);
    // Arrange 2
    moveLeft(k);
    expect(k.current).to.equal(digitNode1);
    expectLatex('1▦2', k);
    // Act 2
    insert(k, new DigitNode('3'));
    // Assert 2
    expectLatex('13▦2', k);
  });

  it(`sets the ${nameof<TreeNode>('parentPlaceholder')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    const node = new DigitNode('1');
    assert.isUndefined(node.parentPlaceholder);
    // Act
    insert(k, node);
    // Assert
    assert.isNotNull(node.parentPlaceholder);
  });

  it(`sets ${nameof<KeyboardMemory>('current')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    const originalCurrent = k.current;
    // Act
    insert(k, new DigitNode('1'));
    // Assert
    expect(originalCurrent).not.to.equal(k.current);
  });
});
