import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import {
  KeyboardMemory,
  insert,
  DigitNode,
  selectLeft,
  enterSelectionMode,
  insertWithEncapsulateSelection,
  DescendingBranchingNode,
  TreeNode,
  Placeholder,
  inSelectionMode,
} from '../../../../../src/x';

describe(insertWithEncapsulateSelection.name, () => {
  it(`when a single ${TreeNode.name} is selected and the exclusive left border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12▦', k);
    selectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    // Act
    insertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`1\frac{2}{▦}`, k);
  });

  it(`when a single ${TreeNode.name} is selected and the exclusive left border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    expectLatex('1▦', k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    insertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`\frac{1}{▦}`, k);
  });

  it(`when multiple ${TreeNode.name}s are selected and the exclusive left border is a ${TreeNode.name}`, () => {
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
    insertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`1\frac{23}{▦}`, k);
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
    insertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`\frac{12}{▦}`, k);
  });

  it(`does a regular ${insert.name} when ${inSelectionMode.name} but nothing is selected`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    enterSelectionMode(k);
    expectLatex('12▦', k);
    // Act
    insertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`12\frac{▦}{⬚}`, k);
  });
});
