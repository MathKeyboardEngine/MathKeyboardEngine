import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { InsertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insert/InsertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { Insert } from '../../../../../src/KeyboardEngine/Functions/Insert/Insert';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { MoveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveRight';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { MoveLeft } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveLeft';
import { DeleteCurrent } from '../../../../../src/KeyboardEngine/Functions/Delete/DeleteCurrent';
import { MoveUp } from '../../../../../src/KeyboardEngine/Functions/Navigation/MoveUp';
import { RoundBracketsNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';
import { StandardBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';

describe(InsertWithEncapsulateCurrent.name, () => {
  it('does a regular insert if current is a placeholder', () => {
    const k = new KeyboardMemory();
    assert.isTrue(k.Current instanceof Placeholder);
    expectLatex('◼', k);
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    expectLatex('{◼}^{◻}', k);
  });

  it('can encapsulate complex stuff like matrixes', () => {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({ matrixType: 'pmatrix', height: 2, width: 2 }));
    for (let i = 1; i <= 4; i++) {
      Insert(k, new DigitNode(i.toString()));
      MoveRight(k);
    }
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex(String.raw`\begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix}^{◼}`, k);
  });

  it('can also be used inside (for example) a matrix', () => {
    const k = new KeyboardMemory();
    Insert(k, new MatrixNode({ matrixType: 'pmatrix', height: 2, width: 2 }));
    Insert(k, new DigitNode('1'));
    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex(String.raw`\begin{pmatrix}1^{◼} & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('can encapsulate multiple digits', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    InsertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`\frac{12}{◼}`, k);
  });

  it('can encapsulate a decimal number', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new DigitNode('2'));
    Insert(k, new DecimalSeparatorNode());
    Insert(k, new DigitNode('3'));

    InsertWithEncapsulateCurrent(k, new AscendingBranchingNode('', '^{', '}'));
    expectLatex('12.3^{◼}', k);
    MoveLeft(k);
    expectLatex('12.3◼^{◻}', k);
    DeleteCurrent(k);
    DeleteCurrent(k);
    expectLatex('12◼^{◻}', k);
    MoveUp(k);
    expectLatex('12^{◼}', k);
  });

  it('does not encapsulate more than it should', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new DigitNode('2'));
    Insert(k, new DigitNode('3'));
    InsertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    expectLatex(String.raw`1+\frac{23}{◼}`, k);
  });

  it('can encapsulate round brackets', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new DigitNode('2'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new DigitNode('3'));
    MoveRight(k);
    expectLatex(String.raw`1+(2+3)◼`, k);
    const powerNode = new AscendingBranchingNode('', '^{', '}');
    InsertWithEncapsulateCurrent(k, powerNode);
    expectLatex(String.raw`1+(2+3)^{◼}`, k);
    expect(powerNode.Placeholders[0].getLatex(k, null!)).to.be.equal('(2+3)');
  });

  it('config.deleteOuterRoundBracketsIfAny: deletes outer round brackets during encapsulation', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new StandardLeafNode('x'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new DigitNode('2'));
    MoveRight(k);
    Insert(k, new RoundBracketsNode('(', ')'));
    Insert(k, new StandardLeafNode('x'));
    Insert(k, new StandardLeafNode('-'));
    Insert(k, new DigitNode('3'));
    MoveRight(k);
    MoveRight(k);
    expectLatex(String.raw`1+((x+2)(x-3))◼`, k);
    InsertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'), { deleteOuterRoundBracketsIfAny: true });
    expectLatex(String.raw`1+\frac{(x+2)(x-3)}{◼}`, k);
  });

  it('config.deleteOuterRoundBracketsIfAny does not delete square brackets during encapsulation', () => {
    const k = new KeyboardMemory();
    Insert(k, new DigitNode('1'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new StandardBranchingNode(String.raw`|`, String.raw`|`));
    Insert(k, new StandardLeafNode('x'));
    Insert(k, new StandardLeafNode('+'));
    Insert(k, new DigitNode('3'));
    MoveRight(k);
    const fraction = new DescendingBranchingNode(String.raw`\frac{`, '}{', '}');
    InsertWithEncapsulateCurrent(k, fraction, {
      deleteOuterRoundBracketsIfAny: true,
    });
    expectLatex(String.raw`1+\frac{|x+3|}{◼}`, k);
    expect(fraction.Placeholders[0].getLatex(k, null!)).to.be.equal('|x+3|');
  });
});
