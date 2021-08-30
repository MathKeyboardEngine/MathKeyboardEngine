import { describe } from "mocha";
import { KeyboardMemory } from "../../../../../src/KeyboardEngine/KeyboardMemory";
import { expectLatex } from "../../../../helpers/expectLatex";
import { Insert } from "../../../../../src/KeyboardEngine/Functions/Insert/Insert";
import { DigitNode } from "../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode";
import { MoveLeft } from "../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft";
import { SelectRight } from "../../../../../src/KeyboardEngine/Functions/Selection/SelectRight";

describe(SelectRight.name, () => {
  it("a single Node, with left border is Node", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    MoveLeft(k);
    expectLatex("1◼2", k);
    SelectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{2}`, k);
  });

  it("a single Node, with left border is Placeholder", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    MoveLeft(k);
    expectLatex("◼1", k);
    SelectRight(k);
    expectLatex(String.raw`\colorbox{blue}{1}`, k);
  });

  it("multiple Nodes, with left border is Node", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    MoveLeft(k);
    MoveLeft(k);
    expectLatex("1◼23", k);
    SelectRight(k);
    SelectRight(k);
    expectLatex(String.raw`1\colorbox{blue}{23}`, k);
  });

  it("multiple Nodes, with left border is Placeholder", () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    MoveLeft(k);
    MoveLeft(k);
    expectLatex("◼12", k);
    SelectRight(k);
    SelectRight(k);
    expectLatex(String.raw`\colorbox{blue}{12}`, k);
  });
});
