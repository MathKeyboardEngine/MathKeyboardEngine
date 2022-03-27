import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { expectLatex } from '../../../../helpers/expectLatex';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';

describe(StandardLeafNode.name, () => {
  it(`allows customizing the multiplication operator sign even if it is are already in the ${KeyboardMemory.name}'s syntax tree.`, () => {
    // Arrange
    let myMultiplicationSignSetting = String.raw`\times`;
    const k = new KeyboardMemory();
    insert(k, new DigitNode('2'));
    insert(k, new StandardLeafNode(() => myMultiplicationSignSetting));
    insert(k, new StandardLeafNode('a'));
    expectLatex(String.raw`2\times a▦`, k);
    // Act
    myMultiplicationSignSetting = String.raw`\cdot`;
    // Assert
    expectLatex(String.raw`2\cdot a▦`, k);
  });
});
