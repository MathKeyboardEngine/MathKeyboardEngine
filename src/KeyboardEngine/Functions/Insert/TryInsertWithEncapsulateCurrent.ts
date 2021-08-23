import { firstAfter } from "../../../helpers/arrayhelpers/firstAfter";
import { lastOrNull } from "../../../helpers/arrayhelpers/lastOrNull";
import { remove } from "../../../helpers/arrayhelpers/remove";
import { Node } from "../../../SyntaxTreeComponents/Nodes/Base/Node";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { PartOfNumberWithDigits } from "../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits";
import { RoundBracketsNode } from "../../../SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";

export function TryInsertWithEncapsulateCurrent(k: KeyboardMemory, newNode: BranchingNode, config?: {deleteOuterRoundBracketsIfAny? : boolean}) : boolean {
    let encapsulatingPlaceholder = newNode.Placeholders[0];
    if (k.Current instanceof Node) {
        let siblingNodes = k.Current.ParentPlaceholder.Nodes;
        let currentIndex = siblingNodes.indexOf(k.Current);
        siblingNodes[currentIndex] = newNode;
        newNode.ParentPlaceholder = k.Current.ParentPlaceholder;
        if (k.Current instanceof RoundBracketsNode && config?.deleteOuterRoundBracketsIfAny) {
            let betweenBracketsPlaceholder = k.Current.Placeholders[0];
            for (let node of betweenBracketsPlaceholder.Nodes) {
                node.ParentPlaceholder = encapsulatingPlaceholder;
                encapsulatingPlaceholder.Nodes.push(node);
                k.Current = firstAfter(newNode.Placeholders, encapsulatingPlaceholder) ?? newNode;
            }
        } else if (k.Current instanceof PartOfNumberWithDigits) {
            encapsulatingPlaceholder.Nodes.push(k.Current);
            k.Current.ParentPlaceholder = encapsulatingPlaceholder;
            EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(currentIndex, siblingNodes, encapsulatingPlaceholder);
            MoveRight(k);
        } else {
            encapsulatingPlaceholder.Nodes.push(k.Current);
            k.Current.ParentPlaceholder = encapsulatingPlaceholder;
            MoveRight(k);
        }
        return true;
    } else {
        return false;
    }
}

export function EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(exclusiveRightIndex : number, siblingNodes : Node[], toPlaceholder : Placeholder) {
    for (let i = exclusiveRightIndex - 1; i >=0; i--) {
        let siblingNode = siblingNodes[i];
        if (siblingNode instanceof PartOfNumberWithDigits) {
            remove(siblingNodes, siblingNode);
            toPlaceholder.Nodes.unshift(siblingNode);
            siblingNode.ParentPlaceholder = toPlaceholder;
        } else {
            break;
        }
    }
}