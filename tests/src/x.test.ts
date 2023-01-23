import { describe } from 'mocha';
import { expect } from 'chai';

import * as mke from '../../src/x';

describe('flat', () => {
  it('allows importing all from the same root namespace', () => {
    expect(mke.AscendingBranchingNode).is.not.null;
    expect(mke.BranchingNode).is.not.null;
    expect(mke.DecimalSeparatorNode).is.not.null;
    expect(mke.DescendingBranchingNode).is.not.null;
    expect(mke.DigitNode).is.not.null;
    expect(mke.KeyboardMemory).is.not.null;
    expect(mke.LatexConfiguration).is.not.null;
    expect(mke.LatexConfiguration).is.not.null;
    expect(mke.LeafNode).is.not.null;
    expect(mke.MatrixNode).is.not.null;
    expect(mke.Placeholder).is.not.null;
    expect(mke.RoundBracketsNode).is.not.null;
    expect(mke.StandardBranchingNode).is.not.null;
    expect(mke.StandardLeafNode).is.not.null;
    expect(mke.TreeNode).is.not.null;
    expect(mke.deleteLeft).is.not.null;
    expect(mke.deleteRight).is.not.null;
    expect(mke.deleteSelection).is.not.null;
    expect(mke.enterSelectionMode).is.not.null;
    expect(mke.getEditModeLatex).is.not.null;
    expect(mke.getViewModeLatex).is.not.null;
    expect(mke.inSelectionMode).is.not.null;
    expect(mke.insert).is.not.null;
    expect(mke.insertWithEncapsulateCurrent).is.not.null;
    expect(mke.insertWithEncapsulateSelection).is.not.null;
    expect(mke.insertWithEncapsulateSelectionAndPrevious).is.not.null;
    expect(mke.leaveSelectionMode).is.not.null;
    expect(mke.moveDown).is.not.null;
    expect(mke.moveLeft).is.not.null;
    expect(mke.moveRight).is.not.null;
    expect(mke.moveUp).is.not.null;
    expect(mke.selectLeft).is.not.null;
    expect(mke.selectRight).is.not.null;
  });
});
