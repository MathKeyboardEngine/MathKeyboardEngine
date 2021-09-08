import { describe } from 'mocha';
import { assert } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { InsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { InsertWithEncapsulateSelectionAndPrevious } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateSelectionAndPrevious';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

describe(DeleteCurrent.name, () => {
  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user) - x', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('2'));
    Insert(k, new StandardLeafNode('x'));
    Insert(k, new StandardLeafNode('+')); // oops, typo!
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    Insert(k, new DigitNode('3'));
    MoveDown(k);
    DeleteCurrent(k); // trying to fix typo
    expectLatex('2x{◼}^{3}', k);
    MoveUp(k);
    expectLatex('2x{◻}^{3◼}', k); // Huh? Let's delete that empty placeholder!
    MoveDown(k);
    expectLatex('2x{◼}^{3}', k);
    // Act
    DeleteCurrent(k);
    MoveUp(k);
    // Assert
    expectLatex('2{x}^{3◼}', k);
  });

  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user) - 1+2.5', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new DigitNode('2'));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode('5'));
    Insert(k, new StandardLeafNode('+')); // oops, typo!
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    Insert(k, new DigitNode('3'));
    MoveDown(k);
    DeleteCurrent(k); // trying to fix typo
    expectLatex('1+2.5{◼}^{3}', k);
    MoveUp(k);
    expectLatex('1+2.5{◻}^{3◼}', k); // Huh? Let's delete that empty placeholder!
    MoveDown(k);
    expectLatex('1+2.5{◼}^{3}', k);
    // Act
    DeleteCurrent(k);
    MoveUp(k);
    // Assert
    expectLatex('1+{2.5}^{3◼}', k);
  });

  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user) - 2.5', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('2'));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode('5'));
    Insert(k, new StandardLeafNode('+')); // oops, typo!
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    Insert(k, new DigitNode('3'));
    MoveDown(k);
    DeleteCurrent(k); // trying to fix typo
    expectLatex('2.5{◼}^{3}', k);
    MoveUp(k);
    expectLatex('2.5{◻}^{3◼}', k); // Huh? Let's delete that empty placeholder!
    MoveDown(k);
    expectLatex('2.5{◼}^{3}', k);
    // Act
    DeleteCurrent(k);
    MoveUp(k);
    // Assert
    expectLatex('{2.5}^{3◼}', k);
  });

  it('inverse of TryEncapsulateCurrent - execution path with digits', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('2'));
    const p = new AscendingBranchingNode('{', '}^{', '}');
    InsertWithEncapsulateCurrent(k, p);
    const d3 = new DigitNode('3');
    Insert(k, d3);
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{2}^{{3}^{◼}}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('{2}^{3◼}', k);
    assert.isTrue(d3.ParentPlaceholder == p.Placeholders[1]);
    DeleteCurrent(k);
    expectLatex('{2}^{◼}', k);
  });

  it('delete from first placeholder', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('2'));
    const p = new AscendingBranchingNode('{', '}^{', '}');
    InsertWithEncapsulateCurrent(k, p);
    const d3 = new DigitNode('3');
    Insert(k, d3);
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{2}^{{3}^{◼}}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('{2}^{3◼}', k);
    assert.isTrue(d3.ParentPlaceholder == p.Placeholders[1]);
    DeleteCurrent(k);
    expectLatex('{2}^{◼}', k);
  });

  it('Inverse of "raise selected to the power of an empty placeholder"', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{◻}^{12◼}', k);
    MoveDown(k);
    expectLatex('{◼}^{12}', k);

    // Act
    DeleteCurrent(k);
    // Assert
    expectLatex('12◼', k);
  });

  it('Delete from right of BranchingNode - last placeholder filled"', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    InsertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    Insert(k, new StandardLeafNode('x'));
    MoveRight(k);
    expectLatex(String.raw`\frac{1}{x}◼`, k);
    // Act
    DeleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{1}{◼}`, k);
  });

  it('Delete from right of BranchingNode - last placeholder empty and first contains 1 node"', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    InsertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    MoveRight(k);
    MoveRight(k);
    expectLatex(String.raw`\frac{1}{◻}◼`, k);
    // Act
    DeleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{◼}{◻}`, k);
  });

  it('Delete from right of BranchingNode - last placeholder empty and first contains multiple nodes"', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    InsertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    MoveRight(k);
    MoveRight(k);
    expectLatex(String.raw`\frac{12}{◻}◼`, k);
    // Act
    DeleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{1◼}{◻}`, k);
  });

  it('Does nothing at deletion from first placeholder if multiple sibling placeholders are filled"', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode('pmatrix', 2, 2));
    MoveRight(k);
    Insert(k, new DigitNode('2'));
    MoveDown(k);
    Insert(k, new DigitNode('4'));
    MoveLeft(k);
    MoveLeft(k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}◼ & 2 \\ ◻ & 4\end{pmatrix}`, k);
    // Act
    DeleteCurrent(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}◼ & 2 \\ ◻ & 4\end{pmatrix}`, k);
  });
});
