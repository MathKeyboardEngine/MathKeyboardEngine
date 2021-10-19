import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { selectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { enterSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/EnterSelectionMode';
import { insertWithEncapsulateSelectionAndPrevious } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateSelectionAndPrevious';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { StandardBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { TreeNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateCurrent';
import { inSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/InSelectionMode';
import { BranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';

describe(insertWithEncapsulateSelectionAndPrevious.name, () => {
  it(`when a single ${TreeNode.name} is selected and the left exclusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    expectLatex('23◼', k);
    selectLeft(k);
    expectLatex(String.raw`2\colorbox{blue}{3}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('{2}^{3◼}', k);
  });

  it(`when a single ${TreeNode.name} is selected and the left exclusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    expectLatex('2◼', k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{2}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('{◻}^{2◼}', k);
  });

  it(`when multiple ${TreeNode.name}s are selected and the left exclusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    expectLatex('223◼', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`2\colorbox{blue}{23}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('{2}^{23◼}', k);
  });

  it(`when multiple ${TreeNode.name}s are selected and the left exclusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    selectLeft(k);
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('{◻}^{12◼}', k);
  });

  it(`invokes ${insertWithEncapsulateCurrent.name} if ${inSelectionMode.name} but nothing selected`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    enterSelectionMode(k);
    expectLatex('1+12◼', k);
    // Act
    insertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('1+{12}^{◼}', k);
  });

  it(`throws on inserting ${BranchingNode.name} with single ${Placeholder.name}`, () => {
    const k = new KeyboardMemory();
    expect(() => insertWithEncapsulateSelectionAndPrevious(k, new StandardBranchingNode('[', ']'))).to.throw();
  });
});
