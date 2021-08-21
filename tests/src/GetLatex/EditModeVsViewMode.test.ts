import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { LatexConfiguration } from '../../../src/LatexConfiguration';
import { KeyboardMemory } from '../../../src/KeyboardEngine/KeyboardMemory';
import { Insert } from '../../../src/KeyboardEngine/Functions/Insert/Insert';
import { GetViewModeLatex } from '../../../src/GetLatex/GetViewModeLatex';
import { GetEditModeLatex } from '../../../src/GetLatex/GetEditModeLatex';
import { DigitAtom } from '../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveDown } from '../../../src/KeyboardEngine/Functions/Navigation/MoveDown';
import { MultiplePlaceholdersDescendingRawAtom } from '../../../src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersDescendingRawAtom';

const config = new LatexConfiguration();
config.activePlaceholderNucleus = '◼';
config.passivePlaceholderNucleus = '◻';

describe("GetLatex", () =>
{
  it('WritableAtom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'));

    expect(String.raw`\frac{◼}{◻}`).to.equal(GetEditModeLatex(k, config));
    expect(String.raw`\frac{◻}{◻}`).to.equal(GetViewModeLatex(k, config));
    expect(String.raw`\frac{◻}{◻}`).to.equal(GetViewModeLatex(new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}'), config));
  });

  it('ReadonlyAtom', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom("3"));
    expect(`3◼`).to.equal(GetEditModeLatex(k, config));
    expect(`3`).to.equal(GetViewModeLatex(k, config));
    expect(`3`).to.equal(GetViewModeLatex(new DigitAtom("3"), config));
  });

  it('Placeholder', () =>
  {
    let k = new KeyboardMemory();
    let fraction = new MultiplePlaceholdersDescendingRawAtom(String.raw`\frac{`, '}{', '}');
    Insert(k, fraction);
    Insert(k, new DigitAtom("3"));
    MoveDown(k);
    expect(String.raw`\frac{3}{◼}`).to.equal(GetEditModeLatex(k, config));
    expect('3').to.equal(GetViewModeLatex(fraction.Placeholders[0], config));
  });
});