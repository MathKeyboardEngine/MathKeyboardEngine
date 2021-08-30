import { describe } from "mocha";
import { expect } from "chai";
import { KeyboardMemory } from "../../../../../src/KeyboardEngine/KeyboardMemory";
import { expectLatex } from "../../../../helpers/expectLatex";
import { Insert } from "../../../../../src/KeyboardEngine/Functions/Insert/Insert";
import { DigitNode } from "../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode";
import { SelectLeft } from "../../../../../src/KeyboardEngine/Functions/Selection/SelectLeft";
import { EnterSelectionMode } from "../../../../../src/KeyboardEngine/Functions/Selection/EnterSelectionMode";
import { InsertWithEncapsulateSelectionAndPrevious } from "../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateSelectionAndPrevious";
import { AscendingBranchingNode } from "../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode";
import { StandardLeafNode } from "../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode";
import { StandardBranchingNode } from "../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode";

describe(InsertWithEncapsulateSelectionAndPrevious.name, () => {
  it("a single Node selected, with left exclusive border is Node", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    expectLatex("23◼", k);
    SelectLeft(k);
    expectLatex(String.raw`2\colorbox{blue}{3}`, k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode("{", "}^{", "}"));
    expectLatex("{2}^{3◼}", k);
  });

  it("a single Node selected, with left exclusive border is Placeholder", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    expectLatex("2◼", k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{2}`, k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode("{", "}^{", "}"));
    expectLatex("{◻}^{2◼}", k);
  });

  it("multiple Nodes selected, with left exclusive border is Node", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    expectLatex("223◼", k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`2\colorbox{blue}{23}`, k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode("{", "}^{", "}"));
    expectLatex("{2}^{23◼}", k);
  });

  it("multiple Nodes selected, with left border is Placeholder", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    expectLatex("12◼", k);
    SelectLeft(k);
    SelectLeft(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode("{", "}^{", "}"));
    expectLatex("{◻}^{12◼}", k);
  });

  it("selection mode entered but nothing selected => encapsulate current", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new StandardLeafNode("+"));
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    EnterSelectionMode(k);
    expectLatex("1+12◼", k);
    InsertWithEncapsulateSelectionAndPrevious(k, new AscendingBranchingNode("{", "}^{", "}"));
    expectLatex("1+{12}^{◼}", k);
  });

  it("throws on inserting branching node with single placeholder", () => {
    const k = new KeyboardMemory();
    expect(() => InsertWithEncapsulateSelectionAndPrevious(k, new StandardBranchingNode("[", "]"))).to.throw();
  });
});
