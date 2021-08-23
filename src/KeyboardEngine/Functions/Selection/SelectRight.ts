import { Node } from "../../../SyntaxTreeComponents/Nodes/Base/Node";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { setSelectionDiff } from "./helpers/setSelectionDiff";

  export function SelectRight(k : KeyboardMemory) {
    let diff = k.SelectionDiff ?? 0;
    if (k.Current instanceof Placeholder && diff < k.Current.Nodes.length
      || k.Current instanceof Node && k.Current.ParentPlaceholder.Nodes.indexOf(k.Current) + diff < k.Current.ParentPlaceholder.Nodes.length) {
      setSelectionDiff(k, diff + 1);
  }
}

  
  