import { SinglePlaceholderRawNode } from "./SinglePlaceholderRawNode";

export class RoundBracketsNode extends SinglePlaceholderRawNode{
    constructor(leftBracketLatex: string = String.raw`\left(`, rightBracketLatex: string = String.raw`\right)`){
        super(leftBracketLatex, rightBracketLatex);
    }
}