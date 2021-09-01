import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../../../../../src/KeyboardEngine/KeyboardMemory';
import { expectLatex } from '../../../../../helpers/expectLatex';
import { Insert } from '../../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { setSelectionDiff } from '../../../../../../src/KeyboardEngine/Functions/Selection/helpers/setSelectionDiff';
import { SelectLeft } from '../../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';

describe(setSelectionDiff.name, () => {
  it('throws at nonsensical request', () => {
    // Arrange
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k); // All nodes (at the left of Current) within the current placeholder have been selected

    // Act & assert
    expect(() => setSelectionDiff(k, k.SelectionDiff! - 1)).throws(); // Trying to go even more to the left.
  });
});
