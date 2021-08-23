import { StandardBranchingNode } from "./StandardBranchingNode";

export class RoundBracketsNode extends StandardBranchingNode {
    constructor(leftBracketLatex: string = String.raw`\left(`, rightBracketLatex: string = String.raw`\right)`){
        super(leftBracketLatex, rightBracketLatex);
    }
}