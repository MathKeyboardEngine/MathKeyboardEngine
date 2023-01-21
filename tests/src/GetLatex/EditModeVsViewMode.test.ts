import { describe } from 'mocha';
import { expect } from 'chai';
import { LatexConfiguration, KeyboardMemory, insert, getViewModeLatex, getEditModeLatex, DigitNode, moveDown, DescendingBranchingNode, BranchingNode, LeafNode, Placeholder } from '../../../src/x';

const config = new LatexConfiguration();
config.activePlaceholderShape = '▦';
config.passivePlaceholderShape = '⬚';

describe(`${getEditModeLatex.name} and ${getViewModeLatex.name}`, () => {
  it(`can get the LaTeX for a ${BranchingNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Act & Assert
    expect(String.raw`\frac{▦}{⬚}`).to.equal(getEditModeLatex(k, config));
    expect(String.raw`\frac{⬚}{⬚}`).to.equal(getViewModeLatex(k, config));
    expect(String.raw`\frac{⬚}{⬚}`).to.equal(getViewModeLatex(new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'), config));
  });

  it(`can get the LaTeX for a ${LeafNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('3'));
    // Act & Assert
    expect(`3▦`).to.equal(getEditModeLatex(k, config));
    expect(`3`).to.equal(getViewModeLatex(k, config));
    expect(`3`).to.equal(getViewModeLatex(new DigitNode('3'), config));
  });

  it(`can get the LaTeX for a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    const fraction = new DescendingBranchingNode(String.raw`\frac{`, '}{', '}');
    insert(k, fraction);
    insert(k, new DigitNode('3'));
    moveDown(k);
    // Act & Assert
    expect(String.raw`\frac{3}{▦}`).to.equal(getEditModeLatex(k, config));
    expect('3').to.equal(getViewModeLatex(fraction.placeholders[0], config));
  });
});
