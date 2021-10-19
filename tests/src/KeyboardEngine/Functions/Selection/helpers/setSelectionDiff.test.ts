import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../../helpers/expectLatex';
import { insert } from '../../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { setSelectionDiff } from '../../../../../../src/KeyboardEngine/Functions/Selection/helpers/setSelectionDiff';
import { selectLeft } from '../../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';

describe(setSelectionDiff.name, () => {
  it('throws at nonsensical request', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    selectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    // Act & assert
    expect(() => setSelectionDiff(k, k.selectionDiff! - 1)).throws(); // Trying to go even more to the left.
  });
});
