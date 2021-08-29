import { KeyboardMemory } from "../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../LatexConfiguration";

export function GetEditModeLatex(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration) : string {
    return keyboardMemory.SyntaxTreeRoot.getLatex(keyboardMemory, latexConfiguration);
}