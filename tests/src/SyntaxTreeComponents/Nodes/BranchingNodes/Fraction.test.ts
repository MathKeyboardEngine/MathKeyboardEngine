import { describe } from 'mocha';
import { expectLatex } from '../../../../helpers/expectLatex';
import { KeyboardMemory, insert, DigitNode, moveRight, moveDown, insertWithEncapsulateCurrent, deleteLeft, moveUp, moveLeft, DescendingBranchingNode } from '../../../../../src/x';

describe('Fraction', () => {
  it('frac left right right right', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveLeft(k);
    expectLatex(String.raw`▦\frac{⬚}{⬚}`, k);
    moveRight(k);
    expectLatex(String.raw`\frac{▦}{⬚}`, k);
    moveRight(k);
    expectLatex(String.raw`\frac{⬚}{▦}`, k);
    moveRight(k);
    expectLatex(String.raw`\frac{⬚}{⬚}▦`, k);
  });

  it('frac 3 right 4', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('3'));
    moveRight(k);
    insert(k, new DigitNode('4'));
    expectLatex(String.raw`\frac{3}{4▦}`, k);
  });

  it('frac 3 down 4', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('3'));
    moveDown(k);
    insert(k, new DigitNode('4'));
    expectLatex(String.raw`\frac{3}{4▦}`, k);
  });

  it('3 encapsulatedBy(frac.Numerator)', () => {
    const k = new KeyboardMemory();
    insert(k, new DigitNode('3'));
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{3}{▦}`, k);
  });

  it('delete empty frac from numerator', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{▦}{⬚}`, k);
    deleteLeft(k);
    expectLatex('▦', k);
  });

  it('delete empty frac from denominator', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveDown(k);
    expectLatex(String.raw`\frac{⬚}{▦}`, k);
    deleteLeft(k);
    expectLatex('▦', k);
  });

  it('delete empty frac from the right', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveDown(k);
    moveRight(k);
    expectLatex(String.raw`\frac{⬚}{⬚}▦`, k);
    deleteLeft(k);
    expectLatex('▦', k);
  });

  it('deleting frac from denominator releases non-empty numerator', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveDown(k);
    insert(k, new DigitNode('3'));
    moveRight(k);
    expectLatex(String.raw`\frac{12}{3}▦`, k);

    deleteLeft(k);
    expectLatex(String.raw`\frac{12}{▦}`, k);
    deleteLeft(k);
    expectLatex('12▦', k);
  });

  it('up in filled fraction', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    moveDown(k);
    insert(k, new DigitNode('3'));
    expectLatex(String.raw`\frac{12}{3▦}`, k);

    moveUp(k);
    expectLatex(String.raw`\frac{12▦}{3}`, k);
  });

  it('impossible up/down requests in filled fraction should not throw', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('1'));
    expectLatex(String.raw`\frac{1▦}{⬚}`, k);
    moveUp(k);
    expectLatex(String.raw`\frac{1▦}{⬚}`, k);

    moveDown(k);
    insert(k, new DigitNode('2'));
    expectLatex(String.raw`\frac{1}{2▦}`, k);
    moveDown(k);
    expectLatex(String.raw`\frac{1}{2▦}`, k);
  });

  it('impossible up/down requests in empty fraction should not throw', () => {
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    moveDown(k);
    expectLatex(String.raw`\frac{⬚}{▦}`, k);
    moveDown(k);
    expectLatex(String.raw`\frac{⬚}{▦}`, k);
    moveUp(k);
    expectLatex(String.raw`\frac{▦}{⬚}`, k);
    moveUp(k);
    expectLatex(String.raw`\frac{▦}{⬚}`, k);
  });
});
