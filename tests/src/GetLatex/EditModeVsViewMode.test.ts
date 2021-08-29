import { describe } from 'mocha';
import { expect } from 'chai';
import { LatexConfiguration } from '../../../src/LatexConfiguration';
import { KeyboardMemory } from '../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../src/KeyboardEngine/Functions/Insert/Insert';
import { GetViewModeLatex } from '../../../src/GetLatex/GetViewModeLatex';
import { GetEditModeLatex } from '../../../src/GetLatex/GetEditModeLatex';
import { DigitNode } from '../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveDown } from '../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { DescendingBranchingNode } from '../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';

const config = new LatexConfiguration();
config.activePlaceholderNucleus = '◼';
config.passivePlaceholderNucleus = '◻';

describe("GetLatex", () =>
{
  it('BranchingNode', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));

    expect(String.raw`\frac{◼}{◻}`).to.equal(GetEditModeLatex(k, config));
    expect(String.raw`\frac{◻}{◻}`).to.equal(GetViewModeLatex(k, config));
    expect(String.raw`\frac{◻}{◻}`).to.equal(GetViewModeLatex(new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'), config));
  });

  it('LeafNode', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("3"));
    expect(`3◼`).to.equal(GetEditModeLatex(k, config));
    expect(`3`).to.equal(GetViewModeLatex(k, config));
    expect(`3`).to.equal(GetViewModeLatex(new DigitNode("3"), config));
  });

  it('Placeholder', () =>
  {
    const k = new KeyboardMemory();
    const fraction = new DescendingBranchingNode(String.raw`\frac{`, '}{', '}');
    Insert(k, fraction);
    Insert(k, new DigitNode("3"));
    MoveDown(k);
    expect(String.raw`\frac{3}{◼}`).to.equal(GetEditModeLatex(k, config));
    expect('3').to.equal(GetViewModeLatex(fraction.Placeholders[0], config));
  });
});