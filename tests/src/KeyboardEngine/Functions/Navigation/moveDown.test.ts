import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveDown';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent';
import { RoundBracketsNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';
import { BranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';

describe(moveDown.name, () => {
  it(`can move the cursor down via an ancestors, if the current ${BranchingNode.name} does not support up/down navigation`, () => {
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
