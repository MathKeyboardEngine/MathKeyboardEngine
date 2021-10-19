import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { StandardBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { expectLatex } from '../../../../helpers/expectLatex';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { deleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Deletion/deleteCurrent';

describe(StandardBranchingNode.name, () => {
  it('sqrt 3 right left left left right', () => {
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    expectLatex(String.raw`\sqrt{3}◼`, k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{3◼}`, k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{◼3}`, k);
    moveLeft(k);
    expectLatex(String.raw`◼\sqrt{3}`, k);
    moveRight(k);
    expectLatex(String.raw`\sqrt{◼3}`, k);
  });

  it('sqrt right left left left right', () => {
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    moveRight(k);
    expectLatex(String.raw`\sqrt{◻}◼`, k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{◼}`, k);
    moveLeft(k);
    expectLatex(String.raw`◼\sqrt{◻}`, k);
    moveRight(k);
    expectLatex(String.raw`\sqrt{◼}`, k);
  });

  it('sqrt del', () => {
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{◼}`, k);
    deleteCurrent(k);
    expectLatex('◼', k);
  });
});
