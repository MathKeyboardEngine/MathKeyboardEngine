import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { InsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

function TestNode() {
  return new DescendingBranchingNode('', '_{', '}');
}

describe('Subscript as suffix', () => {
  it('sub 3 right 4', () => {
    const k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode('3'));
    MoveRight(k);
    Insert(k, new DigitNode('4'));
    expectLatex('3_{4◼}', k);
  });

  it('sub 3 up 4', () => {
    const k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode('3'));
    MoveDown(k);
    Insert(k, new DigitNode('4'));
    expectLatex('3_{4◼}', k);
  });

  it('3 encapsulated', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('3'));
    InsertWithEncapsulateCurrent(k, TestNode());
    expectLatex('3_{◼}', k);
  });

  it('subscriptNode 3 up down', () => {
    const k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode('3'));
    MoveDown(k);
    Insert(k, new DigitNode('4'));
    MoveUp(k);
    expectLatex('3◼_{4}', k);
  });

  it('can be left empty, moving out and back in', () => {
    const k = new KeyboardMemory();
    Insert(k, TestNode());
    expectLatex('◼_{◻}', k);
    MoveLeft(k);
    expectLatex('◼◻_{◻}', k);
    MoveRight(k);
    expectLatex('◼_{◻}', k);
  });

  it('impossible up/down requests in empty node should not throw', () => {
    const k = new KeyboardMemory();
    Insert(k, TestNode());
    MoveDown(k);
    expectLatex('◻_{◼}', k);
    MoveDown(k);
    expectLatex('◻_{◼}', k);
    MoveUp(k);
    expectLatex('◼_{◻}', k);
    MoveUp(k);
    expectLatex('◼_{◻}', k);
  });

  it('impossible up/down requests in filled subscriptNode should not throw', () => {
    const k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode('3'));
    expectLatex('3◼_{◻}', k);
    MoveUp(k);
    expectLatex('3◼_{◻}', k);
    MoveDown(k);
    expectLatex('3_{◼}', k);
    Insert(k, new DigitNode('4'));
    expectLatex('3_{4◼}', k);
    MoveDown(k);
    expectLatex('3_{4◼}', k);
  });
});
