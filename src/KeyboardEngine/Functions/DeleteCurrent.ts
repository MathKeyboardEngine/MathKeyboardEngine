import { Placeholder } from "../../SyntaxTreeComponents/Placeholders/Placeholder";
import { KeyboardMemory } from "../KeyboardMemory";
import { GetFirstNonEmptyOnLeftOf } from "../../SyntaxTreeComponents/Placeholders/GetFirstNonEmptyOnLeftOf";
import { lastOrNull } from "../../helpers/arrayhelpers/lastOrNull";
import { firstBefore } from "../../helpers/arrayhelpers/firstBefore";
import { remove } from "../../helpers/arrayhelpers/remove";
import { Atom } from "../../SyntaxTreeComponents/Atoms/Base/Atom";
import { WritableAtom } from "../../SyntaxTreeComponents/Atoms/Base/WritableAtom";
import { last } from "../../helpers/arrayhelpers/last";

export function DeleteCurrent(k : KeyboardMemory) {

    if (k.Current instanceof Placeholder) {
        if (k.Current.ParentAtom == null){
            return;
        } else {
            let nonEmptyPlaceholderOnLeft : Placeholder | null = GetFirstNonEmptyOnLeftOf(k.Current.ParentAtom.Placeholders, k.Current);
            if (nonEmptyPlaceholderOnLeft) {
                nonEmptyPlaceholderOnLeft.Atoms.pop();
                k.Current = lastOrNull(nonEmptyPlaceholderOnLeft.Atoms) ?? nonEmptyPlaceholderOnLeft;
            } else if (k.Current.ParentAtom.Placeholders.every(ph => ph.Atoms.length == 0)) {
                let ancestorPlaceholder = k.Current.ParentAtom.ParentPlaceholder;
                let previousAtom = firstBefore(ancestorPlaceholder.Atoms, k.Current.ParentAtom);
                remove(ancestorPlaceholder.Atoms, k.Current.ParentAtom);
                k.Current = previousAtom ?? ancestorPlaceholder;
            }
        }
    } else {
        if (k.Current instanceof WritableAtom && k.Current.Placeholders.some(ph => ph.Atoms.length > 0)) {
            let lastPlaceholderWithContent! : Placeholder;
            for (let i = k.Current.Placeholders.length - 1; i == 0; i--) {
                let ph = k.Current.Placeholders[i];
                if (ph.Atoms.length > 0){
                    lastPlaceholderWithContent = ph;
                    break;
                }
            }

            lastPlaceholderWithContent.Atoms.pop();
            k.Current = lastPlaceholderWithContent.Atoms.length == 0 ? lastPlaceholderWithContent : last(lastPlaceholderWithContent.Atoms);
        } else {
            let previousAtom : Atom | null = firstBefore(k.Current.ParentPlaceholder.Atoms, k.Current);
            remove(k.Current.ParentPlaceholder.Atoms, k.Current);
            k.Current = previousAtom ?? k.Current.ParentPlaceholder;
        }
    }
}