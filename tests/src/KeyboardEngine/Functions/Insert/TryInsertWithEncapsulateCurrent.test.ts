import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory'
import { MultiplePlaceholdersAscendingRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersAscendingRawNode';
import { TryInsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { RawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/RawNode';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { RoundBracketsNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';
import { SinglePlaceholderRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/SinglePlaceholderRawNode';
import { MultiplePlaceholdersDescendingRawNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MultiplePlaceholdersDescendingRawNode';

describe(TryInsertWithEncapsulateCurrent.name, () =>
{
  it('returns false if current is placeholder', () =>
  {
    let k = new KeyboardMemory();
    assert.isTrue(k.Current instanceof Placeholder);
    expectLatex('◼', k);
    assert.notOk(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}')));
    expectLatex('◼', k);
  });

  it('can encapsulate complex stuff like matrixes', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixNode({matrixType: "pmatrix", height:2, width:2}));
    for(let i = 1; i <= 4; i++){
        Insert(k, new DigitNode(i.toString()));
        MoveRight(k);    
    }
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}')));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix}^{◼}`, k);
  });

  it('can also be used inside (for example) a matrix', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new MatrixNode({matrixType: "pmatrix", height:2, width:2}));
    Insert(k, new DigitNode("1"));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}')));
    expectLatex(String.raw`\begin{pmatrix}1^{◼} & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('can encapsulate multiple digits', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}')));
    expectLatex(String.raw`\frac{12}{◼}`, k);
  });

  it('can encapsulate a decimal number', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new DigitNode("2"));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode("3"));

    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersAscendingRawNode('', '^{', '}')));
    expectLatex('12.3^{◼}', k);
    MoveLeft(k);
    expectLatex('12.3◼^{◻}', k);
    DeleteCurrent(k);
    DeleteCurrent(k);
    expectLatex('12◼^{◻}', k);
    MoveUp(k);
    expectLatex('12^{◼}', k);
  });

  it('does not encapsulate more than it should', () =>
  {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new RawNode('+'));
    Insert(k, new DigitNode("2"));
    Insert(k, new DigitNode("3"));
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}')));
    expectLatex(String.raw`1+\frac{23}{◼}`, k);
  });

  it ('can encapsulate round brackets', () => {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new RawNode('+'));
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new DigitNode("2"));
    Insert(k, new RawNode('+'));
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    expectLatex(String.raw`1+(2+3)◼`, k);
    let powerNode = new MultiplePlaceholdersAscendingRawNode('', '^{', '}');
    assert.ok(TryInsertWithEncapsulateCurrent(k, powerNode));
    expectLatex(String.raw`1+(2+3)^{◼}`, k);
    expect(powerNode.Placeholders[0].getLatex(k, null!)).to.be.equal("(2+3)");
  });

  it ('config.deleteOuterRoundBracketsIfAny: deletes outer round brackets during encapsulation', () => {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new RawNode('+'));
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new RawNode("x"));
    Insert(k, new RawNode('+'));
    Insert(k, new DigitNode("2"));
    MoveRight(k);
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new RawNode("x"));
    Insert(k, new RawNode('-'));
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    MoveRight(k);
    expectLatex(String.raw`1+((x+2)(x-3))◼`, k);
    assert.ok(TryInsertWithEncapsulateCurrent(k, new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}'), { deleteOuterRoundBracketsIfAny: true}));
    expectLatex(String.raw`1+\frac{(x+2)(x-3)}{◼}`, k);
  });
  
  it ('config.deleteOuterRoundBracketsIfAny does not delete square brackets during encapsulation', () => {
    let k = new KeyboardMemory();
    Insert(k, new DigitNode("1"));
    Insert(k, new RawNode('+'));
    Insert(k, new SinglePlaceholderRawNode(String.raw`|`, String.raw`|`));
    Insert(k, new RawNode("x"));
    Insert(k, new RawNode('+'));
    Insert(k, new DigitNode("3"));
    MoveRight(k);
    let fraction = new MultiplePlaceholdersDescendingRawNode(String.raw`\frac{`, '}{', '}');
    assert.ok(TryInsertWithEncapsulateCurrent(k, fraction, { deleteOuterRoundBracketsIfAny: true}));
    expectLatex(String.raw`1+\frac{|x+3|}{◼}`, k);
    expect(fraction.Placeholders[0].getLatex(k, null!)).to.be.equal("|x+3|");
  });
});