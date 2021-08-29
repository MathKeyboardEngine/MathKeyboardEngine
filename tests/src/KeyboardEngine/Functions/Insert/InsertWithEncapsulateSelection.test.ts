import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { EnterSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/EnterSelectionMode';
import { InsertWithEncapsulateSelection } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateSelection';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';


describe(InsertWithEncapsulateSelection.name, () =>
{
  it('a single Node selected, with left border is Node', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    InsertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`1\frac{2}{◼}`, k);

  });

  it('a single Node selected, with left border is Placeholder', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    expectLatex('1◼', k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    InsertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{1}{◼}`, k);
  });

  it('multiple Nodes selected, with left border is Node', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    expectLatex('123◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
    InsertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`1\frac{23}{◼}`, k);
  });

  it('multiple Nodes selected, with left border is Placeholder', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    InsertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{12}{◼}`, k);
  });

  it('selection mode entered but nothing selected => regular insert', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    EnterSelectionMode(k);
    expectLatex('12◼', k);
    InsertWithEncapsulateSelection(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`12\frac{◼}{◻}`, k);
  });
});