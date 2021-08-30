import { describe } from "mocha";
import { assert, expect } from "chai";
import { KeyboardMemory } from "../../../src/KeyboardEngine/KeyboardMemory";
import { Placeholder } from "../../../src/SyntaxTreeComponents/Placeholder/Placeholder";
import { DeleteCurrent } from "../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent";
import { Insert } from "../../../src/KeyboardEngine/Functions/Insert/Insert";
import { expectLatex } from "../../helpers/expectLatex";
import { MoveLeft } from "../../../src/KeyboardEngine/Functions/Navigation/MoveLeft";
import { MoveDown } from "../../../src/KeyboardEngine/Functions/Navigation/MoveDown";
import { MoveUp } from "../../../src/KeyboardEngine/Functions/Navigation/MoveUp";
import { MoveRight } from "../../../src/KeyboardEngine/Functions/Navigation/MoveRight";
import { DigitNode } from "../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode";
import { DescendingBranchingNode } from "../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode";

describe(KeyboardMemory.name, () => {
  describe("SyntaxTreeRoot", () => {
    it("is equal to Current on KeyboardMemory initialization", () => {
      const k = new KeyboardMemory();
      assert.isNotNull(k.SyntaxTreeRoot);
      expect(k.SyntaxTreeRoot).to.be.equal(k.Current);
    });

    it("is a Placeholder", () => {
      const k = new KeyboardMemory();
      assert.isTrue(k.SyntaxTreeRoot instanceof Placeholder);
      expectLatex("◼", k);
    });

    it("cannot be deleted", () => {
      const k = new KeyboardMemory();
      DeleteCurrent(k);
      assert.isNotNull(k.Current);
      assert.isTrue(k.Current instanceof Placeholder);
    });

    it("is reachable via the chain of parents", () => {
      const k = new KeyboardMemory();

      const fraction1 = new DescendingBranchingNode(String.raw`\frac{`, "}{", "}");
      Insert(k, fraction1);
      assert.isTrue(k.Current === fraction1.Placeholders[0]);

      const fraction2 = new DescendingBranchingNode(String.raw`\frac{`, "}{", "}");
      Insert(k, fraction2);
      assert.isTrue(k.Current === fraction2.Placeholders[0]);

      assert.isTrue(k.Current instanceof Placeholder);
      const calculatedRoot = (k.Current as Placeholder).ParentNode!.ParentPlaceholder.ParentNode!.ParentPlaceholder;
      assert.isNull(calculatedRoot.ParentNode);
      expect(k.SyntaxTreeRoot).to.equal(calculatedRoot);
    });

    it("impossible move requests in empty root placeholder do not throw", () => {
      const k = new KeyboardMemory();
      expectLatex("◼", k);
      MoveLeft(k);
      expectLatex("◼", k);
      MoveDown(k);
      expectLatex("◼", k);
      MoveUp(k);
      expectLatex("◼", k);
      MoveRight(k);
      expectLatex("◼", k);
    });

    it("impossible move requests in filled root placeholder do not throw", () => {
      const k = new KeyboardMemory();
      Insert(k, new DigitNode("1"));
      expectLatex("1◼", k);
      MoveUp(k);
      expectLatex("1◼", k);
      MoveRight(k);
      expectLatex("1◼", k);
      MoveDown(k);
      expectLatex("1◼", k);
      MoveLeft(k);
      expectLatex("◼1", k);
      MoveDown(k);
      expectLatex("◼1", k);
      MoveLeft(k);
      expectLatex("◼1", k);
      MoveUp(k);
      expectLatex("◼1", k);
    });
  });
});
