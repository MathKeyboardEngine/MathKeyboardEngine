import { assert } from "chai";
import { isLetter } from "../../../../src/helpers/stringhelpers/isLetter";

describe(isLetter.name, () => {
    it('returns true for letters', () => {
      for (let c of 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
          assert.isTrue(isLetter(c));
      }
    });
    it('returns false for non-letters', () => {
        for (let c of '1234567890!@#$%^&*()-=_+\\|[]{};:\'",./<>?`~') {
            assert.isFalse(isLetter(c));
        }
    });
});