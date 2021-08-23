import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MultiplePlaceholdersDescendingRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersDescendingRawNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';

describe("NthRoot", () =>
{
  it('basic test', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\sqrt[`, ']{', '}'));
    expectLatex(String.raw`\sqrt[◼]{◻}`, k);
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    expectLatex(String.raw`\sqrt[3]{◼}`, k);
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("7"));
    expectLatex(String.raw`\sqrt[3]{27◼}`, k);
  });

  it('up/down (including impossible up/down requests)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\sqrt[`, ']{', '}'));
    MoveDown(k);
    expectLatex(String.raw`\sqrt[◻]{◼}`, k);
    MoveDown(k);
    expectLatex(String.raw`\sqrt[◻]{◼}`, k);

    MoveUp(k);
    expectLatex(String.raw`\sqrt[◼]{◻}`, k);
    MoveUp(k);
    expectLatex(String.raw`\sqrt[◼]{◻}`, k);
  });
});