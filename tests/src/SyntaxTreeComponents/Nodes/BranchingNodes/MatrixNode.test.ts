import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';

describe(MatrixNode.name, () =>
{
  it('pmatrix(width=2,height=3) 1 right 2 down 4 down 6', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 3,
        width: 2
    }));
    expectLatex(String.raw`\begin{pmatrix}◼ & ◻ \\ ◻ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    Insert(k, new DigitNode("1"));
    MoveRight(k);
    Insert(k, new DigitNode("2"));
    MoveDown(k);
    Insert(k, new DigitNode("4"));
    MoveDown(k);
    Insert(k, new DigitNode("6"));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ ◻ & 4 \\ ◻ & 6◼\end{pmatrix}`, k);
  });

  it('move with left and right through all cells of the pmatrix(2*2)', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitNode("1"));
    MoveRight(k);
    MoveRight(k);      
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    Insert(k, new DigitNode("4"));
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3 & 4◼\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3 & ◼4\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3◼ & 4\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ ◼3 & 4\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◼ \\ 3 & 4\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}1◼ & ◻ \\ 3 & 4\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}◼1 & ◻ \\ 3 & 4\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`◼\begin{pmatrix}1 & ◻ \\ 3 & 4\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}◼1 & ◻ \\ 3 & 4\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1◼ & ◻ \\ 3 & 4\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◼ \\ 3 & 4\end{pmatrix}`, k);       
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ ◼3 & 4\end{pmatrix}`, k);    
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3◼ & 4\end{pmatrix}`
    , k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3 & ◼4\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3 & 4◼\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◻ \\ 3 & 4\end{pmatrix}◼`, k);
  });

  it('move out of an empty pmatrix(2*2) to the previous node and back in', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    expectLatex(String.raw`2\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`2◼\begin{pmatrix}◻ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`2\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('pmatrix(2*2) delete content', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitNode("1"));
    MoveRight(k);
    Insert(k, new DigitNode("2"));
    MoveRight(k);      
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    Insert(k, new DigitNode("4"));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4◼\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & ◼\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ ◼ & ◻\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}1 & ◼ \\ ◻ & ◻\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(String.raw`\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(`◼`, k);
  });

  it('pmatrix(2*2) right down left up', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    expectLatex(String.raw`\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◼ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◻ \\ ◻ & ◼\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◻ \\ ◼ & ◻\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('impossible up/down requests in empty pmatrix(2*2) should not throw', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    expectLatex(String.raw`\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◻ \\ ◼ & ◻\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◻ \\ ◼ & ◻\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◻ \\ ◻ & ◼\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◼ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}◻ & ◼ \\ ◻ & ◻\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\begin{pmatrix}◼ & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('impossible up/down requests in filled pmatrix(2*2) should not throw', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitNode("1"));
    MoveRight(k);
    Insert(k, new DigitNode("2"));
    MoveRight(k);      
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    Insert(k, new DigitNode("4"));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4◼\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4◼\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2◼ \\ 3 & 4\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2◼ \\ 3 & 4\end{pmatrix}`, k);
  });

    it('impossible up/down requests in filled pmatrix(2*2) should not throw', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitNode("1"));
    MoveRight(k);
    Insert(k, new DigitNode("2"));
    MoveRight(k);      
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    Insert(k, new DigitNode("4"));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4◼\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4◼\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2◼ \\ 3 & 4\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(String.raw`\begin{pmatrix}1 & 2◼ \\ 3 & 4\end{pmatrix}`, k);
  });

  it('bug in logic somewhere else throws', () =>
  {
    const matrix = new MatrixNode({
      matrixType: "pmatrix",
      height: 2,
      width: 2
    });
    const placeholderThatIsNotPartOfTheMatrix = new Placeholder();
  
    expect(() => matrix.GetMoveDownSuggestion(placeholderThatIsNotPartOfTheMatrix))
    .throws();
  });
});