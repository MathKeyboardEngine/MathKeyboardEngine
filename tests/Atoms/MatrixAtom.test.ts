import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { MatrixAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { MoveDown } from '../../src/KeyboardEngine/Functions/MoveDown';
import { expectLatex } from '../TestHelpers/expectLatex';

describe('MatrixAtom', () =>
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
});