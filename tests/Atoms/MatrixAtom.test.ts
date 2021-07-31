import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { MatrixAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { MoveDown } from '../../src/KeyboardEngine/Functions/MoveDown';
import { LatexConfiguration } from '../../src/LatexConfiguration';

const defaultLatexConfiguration = new LatexConfiguration();
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
    Insert(k, new DigitAtom(1));
    MoveRight(k);
    Insert(k, new DigitAtom(2));
    MoveDown(k);
    Insert(k, new DigitAtom(4));
    MoveDown(k);
    Insert(k, new DigitAtom(6));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect(`\\\\begin{pmatrix}1 & 2 \\\\ ${defaultLatexConfiguration.passivePlaceholderNucleus} & 4 \\\\ ${defaultLatexConfiguration.passivePlaceholderNucleus} & 6⬛\\\\end{pmatrix}`)
      .to.equal(latex);
  });
});