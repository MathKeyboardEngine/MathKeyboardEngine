import { lastOrNull } from '../../../helpers/arrayhelpers/lastOrNull';
import { BranchingNode } from '../../../SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { Placeholder } from '../../../SyntaxTreeComponents/Placeholder/Placeholder';
import { KeyboardMemory } from '../../KeyboardMemory';

export function moveDown(k: KeyboardMemory): void {
  let fromPlaceholder = k.current instanceof Placeholder ? k.current : k.current.parentPlaceholder;
  let suggestingNode: BranchingNode;
  while (true) {
    if (fromPlaceholder.parentNode == null) {
      return;
    }
    suggestingNode = fromPlaceholder.parentNode;
    const suggestion = suggestingNode.getMoveDownSuggestion(fromPlaceholder);
    if (suggestion != null) {
      k.current = lastOrNull(suggestion.nodes) ?? suggestion;
      return;
    }
    fromPlaceholder = suggestingNode.parentPlaceholder;
  }
}
