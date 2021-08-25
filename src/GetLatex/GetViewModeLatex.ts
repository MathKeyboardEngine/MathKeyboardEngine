import { KeyboardMemory } from "../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../LatexConfiguration";
import { TreeNode } from "../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { Placeholder } from "../SyntaxTreeComponents/Placeholder/Placeholder";

const emptyKeyboardMemory = new KeyboardMemory();
export function GetViewModeLatex(x : TreeNode | Placeholder | KeyboardMemory, latexConfiguration : LatexConfiguration) {
    let syntaxTreeComponent : TreeNode | Placeholder = x instanceof KeyboardMemory ? x.SyntaxTreeRoot : x;
    return syntaxTreeComponent.getLatex(emptyKeyboardMemory, latexConfiguration);
}