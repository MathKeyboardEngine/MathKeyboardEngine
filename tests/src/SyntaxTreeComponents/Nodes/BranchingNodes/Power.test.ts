import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert_';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight_';
import { moveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveUp_';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent_';
import { expectLatex } from '../../../../helpers/expectLatex';
import { moveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveDown_';
import { moveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveLeft_';

describe('Power', () => {
  it('pow 3 right 4', () => {
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('{', '}^{', '}'));
    insert(k, new DigitNode('3'));
    moveRight(k);
    insert(k, new DigitNode('4'));
    expectLatex('{3}^{4◼}', k);
  });

  it('pow 3 up 4', () => {
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('3'));
    moveUp(k);
    insert(k, new DigitNode('4'));
    expectLatex('3^{4◼}', k);
  });

  it('3 encapsulatedBy(pow.Base)', () => {
    const k = new KeyboardMemory();
    insert(k, new DigitNode('3'));
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{3}^{◼}', k);
  });

  it('pow 3 up down', () => {
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('{', '}^{', '}'));
    insert(k, new DigitNode('3'));
    moveUp(k);
    insert(k, new DigitNode('4'));
    moveDown(k);
    expectLatex('{3◼}^{4}', k);
  });

  it('pow can be left empty, moving out and back in', () => {
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{◼}^{◻}', k);
    moveLeft(k);
    expectLatex('◼{◻}^{◻}', k);
    moveRight(k);
    expectLatex('{◼}^{◻}', k);
  });

  it('impossible up/down requests in empty power should not throw', () => {
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    moveUp(k);
    expectLatex('◻^{◼}', k);
    moveUp(k);
    expectLatex('◻^{◼}', k);
    moveDown(k);
    expectLatex('◼^{◻}', k);
    moveDown(k);
    expectLatex('◼^{◻}', k);
  });

  it('impossible up/down requests in filled power should not throw', () => {
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    insert(k, new DigitNode('3'));
    expectLatex('3◼^{◻}', k);
    moveDown(k);
    expectLatex('3◼^{◻}', k);
    moveUp(k);
    expectLatex('3^{◼}', k);
    insert(k, new DigitNode('4'));
    expectLatex('3^{4◼}', k);
    moveUp(k);
    expectLatex('3^{4◼}', k);
  });
});
