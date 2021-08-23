import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MultiplePlaceholdersAscendingRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersAscendingRawNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { RawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/RawNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';

describe(DeleteCurrent.name, () =>
{
  it('can also be used to "delete empty placeholders in some cases" (in the experience of the user)', () =>
  {
    // Arrange
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new RawNode('+'));
    Insert(k, new DigitNode("2"));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode("5"));
    Insert(k, new RawNode('+')); // oops, typo!
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}'));
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
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode("5"));
    Insert(k, new RawNode('+')); // oops, typo!
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}'));
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
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    let p = new MultiplePlaceholdersAscendingRawNode('', '^{', '}');
    TryInsertWithEncapsulateCurrent(k, p);
    let d3 = new DigitNode("3");
    Insert(k, d3);
    TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}'));
    expectLatex('2^{3^{◼}}', k);

    // Act & assert
    DeleteCurrent(k);
    expectLatex('2^{3◼}', k);
    assert.isTrue(d3.ParentPlaceholder == p.Placeholders[1])
    DeleteCurrent(k);
    expectLatex('2^{◼}', k);
  });
});