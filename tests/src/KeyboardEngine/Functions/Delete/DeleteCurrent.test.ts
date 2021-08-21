import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MultiplePlaceholdersAscendingRawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersAscendingRawAtom';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { RawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/RawAtom';
import { DecimalSeparatorAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom';

describe(DeleteCurrent.name, () =>
{
  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user)', () =>
  {
    // Arrange
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom("1"));
    Insert(k, new RawAtom('+'));
    Insert(k, new DigitAtom("2"));
    Insert(k, new DecimalSeparatorAtom());
    Insert(k, new DigitAtom("5"));
    Insert(k, new RawAtom('+')); // oops, typo!
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    Insert(k, new DigitAtom("3"));
    MoveDown(k);
    DeleteCurrent(k); // trying to fix typo
    expectLatex('1+2.5◼^{3}', k);
    MoveUp(k); 
    expectLatex('1+2.5◻^{3◼}', k); // Huh? Let's delete that empty placeholder!
    MoveDown(k);
    expectLatex('1+2.5◼^{3}', k);
    // Act
    DeleteCurrent(k);
    MoveUp(k);
    // Assert
    expectLatex('1+2.5^{3◼}', k);
  });

  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user)', () =>
  {
    // Arrange
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom("2"));
    Insert(k, new DecimalSeparatorAtom());
    Insert(k, new DigitAtom("5"));
    Insert(k, new RawAtom('+')); // oops, typo!
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    Insert(k, new DigitAtom("3"));
    MoveDown(k);
    DeleteCurrent(k); // trying to fix typo
    expectLatex('2.5◼^{3}', k);
    MoveUp(k); 
    expectLatex('2.5◻^{3◼}', k); // Huh? Let's delete that empty placeholder!
    MoveDown(k);
    expectLatex('2.5◼^{3}', k);
    // Act
    DeleteCurrent(k);
    MoveUp(k);
    // Assert
    expectLatex('2.5^{3◼}', k);
  });

  it('inverse of TryEncapsulateCurrent - execution path with digits', () =>
  {
    // Arrange
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom("2"));
    let p = new MultiplePlaceholdersAscendingRawAtom('', '^{', '}');
    TryInsertWithEncapsulateCurrent(k, p);
    let d3 = new DigitAtom("3");
    Insert(k, d3);
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    expectLatex('2^{3^{◼}}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('2^{3◼}', k);
    assert.isTrue(d3.ParentPlaceholder == p.Placeholders[1])
    DeleteCurrent(k);
    expectLatex('2^{◼}', k);
  });
});