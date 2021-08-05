import { KeyboardMemory } from "../../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../../LatexConfiguration";
import { AbstractBracketLeftAtom, AbstractBracketRightAtom } from "../Base/BracketAtoms";

export class AngleBracketLeftAtom extends AbstractBracketLeftAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return String.raw`\langle`;
    }
}

export class AngleBracketRightAtom extends AbstractBracketRightAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return String.raw`\rangle`;
    }
}