import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { selectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/selectLeft';
import { deleteSelection } from '../../../../../src/KeyboardEngine/Functions/Deletion/deleteSelection';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { selectRight } from '../../../../../src/KeyboardEngine/Functions/Selection/selectRight';
import { TreeNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';

describe(deleteSelection.name, () => {
  it(`can delete a single ${TreeNode.name} when the left exclusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    selectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('1◼', k);
  });

  it(`can delete a single ${TreeNode.name} when the left exclusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    expectLatex('1◼', k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('◼', k);
  });

  it(`can delete multiple ${TreeNode.name}s when the left exclusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    expectLatex('123◼', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('1◼', k);
  });

  it(`can delete multiple ${TreeNode.name}s when the left exclusive border is a ${Placeholder.name} (via ${selectLeft.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('◼', k);
  });

  it(`can delete multiple ${TreeNode.name}s - left exclusive border is a ${Placeholder.name} (via ${selectRight.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('◼12', k);
    selectRight(k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('◼', k);
  });

  it(`can delete multiple ${TreeNode.name}s - left exclusive border is a ${TreeNode.name} (via ${selectRight.name})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    expectLatex('1◼2', k);
    selectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    // Act
    deleteSelection(k);
    // Assert
    expectLatex('1◼', k);
  });
});
