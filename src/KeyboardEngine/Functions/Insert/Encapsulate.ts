import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";

export function Encapsulate(nodes: TreeNode[], encapsulatingPlaceholder: Placeholder) {
    for (let node of nodes) {
        node.ParentPlaceholder = encapsulatingPlaceholder;
        encapsulatingPlaceholder.Nodes.push(node);
    }
}