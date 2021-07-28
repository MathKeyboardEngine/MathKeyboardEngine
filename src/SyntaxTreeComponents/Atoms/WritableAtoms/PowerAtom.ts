import { IEncapsulateCurrentAtomOnInsert } from "../../KeyboardEngine/Functions/Insert";
import { KeyboardMemory } from "../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../LatexConfiguration";
import { Placeholder } from "../Placeholders/Placeholder";
import { Atom } from "./Base/Atom";
import { WritableAtom } from "./Base/WritableAtom";

export class PowerAtom extends WritableAtom implements IEncapsulateCurrentAtomOnInsert {

    readonly Base : Placeholder;
    readonly Exponent : Placeholder;
    
    constructor() {
        super([new Placeholder(), new Placeholder()]);
        this.Base = this.Placeholders[0];
        this.Exponent = this.Placeholders[1];
    }
    
    EncapsulateOnInsert(currentAtom: Atom) {
        this.Base.Atoms.push(currentAtom);
    }
    
    override getLatex(latexConfiguration: LatexConfiguration, keyboardInfo: KeyboardMemory) : string {
    return `${this.Base.getLatex(latexConfiguration, keyboardInfo)}^{${this.Exponent.getLatex(latexConfiguration, keyboardInfo)}}`;
    }
}