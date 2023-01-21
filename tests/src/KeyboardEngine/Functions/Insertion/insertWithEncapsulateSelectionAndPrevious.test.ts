import { describe } from 'mocha';
import { expect } from 'chai';
import { expectLatex } from '../../../../helpers/expectLatex';
import {
  KeyboardMemory,
  insert,
  DigitNode,
  selectLeft,
  enterSelectionMode,
  insertWithEncapsulateSelectionAndPrevious,
  AscendingBranchingNode,
  StandardBranchingNode,
  StandardLeafNode,
  TreeNode,
  Placeholder,
  insertWithEncapsulateCurrent,
  inSelectionMode,
  BranchingNode,
  DescendingBranchingNode,
} from '../../../../../src/x';

describe(insertWithEncapsulateSelectionAndPrevious.name, () => {
  it(`when a single ${TreeNode.name} is selected and the exclusive left border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    expectLatex('23▦', k);
    selectLeft(k);
    expectLatex(String.raw`2\colorbox{blue}{3}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('', '^{', '}'));
    // Assert
    expectLatex('2^{3▦}', k);
  });

  it(`when a single ${TreeNode.name} is selected and the exclusive left border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    expectLatex('2▦', k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{2}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('', '^{', '}'));
    // Assert
    expectLatex('⬚^{2▦}', k);
  });

  it(`when multiple ${TreeNode.name}s are selected and the exclusive left border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('0'));
    expectLatex('210▦', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`2\colorbox{blue}{10}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('', '^{', '}'));
    // Assert
    expectLatex('2^{10▦}', k);
  });

  it(`when multiple ${TreeNode.name}s are selected and the exclusive left border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12▦', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('', '^{', '}'));
    // Assert
    expectLatex('⬚^{12▦}', k);
  });

  it(`invokes ${insertWithEncapsulateCurrent.name} if ${inSelectionMode.name} but nothing selected`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    enterSelectionMode(k);
    expectLatex('1+12▦', k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`1+\frac{12}{▦}`, k);
  });

  it(`throws on inserting ${BranchingNode.name} with single ${Placeholder.name}`, () => {
    const k = new KeyboardMemory();
    expect(() => insertWithEncapsulateSelectionAndPrevious(k, new StandardBranchingNode('[', ']'))).to.throw();
  });
});
