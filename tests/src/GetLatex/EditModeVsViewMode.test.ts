import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { LatexConfiguration } from '../../../src/LatexConfiguration';
import { KeyboardMemory } from '../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../src/KeyboardEngine/Functions/Insert/Insert';
import { GetViewModeLatex } from '../../../src/GetLatex/GetViewModeLatex';
import { GetEditModeLatex } from '../../../src/GetLatex/GetEditModeLatex';
import { DigitNode } from '../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { MoveDown } from '../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MultiplePlaceholdersDescendingRawNode } from '../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersDescendingRawNode';

const config = new LatexConfiguration();
config.activePlaceholderNucleus = '◼';
config.passivePlaceholderNucleus = '◻';

describe("GetLatex", () =>
{
  it('BranchingNode', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'));

    expect(String.raw`\frac{◼}{◻}`).to.equal(GetEditModeLatex(k, config));
    expect(String.raw`\frac{◻}{◻}`).to.equal(GetViewModeLatex(k, config));
    expect(String.raw`\frac{◻}{◻}`).to.equal(GetViewModeLatex(new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'), config));
  });

  it('LeafNode', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("3"));
    expect(`3◼`).to.equal(GetEditModeLatex(k, config));
    expect(`3`).to.equal(GetViewModeLatex(k, config));
    expect(`3`).to.equal(GetViewModeLatex(new DigitNode("3"), config));
  });

  it('Placeholder', () =>
  {
    let k = new KeyboardMemory();
    let fraction = new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}');
    Insert(k, fraction);
    Insert(k, new DigitNode("3"));
    MoveDown(k);
    expect(String.raw`\frac{3}{◼}`).to.equal(GetEditModeLatex(k, config));
    expect('3').to.equal(GetViewModeLatex(fraction.Placeholders[0], config));
  });
});