import { expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../src/LatexConfiguration';
import { GetEditModeLatex } from '../../src/GetLatex/GetEditModeLatex';

const testConfig = new LatexConfiguration();
testConfig.activePlaceholderShape = '◼';
testConfig.passivePlaceholderShape = '◻';
testConfig.selectionHightlightStart = String.raw`\colorbox{blue}{`;
testConfig.selectionHightlightEnd = '}';

export function expectLatex(latex: string, k: KeyboardMemory): void {
  expect(latex).to.equal(GetEditModeLatex(k, testConfig));
}
