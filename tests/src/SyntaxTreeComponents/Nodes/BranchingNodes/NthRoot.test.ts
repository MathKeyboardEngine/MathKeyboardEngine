import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { expectLatex } from '../../../../helpers/expectLatex';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { moveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';

describe('NthRoot', () => {
  it('basic test', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\sqrt[`, ']{', '}'));
    expectLatex(String.raw`\sqrt[◼]{◻}`, k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    expectLatex(String.raw`\sqrt[3]{◼}`, k);
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('7'));
    expectLatex(String.raw`\sqrt[3]{27◼}`, k);
  });

  it('up/down (including impossible up/down requests)', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\sqrt[`, ']{', '}'));
    moveDown(k);
    expectLatex(String.raw`\sqrt[◻]{◼}`, k);
    moveDown(k);
    expectLatex(String.raw`\sqrt[◻]{◼}`, k);

    moveUp(k);
    expectLatex(String.raw`\sqrt[◼]{◻}`, k);
    moveUp(k);
    expectLatex(String.raw`\sqrt[◼]{◻}`, k);
  });
});
