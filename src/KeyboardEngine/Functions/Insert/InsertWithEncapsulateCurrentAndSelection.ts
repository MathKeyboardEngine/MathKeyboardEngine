import { lastOrNull } from "../../../helpers/arrayhelpers/lastOrNull";
import { BranchingNode } from "../../../SyntaxTreeComponents/Nodes/Base/BranchingNode";
import { KeyboardMemory } from "../../KeyboardMemory";
import { PopSelection } from "../Selection/PopSelection";
import { Encapsulate } from "./Encapsulate";
import { Insert } from "./Insert";
import { TryInsertWithEncapsulateCurrent } from "./TryInsertWithEncapsulateCurrent";

export function InsertWithEncapsulateCurrentAndSelection(keyboardMemory : KeyboardMemory, newNode : BranchingNode) {
    if (newNode.Placeholders.length < 2){
        throw 'Expected 2 placeholders.';
    }
    let selection = PopSelection(keyboardMemory);
    let secondPlaceholder = newNode.Placeholders[1];
    Encapsulate(selection, secondPlaceholder);
    if (!TryInsertWithEncapsulateCurrent(keyboardMemory, newNode)) {
        Insert(keyboardMemory, newNode);
    }
    keyboardMemory.Current = lastOrNull(selection) ?? secondPlaceholder;
}