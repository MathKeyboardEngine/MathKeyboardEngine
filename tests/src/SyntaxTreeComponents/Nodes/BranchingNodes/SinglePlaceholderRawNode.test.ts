import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { SinglePlaceholderRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/SinglePlaceholderRawNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';

describe(SinglePlaceholderRawNode.name, () =>
{
  it('sqrt 3 right left left left', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SinglePlaceholderRawNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    Insert(k, new DigitNode("3"));
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

  it('sqrt del', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SinglePlaceholderRawNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    DeleteCurrent(k);
    expectLatex('◼', k);
  });
});