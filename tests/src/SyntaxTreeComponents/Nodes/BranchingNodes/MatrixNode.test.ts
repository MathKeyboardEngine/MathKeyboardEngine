import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveDown';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { expectLatex } from '../../../../helpers/expectLatex';
import { moveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveUp';
import { deleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Deletion/deleteCurrent';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { nameof } from '../../../../helpers/nameof';

describe(MatrixNode.name, () => {
  it('pmatrix(width=2,height=3) 1 right 2 down 4 down 6', () => {
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 3));
    expectLatex(String.raw`\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    insert(k, new DigitNode('1'));
    moveRight(k);
    insert(k, new DigitNode('2'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    moveDown(k);
    insert(k, new DigitNode('6'));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ ⬚ & 4 \\ ⬚ & 6▦\end{pmatrix}`, k);
  });

  it('move with left and right through all cells of the pmatrix(2*2)', () => {
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    insert(k, new DigitNode('1'));
    moveRight(k);
    moveRight(k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    insert(k, new DigitNode('4'));
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3 & 4▦\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3 & ▦4\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3▦ & 4\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ ▦3 & 4\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ▦ \\ 3 & 4\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1▦ & ⬚ \\ 3 & 4\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}▦1 & ⬚ \\ 3 & 4\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`▦\begin{pmatrix}1 & ⬚ \\ 3 & 4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}▦1 & ⬚ \\ 3 & 4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1▦ & ⬚ \\ 3 & 4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ▦ \\ 3 & 4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ ▦3 & 4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3▦ & 4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3 & ▦4\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3 & 4▦\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ⬚ \\ 3 & 4\end{pmatrix}▦`, k);
  });

  it('move out of an empty pmatrix(2*2) to the previous node and back in', () => {
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new MatrixNode('pmatrix', 2, 2));
    expectLatex(String.raw`2\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`2▦\begin{pmatrix}⬚ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`2\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
  });

  it('pmatrix(2*2) delete content', () => {
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
    deleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & ▦\end{pmatrix}`, k);
    deleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ ▦ & ⬚\end{pmatrix}`, k);
    deleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ▦ \\ ⬚ & ⬚\end{pmatrix}`, k);
    deleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    deleteCurrent(k);
    expectLatex(`▦`, k);
  });

  it('pmatrix(2*2) right down left up', () => {
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    expectLatex(String.raw`\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ ⬚ & ⬚\end{pmatrix}`, k);
    moveDown(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ⬚ & ▦\end{pmatrix}`, k);
    moveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ▦ & ⬚\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
  });

  it('impossible up/down requests in empty pmatrix(2*2) should not throw', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    expectLatex(String.raw`\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    // Act & Assert
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}▦ & ⬚ \\ ⬚ & ⬚\end{pmatrix}`, k);
    moveDown(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ▦ & ⬚\end{pmatrix}`, k);
    moveDown(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ▦ & ⬚\end{pmatrix}`, k);
    moveRight(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ⬚ & ▦\end{pmatrix}`, k);
    moveDown(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ⬚ \\ ⬚ & ▦\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ ⬚ & ⬚\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}⬚ & ▦ \\ ⬚ & ⬚\end{pmatrix}`, k);
  });

  it('impossible up/down requests in filled pmatrix(2*2) should not throw', () => {
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
    moveDown(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4▦\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2▦ \\ 3 & 4\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2▦ \\ 3 & 4\end{pmatrix}`, k);
  });

  it('impossible up/down requests in filled pmatrix(2*2) should not throw', () => {
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
    moveDown(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4▦\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2▦ \\ 3 & 4\end{pmatrix}`, k);
    moveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2▦ \\ 3 & 4\end{pmatrix}`, k);
  });

  it(`${nameof<MatrixNode>('getMoveDownSuggestion')} throws if it is called for a ${Placeholder.name} that is not part of the matrix`, () => {
    const matrix = new MatrixNode('pmatrix', 2, 2);
    const placeholderThatIsNotPartOfTheMatrix = new Placeholder();
    expect(() => matrix.getMoveDownSuggestion(placeholderThatIsNotPartOfTheMatrix)).throws();
  });
});
