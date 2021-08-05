import { KeyboardMemory } from "../../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../../LatexConfiguration";
import { AbstractBracketLeftAtom, AbstractBracketRightAtom } from "../Base/BracketAtoms";

export class CurlyBracketLeftAtom extends AbstractBracketLeftAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return String.raw`\{`;
    }
}

export class CurlyBracketRightAtom extends AbstractBracketRightAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return String.raw`\}`;
    }
}