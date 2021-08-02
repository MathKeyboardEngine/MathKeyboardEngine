import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../src/KeyboardEngine/KeyboardMemory'
import { expectLatex } from '../../TestHelpers/expectLatex';
import { Insert } from '../../../src/KeyboardEngine/Functions/Insert/Insert';
import { WritableAtom } from '../../../src/SyntaxTreeComponents/Atoms/Base/WritableAtom';
import { LatexConfiguration } from '../../../src/LatexConfiguration';
import { Placeholder } from '../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { MoveUp } from '../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { MoveDown } from '../../../src/KeyboardEngine/Functions/Navigation/MoveDown';

describe(WritableAtom.name, () =>
{
  it('calling MoveDown does not throw even if not implemented', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new SquaredAtom());
    expectLatex('◼^2', k);
    MoveUp(k);
    expectLatex('◼^2', k);
    MoveDown(k);
    expectLatex('◼^2', k);
  });
});

class SquaredAtom extends WritableAtom {
    /* Real applications will probably use the PowerAtom.
    This SquaredAtom class is merely meant to test a theoretically possible WritableAtom structure
    with a single placeholder and no support for moving up or down. */
    Base : Placeholder;
    constructor(){
        super([new Placeholder()]);
        this.Base = this.Placeholders[0];
    }
    provideLatex(latexConfiguration: LatexConfiguration, keyboardMemory: KeyboardMemory): string {
        return this.Base.getLatex(latexConfiguration, keyboardMemory) + "^2";
    }
}