import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { expectLatex } from '../../../../helpers/expectLatex';

describe(DecimalSeparatorNode.name, () => {
  it(`allows customizing the decimal separator even if it is already in the ${KeyboardMemory.name}'s syntax tree.`, () => {
    // Arrange
    let myDecimalSeparatorSetting = '{,}';
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DecimalSeparatorNode(() => myDecimalSeparatorSetting));
    insert(k, new DigitNode('2'));
    expectLatex('1{,}2◼', k);
    // Act
    myDecimalSeparatorSetting = '.';
    // Assert
    expectLatex('1.2◼', k);
  });
});
