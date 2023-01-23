import { describe } from 'mocha';
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
  deleteRight,
  StandardLeafNode,
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

describe(deleteRight.name, () => {
  it(`can delete an empty single-${Placeholder.name} ${BranchingNode.name} from its ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{▦}`, k);
    moveRight(k);
    insert(k, new DigitNode('1'));
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{▦}1`, k);
    // Act & assert
    deleteRight(k);
    expectLatex('▦1', k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`can delete an empty multi-${Placeholder.name} ${BranchingNode.name} from any ${Placeholder.name} - case: first`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{▦}{⬚}`, k);
    moveRight(k);
    moveRight(k);
    insert(k, new DigitNode('1'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`\frac{▦}{⬚}1`, k);
    // Act & assert
    deleteRight(k);
    expectLatex('▦1', k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`can delete an empty multi-${Placeholder.name} ${BranchingNode.name} from any ${Placeholder.name} - case: last`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{▦}{⬚}`, k);
    moveRight(k);
    moveRight(k);
    insert(k, new DigitNode('1'));
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`\frac{⬚}{▦}1`, k);
    // Act & assert
    deleteRight(k);
    expectLatex('▦1', k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`does nothing if an empty ${nameof<KeyboardMemory>('syntaxTreeRoot')} is ${nameof<KeyboardMemory>('current')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    // Act
    deleteRight(k);
    // Assert
    expectLatex('▦', k);
  });

  it(`does nothing if there are only ${TreeNode.name}s on the left instead of the right`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    expectLatex('1▦', k);
    // Act
    deleteRight(k);
    // Assert
    expectLatex('1▦', k);
  });

  it(`deletes ${LeafNode.name}s and empty ${BranchingNode.name}s that are on the right of the cursor - ${nameof<KeyboardMemory>('current')} is ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    moveRight(k);
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`12\sqrt{⬚}\frac{▦}{⬚}`, k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`▦12\sqrt{⬚}\frac{⬚}{⬚}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`▦2\sqrt{⬚}\frac{⬚}{⬚}`, k);
    deleteRight(k);
    expectLatex(String.raw`▦\sqrt{⬚}\frac{⬚}{⬚}`, k);
    deleteRight(k);
    expectLatex(String.raw`▦\frac{⬚}{⬚}`, k);
    deleteRight(k);
    expectLatex(String.raw`▦`, k);
  });

  it(`deletes ${LeafNode.name}s and empty ${BranchingNode.name}s that are on the right of the cursor - ${nameof<KeyboardMemory>('current')} is ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    moveRight(k);
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`12\sqrt{⬚}\frac{▦}{⬚}`, k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`1▦2\sqrt{⬚}\frac{⬚}{⬚}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`1▦\sqrt{⬚}\frac{⬚}{⬚}`, k);
    deleteRight(k);
    expectLatex(String.raw`1▦\frac{⬚}{⬚}`, k);
    deleteRight(k);
    expectLatex(String.raw`1▦`, k);
  });

  it(`deletes non-empty single-${Placeholder.name} ${BranchingNode.name}s in parts - ${nameof<KeyboardMemory>('current')} is ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('-'));
    insert(k, new StandardLeafNode('x'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`▦\sqrt{1-x}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`▦1-x`, k);
    deleteRight(k);
    expectLatex(String.raw`▦-x`, k);
    deleteRight(k);
    expectLatex(String.raw`▦x`, k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`deletes non-empty single-${Placeholder.name} ${BranchingNode.name}s in parts - ${nameof<KeyboardMemory>('current')} is ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('7'));
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('-'));
    insert(k, new StandardLeafNode('x'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`7▦\sqrt{1-x}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`7▦1-x`, k);
    deleteRight(k);
    expectLatex(String.raw`7▦-x`, k);
    deleteRight(k);
    expectLatex(String.raw`7▦x`, k);
    deleteRight(k);
    expectLatex('7▦', k);
  });

  it(`steps into complex ${BranchingNode.name}s - ${nameof<KeyboardMemory>('current')} is ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('7'));
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('-'));
    insert(k, new StandardLeafNode('x'));
    moveRight(k);
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`7▦(1-x)^{2}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex('7▦1-x^{2}', k);
    deleteRight(k);
    expectLatex('7▦-x^{2}', k);
    deleteRight(k);
    expectLatex('7▦x^{2}', k);
    deleteRight(k);
    expectLatex('7▦^{2}', k);
    deleteRight(k);
    expectLatex('7▦2', k);
    deleteRight(k);
    expectLatex('7▦', k);
  });

  it(`steps into complex ${BranchingNode.name}s - ${nameof<KeyboardMemory>('current')} is ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('-'));
    insert(k, new StandardLeafNode('x'));
    moveRight(k);
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`▦(1-x)^{2}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex('▦1-x^{2}', k);
    deleteRight(k);
    expectLatex('▦-x^{2}', k);
    deleteRight(k);
    expectLatex('▦x^{2}', k);
    deleteRight(k);
    expectLatex('▦^{2}', k);
    deleteRight(k);
    expectLatex('▦2', k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`can delete a ${MatrixNode.name} with content gaps`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    moveRight(k);
    insert(k, new DigitNode('1'));
    moveDown(k);
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\begin{pmatrix}⬚ & 1 \\ ⬚ & \sqrt{▦}\end{pmatrix}`, k);
    moveUp(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`▦\begin{pmatrix}⬚ & 1 \\ ⬚ & \sqrt{⬚}\end{pmatrix}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ ⬚ & \sqrt{⬚}\end{pmatrix}`, k);
    deleteRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ⬚ & ▦\end{pmatrix}`, k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`can delete a ${MatrixNode.name} with full content`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    insert(k, new DigitNode('1'));
    moveRight(k);
    insert(k, new DigitNode('2'));
    moveRight(k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    insert(k, new DigitNode('4'));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4▦\end{pmatrix}`, k);
    moveUp(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`▦\begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`\begin{pmatrix}▦ & 2 \\ 3 & 4\end{pmatrix}`, k);
    deleteRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ 3 & 4\end{pmatrix}`, k);
    deleteRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ▦ & 4\end{pmatrix}`, k);
    deleteRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ⬚ & ▦\end{pmatrix}`, k);
    deleteRight(k);
    expectLatex('▦', k);
  });

  it(`lets the cursor pull exponents and subscripts towards itself`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    moveRight(k);
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`▦⬚^{2}`, k);
    // Act & assert
    deleteRight(k);
    expectLatex(String.raw`▦2`, k);
    deleteRight(k);
    expectLatex(String.raw`▦`, k);
  });
});
