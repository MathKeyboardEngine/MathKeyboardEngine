import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, DigitNode, moveDown, AscendingBranchingNode, insertWithEncapsulateCurrent, RoundBracketsNode, BranchingNode } from '../../../../../src/x';

describe(moveDown.name, () => {
  it(`can move the cursor down via an ancestor, if the current ${BranchingNode.name} does not support up/down navigation`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new RoundBracketsNode('(', ')'));
    expectLatex('2^{(▦)}', k);
    // Act
    moveDown(k);
    // Assert
    expectLatex('2▦^{(⬚)}', k);
  });
});
