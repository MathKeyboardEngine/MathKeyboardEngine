import { expectLatex } from '../../../../helpers/expectLatex';
import { insert, KeyboardMemory, RoundBracketsNode } from '../../../../../src/x';

describe(RoundBracketsNode.name, () => {
  it(String.raw`Default round brackets are \left( and \right`, () => {
    const k = new KeyboardMemory();
    insert(k, new RoundBracketsNode());
    expectLatex(String.raw`\left(▦\right)`, k);
  });

  it(String.raw`can be overridden`, () => {
    const k = new KeyboardMemory();
    insert(k, new RoundBracketsNode('(', ')'));
    expectLatex('(▦)', k);
  });
});
