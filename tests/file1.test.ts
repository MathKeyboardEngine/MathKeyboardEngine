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
    describe('double the number via a a class', () =>
    {
      it ('should be able to use the class name' , () =>
      {
        expect(f1.SomeClass.multiplyBy2(4))
        .to
        .equal(8);
      });
    });
  });
