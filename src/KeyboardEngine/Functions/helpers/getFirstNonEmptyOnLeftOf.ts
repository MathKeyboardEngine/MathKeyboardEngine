import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';

export function getFirstNonEmptyOnLeftOf(placeholderArray: Placeholder[], element: Placeholder): Placeholder | null {
  let isOnTheLeft = false;
  for (let i: number = placeholderArray.length - 1; i >= 0; i--) {
    const placeholder: Placeholder = placeholderArray[i];
    if (!isOnTheLeft) {
      if (placeholder === element) {
        isOnTheLeft = true;
      }
      continue;
    }

    if (placeholder.nodes.length > 0) {
      return placeholder;
    }
  }
  return null;
}
