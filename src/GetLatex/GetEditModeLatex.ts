import { KeyboardMemory } from "../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../LatexConfiguration";

export function GetEditModeLatex(keyboardMemory: KeyboardMemory, latexConfiguration: LatexConfiguration) {
    return keyboardMemory.SyntaxTreeRoot.getLatex(keyboardMemory, latexConfiguration);
}