import { describe } from 'mocha';
import { expect } from 'chai';
import * as f2 from '../../src/subfolder/file2';

  describe('file2.SubFolderClass', () =>
  {
    describe('call uses 2 files', () =>
    {
      it('should work', () =>
      {
        expect(f2.SubFolderClass.callMyOtherMethod('hello'))
        .to
        .equal('hello hello');
      });
    });
    describe('call uses 1 file', () =>
    {
      it('should work', () =>
      {
        expect(f2.SubFolderClass.newMethod())
        .to
        .equal('booh');
      });
    });
  });
  describe('file2.notInClass', () =>{
    it('should work', () =>{
      expect(f2.notInClass("hi"))
      .equal('hi hi');
    });
  });