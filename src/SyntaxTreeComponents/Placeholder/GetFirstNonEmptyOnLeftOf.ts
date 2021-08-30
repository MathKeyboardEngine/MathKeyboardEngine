import { Placeholder } from "./Placeholder";

export function GetFirstNonEmptyOnLeftOf(placeholderArray: Placeholder[], input: Placeholder): Placeholder | null {
  let isOnTheLeft = false;
  for (let i: number = placeholderArray.length - 1; i >= 0; i--) {
    const placeholder: Placeholder = placeholderArray[i];
    if (!isOnTheLeft) {
      if (placeholder === input) {
        isOnTheLeft = true;
      }
      continue;
    }

    if (placeholder.Nodes.length > 0) {
      return placeholder;
    }
  }
  return null;
}
