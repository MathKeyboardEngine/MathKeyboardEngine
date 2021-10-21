import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { selectRight } from '../../../../../src/KeyboardEngine/Functions/Selection/selectRight';
import { selectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/selectLeft';
import { inSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/inSelectionMode';
import { assert } from 'chai';
import { StandardBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { TreeNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { nameof } from '../../../../helpers/nameof';

describe(selectRight.name, () => {
  it(`can select a single ${TreeNode.name} and the selection is correctly displayed if the left exlusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    expectLatex('1◼2', k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it(`can select a single ${TreeNode.name} and the selection is correctly displayed if the left exlusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    moveLeft(k);
    expectLatex('◼1', k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it(`can select multiple ${TreeNode.name}s and the selection is correctly displayed if the left exlusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('1◼23', k);
    // Act
    selectRight(k);
    selectRight(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
  });

  it(`can select multiple ${TreeNode.name}s and the selection is correctly displayed if the left exlusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('◼12', k);
    // Act
    selectRight(k);
    selectRight(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
  });

  it('stays in selection mode after deselecting until nothing is selected', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    selectRight(k);
    // Assert
    expectLatex('1◼', k);
    assert.isTrue(inSelectionMode(k));
  });

  it(`does nothing if all on-the-right-available ${TreeNode.name}s are selected and the left exclusive border is a ${Placeholder.name} (and the ${nameof<KeyboardMemory>('syntaxTreeRoot')})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    moveLeft(k);
    expectLatex('◼1', k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it(`does nothing if all on-the-right-available ${TreeNode.name}s are selected and the left exclusive border is a ${TreeNode.name} (and the ${nameof<TreeNode>(
    'parentPlaceholder'
  )} is the ${nameof<KeyboardMemory>('syntaxTreeRoot')})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    expectLatex('1◼2', k);
    selectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it(`can break out of the current ${Placeholder.name} - case: set a ${Placeholder.name} as the new ${nameof<KeyboardMemory>('current')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    insert(k, new DigitNode('2'));
    moveRight(k);
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('x'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{◼2}+x`, k);
    selectRight(k);
    expectLatex(String.raw`\sqrt{\colorbox{blue}{2}}+x`, k);
    // Act & Assert
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{\sqrt{2}}+x`, k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{\sqrt{2}+}x`, k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{\sqrt{2}+x}`, k);
  });

  it(`can break out of the current ${Placeholder.name} - case: set a ${TreeNode.name} as the new ${nameof<KeyboardMemory>('current')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('3'));
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    insert(k, new DigitNode('2'));
    moveRight(k);
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('x'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`3\sqrt{◼2}+x`, k);
    selectRight(k);
    expectLatex(String.raw`3\sqrt{\colorbox{blue}{2}}+x`, k);
    // Act & Assert
    selectRight(k);
    expectLatex(String.raw`3\colorbox{blue}{\sqrt{2}}+x`, k);
    selectRight(k);
    expectLatex(String.raw`3\colorbox{blue}{\sqrt{2}+}x`, k);
    selectRight(k);
    expectLatex(String.raw`3\colorbox{blue}{\sqrt{2}+x}`, k);
  });
});
