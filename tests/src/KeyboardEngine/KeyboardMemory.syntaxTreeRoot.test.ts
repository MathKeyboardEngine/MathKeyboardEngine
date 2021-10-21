import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../src/KeyboardEngine/KeyboardMemory';
import { Placeholder } from '../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { deleteCurrent } from '../../../src/KeyboardEngine/Functions/Deletion/deleteCurrent';
import { insert } from '../../../src/KeyboardEngine/Functions/Insertion/insert';
import { expectLatex } from '../../helpers/expectLatex';
import { moveLeft } from '../../../src/KeyboardEngine/Functions/Navigation/moveLeft';
import { moveDown } from '../../../src/KeyboardEngine/Functions/Navigation/moveDown';
import { moveUp } from '../../../src/KeyboardEngine/Functions/Navigation/moveUp';
import { moveRight } from '../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { DigitNode } from '../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DescendingBranchingNode } from '../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { nameof } from '../../helpers/nameof';

describe(KeyboardMemory.name, () => {
  describe(nameof<KeyboardMemory>('syntaxTreeRoot'), () => {
    it('is equal to Current on KeyboardMemory initialization', () => {
      const k = new KeyboardMemory();
      assert.isNotNull(k.syntaxTreeRoot);
      expect(k.syntaxTreeRoot).to.be.equal(k.current);
    });

    it('is a Placeholder', () => {
      const k = new KeyboardMemory();
      assert.isTrue(k.syntaxTreeRoot instanceof Placeholder);
      expectLatex('◼', k);
    });

    it('cannot be deleted', () => {
      const k = new KeyboardMemory();
      deleteCurrent(k);
      assert.isNotNull(k.current);
      assert.isTrue(k.current instanceof Placeholder);
    });

    it('is reachable via the chain of parents', () => {
      const k = new KeyboardMemory();

      const fraction1 = new DescendingBranchingNode(String.raw`\frac{`, '}{', '}');
      insert(k, fraction1);
      assert.isTrue(k.current === fraction1.placeholders[0]);

      const fraction2 = new DescendingBranchingNode(String.raw`\frac{`, '}{', '}');
      insert(k, fraction2);
      assert.isTrue(k.current === fraction2.placeholders[0]);

      assert.isTrue(k.current instanceof Placeholder);
      const calculatedRoot = (k.current as Placeholder).parentNode!.parentPlaceholder.parentNode!.parentPlaceholder;
      assert.isNull(calculatedRoot.parentNode);
      expect(k.syntaxTreeRoot).to.equal(calculatedRoot);
    });

    it('impossible move requests in empty root placeholder do not throw', () => {
      const k = new KeyboardMemory();
      expectLatex('◼', k);
      moveLeft(k);
      expectLatex('◼', k);
      moveDown(k);
      expectLatex('◼', k);
      moveUp(k);
      expectLatex('◼', k);
      moveRight(k);
      expectLatex('◼', k);
    });

    it('impossible move requests in filled root placeholder do not throw', () => {
      const k = new KeyboardMemory();
      insert(k, new DigitNode('1'));
      expectLatex('1◼', k);
      moveUp(k);
      expectLatex('1◼', k);
      moveRight(k);
      expectLatex('1◼', k);
      moveDown(k);
      expectLatex('1◼', k);
      moveLeft(k);
      expectLatex('◼1', k);
      moveDown(k);
      expectLatex('◼1', k);
      moveLeft(k);
      expectLatex('◼1', k);
      moveUp(k);
      expectLatex('◼1', k);
    });
  });
});
