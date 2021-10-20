import { Placeholder } from '../../Placeholder/Placeholder';
import { StandardBranchingNode } from './StandardBranchingNode';

export class AscendingBranchingNode extends StandardBranchingNode {
  override getMoveDownSuggestion(fromPlaceholder: Placeholder): Placeholder | null {
    const currentPlaceholderIndex = this.placeholders.indexOf(fromPlaceholder);
    if (currentPlaceholderIndex > 0) {
      return this.placeholders[currentPlaceholderIndex - 1];
    } else {
      return null;
    }
  }

  override getMoveUpSuggestion(fromPlaceholder: Placeholder): Placeholder | null {
    const currentPlaceholderIndex = this.placeholders.indexOf(fromPlaceholder);
    if (currentPlaceholderIndex < this.placeholders.length - 1) {
      return this.placeholders[currentPlaceholderIndex + 1];
    } else {
      return null;
    }
  }
}
