import { Placeholder } from "../../../SyntaxTreeComponents/Placeholder/Placeholder";
import { KeyboardMemory } from "../../KeyboardMemory";
import { GetFirstNonEmptyOnLeftOf } from "../../../SyntaxTreeComponents/Placeholder/GetFirstNonEmptyOnLeftOf";
import { lastOrNull } from "../../../helpers/arrayhelpers/lastOrNull";
import { firstBefore } from "../../../helpers/arrayhelpers/firstBefore";
import { remove } from "../../../helpers/arrayhelpers/remove";
import { Node } from "../../../SyntaxTreeComponents/Nodes/Base/Node";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { last } from "../../../helpers/arrayhelpers/last";
import { PartOfNumberWithDigits } from "../../../SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits";
import { EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex } from "../Insert/TryInsertWithEncapsulateCurrent";

export function DeleteCurrent(k : KeyboardMemory) {
    if (k.Current instanceof Placeholder) {
        if (k.Current.ParentNode == null || k.Current.Nodes.length > 0) {
            return;
        } else {
            let nonEmptyPlaceholderOnLeft : Placeholder | null = GetFirstNonEmptyOnLeftOf(k.Current.ParentNode.Placeholders, k.Current);
            if (nonEmptyPlaceholderOnLeft) {
                if (k.Current.ParentNode.Placeholders.length == 2
                    && k.Current === k.Current.ParentNode.Placeholders[1]
                    && k.Current.Nodes.length == 0) {
                    k.Current.ParentNode.ParentPlaceholder.Nodes.pop();
                    for(let node of nonEmptyPlaceholderOnLeft.Nodes){
                        k.Current.ParentNode.ParentPlaceholder.Nodes.push(node);
                        node.ParentPlaceholder = k.Current.ParentNode.ParentPlaceholder;
                    }
                    k.Current = last(nonEmptyPlaceholderOnLeft.Nodes);
                } else {
                    nonEmptyPlaceholderOnLeft.Nodes.pop();
                    k.Current = lastOrNull(nonEmptyPlaceholderOnLeft.Nodes) ?? nonEmptyPlaceholderOnLeft;
                }
            } else if (k.Current.ParentNode.Placeholders.every(ph => ph.Nodes.length == 0)) {
                let ancestorPlaceholder = k.Current.ParentNode.ParentPlaceholder;
                let previousNode = firstBefore(ancestorPlaceholder.Nodes, k.Current.ParentNode);
                remove(ancestorPlaceholder.Nodes, k.Current.ParentNode);
                k.Current = previousNode ?? ancestorPlaceholder;
            } else if (k.Current.ParentNode.Placeholders[0] === k.Current 
            && k.Current.Nodes.length == 0 
            && k.Current.ParentNode.Placeholders.some(ph => ph.Nodes.length != 0)) {
                if (TryEncapsulatePreviousInto(k.Current)) {
                    k.Current = last(k.Current.Nodes);
                }
            }
        }
    } else {
        if (k.Current instanceof BranchingNode && k.Current.Placeholders.some(ph => ph.Nodes.length > 0)) {
            let lastPlaceholderWithContent! : Placeholder;
            for (let i = k.Current.Placeholders.length - 1; i >= 0; i--) {
                let ph = k.Current.Placeholders[i];
                if (ph.Nodes.length > 0){
                    lastPlaceholderWithContent = ph;
                    break;
                }
            }
            lastPlaceholderWithContent.Nodes.pop();
            k.Current = lastPlaceholderWithContent.Nodes.length == 0 ? lastPlaceholderWithContent : last(lastPlaceholderWithContent.Nodes);
        } else {
            let previousNode : Node | null = firstBefore(k.Current.ParentPlaceholder.Nodes, k.Current);
            remove(k.Current.ParentPlaceholder.Nodes, k.Current);
            k.Current = previousNode ?? k.Current.ParentPlaceholder;
        }
    }
}

function TryEncapsulatePreviousInto(targetPlaceholder : Placeholder) {
    let previousNode = firstBefore(targetPlaceholder.ParentNode!.ParentPlaceholder.Nodes, targetPlaceholder.ParentNode);
    if (previousNode != null) {
        remove(targetPlaceholder.ParentNode!.ParentPlaceholder.Nodes, previousNode);
        targetPlaceholder.Nodes.push(previousNode);
        previousNode.ParentPlaceholder = targetPlaceholder;
        if (previousNode instanceof PartOfNumberWithDigits){
            EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(previousNode.ParentPlaceholder.Nodes.length, previousNode.ParentPlaceholder.Nodes, targetPlaceholder);
        }
        return true;
    }

    return false;
}