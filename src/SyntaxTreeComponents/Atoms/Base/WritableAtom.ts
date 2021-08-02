import { Atom } from "./Atom";
import { Placeholder } from "../../Placeholder/Placeholder";

export abstract class WritableAtom extends Atom {
    Placeholders : Placeholder[];

    constructor(leftToRight : Placeholder[]) {
        super();
        this.Placeholders = leftToRight;
        this.Placeholders.forEach(ph => {
            ph.ParentAtom = this;
        });
    }
    
    GetMoveDownSuggestion(from : Placeholder) : Placeholder | null {
        return null;
    }
    
    GetMoveUpSuggestion(from : Placeholder) : Placeholder | null {
        return null;
    }
}