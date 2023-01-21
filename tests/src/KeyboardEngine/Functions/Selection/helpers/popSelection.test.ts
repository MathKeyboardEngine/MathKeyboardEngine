import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory, enterSelectionMode, inSelectionMode } from '../../../../../../src/x';
import { popSelection } from '../../../../../../src/KeyboardEngine/Functions/Selection/helpers/popSelection';

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
