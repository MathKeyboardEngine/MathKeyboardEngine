import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';

export function MoveUp(k: KeyboardMemory): void {
  let moveFromPlaceholder = k.Current instanceof Placeholder ? k.Current : k.Current.ParentPlaceholder;
  let suggestingNode: BranchingNode;
  while (true) {
    if (moveFromPlaceholder.ParentNode == null) {
      return;
    }
    suggestingNode = moveFromPlaceholder.ParentNode;
    if (suggestingNode instanceof BranchingNode) {
      const suggestion = suggestingNode.GetMoveUpSuggestion(moveFromPlaceholder);
      if (suggestion != null) {
        k.Current = lastOrNull(suggestion.Nodes) ?? suggestion;
        return;
      }
    }

    moveFromPlaceholder = suggestingNode.ParentPlaceholder;
  }
}
