import { Placeholder } from "../../Placeholder/Placeholder";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { BranchingNode } from "../Base/BranchingNode";
import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";

export class StandardBranchingNode extends BranchingNode {
  private before: string;
  private then: string;
  private rest: string[];

  constructor(before: string, then: string, ...rest: string[]) {
    const placeholderCount = rest.length + 1;
    const placeholders = new Array<Placeholder>();
    for (let i = 0; i < placeholderCount; i++) {
      placeholders.push(new Placeholder());
    }
    super(placeholders);
    this.before = before;
    this.then = then;
    this.rest = rest;
  }

  getLatexPart(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration): string {
    let latex = this.before + this.Placeholders[0].getLatex(keyboardMemory, latexConfiguration) + this.then;
    for (let i = 0; i < this.rest.length; i++) {
      latex += this.Placeholders[i + 1].getLatex(keyboardMemory, latexConfiguration) + this.rest[i];
    }
    return latex;
  }
}
