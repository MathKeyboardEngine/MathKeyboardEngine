import { KeyboardMemory } from "../../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../../LatexConfiguration";
import { AbstractRoundBracketLeftAtom, AbstractRoundBracketRightAtom } from "../Base/BracketAtoms";

export class RoundBracketLeftAtom extends AbstractRoundBracketLeftAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return "(";
    }
}

export class RoundBracketRightAtom extends AbstractRoundBracketRightAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return ")";
    }
}