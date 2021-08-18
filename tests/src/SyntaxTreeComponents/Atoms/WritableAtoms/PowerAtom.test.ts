import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MultiplePlaceholdersAscendingRawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersAscendingRawAtom';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

describe("Power", () =>
{
  it('pow 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex('3^{4◼}', k);
  });

  it('pow 3 up 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    Insert(k, new DigitAtom(3));
    MoveUp(k);
    Insert(k, new DigitAtom(4));
    expectLatex('3^{4◼}', k);
  });

  it('3 encapsulatedBy(pow.Base)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(3));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}')));
    expectLatex('3^{◼}', k);
  });

  it('pow 3 up down', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    Insert(k, new DigitAtom(3));
    MoveUp(k);
    Insert(k, new DigitAtom(4));
    MoveDown(k);
    expectLatex('3◼^{4}', k);
  });

  it('pow can be left empty, moving out and back in', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    expectLatex('◼^{◻}', k);
    MoveLeft(k);
    expectLatex('◼◻^{◻}', k);
    MoveRight(k);
    expectLatex('◼^{◻}', k);
  });

  it('impossible up/down requests in empty power should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    MoveUp(k);
    expectLatex('◻^{◼}', k);
    MoveUp(k);
    expectLatex('◻^{◼}', k);
    MoveDown(k);
    expectLatex('◼^{◻}', k);
    MoveDown(k);
    expectLatex('◼^{◻}', k);
  });

  it('impossible up/down requests in filled power should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersAscendingRawAtom('', '^{', '}'));
    Insert(k, new DigitAtom(3));
    expectLatex('3◼^{◻}', k);
    MoveDown(k);
    expectLatex('3◼^{◻}', k);
    MoveUp(k);
    expectLatex('3^{◼}', k);
    Insert(k, new DigitAtom(4));
    expectLatex('3^{4◼}', k);
    MoveUp(k);
    expectLatex('3^{4◼}', k);
  });
});