import { KeyboardMemory } from "../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../LatexConfiguration";
import { Atom } from "../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../SyntaxTreeComponents/Placeholder/Placeholder";

const emptyKeyboardMemory = new KeyboardMemory();
export function GetViewModeLatex(x : Atom | Placeholder | KeyboardMemory, latexConfiguration : LatexConfiguration) {
    let syntaxTreeComponent : Atom | Placeholder = x instanceof KeyboardMemory ? x.SyntaxTreeRoot : x;
    return syntaxTreeComponent.getLatex(emptyKeyboardMemory, latexConfiguration);
}