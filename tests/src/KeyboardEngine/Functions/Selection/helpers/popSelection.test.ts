import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../../src/KeyboardEngine/KeyboardMemory';
import { popSelection } from '../../../../../../src/KeyboardEngine/Functions/Selection/helpers/popSelection';
import { EnterSelectionMode } from '../../../../../../src/KeyboardEngine/Functions/Selection/EnterSelectionMode';

describe(popSelection.name, () => {
  it('throws if not in selection mode', () => {
    const k = new KeyboardMemory();
    expect(() => popSelection(k)).throws();
  });

  it('In selection mode: returns an empty array when nothing is selected', () => {
    const k = new KeyboardMemory();
    EnterSelectionMode(k);
    expect(0).to.equal(popSelection(k).length);
  });
});
