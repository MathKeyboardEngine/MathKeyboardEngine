import { describe } from 'mocha';
import { assert } from 'chai';
import { expectLatex } from '../../../../helpers/expectLatex';
import { nameof } from '../../../../helpers/nameof';
import { KeyboardMemory, insert, DigitNode, moveLeft, selectRight, selectLeft, inSelectionMode, StandardBranchingNode, moveRight, StandardLeafNode, TreeNode, Placeholder } from '../../../../../src/x';

describe(selectRight.name, () => {
  it(`can select a single ${TreeNode.name} and the selection is correctly displayed - case: the exclusive left border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    expectLatex('1▦2', k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it(`can select a single ${TreeNode.name} and the selection is correctly displayed - case: the exclusive left border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    moveLeft(k);
    expectLatex('▦1', k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it(`can select multiple ${TreeNode.name}s and the selection is correctly displayed - case: the exclusive left border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('1▦23', k);
    // Act
    selectRight(k);
    selectRight(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
  });

  it(`can select multiple ${TreeNode.name}s and the selection is correctly displayed - case: the exclusive left border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    moveLeft(k);
    expectLatex('▦12', k);
    // Act
    selectRight(k);
    selectRight(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
  });

  it('stays in selection mode after deselecting', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    selectRight(k);
    // Assert
    expectLatex('1▦', k);
    assert.isTrue(inSelectionMode(k));
  });

  it(`does nothing if all on-the-right-available ${TreeNode.name}s are selected - case: the exclusive left border is a ${Placeholder.name} and the ${nameof<KeyboardMemory>('syntaxTreeRoot')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    moveLeft(k);
    expectLatex('▦1', k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    selectRight(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  // prettier-ignore
  it(`does nothing if all on-the-right-available ${TreeNode.name}s are selected and the exclusive left border is a ${TreeNode.name} and the ${nameof<TreeNode>('parentPlaceholder')} is the ${nameof<KeyboardMemory>('syntaxTreeRoot')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveLeft(k);
    expectLatex('1▦2', k);
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
    insert(k, new StandardLeafNode('a'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{▦2}+a`, k);
    selectRight(k);
    expectLatex(String.raw`\sqrt{\colorbox{blue}{2}}+a`, k);
    // Act & Assert
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{\sqrt{2}}+a`, k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{\sqrt{2}+}a`, k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{\sqrt{2}+a}`, k);
  });

  it(`can break out of the current ${Placeholder.name} - case: set a ${TreeNode.name} as the new ${nameof<KeyboardMemory>('current')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('3'));
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    insert(k, new DigitNode('2'));
    moveRight(k);
    insert(k, new StandardLeafNode('+'));
    insert(k, new StandardLeafNode('a'));
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    moveLeft(k);
    expectLatex(String.raw`3\sqrt{▦2}+a`, k);
    selectRight(k);
    expectLatex(String.raw`3\sqrt{\colorbox{blue}{2}}+a`, k);
    // Act & Assert
    selectRight(k);
    expectLatex(String.raw`3\colorbox{blue}{\sqrt{2}}+a`, k);
    selectRight(k);
    expectLatex(String.raw`3\colorbox{blue}{\sqrt{2}+}a`, k);
    selectRight(k);
    expectLatex(String.raw`3\colorbox{blue}{\sqrt{2}+a}`, k);
  });
});
