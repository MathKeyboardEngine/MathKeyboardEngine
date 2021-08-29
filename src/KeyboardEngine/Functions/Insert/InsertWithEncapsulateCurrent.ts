import { firstAfter } from "../../../helpers/arrayhelpers/firstAfter";
import { remove } from "../../../helpers/arrayhelpers/remove";
import { TreeNode } from "../../../SyntaxTreeComponents/Nodes/Base/TreeNode";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { PartOfNumberWithDigits } from "../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits";
import { RoundBracketsNode } from "../../../SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode";
import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { MoveRight } from "../Navigation/MoveRight";
import { Encapsulate } from "./Encapsulate";
import { Insert } from "./Insert";

export function InsertWithEncapsulateCurrent(k: KeyboardMemory, newNode: BranchingNode, config?: {deleteOuterRoundBracketsIfAny? : boolean}) : void {
    const encapsulatingPlaceholder = newNode.Placeholders[0];
    if (k.Current instanceof TreeNode) {
        const siblingNodes = k.Current.ParentPlaceholder.Nodes;
        const currentIndex = siblingNodes.indexOf(k.Current);
        siblingNodes[currentIndex] = newNode;
        newNode.ParentPlaceholder = k.Current.ParentPlaceholder;
        if (k.Current instanceof RoundBracketsNode && config?.deleteOuterRoundBracketsIfAny) {
            Encapsulate(k.Current.Placeholders[0].Nodes, encapsulatingPlaceholder);
            k.Current = firstAfter(newNode.Placeholders, encapsulatingPlaceholder) ?? newNode;
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
    } else {
        Insert(k, newNode);
    }
}

export function EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(exclusiveRightIndex : number, siblingNodes : TreeNode[], toPlaceholder : Placeholder) : void {
    for (let i = exclusiveRightIndex - 1; i >=0; i--) {
        const siblingNode = siblingNodes[i];
        if (siblingNode instanceof PartOfNumberWithDigits) {
            remove(siblingNodes, siblingNode);
            toPlaceholder.Nodes.unshift(siblingNode);
            siblingNode.ParentPlaceholder = toPlaceholder;
        } else {
            break;
        }
    }
}