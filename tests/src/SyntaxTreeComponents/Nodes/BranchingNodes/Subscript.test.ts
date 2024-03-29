import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, DigitNode, DescendingBranchingNode, moveRight, moveUp, insertWithEncapsulateCurrent, moveDown, moveLeft, StandardLeafNode } from '../../../../../src/x';

describe('Subscript as suffix', () => {
  it('subscript `a` right 4', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new StandardLeafNode('a'));
    moveRight(k);
    insert(k, new DigitNode('4'));
    expectLatex('a_{4▦}', k);
  });

  it('subscript `a` down 4', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new StandardLeafNode('a'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    expectLatex('a_{4▦}', k);
  });

  it(insertWithEncapsulateCurrent.name, () => {
    const k = new KeyboardMemory();
    insert(k, new StandardLeafNode('a'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode('', '_{', '}'));
    expectLatex('a_{▦}', k);
  });

  it('subscript `a` down 4 up', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new StandardLeafNode('a'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    moveUp(k);
    expectLatex('a▦_{4}', k);
  });

  it('can be left empty, moving out and back in', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    expectLatex('▦_{⬚}', k);
    // Act & Assert
    moveLeft(k);
    expectLatex('▦⬚_{⬚}', k);
    moveRight(k);
    expectLatex('▦_{⬚}', k);
  });

  it('impossible up/down requests in empty node should not throw', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    expectLatex('▦_{⬚}', k);
    // Act & Assert 1
    moveUp(k);
    expectLatex('▦_{⬚}', k);
    // Arrange 2
    moveDown(k);
    expectLatex('⬚_{▦}', k);
    // Act & Assert 2
    moveDown(k);
    expectLatex('⬚_{▦}', k);
  });

  it('impossible up/down requests in filled subscriptNode should not throw', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new StandardLeafNode('a'));
    expectLatex('a▦_{⬚}', k);
    // Act & Assert 1
    moveUp(k);
    expectLatex('a▦_{⬚}', k);
    // Arrange 2
    moveDown(k);
    expectLatex('a_{▦}', k);
    insert(k, new DigitNode('4'));
    expectLatex('a_{4▦}', k);
    // Act & Assert 2
    moveDown(k);
    expectLatex('a_{4▦}', k);
  });
});
