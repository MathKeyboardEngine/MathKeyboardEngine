import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { SelectRight } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectRight';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { InSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/InSelectionMode';
import { assert } from 'chai';

describe(SelectRight.name, () => {
  it('a single Node, with left border is Node', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    MoveLeft(k);
    expectLatex('1◼2', k);
    SelectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it('a single Node, with left border is Placeholder', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    MoveLeft(k);
    expectLatex('◼1', k);
    SelectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it('multiple Nodes, with left border is Node', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    Insert(k, new DigitNode('3'));
    MoveLeft(k);
    MoveLeft(k);
    expectLatex('1◼23', k);
    SelectRight(k);
    SelectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
  });

  it('multiple Nodes, with left border is Placeholder', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    MoveLeft(k);
    MoveLeft(k);
    expectLatex('◼12', k);
    SelectRight(k);
    SelectRight(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
  });

  it('on deselecting until nothing selected, still in selection mode', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    SelectRight(k);
    expectLatex('1◼', k);
    assert.isTrue(InSelectionMode(k));
  });

  it('SelectRight if all Nodes have already been selected does nothing, with left border is Placeholder', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    MoveLeft(k);
    expectLatex('◼1', k);
    SelectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    SelectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });
});
