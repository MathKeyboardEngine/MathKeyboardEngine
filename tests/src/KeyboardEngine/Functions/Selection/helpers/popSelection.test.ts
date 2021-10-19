import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../../src/KeyboardEngine/KeyboardMemory';
import { popSelection } from '../../../../../../src/KeyboardEngine/Functions/Selection/helpers/popSelection';
import { enterSelectionMode } from '../../../../../../src/KeyboardEngine/Functions/Selection/enterSelectionMode_';
import { inSelectionMode } from '../../../../../../src/KeyboardEngine/Functions/Selection/inSelectionMode_';

describe(popSelection.name, () => {
  it(`throws if not in ${inSelectionMode.name}`, () => {
    const k = new KeyboardMemory();
    expect(() => popSelection(k)).throws();
  });

  it(`returns an empty array when ${inSelectionMode.name} but nothing is selected`, () => {
    const k = new KeyboardMemory();
    enterSelectionMode(k);
    expect(0).to.equal(popSelection(k).length);
  });
});
