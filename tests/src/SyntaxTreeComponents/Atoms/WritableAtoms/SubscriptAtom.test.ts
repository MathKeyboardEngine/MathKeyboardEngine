import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { SubscriptAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/SubscriptAtom';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { MoveDown } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';

describe(SubscriptAtom.name, () =>
{
  it('sub 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SubscriptAtom());
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    expectLatex('3_{4◼}', k);
  });

  it('sub 3 up 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SubscriptAtom());
    Insert(k, new DigitAtom(3));
    MoveDown(k);
    Insert(k, new DigitAtom(4));
    expectLatex('3_{4◼}', k);
  });

  it('3 encapsulatedBy(Base)', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(3));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new SubscriptAtom().Base));
    expectLatex('3_{◼}', k);
  });

  it('subscriptAtom 3 up down', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SubscriptAtom());
    Insert(k, new DigitAtom(3));
    MoveDown(k);
    Insert(k, new DigitAtom(4));
    MoveUp(k);
    expectLatex('3◼_{4}', k);
  });

  it('can be left empty, moving out and back in', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SubscriptAtom());
    expectLatex('◼_{◻}', k);
    MoveLeft(k);
    expectLatex('◼◻_{◻}', k);
    MoveRight(k);
    expectLatex('◼_{◻}', k);
  });

  it('impossible up/down requests in empty atom should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SubscriptAtom());
    MoveDown(k);
    expectLatex('◻_{◼}', k);
    MoveDown(k);
    expectLatex('◻_{◼}', k);
    MoveUp(k);
    expectLatex('◼_{◻}', k);
    MoveUp(k);
    expectLatex('◼_{◻}', k);
  });

  it('impossible up/down requests in filled subscriptAtom should not throw', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SubscriptAtom());
    Insert(k, new DigitAtom(3));
    expectLatex('3◼_{◻}', k);
    MoveUp(k);
    expectLatex('3◼_{◻}', k);
    MoveDown(k);
    expectLatex('3_{◼}', k);
    Insert(k, new DigitAtom(4));
    expectLatex('3_{4◼}', k);
    MoveDown(k);
    expectLatex('3_{4◼}', k);
  });
});