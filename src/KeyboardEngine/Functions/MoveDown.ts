import { WritableAtom } from "../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { Placeholder } from "../../SyntaxTreeComponents/Placeholders/Placeholder";
import { KeyboardMemory } from "../KeyboardMemory";

export function HandleMoveDownRequest(k : KeyboardMemory) {
    let moveFromPlaceholder = k.Current instanceof Placeholder ? k.Current : k.Current.ParentPlaceholder;
    let suggestingAtom : WritableAtom;
    while (true) {
        if (moveFromPlaceholder.ParentAtom == null) {
            return;
        }
        suggestingAtom = moveFromPlaceholder.ParentAtom
        if (suggestingAtom instanceof WritableAtom){
            let suggestion = suggestingAtom.GetMoveDownSuggestion(moveFromPlaceholder);
            if (suggestion != null)
            {
                k.Current = suggestion;
                return;
            }
        }

        moveFromPlaceholder = suggestingAtom.ParentPlaceholder;
    }
}