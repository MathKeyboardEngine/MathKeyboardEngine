import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { PowerAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/PowerAtom';
import { TryEncapsulateCurrentBy } from '../../src/KeyboardEngine/Functions/Insert/TryEncapsulateCurrentBy';
import { expectLatex } from '../TestHelpers/expectLatex';
import { Placeholder } from '../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { Insert } from '../../src/KeyboardEngine/Functions/Insert/Insert';
import { MatrixAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { DecimalSeparatorAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom';
import { PlusOperatorAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/PlusOperatorAtom';
import { FractionAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/FractionAtom';
import { MoveLeft } from '../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { DeleteCurrent } from '../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { MoveUp } from '../../src/KeyboardEngine/Functions/Navigation/MoveUp';

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

  it('can encapsulate multiple digits', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    assert.ok(TryEncapsulateCurrentBy(k, new FractionAtom().Numerator));
    expectLatex('\\frac{12}{◼}', k);
  });

  it('can encapsulate a decimal number', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    Insert(k, new DecimalSeparatorAtom());
    Insert(k, new DigitAtom(3));

    assert.ok(TryEncapsulateCurrentBy(k, new PowerAtom().Base));
    expectLatex('12.3^{◼}', k);
    MoveLeft(k);
    expectLatex('12.3◼^{◻}', k);
    DeleteCurrent(k);
    DeleteCurrent(k);
    expectLatex('12◼^{◻}', k);
    MoveUp(k);
    expectLatex('12^{◼}', k);
  });

  it('does not encapsulate more than it should', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new PlusOperatorAtom());
    Insert(k, new DigitAtom(2));
    Insert(k, new DigitAtom(3));
    assert.ok(TryEncapsulateCurrentBy(k, new FractionAtom().Numerator));
    expectLatex('1+\\frac{23}{◼}', k);
  });
});