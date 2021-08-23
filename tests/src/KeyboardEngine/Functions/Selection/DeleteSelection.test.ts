import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../../../helpers/expectLatex';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { SelectLeft } from '../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft';
import { DeleteSelection } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteSelection';


describe(DeleteSelection.name, () =>
{
  it('a single Node, with left border is Node', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
    DeleteSelection(k);
    expectLatex('1◼', k);

  });

  it('a single Node, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    expectLatex('1◼', k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
    DeleteSelection(k);
    expectLatex('◼', k);
  });

  it('multiple Nodes, with left border is Node', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    expectLatex('123◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
    DeleteSelection(k);
    expectLatex('1◼', k);
  });

  it('multiple Nodes, with left border is Placeholder', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex('12◼', k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    DeleteSelection(k);
    expectLatex('◼', k);
  });
});