import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { expectLatex } from '../../../../helpers/expectLatex';

describe(DecimalSeparatorNode.name, () => {
  it("allows customizing the decimal separator for nodes that are already in the KeyboardMemory's syntax tree.", () => {
    let myDecimalSeparatorSetting = '{,}';

    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DecimalSeparatorNode(() => myDecimalSeparatorSetting));
    Insert(k, new DigitNode('2'));
    expectLatex('1{,}2◼', k);

    myDecimalSeparatorSetting = '.';
    expectLatex('1.2◼', k);
  });
});
