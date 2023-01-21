import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, StandardBranchingNode, DigitNode, moveRight, moveLeft, deleteCurrent } from '../../../../../src/x';

describe(StandardBranchingNode.name, () => {
  it('sqrt 3 right left left left right', () => {
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{▦}`, k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    expectLatex(String.raw`\sqrt{3}▦`, k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{3▦}`, k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{▦3}`, k);
    moveLeft(k);
    expectLatex(String.raw`▦\sqrt{3}`, k);
    moveRight(k);
    expectLatex(String.raw`\sqrt{▦3}`, k);
  });

  it('sqrt right left left right', () => {
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{▦}`, k);
    moveRight(k);
    expectLatex(String.raw`\sqrt{⬚}▦`, k);
    moveLeft(k);
    expectLatex(String.raw`\sqrt{▦}`, k);
    moveLeft(k);
    expectLatex(String.raw`▦\sqrt{⬚}`, k);
    moveRight(k);
    expectLatex(String.raw`\sqrt{▦}`, k);
  });

  it('sqrt del', () => {
    const k = new KeyboardMemory();
    insert(k, new StandardBranchingNode(String.raw`\sqrt{`, '}'));
    expectLatex(String.raw`\sqrt{▦}`, k);
    deleteCurrent(k);
    expectLatex('▦', k);
  });
});
