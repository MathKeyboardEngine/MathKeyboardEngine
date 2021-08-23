import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MultiplePlaceholdersDescendingRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersDescendingRawNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

function TestNode() {
  return new MultiplePlaceholdersDescendingRawNode('', '_{', '}');
}

describe("Subscript as suffix", () =>
{
  it('sub 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    Insert(k, new DigitNode("4"));
    expectLatex('3_{4◼}', k);
  });

  it('sub 3 up 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode("3"));
    MoveDown(k);
    Insert(k, new DigitNode("4"));
    expectLatex('3_{4◼}', k);
  });

  it('3 encapsulated', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("3"));
    assert.ok(TryInsertWithEncapsulateCurrent(k, TestNode()));
    expectLatex('3_{◼}', k);
  });

  it('subscriptNode 3 up down', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode("3"));
    MoveDown(k);
    Insert(k, new DigitNode("4"));
    MoveUp(k);
    expectLatex('3◼_{4}', k);
  });

  it('can be left empty, moving out and back in', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, TestNode());
    expectLatex('◼_{◻}', k);
    MoveLeft(k);
    expectLatex('◼◻_{◻}', k);
    MoveRight(k);
    expectLatex('◼_{◻}', k);
  });

  it('impossible up/down requests in empty node should not throw', () =>
  {
    let k = new KeyboardMemory();
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

  it('impossible up/down requests in filled subscriptNode should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, TestNode());
    Insert(k, new DigitNode("3"));
    expectLatex('3◼_{◻}', k);
    MoveUp(k);
    expectLatex('3◼_{◻}', k);
    MoveDown(k);
    expectLatex('3_{◼}', k);
    Insert(k, new DigitNode("4"));
    expectLatex('3_{4◼}', k);
    MoveDown(k);
    expectLatex('3_{4◼}', k);
  });
});