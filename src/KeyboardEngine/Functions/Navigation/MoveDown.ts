import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';

export function MoveDown(k: KeyboardMemory): void {
  let moveFromPlaceholder = k.Current instanceof Placeholder ? k.Current : k.Current.ParentPlaceholder;
  let suggestingNode: BranchingNode;
  while (true) {
    if (moveFromPlaceholder.ParentNode == null) {
      return;
    }
    suggestingNode = moveFromPlaceholder.ParentNode;
    const suggestion = suggestingNode.getMoveDownSuggestion(moveFromPlaceholder);
    if (suggestion != null) {
      k.Current = lastOrNull(suggestion.Nodes) ?? suggestion;
      return;
    }
    moveFromPlaceholder = suggestingNode.ParentPlaceholder;
  }
}
