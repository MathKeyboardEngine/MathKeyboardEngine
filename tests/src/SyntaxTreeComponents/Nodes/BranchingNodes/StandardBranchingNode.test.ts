import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { StandardBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';

describe(StandardBranchingNode.name, () => {
  it('sqrt 3 right left left left right', () => {
    const k = new KeyboardMemory();
    Insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    Insert(k, new DigitNode('3'));
    MoveRight(k);
    expectLatex(String.raw`\sqrt{3}◼`, k);
    MoveLeft(k);
    expectLatex(String.raw`\sqrt{3◼}`, k);
    MoveLeft(k);
    expectLatex(String.raw`\sqrt{◼3}`, k);
    MoveLeft(k);
    expectLatex(String.raw`◼\sqrt{3}`, k);
    MoveRight(k);
    expectLatex(String.raw`\sqrt{◼3}`, k);
  });

  it('sqrt right left left left right', () => {
    const k = new KeyboardMemory();
    Insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    MoveRight(k);
    expectLatex(String.raw`\sqrt{◻}◼`, k);
    MoveLeft(k);
    expectLatex(String.raw`\sqrt{◼}`, k);
    MoveLeft(k);
    expectLatex(String.raw`◼\sqrt{◻}`, k);
    MoveRight(k);
    expectLatex(String.raw`\sqrt{◼}`, k);
  });

  it('sqrt del', () => {
    const k = new KeyboardMemory();
    Insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    DeleteCurrent(k);
    expectLatex('◼', k);
  });
});
