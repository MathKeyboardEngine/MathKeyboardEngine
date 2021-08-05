import { KeyboardMemory } from "../../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../../LatexConfiguration";
import { AbstractBracketLeftAtom, AbstractBracketRightAtom } from "../Base/BracketAtoms";

export class VerticalDoubleBarLeftAtom extends AbstractBracketLeftAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return String.raw`\|`;
    }
}

export class VerticalDoubleBarRightAtom extends AbstractBracketRightAtom {
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return String.raw`\|`;
    }
}