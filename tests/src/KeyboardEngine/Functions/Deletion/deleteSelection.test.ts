import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, DigitNode, selectLeft, deleteSelection, moveLeft, selectRight, TreeNode, Placeholder } from '../../../../../src/x';

describe(deleteSelection.name, () => {
  it(`can delete a single ${TreeNode.name} when the exclusive left border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12▦', k);
    selectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('1▦', k);
  });

  it(`can delete a single ${TreeNode.name} when the exclusive left border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    expectLatex('1▦', k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('▦', k);
  });

  it(`can delete multiple ${TreeNode.name}s when the exclusive left border is a ${TreeNode.name} (via ${selectLeft.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    expectLatex('123▦', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('1▦', k);
  });

  it(`can delete multiple ${TreeNode.name}s when the exclusive left border is a ${TreeNode.name} (via ${selectRight.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('1▦23', k);
    selectRight(k);
    selectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('1▦', k);
  });

  it(`can delete multiple ${TreeNode.name}s when the exclusive left border is a ${Placeholder.name} (via ${selectLeft.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12▦', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('▦', k);
  });

  it(`can delete multiple ${TreeNode.name}s when the exclusive left border is a ${Placeholder.name} (via ${selectRight.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('▦12', k);
    selectRight(k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('▦', k);
  });
});
