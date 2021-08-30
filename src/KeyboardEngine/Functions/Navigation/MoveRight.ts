import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { firstAfter } from "../../../helpers/arrayhelpers/firstAfter";

export function MoveRight(k: KeyboardMemory): void {
  if (k.Current instanceof Placeholder) {
    if (k.Current.Nodes.length > 0) {
      const nextNode = k.Current.Nodes[0];
      k.Current = nextNode instanceof BranchingNode ? nextNode.Placeholders[0] : nextNode;
    } else if (k.Current.ParentNode == null) {
      return;
    } else {
      k.Current = firstAfter(k.Current.ParentNode.Placeholders, k.Current) ?? k.Current.ParentNode;
    }
  } else {
    const nextNode: TreeNode | null = firstAfter(k.Current.ParentPlaceholder.Nodes, k.Current);
    if (nextNode != null) {
      if (nextNode instanceof BranchingNode) {
        k.Current = nextNode.Placeholders[0];
      } else {
        k.Current = nextNode;
      }
    } else {
      const ancestorNode = k.Current.ParentPlaceholder.ParentNode;
      if (ancestorNode != null) {
        const nextPlaceholder: Placeholder | null = firstAfter(ancestorNode.Placeholders, k.Current.ParentPlaceholder);
        k.Current = nextPlaceholder ?? ancestorNode;
      }
    }
  }
}
