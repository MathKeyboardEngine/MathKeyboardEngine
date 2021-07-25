import { Atom } from "./Atom";
import { Placeholder } from "../../Placeholders/Placeholder";

export abstract class WritableAtom extends Atom {
    Placeholders : Placeholder[];

    constructor(leftToRight : Placeholder[]) {
        super();
        this.Placeholders = leftToRight;
    }
    
    GetMoveDownSuggestion(from : Atom | Placeholder) : Atom | Placeholder | null {
        return null;
    }
    
    GetMoveUpSuggestion(from : Atom | Placeholder) : Atom | Placeholder | null {
        return null;
    }
}