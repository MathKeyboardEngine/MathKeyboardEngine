import { Placeholder } from "../../Placeholder/Placeholder";
import { MultiplePlaceholdersRawAtom } from "./MultiplePlaceholdersRawAtom";

export class MultiplePlaceholdersDescendingRawAtom extends MultiplePlaceholdersRawAtom {
    override GetMoveDownSuggestion(current : Placeholder) : Placeholder | null {
        let currentPlaceholderIndex = this.Placeholders.indexOf(current);
        if (currentPlaceholderIndex < this.Placeholders.length - 1) {
            return this.Placeholders[currentPlaceholderIndex + 1];
        } else {
            return null;
        }
    }
    
    override GetMoveUpSuggestion(current : Placeholder) : Placeholder | null {
        let currentPlaceholderIndex = this.Placeholders.indexOf(current);
        if (currentPlaceholderIndex > 0) {
            return this.Placeholders[currentPlaceholderIndex - 1];
        } else {
            return null;
        }
    } 
}