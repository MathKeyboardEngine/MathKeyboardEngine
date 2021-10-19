import { describe } from 'mocha';
import { expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory';
import { insert } from '../../src/KeyboardEngine/Functions/Insertion/insert';
import { LatexConfiguration } from '../../src/LatexConfiguration';
import { AscendingBranchingNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { getEditModeLatex } from '../../src/GetLatex/getEditModeLatex';
import { Placeholder } from '../../src/SyntaxTreeComponents/Placeholder/Placeholder';

describe(LatexConfiguration.name, () => {
  it(`allows customizing the shape of the "cursor" and empty ${Placeholder.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('{', '}^{', '}'));
    const myLatexConfiguration = new LatexConfiguration();
    // Act
    myLatexConfiguration.activePlaceholderShape = 'myCursor';
    myLatexConfiguration.passivePlaceholderShape = 'myEmptyPlace';
    // Assert
    expect('{myCursor}^{myEmptyPlace}').to.equal(getEditModeLatex(k, myLatexConfiguration));
  });

  it(`allows customizing the color of the "cursor" and ${Placeholder.name}s`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new AscendingBranchingNode('', '^{', '}'));
    const myLatexConfiguration = new LatexConfiguration();
    myLatexConfiguration.activePlaceholderShape = '◼';
    myLatexConfiguration.passivePlaceholderShape = '◼';
    // Act
    myLatexConfiguration.activePlaceholderColor = 'orange';
    myLatexConfiguration.passivePlaceholderColor = 'gray';
    // Assert
    expect(String.raw`\color{orange}{◼}^{\color{gray}{◼}}`).to.equal(getEditModeLatex(k, myLatexConfiguration));
  });
});
