import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../src/KeyboardEngine/KeyboardMemory'
import { Placeholder } from '../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { DeleteCurrent } from '../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent'
import { Insert } from '../../../src/KeyboardEngine/Functions/Insert/Insert';
import { expectLatex } from '../../helpers/expectLatex';
import { MoveLeft } from '../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { MoveDown } from '../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveUp } from '../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { MoveRight } from '../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { DigitAtom } from '../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MultiplePlaceholdersDescendingRawAtom } from '../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersDescendingRawAtom';

describe(KeyboardMemory.name, () => {

  describe('SyntaxTreeRoot', () =>
  {
    it('is equal to Current on KeyboardMemory initialization', () => {
      let k = new KeyboardMemory();
      assert.isNotNull(k.SyntaxTreeRoot);
      expect(k.SyntaxTreeRoot).to.be.equal(k.Current);
    });

    it('is a Placeholder', () =>
    {
      let k = new KeyboardMemory();
      assert.isTrue(k.SyntaxTreeRoot instanceof Placeholder);
      expectLatex('◼', k);
    });

    it('cannot be deleted', () =>
    {
      let k = new KeyboardMemory();
      DeleteCurrent(k);
      assert.isNotNull(k.Current);
      assert.isTrue(k.Current instanceof Placeholder);
    });

    it('is reachable via the chain of parents', () =>
    {
      let k = new KeyboardMemory();

      let fraction1 = new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}');
      Insert(k, fraction1);
      assert.isTrue(k.Current === fraction1.Placeholders[0])

      let fraction2 = new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}');
      Insert(k, fraction2);
      assert.isTrue(k.Current === fraction2.Placeholders[0])

      assert.isTrue(k.Current instanceof Placeholder)
      let calculatedRoot = (k.Current as Placeholder).ParentAtom!.ParentPlaceholder.ParentAtom!.ParentPlaceholder;
      assert.isNull(calculatedRoot.ParentAtom);
      expect(k.SyntaxTreeRoot).to.equal(calculatedRoot);
    });

    it('impossible move requests in empty root placeholder do not throw', () =>
    {
      let k = new KeyboardMemory();
      expectLatex('◼', k);
      MoveLeft(k);
      expectLatex('◼', k);
      MoveDown(k);
      expectLatex('◼', k);
      MoveUp(k);
      expectLatex('◼', k);
      MoveRight(k);
      expectLatex('◼', k);
    });

    it('impossible move requests in filled root placeholder do not throw', () =>
    {
      let k = new KeyboardMemory();
      Insert(k, new DigitAtom(1));
      expectLatex('1◼', k);
      MoveUp(k);
      expectLatex('1◼', k);
      MoveRight(k);
      expectLatex('1◼', k);
      MoveDown(k);
      expectLatex('1◼', k);
      MoveLeft(k);
      expectLatex('◼1', k);
      MoveDown(k);
      expectLatex('◼1', k);
      MoveLeft(k);
      expectLatex('◼1', k);
      MoveUp(k);
      expectLatex('◼1', k);
    });
  })
});
