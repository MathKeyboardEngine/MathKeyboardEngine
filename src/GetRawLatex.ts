import { KeyboardMemory } from "./KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "./LatexConfiguration";
import { Atom } from "./SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "./SyntaxTreeComponents/Placeholder/Placeholder";

const emptyKeyboardMemory = new KeyboardMemory();
// Displays latex of a single atom or the whole syntax tree without cursor and selection highlighting.
export function GetRawLatex(syntaxTreeComponent : Placeholder | Atom, latexConfiguration : LatexConfiguration){
    return syntaxTreeComponent.getLatex(emptyKeyboardMemory, latexConfiguration);
}