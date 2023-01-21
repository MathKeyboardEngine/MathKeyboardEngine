import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory, insert, LatexConfiguration, AscendingBranchingNode, getEditModeLatex, Placeholder } from '../../src/x';

describe(LatexConfiguration.name, () => {
  it(`allows customizing the shape of the "cursor" and empty ${Placeholder.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    const myLatexConfiguration = new LatexConfiguration();
    // Act
    myLatexConfiguration.activePlaceholderShape = 'myCursor';
    myLatexConfiguration.passivePlaceholderShape = 'myEmptyPlace';
    // Assert
    expect('myCursor^{myEmptyPlace}').to.equal(getEditModeLatex(k, myLatexConfiguration));
  });

  it(`allows customizing the color of the "cursor" and ${Placeholder.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    const myLatexConfiguration = new LatexConfiguration();
    myLatexConfiguration.activePlaceholderShape = String.raw`\blacksquare`;
    myLatexConfiguration.passivePlaceholderShape = String.raw`\blacksquare`;
    // Act
    myLatexConfiguration.activePlaceholderColor = 'orange';
    myLatexConfiguration.passivePlaceholderColor = 'gray';
    // Assert
    expect(String.raw`{\color{orange}\blacksquare}^{{\color{gray}\blacksquare}}`).to.equal(getEditModeLatex(k, myLatexConfiguration));
  });
});
