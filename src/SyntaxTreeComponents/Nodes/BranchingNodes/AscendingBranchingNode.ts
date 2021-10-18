import { Placeholder } from '../../Placeholder/Placeholder';
import { StandardBranchingNode } from './StandardBranchingNode';

export class AscendingBranchingNode extends StandardBranchingNode {
  override getMoveDownSuggestion(current: Placeholder): Placeholder | null {
    const currentPlaceholderIndex = this.placeholders.indexOf(current);
    if (currentPlaceholderIndex > 0) {
      return this.placeholders[currentPlaceholderIndex - 1];
    } else {
      return null;
    }
  }

  override getMoveUpSuggestion(current: Placeholder): Placeholder | null {
    const currentPlaceholderIndex = this.placeholders.indexOf(current);
    if (currentPlaceholderIndex < this.placeholders.length - 1) {
      return this.placeholders[currentPlaceholderIndex + 1];
    } else {
      return null;
    }
  }
}
