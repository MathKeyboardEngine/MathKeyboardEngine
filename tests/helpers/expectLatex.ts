import { expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../src/LatexConfiguration';
import { getEditModeLatex } from '../../src/GetLatex/getEditModeLatex';
import { getViewModeLatex } from '../../src/GetLatex/getViewModeLatex';

const testConfig = new LatexConfiguration();
testConfig.activePlaceholderShape = '▦';
testConfig.passivePlaceholderShape = '⬚';
testConfig.selectionHightlightStart = String.raw`\colorbox{blue}{`;
testConfig.selectionHightlightEnd = '}';

export function expectLatex(latex: string, k: KeyboardMemory): void {
  expect(latex).to.equal(getEditModeLatex(k, testConfig));
}

export function expectViewModeLatex(latex: string, k: KeyboardMemory): void {
  expect(latex).to.equal(getViewModeLatex(k, testConfig));
}
