import { TreeNode } from './TreeNode';
import { Placeholder } from '../../Placeholder/Placeholder';

export abstract class BranchingNode extends TreeNode {
  placeholders: Placeholder[];

  constructor(leftToRight: Placeholder[]) {
    super();
    this.placeholders = leftToRight;
    this.placeholders.forEach((ph) => {
      ph.parentNode = this;
    });
  }

  getMoveDownSuggestion(_fromPlaceholder: Placeholder): Placeholder | null {
    return null;
  }

  getMoveUpSuggestion(_fromPlaceholder: Placeholder): Placeholder | null {
    return null;
  }
}
