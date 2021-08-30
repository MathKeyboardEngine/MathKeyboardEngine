import { Placeholder } from "../../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../../KeyboardMemory";

export function setSelectionDiff(k: KeyboardMemory, diffWithCurrent: number): void {
  k.SelectionDiff = diffWithCurrent;
  if (diffWithCurrent == 0) {
    k.InclusiveSelectionLeftBorder = null;
    k.InclusiveSelectionRightBorder = null;
    return;
  }

  if (k.Current instanceof Placeholder) {
    k.InclusiveSelectionLeftBorder = k.Current;
    k.InclusiveSelectionRightBorder = k.Current.Nodes[diffWithCurrent - 1];
  } else {
    const nodes = k.Current.ParentPlaceholder.Nodes;
    const indexOfCurrent = nodes.indexOf(k.Current);
    if (diffWithCurrent > 0) {
      k.InclusiveSelectionLeftBorder = nodes[indexOfCurrent + 1];
      k.InclusiveSelectionRightBorder = nodes[indexOfCurrent + diffWithCurrent];
    } else if (diffWithCurrent < 0) {
      const index = indexOfCurrent + diffWithCurrent + 1;
      if (index < 0) {
        throw "The node at index 0 of the current Placeholder is as far as you can go.";
      } else {
        k.InclusiveSelectionLeftBorder = nodes[index];
      }
      k.InclusiveSelectionRightBorder = k.Current;
    }
  }
}
