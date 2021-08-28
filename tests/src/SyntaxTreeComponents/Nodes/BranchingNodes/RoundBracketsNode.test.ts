import { expectLatex } from "../../../../helpers/expectLatex";
import { Insert } from "../../../../../src/KeyboardEngine/Functions/Insert/Insert";
import { KeyboardMemory } from "../../../../../src/KeyboardEngine/KeyboardMemory";
import { RoundBracketsNode } from "../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode";

describe(RoundBracketsNode.name, () =>
{
  it(String.raw`Default round brackets are \left( and \right`, () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new RoundBracketsNode());
    expectLatex(String.raw`\left(◼\right)`, k);
  });

  it(String.raw`can be overridden`, () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new RoundBracketsNode('(', ')'));
    expectLatex('(◼)', k);
  });
});