import { describe } from 'mocha';
import { assert } from 'chai';
import { expectLatex } from '../../../../helpers/expectLatex';
import { nameof } from '../../../../helpers/nameof';
import {
  KeyboardMemory,
  insert,
  AscendingBranchingNode,
  DigitNode,
  moveUp,
  insertWithEncapsulateCurrent,
  moveDown,
  deleteLeft,
  StandardLeafNode,
  DecimalSeparatorNode,
  insertWithEncapsulateSelectionAndPrevious,
  selectLeft,
  DescendingBranchingNode,
  moveRight,
  MatrixNode,
  moveLeft,
  Placeholder,
  TreeNode,
  BranchingNode,
  LeafNode,
  RoundBracketsNode,
  StandardBranchingNode,
} from '../../../../../src/x';

describe(deleteLeft.name, () => {
  it(`can also be used to "delete empty ${Placeholder.name}s in some cases" (in the experience of the user) - x`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new StandardLeafNode('x'));
    insert(k, new StandardLeafNode('+')); // oops, typo!
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    deleteLeft(k); // trying to fix typo
    expectLatex('2x▦^{3}', k);
    moveUp(k);
    expectLatex('2x⬚^{3▦}', k); // Huh? Let's delete that empty placeholder!
    moveDown(k);
    expectLatex('2x▦^{3}', k);
    // Act
    deleteLeft(k);
    moveUp(k);
    // Assert
    expectLatex('2x^{3▦}', k);
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
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    deleteLeft(k); // trying to fix typo
    expectLatex('1+2.5▦^{3}', k);
    moveUp(k);
    expectLatex('1+2.5⬚^{3▦}', k); // Huh? Let's delete that empty placeholder!
    moveDown(k);
    expectLatex('1+2.5▦^{3}', k);
    // Act
    deleteLeft(k);
    moveUp(k);
    // Assert
    expectLatex('1+2.5^{3▦}', k);
  });

  it(`can also be used to "delete empty ${Placeholder.name}s in some cases" (in the experience of the user) - 2.5`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new DecimalSeparatorNode());
    insert(k, new DigitNode('5'));
    insert(k, new StandardLeafNode('+')); // oops, typo!
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    deleteLeft(k); // trying to fix typo
    expectLatex('2.5▦^{3}', k);
    moveUp(k);
    expectLatex('2.5⬚^{3▦}', k); // Huh? Let's delete that empty placeholder!
    moveDown(k);
    expectLatex('2.5▦^{3}', k);
    // Act
    deleteLeft(k);
    moveUp(k);
    // Assert
    expectLatex('2.5^{3▦}', k);
  });

  it('does nothing sometimes', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    moveDown(k);
    insert(k, new DigitNode('3'));
    moveUp(k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ 3 & ⬚\end{pmatrix}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ 3 & ⬚\end{pmatrix}`, k);
  });

  it(`deletes the last ${TreeNode.name}s from the previous ${Placeholder.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}12 & ▦ \\ ⬚ & ⬚\end{pmatrix}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}1▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
  });

  it(`can revert ${insertWithEncapsulateCurrent.name} sometimes - execution path with multiple digits treated as a single thing`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    const powerNode = new AscendingBranchingNode('', '^{', '}');
    insertWithEncapsulateCurrent(k, powerNode);
    const d3 = new DigitNode('3');
    insert(k, d3);
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex('2^{3^{▦}}', k);
    // Act & assert
    deleteLeft(k);
    expectLatex('2^{3▦}', k);
    assert.isTrue(d3.parentPlaceholder == powerNode.placeholders[1]);
    deleteLeft(k);
    expectLatex('2^{▦}', k);
  });

  it(`can delete from the first placeholder of a ${BranchingNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex(String.raw`\frac{12▦}{⬚}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`\frac{1▦}{⬚}`, k);
  });

  it(`can revert "raise selection to the power of an empty ${Placeholder.name}"`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12▦', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex('⬚^{12▦}', k);
    moveDown(k);
    expectLatex('▦^{12}', k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex('12▦', k);
  });

  it(`from the right of a single-${Placeholder.name} ${BranchingNode.name} - ${Placeholder.name} contains ${TreeNode.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new StandardLeafNode('x'));
    moveRight(k);
    expectLatex('(1+x)▦', k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex('1+x▦', k);
  });

  it(`from the right of a ${BranchingNode.name} - last ${Placeholder.name} contains a ${LeafNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new StandardLeafNode('x'));
    moveRight(k);
    expectLatex(String.raw`\frac{1}{x}▦`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`\frac{1}{▦}`, k);
  });

  it(`from the right of a ${BranchingNode.name} - last ${Placeholder.name} contains nested ${BranchingNode.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new StandardLeafNode('x'));
    moveRight(k);
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`\frac{1}{\frac{1}{\frac{1}{x}}}▦`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`\frac{1}{\frac{1}{\frac{1}{▦}}}`, k);
  });

  it(`from the right of a ${BranchingNode.name} - last ${Placeholder.name} is empty and first ${Placeholder.name} contains 1 ${LeafNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`\frac{1}{⬚}▦`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex('1▦', k);
  });

  it(`deletes a subscript (a ${BranchingNode.name} with two ${Placeholder.name}s) from its empty ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode('', '_{', '}'));
    expectLatex('12_{▦}', k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex('12▦', k);
  });

  it(`deletes a subscript (a ${BranchingNode.name} with two ${Placeholder.name}s) from the right`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode('', '_{', '}'));
    moveRight(k);
    expectLatex('12_{⬚}▦', k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex('12▦', k);
  });

  it(`deletes a subscript (a ${BranchingNode.name} with two ${Placeholder.name}s) from the right - case with a ${BranchingNode.name} on the right`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode('', '_{', '}'));
    moveRight(k);
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    moveLeft(k);
    expectLatex(String.raw`12_{⬚}▦\sqrt{⬚}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`12▦\sqrt{⬚}`, k);
  });

  it(`deletes a single-column matrix (or any ${BranchingNode.name}) from the right if the only non-empty ${Placeholder.name} is at index 0`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 1, 3));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveDown(k);
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}12 \\ ⬚ \\ ⬚\end{pmatrix}▦`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex('12▦', k);
  });

  it(`deletes a fraction (a ${BranchingNode.name} with two ${Placeholder.name}s) from its second ${Placeholder.name} - case with a ${BranchingNode.name} on the right`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new StandardLeafNode('a'));
    insert(k, new StandardLeafNode('b'));
    moveDown(k);
    moveRight(k);
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`\frac{ab}{▦}\sqrt{⬚}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`ab▦\sqrt{⬚}`, k);
  });

  it(`deletes the last ${TreeNode.name} of the last ${Placeholder.name} with content`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveDown(k);
    insert(k, new DigitNode('3'));
    insert(k, new DigitNode('4'));
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}12 & ⬚ \\ 34 & ⬚\end{pmatrix}▦`, k);
    // Act & Assert
    deleteLeft(k);
    expectLatex(String.raw`\begin{pmatrix}12 & ⬚ \\ 3▦ & ⬚\end{pmatrix}`, k);
    deleteLeft(k);
    expectLatex(String.raw`\begin{pmatrix}12 & ⬚ \\ ▦ & ⬚\end{pmatrix}`, k);
    deleteLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
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
    expectLatex(String.raw`\begin{pmatrix}▦ & 2 \\ ⬚ & 4\end{pmatrix}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`\begin{pmatrix}▦ & 2 \\ ⬚ & 4\end{pmatrix}`, k);
  });

  it(`deletes a ${BranchingNode.name} from one of its ${Placeholder.name}s: sets ${nameof<KeyboardMemory>('current')} at (the right of) the previous ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new StandardLeafNode(String.raw`\times`));
    insert(k, new MatrixNode('pmatrix', 2, 2));
    expectLatex(String.raw`2\times\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    // Act
    deleteLeft(k);
    // Assert
    expectLatex(String.raw`2\times▦`, k);
  });
});
