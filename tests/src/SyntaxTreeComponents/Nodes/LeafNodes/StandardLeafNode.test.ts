import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { expectLatex } from '../../../../helpers/expectLatex';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';

describe(StandardLeafNode.name, () =>
{
    it("allows a customizable multiplication operator sign for nodes that are already in the KeyboardMemory's syntax tree.", () =>
    {
        let myMultiplicationSignSetting = String.raw`\times `;

        let k = new KeyboardMemory();
        Insert(k, new DigitNode("2"));
        Insert(k, new StandardLeafNode(() => myMultiplicationSignSetting));
        Insert(k, new StandardLeafNode("a"));
        expectLatex(String.raw`2\times a◼`, k);

        myMultiplicationSignSetting = String.raw`\cdot `;
        expectLatex(String.raw`2\cdot a◼`, k);
    });
});