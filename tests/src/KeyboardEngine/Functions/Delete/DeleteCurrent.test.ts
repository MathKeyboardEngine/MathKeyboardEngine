import { describe } from 'mocha';
import { assert } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { InsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { InsertWithEncapsulateSelectionAndPrevious } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateSelectionAndPrevious';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';

describe(DeleteCurrent.name, () =>
{
  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user)', () =>
  {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new DigitNode("2"));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode("5"));
    Insert(k, new StandardLeafNode('+')); // oops, typo!
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    Insert(k, new DigitNode("3"));
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
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode("5"));
    Insert(k, new StandardLeafNode('+')); // oops, typo!
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    Insert(k, new DigitNode("3"));
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
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    const p = new AscendingBranchingNode('', '^{', '}');
    InsertWithEncapsulateCurrent(k, p);
    const d3 = new DigitNode("3");
    Insert(k, d3);
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex('2^{3^{◼}}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('2^{3◼}', k);
    assert.isTrue(d3.ParentPlaceholder == p.Placeholders[1])
    DeleteCurrent(k);
    expectLatex('2^{◼}', k);
  });

  it('delete from first placeholder', () =>
  {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    const p = new AscendingBranchingNode('', '^{', '}');
    InsertWithEncapsulateCurrent(k, p);
    const d3 = new DigitNode("3");
    Insert(k, d3);
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex('2^{3^{◼}}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('2^{3◼}', k);
    assert.isTrue(d3.ParentPlaceholder == p.Placeholders[1])
    DeleteCurrent(k);
    expectLatex('2^{◼}', k);
  });

  it('Inverse of "raise selected to the power of an empty placeholder"', () =>
  {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{◻}^{12◼}', k);
    MoveDown(k);
    expectLatex('{◼}^{12}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('12◼', k);
  });
});