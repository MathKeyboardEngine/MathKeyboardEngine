import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { LeafNode } from "../Base/LeafNode";

export class StandardLeafNode extends LeafNode {
  readonly Latex: () => string;
  constructor(latex: string | (() => string)) {
    super();
    this.Latex = typeof latex === "string" ? () => latex : latex;
  }
  override getLatexPart(_keyboardMemory: KeyboardMemory, _latexConfiguration: LatexConfiguration): string {
    return this.Latex();
  }
}
