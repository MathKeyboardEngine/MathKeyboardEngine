import { SinglePlaceholderRawAtom } from "./SinglePlaceholderRawAtom";

export class RoundBracketsAtom extends SinglePlaceholderRawAtom{
    constructor(leftBracketLatex: string = String.raw`\left(`, rightBracketLatex: string = String.raw`\right)`){
        super(leftBracketLatex, rightBracketLatex);
    }
}