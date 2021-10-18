import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';

export function MoveDown(k: KeyboardMemory): void {
  let moveFromPlaceholder = k.current instanceof Placeholder ? k.current : k.current.parentPlaceholder;
  let suggestingNode: BranchingNode;
  while (true) {
    if (moveFromPlaceholder.parentNode == null) {
      return;
    }
    suggestingNode = moveFromPlaceholder.parentNode;
    const suggestion = suggestingNode.getMoveDownSuggestion(moveFromPlaceholder);
    if (suggestion != null) {
      k.current = lastOrNull(suggestion.nodes) ?? suggestion;
      return;
    }
    moveFromPlaceholder = suggestingNode.parentPlaceholder;
  }
}
