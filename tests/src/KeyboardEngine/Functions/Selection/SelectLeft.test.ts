import { describe } from 'mocha';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { EnterSelectionMode } from '../../../../../src/KeyboardEngine/Functions/Selection/EnterSelectionMode';


describe(SelectLeft.name, () =>
{
  it('a single Node, with left border is Node', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it('a single Node, with left border is Placeholder', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    expectLatex('1◼', k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it('multiple Nodes, with left border is Node', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    expectLatex('123◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
  });

  it('multiple Nodes, with left border is Placeholder', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
  });

  it('If Current is Placeholder, then SelectLeft does nothing.', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    MoveLeft(k);
    expectLatex('◼1', k);
    EnterSelectionMode(k);
    SelectLeft(k);
    expectLatex('◼1', k);
  });

  it('If already maximum times SelectLeft used, then SelectLeft does nothing.', () =>
  {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });
});