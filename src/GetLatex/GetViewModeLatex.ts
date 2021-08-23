import { KeyboardMemory } from "../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../LatexConfiguration";
import { Node } from "../SyntaxTreeComponents/Nodes/Base/Node";
import { Placeholder } from "../SyntaxTreeComponents/Placeholder/Placeholder";

const emptyKeyboardMemory = new KeyboardMemory();
export function GetViewModeLatex(x : Node | Placeholder | KeyboardMemory, latexConfiguration : LatexConfiguration) {
    let syntaxTreeComponent : Node | Placeholder = x instanceof KeyboardMemory ? x.SyntaxTreeRoot : x;
    return syntaxTreeComponent.getLatex(emptyKeyboardMemory, latexConfiguration);
}