import { describe } from 'mocha';
import { assert } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveUp';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveDown';
import { deleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Deletion/deleteCurrent';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { insertWithEncapsulateSelectionAndPrevious } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateSelectionAndPrevious';
import { selectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/selectLeft';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { TreeNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/TreeNode';
import { BranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { LeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/LeafNode';
import { nameof } from '../../../../helpers/nameof';

describe(deleteCurrent.name, () => {
  it(`can also be used to "delete empty ${Placeholder.name}s in some cases" (in the experience of the user) - x`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new StandardLeafNode('x'));
    insert(k, new StandardLeafNode('+')); // oops, typo!
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    deleteCurrent(k); // trying to fix typo
    expectLatex('2x{◼}^{3}', k);
    moveUp(k);
    expectLatex('2x{◻}^{3◼}', k); // Huh? Let's delete that empty placeholder!
    moveDown(k);
    expectLatex('2x{◼}^{3}', k);
    // Act
    deleteCurrent(k);
    moveUp(k);
    // Assert
    expectLatex('2{x}^{3◼}', k);
  });

  it(`can also be used to "delete empty ${Placeholder.name}s in some cases" (in the experience of the user) - 1+2.5`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('2'));
    insert(k, new DecimalSeparatorNode());
    insert(k, new DigitNode('5'));
    insert(k, new StandardLeafNode('+')); // oops, typo!
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    deleteCurrent(k); // trying to fix typo
    expectLatex('1+2.5{◼}^{3}', k);
    moveUp(k);
    expectLatex('1+2.5{◻}^{3◼}', k); // Huh? Let's delete that empty placeholder!
    moveDown(k);
    expectLatex('1+2.5{◼}^{3}', k);
    // Act
    deleteCurrent(k);
    moveUp(k);
    // Assert
    expectLatex('1+{2.5}^{3◼}', k);
  });

  it(`can also be used to "delete empty ${Placeholder.name}s in some cases" (in the experience of the user) - 2.5`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new DecimalSeparatorNode());
    insert(k, new DigitNode('5'));
    insert(k, new StandardLeafNode('+')); // oops, typo!
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    deleteCurrent(k); // trying to fix typo
    expectLatex('2.5{◼}^{3}', k);
    moveUp(k);
    expectLatex('2.5{◻}^{3◼}', k); // Huh? Let's delete that empty placeholder!
    moveDown(k);
    expectLatex('2.5{◼}^{3}', k);
    // Act
    deleteCurrent(k);
    moveUp(k);
    // Assert
    expectLatex('{2.5}^{3◼}', k);
  });

  it('does nothing sometimes', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    moveDown(k);
    insert(k, new DigitNode('3'));
    moveUp(k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◼ \\ 3 & ◻\end{pmatrix}`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}◻ & ◼ \\ 3 & ◻\end{pmatrix}`, k);
  });

  it(`deletes the last ${TreeNode.name}s from the previous ${Placeholder.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}12 & ◼ \\ ◻ & ◻\end{pmatrix}`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}1◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it(`can revert ${insertWithEncapsulateCurrent.name} sometimes - execution path with multiple digits treated as a single thing`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    const powerNode = new AscendingBranchingNode('{', '}^{', '}');
    insertWithEncapsulateCurrent(k, powerNode);
    const d3 = new DigitNode('3');
    insert(k, d3);
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{2}^{{3}^{◼}}', k);
    // Act & assert
    deleteCurrent(k);
    expectLatex('{2}^{3◼}', k);
    assert.isTrue(d3.parentPlaceholder == powerNode.placeholders[1]);
    deleteCurrent(k);
    expectLatex('{2}^{◼}', k);
  });

  it(`can delete from the first placeholder of a ${BranchingNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex(String.raw`\frac{12◼}{◻}`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{1◼}{◻}`, k);
});

  it(`can revert "raise selected to the power of an empty ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{◻}^{12◼}', k);
    moveDown(k);
    expectLatex('{◼}^{12}', k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex('12◼', k);
  });

  it(`from the right of a ${BranchingNode.name} - last ${Placeholder.name} filled`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new StandardLeafNode('x'));
    moveRight(k);
    expectLatex(String.raw`\frac{1}{x}◼`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{1}{◼}`, k);
  });

  it(`from the right of a ${BranchingNode.name} - last ${Placeholder.name} is empty and first ${Placeholder.name} contains 1 ${LeafNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`\frac{1}{◻}◼`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{◼}{◻}`, k);
  });

  it(`from the right of a ${BranchingNode.name} - last ${Placeholder.name} is empty and first ${Placeholder.name} contains multiple ${LeafNode.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`\frac{12}{◻}◼`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\frac{1◼}{◻}`, k);
  });

  it(`does nothing from the first ${Placeholder.name} if multiple sibling ${Placeholder.name}s are filled`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    moveRight(k);
    insert(k, new DigitNode('2'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    moveLeft(k);
    moveLeft(k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}◼ & 2 \\ ◻ & 4\end{pmatrix}`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}◼ & 2 \\ ◻ & 4\end{pmatrix}`, k);
  });

  it(`deletes a ${BranchingNode.name} from one of its ${Placeholder.name}s: sets ${nameof<KeyboardMemory>("current")} at (the right of) the previous ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new StandardLeafNode(String.raw`\times `));
    insert(k, new MatrixNode('pmatrix', 2, 2));
    expectLatex(String.raw`2\times \begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    // Act
    deleteCurrent(k);
    // Assert
    expectLatex(String.raw`2\times ◼`, k);
  });
});
