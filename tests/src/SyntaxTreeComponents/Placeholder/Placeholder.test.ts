import { expectViewModeLatex } from '../../../helpers/expectLatex';
import { nameof } from '../../../helpers/nameof';
import { insert } from '../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { KeyboardMemory, StandardLeafNode, Placeholder } from '../../../../src/x';

describe(Placeholder.name, () => {
  describe(String.raw`The minimum amount of required space is added by ${nameof<Placeholder>('getLatex')}`, () => {
    for (const data of [
      [String.raw`\sin`, String.raw`a`, String.raw`\sin a`],
      [String.raw`\sin`, String.raw`2`, String.raw`\sin2`],
      [String.raw`2`, String.raw`\pi`, String.raw`2\pi`],
      [String.raw`a`, String.raw`\pi`, String.raw`a\pi`],
      [String.raw`\alpha`, String.raw`\pi`, String.raw`\alpha\pi`],
      [String.raw`\pi`, String.raw`\pi`],
    ]) {
      it(data[data.length - 1], () => {
        const k = new KeyboardMemory();
        for (let i = 0; i < data.length - 1; i++) {
          insert(k, new StandardLeafNode(data[i]));
        }
        expectViewModeLatex(data[data.length - 1], k);
      });
    }
  });
});
