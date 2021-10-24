import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../helpers/expectLatex';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { selectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/selectLeft';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { enterSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/enterSelectionMode';
import { inSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/inSelectionMode';
import { selectRight } from '../../../../../src/KeyboardEngine/Functions/Selection/selectRight';
import { assert } from 'chai';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { TreeNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/TreeNode';
import { nameof } from '../../../../helpers/nameof';

describe(selectLeft.name, () => {
  it(`can select a single ${TreeNode.name} and the selection is correctly displayed if the left exlusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    // Act
    selectLeft(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it(`can select a single ${TreeNode.name} and the selection is correctly displayed if the left exlusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    expectLatex('1◼', k);
    // Act
    selectLeft(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it(`can select multiple ${TreeNode.name}s and the selection is correctly displayed if the left exlusive border is a ${TreeNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    expectLatex('123◼', k);
    // Act
    selectLeft(k);
    selectLeft(k);
    // Assert
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
  });

  it(`can select multiple ${TreeNode.name}s and the selection is correctly displayed if the left exlusive border is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    expectLatex('12◼', k);
    // Act
    selectLeft(k);
    selectLeft(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
  });

  it(`does nothing if ${nameof<KeyboardMemory>('current')} is the ${nameof<KeyboardMemory>('syntaxTreeRoot')}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    moveLeft(k);
    expectLatex('◼1', k);
    enterSelectionMode(k);
    // Act
    selectLeft(k);
    // Assert
    expectLatex('◼1', k);
  });

  it(`does nothing if all on-the-left-available ${TreeNode.name}s are selected (and ${nameof<KeyboardMemory>('current')} is the ${nameof<KeyboardMemory>('syntaxTreeRoot')})`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    selectLeft(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it('stays in selection mode after deselecting until nothing is selected', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    moveLeft(k);
    selectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act
    selectLeft(k);
    // Assert
    expectLatex('◼1', k);
    assert.isTrue(inSelectionMode(k));
  });

  it(`can break out of the current ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('x'));
    expectLatex(String.raw`2^{x◼}`, k);
    selectLeft(k);
    expectLatex(String.raw`2^{\colorbox{blue}{x}}`, k);
    // Act
    selectLeft(k);
    // Assert
    expectLatex(String.raw`\colorbox{blue}{2^{x}}`, k);
  });
});
