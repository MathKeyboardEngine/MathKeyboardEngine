import { lastOrNull } from "../../../helpers/arrayhelpers/lastOrNull";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { KeyboardMemory } from "../../KeyboardMemory";
import { PopSelection } from "../Selection/PopSelection";
import { Encapsulate } from "./Encapsulate";
import { InsertWithEncapsulateCurrent } from "./InsertWithEncapsulateCurrent";

export function InsertWithEncapsulateSelectionAndPrevious(keyboardMemory : KeyboardMemory, newNode : BranchingNode) : void {
    if (newNode.Placeholders.length < 2){
        throw 'Expected 2 placeholders.';
    }
    const selection = PopSelection(keyboardMemory);
    const secondPlaceholder = newNode.Placeholders[1];
    Encapsulate(selection, secondPlaceholder);
    InsertWithEncapsulateCurrent(keyboardMemory, newNode);
    keyboardMemory.Current = lastOrNull(selection) ?? secondPlaceholder;
}