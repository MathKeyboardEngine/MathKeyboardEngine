import { SinglePlaceholderRawAtom } from "./SinglePlaceholderRawAtom";

export class RoundBracketsAtom extends SinglePlaceholderRawAtom{
    constructor(leftBracketLatex: string = "(", rightBracketLatex: string = ")"){
        super(leftBracketLatex, rightBracketLatex);
    }
}