import { describe } from 'mocha';
import { expect } from 'chai';
import f1 = require('../src/file1');


  describe('DummyTest', () =>
  {
    describe('doubleWord', () =>
    {
      it('should return twice the input separated by a space', () =>
      {
        expect(f1.doubleWord('hello'))
        .to
        .equal('hello hello');
      });
    });
  });
