import { describe } from 'mocha';
import { expect } from 'chai';

  describe('bla', () =>
  {
    describe('nested bla', () =>
    {
      it('should...', () =>
      {
        expect('hello world')
        .to
        .equal('hello world');
      });
    });
  });
