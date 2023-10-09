import { expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../../src/LatexConfiguration';
import { getEditModeLatex } from '../../src/GetLatex/getEditModeLatex';
import { getViewModeLatex } from '../../src/GetLatex/getViewModeLatex';
import { TreeNode } from '../../src/SyntaxTreeComponents/Nodes/Base/TreeNode';
import { Placeholder } from '../../src/SyntaxTreeComponents/Placeholder/Placeholder';

const testConfig = new LatexConfiguration();
testConfig.activePlaceholderShape = '▦';
testConfig.passivePlaceholderShape = '⬚';
testConfig.selectionHightlightStart = String.raw`\colorbox{blue}{`;
testConfig.selectionHightlightEnd = '}';

export function expectLatex(latex: string, k: KeyboardMemory): void {
  expect(getEditModeLatex(k, testConfig)).to.equal(latex);
}

export function expectViewModeLatex(latex: string, x: KeyboardMemory | TreeNode | Placeholder): void {
  expect(getViewModeLatex(x, testConfig)).to.equal(latex);
}
