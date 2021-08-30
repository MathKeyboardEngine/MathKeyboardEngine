import { describe } from "mocha";
import { expect } from "chai";
import { KeyboardMemory } from "../../../../../src/KeyboardEngine/KeyboardMemory";
import { PopSelection } from "../../../../../src/KeyboardEngine/Functions/Selection/PopSelection";
import { EnterSelectionMode } from "../../../../../src/KeyboardEngine/Functions/Selection/EnterSelectionMode";

describe(PopSelection.name, () => {
  it("throws if not in selection mode", () => {
    const k = new KeyboardMemory();
    expect(() => PopSelection(k)).throws();
  });

  it("In selection mode: returns an empty array when nothing is selected", () => {
    const k = new KeyboardMemory();
    EnterSelectionMode(k);
    expect(0).to.equal(PopSelection(k).length);
  });
});
