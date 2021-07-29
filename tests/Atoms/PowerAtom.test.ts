import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../src/KeyboardEngine/KeyboardMemory'
import { Insert } from '../../src/KeyboardEngine/Functions/Insert';
import { PowerAtom } from '../../src/SyntaxTreeComponents/Atoms/WritableAtoms/PowerAtom';
import { DigitAtom } from '../../src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom';
import { MoveRight } from '../../src/KeyboardEngine/Functions/MoveRight';
import { MoveUp } from '../../src/KeyboardEngine/Functions/MoveUp';
import { TryEncapsulateCurrentBy } from '../../src/KeyboardEngine/Functions/TryEncapsulateCurrentBy';
import { LatexConfiguration } from '../../src/LatexConfiguration';

const defaultLatexConfiguration = new LatexConfiguration();
describe('PowerAtom', () =>
{
  it('pow 3 right 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    Insert(k, new DigitAtom(3));
    MoveRight(k);
    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('3^{4}').to.equal(latex);
  });

  it('frac 3 down 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new PowerAtom());
    Insert(k, new DigitAtom(3));
    MoveUp(k);

    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('3^{4}').to.equal(latex);
  });

  it('3 encapsulatedBy(pow.Base) 4', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitAtom(3));
    TryEncapsulateCurrentBy(k, new PowerAtom().Base);
    Insert(k, new DigitAtom(4));
    let latex = k.SyntaxTreeRoot.getLatex(defaultLatexConfiguration, k);
    expect('3^{4}').to.equal(latex);
  });
});