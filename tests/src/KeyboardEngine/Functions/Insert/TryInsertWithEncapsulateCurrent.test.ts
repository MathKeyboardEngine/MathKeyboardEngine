import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { MultiplePlaceholdersAscendingRawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersAscendingRawAtom';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MatrixAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { DecimalSeparatorAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom';
import { RawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/RawAtom';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { RoundBracketsAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/RoundBracketsAtom';
import { SinglePlaceholderRawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/SinglePlaceholderRawAtom';
import { MultiplePlaceholdersDescendingRawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersDescendingRawAtom';

describe(TryInsertWithEncapsulateCurrent.name, () =>
{
  it('returns false if current is placeholder', () =>
  {
    let k = new KeyboardMemory();
    assert.isTrue(k.Current instanceof Placeholder);
    expectLatex('◼', k);
    assert.notOk(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}')));
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
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}')));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix}^{◼}`, k);
  });

  it('can also be used inside (for example) a matrix', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixAtom({matrixType: "pmatrix", height:2, width:2}));
    Insert(k, new DigitAtom(1));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}')));
    expectLatex(String.raw`\begin{pmatrix}1^{◼} & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('can encapsulate multiple digits', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}')));
    expectLatex(String.raw`\frac{12}{◼}`, k);
  });

  it('can encapsulate a decimal number', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new DigitAtom(2));
    Insert(k, new DecimalSeparatorAtom());
    Insert(k, new DigitAtom(3));

    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}')));
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
    Insert(k, new RawAtom('+'));
    Insert(k, new DigitAtom(2));
    Insert(k, new DigitAtom(3));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}')));
    expectLatex(String.raw`1+\frac{23}{◼}`, k);
  });

  it ('can encapsulate round brackets', () => {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new RawAtom('+'));
    Insert(k, new RoundBracketsAtom('(', ')'));
    Insert(k, new DigitAtom(2));
    Insert(k, new RawAtom('+'));
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    expectLatex(String.raw`1+(2+3)◼`, k);
    let powerAtom = new MultiplePlaceholdersAscendingRawAtom('', '^{', '}');
    assert.ok(TryInsertWithEncapsulateCurrent(k, powerAtom));
    expectLatex(String.raw`1+(2+3)^{◼}`, k);
    expect(powerAtom.Placeholders[0].getLatex(k, null!)).to.be.equal("(2+3)");
  });

  it ('config.deleteOuterRoundBracketsIfAny: deletes outer round brackets during encapsulation', () => {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new RawAtom('+'));
    Insert(k, new RoundBracketsAtom('(', ')'));
    Insert(k, new RoundBracketsAtom('(', ')'));
    Insert(k, new RawAtom("x"));
    Insert(k, new RawAtom('+'));
    Insert(k, new DigitAtom(2));
    MoveRight(k);
    Insert(k, new RoundBracketsAtom('(', ')'));
    Insert(k, new RawAtom("x"));
    Insert(k, new RawAtom('-'));
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    MoveRight(k);
    expectLatex(String.raw`1+((x+2)(x-3))◼`, k);
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'), { deleteOuterRoundBracketsIfAny: true}));
    expectLatex(String.raw`1+\frac{(x+2)(x-3)}{◼}`, k);
  });
  
  it ('config.deleteOuterRoundBracketsIfAny does not delete square brackets during encapsulation', () => {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(1));
    Insert(k, new RawAtom('+'));
    Insert(k, new SinglePlaceholderRawAtom(String.raw`|`, String.raw`|`));
    Insert(k, new RawAtom("x"));
    Insert(k, new RawAtom('+'));
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    let fraction = new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}');
    assert.ok(TryInsertWithEncapsulateCurrent(k, fraction, { deleteOuterRoundBracketsIfAny: true}));
    expectLatex(String.raw`1+\frac{|x+3|}{◼}`, k);
    expect(fraction.Placeholders[0].getLatex(k, null!)).to.be.equal("|x+3|");
  });
});