import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { PowerAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/PowerAtom';
import { TryEncapsulateCurrentBy } from '../../src/KeyboardEngine/Functions/TryEncapsulateCurrentBy';
import { expectLatex } from '../TestHelpers/expectLatex';
import { Placeholder } from '../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { MatrixAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';

describe('TryEncapsulateCurrentBy', () =>
{
  it('returns false if current is placeholder', () =>
  {
    let k = new KeyboardMemory();
    assert.isTrue(k.Current instanceof Placeholder);
    expectLatex('◼', k);
    assert.notOk(TryEncapsulateCurrentBy(k, new PowerAtom().Base));
    expectLatex('◼', k);
  });

  it('can encapsulate complex stuff like matrixes', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({matrixType: "pmatrix", height:2, width:2}));
    for(let i = 1; i <= 4; i++){
        Insert(k, new DigitAtom(i));
        MoveRight(k);    
    }
    assert.ok(TryEncapsulateCurrentBy(k, new PowerAtom().Base));
    expectLatex('\\\\begin{pmatrix}1 & 2 \\\\ 3 & 4\\\\end{pmatrix}^{◼}', k);
  });

  it('can also be used inside (for example) a matrix', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({matrixType: "pmatrix", height:2, width:2}));
    Insert(k, new DigitAtom(1));
    assert.ok(TryEncapsulateCurrentBy(k, new PowerAtom().Base));
    expectLatex('\\\\begin{pmatrix}1^{◼} & ◻ \\\\ ◻ & ◻\\\\end{pmatrix}', k);
  });
});