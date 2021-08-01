import { Atom } from "../../../SyntaxTreeComponents/Atoms/Base/Atom";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { setSelectionDiff } from "./helpers/setSelectionDiff";

  export function SelectRight(k : KeyboardMemory) {
    let diff = k.SelectionDiff ?? 0;
    if (k.Current instanceof Placeholder && diff < k.Current.Atoms.length
      || k.Current instanceof Atom && k.Current.ParentPlaceholder.Atoms.indexOf(k.Current) + diff < k.Current.ParentPlaceholder.Atoms.length) {
      setSelectionDiff(k, diff + 1);
  }
}

  
  