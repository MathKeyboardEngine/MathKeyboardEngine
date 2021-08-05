import { KeyboardMemory } from "../../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../../LatexConfiguration";
import { AbstractBracketLeftAtom, AbstractBracketRightAtom } from "../Base/BracketAtoms";

export class SquareBracketLeftAtom extends AbstractBracketLeftAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return "[";
    }
}

export class SquareBracketRightAtom extends AbstractBracketRightAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return "]";
    }
}