import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, DescendingBranchingNode, DigitNode, moveRight, moveDown, moveUp } from '../../../../../src/x';

describe('NthRoot', () => {
  it('basic test', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\sqrt[`, ']{', '}'));
    expectLatex(String.raw`\sqrt[▦]{⬚}`, k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    expectLatex(String.raw`\sqrt[3]{▦}`, k);
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('7'));
    expectLatex(String.raw`\sqrt[3]{27▦}`, k);
  });

  it('up/down (including impossible up/down requests)', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\sqrt[`, ']{', '}'));
    moveDown(k);
    expectLatex(String.raw`\sqrt[⬚]{▦}`, k);
    moveDown(k);
    expectLatex(String.raw`\sqrt[⬚]{▦}`, k);

    moveUp(k);
    expectLatex(String.raw`\sqrt[▦]{⬚}`, k);
    moveUp(k);
    expectLatex(String.raw`\sqrt[▦]{⬚}`, k);
  });
});
