import { Node } from "../../../SyntaxTreeComponents/Nodes/Base/Node";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function Insert(k: KeyboardMemory, newNode: Node) {
    if (k.Current instanceof Placeholder) {
        k.Current.Nodes.unshift(newNode);
        newNode.ParentPlaceholder = k.Current;
    } else {
        let parent : Placeholder = k.Current.ParentPlaceholder;
        let indexOfCurrent = parent.Nodes.indexOf(k.Current);
        parent.Nodes.splice(indexOfCurrent + 1, 0, newNode);
        newNode.ParentPlaceholder = parent;
    }
    MoveRight(k);
}
    