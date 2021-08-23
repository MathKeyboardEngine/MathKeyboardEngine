import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { DecimalSeparatorAtom } from '../../../../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom';
import { expectLatex } from '../../../../helpers/expectLatex';

describe(DecimalSeparatorAtom.name, () =>
{
    it("allows customizing the decimal separator for atoms that are already in the KeyboardMemory's syntax tree.", () =>
    {
        let myDecimalSeparatorSetting = '{,}';

        let k = new KeyboardMemory();
        Insert(k, new DigitAtom("1"));
        Insert(k, new DecimalSeparatorAtom(() => myDecimalSeparatorSetting));
        Insert(k, new DigitAtom("2"));
        expectLatex('1{,}2◼', k);

        myDecimalSeparatorSetting = '.';
        expectLatex('1.2◼', k);
    });
});