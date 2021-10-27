import { assert } from "chai";
import { endsWithLatexCommand } from "../../../../src/helpers/stringhelpers/endsWithLatexCommand";

describe(endsWithLatexCommand.name, () => {
    it('returns true for latex commands with a slash and letters', () => {
      for (let s of [String.raw`\pi`, String.raw`2\pi`, String.raw`2\times\pi`, String.raw`\sin`]) {
          assert.isTrue(endsWithLatexCommand(s));
      }
    });
    it('returns false for other stuff', () => {
        for (let s of [String.raw`\pi^2`, String.raw`\sin6`, String.raw`\sin a`, '', String.raw`\|`, String.raw`\\` ]) {
            assert.isFalse(endsWithLatexCommand(s));
        }
    });
});