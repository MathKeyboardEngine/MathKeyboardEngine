import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert/Insert';
import { LatexConfiguration } from '../../src/LatexConfiguration';
import { AscendingBranchingNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { DigitNode } from '../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DecimalSeparatorNode } from '../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { GetEditModeLatex } from '../../src/GetLatex/GetEditModeLatex';
import { GetViewModeLatex } from '../../src/GetLatex/GetViewModeLatex';

describe(LatexConfiguration.name, () =>
{
  it('allows customizing the shape of the "cursor" and placeholders', () =>
  {
    let myLatexConfiguration = new LatexConfiguration();
    myLatexConfiguration.activePlaceholderNucleus = 'myCursor';
    myLatexConfiguration.passivePlaceholderNucleus = 'myEmptyPlace';

    let k = new KeyboardMemory();
    Insert(k, new AscendingBranchingNode('', '^{', '}'));
    expect('myCursor^{myEmptyPlace}').to.equal(GetEditModeLatex(k, myLatexConfiguration));
  });

    it('allows customizing the color of the "cursor" and placeholders', () =>
    {
        let myLatexConfiguration = new LatexConfiguration();
        myLatexConfiguration.activePlaceholderNucleus = '◼';
        myLatexConfiguration.passivePlaceholderNucleus = '◼';
        myLatexConfiguration.activePlaceholderColor = "orange";
        myLatexConfiguration.passivePlaceholderColor = "gray";

        let k = new KeyboardMemory();
        Insert(k, new AscendingBranchingNode('', '^{', '}'));
        expect(String.raw`\color{orange}{◼}^{\color{gray}{◼}}`).to.equal(GetEditModeLatex(k, myLatexConfiguration));
    });
});