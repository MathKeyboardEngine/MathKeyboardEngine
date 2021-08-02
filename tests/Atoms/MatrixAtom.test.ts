import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert/Insert';
import { MatrixAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveDown } from '../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveLeft } from '../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { expectLatex } from '../TestHelpers/expectLatex';
import { MoveUp } from '../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { DeleteCurrent } from '../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';

describe(MatrixAtom.name, () =>
{
  it('pmatrix(width=2,height=3) 1 right 2 down 4 down 6', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 3,
        width: 2
    }));
    expectLatex(`\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    Insert(k, new DigitAtom(1));
    MoveRight(k);
    Insert(k, new DigitAtom(2));
    MoveDown(k);
    Insert(k, new DigitAtom(4));
    MoveDown(k);
    Insert(k, new DigitAtom(6));
    expectLatex(`\\\\begin{pmatrix}1 & 2 \\\\ ◻ & 4 \\\\ ◻ & 6◼\\\\end{pmatrix}`, k);
  });

  it('move with left and right through all cells of the pmatrix(2*2)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitAtom(1));
    MoveRight(k);
    MoveRight(k);      
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3 & 4◼\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3 & ◼4\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3◼ & 4\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ ◼3 & 4\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◼ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}1◼ & ◻ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}◼1 & ◻ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`◼\\\\begin{pmatrix}1 & ◻ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}◼1 & ◻ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1◼ & ◻ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◼ \\\\ 3 & 4\\\\end{pmatrix}`, k);       
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ ◼3 & 4\\\\end{pmatrix}`, k);    
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3◼ & 4\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3 & ◼4\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3 & 4◼\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◻ \\\\ 3 & 4\\\\end{pmatrix}◼`, k);
  });

  it('move out of an empty pmatrix(2*2) to the previous atom and back in', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(2));
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    expectLatex(`2\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`2◼\\\\begin{pmatrix}◻ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`2\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
  });

  it('pmatrix(2*2) delete content', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitAtom(1));
    MoveRight(k);
    Insert(k, new DigitAtom(2));
    MoveRight(k);      
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex(`\\\\begin{pmatrix}1 & 2 \\\\ 3 & 4◼\\\\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(`\\\\begin{pmatrix}1 & 2 \\\\ 3 & ◼\\\\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(`\\\\begin{pmatrix}1 & 2 \\\\ ◼ & ◻\\\\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◼ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(`\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    DeleteCurrent(k);
    expectLatex(`◼`, k);
  });

  it('pmatrix(2*2) right down left up', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    expectLatex(`\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◼ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◻ \\\\ ◻ & ◼\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◻ \\\\ ◼ & ◻\\\\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(`\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
  });

  it('impossible up/down requests in empty pmatrix(2*2) should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    expectLatex(`\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◻ \\\\ ◼ & ◻\\\\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◻ \\\\ ◼ & ◻\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◻ \\\\ ◻ & ◼\\\\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◼ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(`\\\\begin{pmatrix}◻ & ◼ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
    MoveLeft(k);
    expectLatex(`\\\\begin{pmatrix}◼ & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}`, k);
  });

  it('impossible up/down requests in filled pmatrix(2*2) should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({
        matrixType: "pmatrix",
        height: 2,
        width: 2
    }));
    Insert(k, new DigitAtom(1));
    MoveRight(k);
    Insert(k, new DigitAtom(2));
    MoveRight(k);      
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex(`\\\\begin{pmatrix}1 & 2 \\\\ 3 & 4◼\\\\end{pmatrix}`, k);
    MoveDown(k);
    expectLatex(`\\\\begin{pmatrix}1 & 2 \\\\ 3 & 4◼\\\\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(`\\\\begin{pmatrix}1 & ◼2 \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveRight(k);
    expectLatex(`\\\\begin{pmatrix}1 & 2◼ \\\\ 3 & 4\\\\end{pmatrix}`, k);
    MoveUp(k);
    expectLatex(`\\\\begin{pmatrix}1 & 2◼ \\\\ 3 & 4\\\\end{pmatrix}`, k);
  });
});