import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { ReadonlyAtom } from "../Base/ReadonlyAtom";

/*
The RawAtom is a ReadonlyAtom for which KeyboardEngine/Functions and LatexConfiguration do not have any special behaviour.
There is no need to create hundreds of predefined Atoms that output simple Latex like '+', '-', etc,
until one day those types of Atoms should be handled in a special way.
Whenever a new Atom is defined with special behaviour,
developers can opt-in by using those new special classes instead of the RawAtom.
*/
export class RawAtom extends ReadonlyAtom {
    Latex : string;
    constructor(latex: string) {
        super();
        this.Latex = latex;
    }
    override provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return this.Latex;
    }
}