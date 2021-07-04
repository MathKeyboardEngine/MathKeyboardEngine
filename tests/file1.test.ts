import { describe } from 'mocha';
import { expect } from 'chai';
import * as f1 from '../src/file1';


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
