import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { MultiplePlaceholdersDescendingRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersDescendingRawNode';

describe("Fraction", () =>
{
  it('frac left right right right', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    MoveLeft(k);
    expectLatex(String.raw`◼\frac{◻}{◻}`, k);
    MoveRight(k);
    expectLatex(String.raw`\frac{◼}{◻}`, k);
    MoveRight(k);
    expectLatex(String.raw`\frac{◻}{◼}`, k);
    MoveRight(k);
    expectLatex(String.raw`\frac{◻}{◻}◼`, k);
  });

  it('frac 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    Insert(k, new DigitNode("4"));
    expectLatex(String.raw`\frac{3}{4◼}`, k);
  });

  it('frac 3 down 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    Insert(k, new DigitNode("3"));
    MoveDown(k);
    Insert(k, new DigitNode("4"));
    expectLatex(String.raw`\frac{3}{4◼}`, k);
  });

  it('3 encapsulatedBy(frac.Numerator)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("3"));
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{3}{◼}`, k);
  });

  it('delete empty frac from numerator', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{◼}{◻}`, k);
    DeleteCurrent(k);
    expectLatex('◼', k);
  });

  it('delete empty frac from denominator', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    MoveDown(k);
    expectLatex(String.raw`\frac{◻}{◼}`, k);
    DeleteCurrent(k);
    expectLatex('◼', k);
  });

  it('delete empty frac from the right', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    MoveDown(k);
    MoveRight(k);
    expectLatex(String.raw`\frac{◻}{◻}◼`, k);
    DeleteCurrent(k);
    expectLatex('◼', k);
  });

  it('deleting frac from denominator releases non-empty numerator', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    MoveDown(k);
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    expectLatex(String.raw`\frac{12}{3}◼`, k);

    DeleteCurrent(k);
    expectLatex(String.raw`\frac{12}{◼}`, k);
    DeleteCurrent(k);
    expectLatex('12◼', k);
  });

  it('up in filled fraction', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    MoveDown(k);
    Insert(k, new DigitNode("3"));
    expectLatex(String.raw`\frac{12}{3◼}`, k);

    MoveUp(k);
    expectLatex(String.raw`\frac{12◼}{3}`, k);
  });

  it('impossible up/down requests in filled fraction should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    Insert(k, new DigitNode("1"));
    expectLatex(String.raw`\frac{1◼}{◻}`, k);
    MoveUp(k);
    expectLatex(String.raw`\frac{1◼}{◻}`, k);

    MoveDown(k);
    Insert(k, new DigitNode("2"));
    expectLatex(String.raw`\frac{1}{2◼}`, k);
    MoveDown(k);
    expectLatex(String.raw`\frac{1}{2◼}`, k);
  });

  it('impossible up/down requests in empty fraction should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));
    MoveDown(k);
    expectLatex(String.raw`\frac{◻}{◼}`, k);
    MoveDown(k);
    expectLatex(String.raw`\frac{◻}{◼}`, k);
    MoveUp(k);
    expectLatex(String.raw`\frac{◼}{◻}`, k);
    MoveUp(k);
    expectLatex(String.raw`\frac{◼}{◻}`, k);
  });
});