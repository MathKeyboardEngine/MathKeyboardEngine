import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { moveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveUp';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveDown';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';

describe('Subscript as suffix', () => {
  it('subscript 3 right 4', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new DigitNode('3'));
    moveRight(k);
    insert(k, new DigitNode('4'));
    expectLatex('3_{4◼}', k);
  });

  it('subscript 3 up 4', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    expectLatex('3_{4◼}', k);
  });

  it('3 subscript', () => {
    const k = new KeyboardMemory();
    insert(k, new DigitNode('3'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode('', '_{', '}'));
    expectLatex('3_{◼}', k);
  });

  it('subscriptNode 3 up down', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    moveUp(k);
    expectLatex('3◼_{4}', k);
  });

  it('can be left empty, moving out and back in', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('{', '}_{', '}'));
    expectLatex('{◼}_{◻}', k);
    // Act & Assert
    moveLeft(k);
    expectLatex('◼{◻}_{◻}', k);
    moveRight(k);
    expectLatex('{◼}_{◻}', k);
  });

  it('impossible up/down requests in empty node should not throw', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('{', '}_{', '}'));
    moveDown(k);
    expectLatex('{◻}_{◼}', k);
    // Act & Assert 1
    moveDown(k);
    expectLatex('{◻}_{◼}', k);
    // Arrange 2
    moveUp(k);
    expectLatex('{◼}_{◻}', k);
    // Act & Assert 2
    moveUp(k);
    expectLatex('{◼}_{◻}', k);
  });

  it('impossible up/down requests in filled subscriptNode should not throw', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode('', '_{', '}'));
    insert(k, new StandardLeafNode('a'));
    expectLatex('a◼_{◻}', k);
    // Act & Assert 1
    moveUp(k);
    expectLatex('a◼_{◻}', k);
    // Arrange 2
    moveDown(k);
    expectLatex('a_{◼}', k);
    insert(k, new DigitNode('4'));
    expectLatex('a_{4◼}', k);
    // Act & Assert 2
    moveDown(k);
    expectLatex('a_{4◼}', k);
  });
});
