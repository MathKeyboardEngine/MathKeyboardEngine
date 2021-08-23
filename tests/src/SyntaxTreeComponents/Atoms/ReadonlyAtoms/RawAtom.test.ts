import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { expectLatex } from '../../../../helpers/expectLatex';
import { RawAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/RawAtom';

describe(RawAtom.name, () =>
{
    it("allows a customizable multiplication operator sign for atoms that are already in the KeyboardMemory's syntax tree.", () =>
    {
        let myMultiplicationSignSetting = String.raw`\times `;

        let k = new KeyboardMemory();
        Insert(k, new DigitAtom("2"));
        Insert(k, new RawAtom(() => myMultiplicationSignSetting));
        Insert(k, new RawAtom("a"));
        expectLatex(String.raw`2\times a◼`, k);

        myMultiplicationSignSetting = String.raw`\cdot `;
        expectLatex(String.raw`2\cdot a◼`, k);
    });
});