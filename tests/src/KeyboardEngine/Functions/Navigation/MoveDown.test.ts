import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { InsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateCurrent';
import { RoundBracketsNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';


describe(MoveDown.name, () =>
{
  it('MoveDown in ancestor node', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    Insert(k, new RoundBracketsNode('(', ')'));
    expectLatex('{2}^{(◼)}', k);
    MoveDown(k);
    expectLatex('{2◼}^{(◻)}', k);
  });
});