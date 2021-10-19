import { describe } from 'mocha';
import { assert, expect } from 'chai';
import { KeyboardMemory } from '../../../../../src/KeyboardEngine/KeyboardMemory';
import { AscendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { insertWithEncapsulateCurrent } from '../../../../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent';
import { expectLatex } from '../../../../helpers/expectLatex';
import { Placeholder } from '../../../../../src/SyntaxTreeComponents/Placeholder/Placeholder';
import { insert } from '../../../../../src/KeyboardEngine/Functions/Insertion/insert';
import { MatrixNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { moveRight } from '../../../../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { DigitNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { DecimalSeparatorNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { StandardLeafNode } from '../../../../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode';
import { RoundBracketsNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';
import { StandardBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { DescendingBranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { nameof } from '../../../../helpers/nameof';
import { BranchingNode } from '../../../../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';

describe(insertWithEncapsulateCurrent.name, () => {
  it(`does a regular insert if ${nameof<KeyboardMemory>("current")} is a ${Placeholder.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    assert.isTrue(k.current instanceof Placeholder);
    expectLatex('◼', k);
    // Act
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('{◼}^{◻}', k);
  });

  it('can encapsulate complex stuff like matrixes', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    for (let i = 1; i <= 4; i++) {
      insert(k, new DigitNode(i.toString()));
      moveRight(k);
    }
    // Act
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex(String.raw`{\begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix}}^{◼}`, k);
  });

  it('can also be used inside (for example) a matrix', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new MatrixNode('pmatrix', 2, 2));
    insert(k, new DigitNode('1'));
    // Act
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex(String.raw`\begin{pmatrix}{1}^{◼} & ◻ \\ ◻ & ◻\end{pmatrix}`, k);
  });

  it('can encapsulate multiple digits', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    // Act
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`\frac{12}{◼}`, k);
  });

  it('can encapsulate a decimal number', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new DigitNode('2'));
    insert(k, new DecimalSeparatorNode());
    insert(k, new DigitNode('3'));
    // Act
    insertWithEncapsulateCurrent(k, new AscendingBranchingNode('{', '}^{', '}'));
    // Assert
    expectLatex('{12.3}^{◼}', k);
  });

  it('does not encapsulate more than it should', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('2'));
    insert(k, new DigitNode('3'));
    // Act
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    // Assert
    expectLatex(String.raw`1+\frac{23}{◼}`, k);
  });

  it('can encapsulate round brackets', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new DigitNode('2'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('3'));
    moveRight(k);
    expectLatex(String.raw`1+(2+3)◼`, k);
    const powerNode = new AscendingBranchingNode('{', '}^{', '}');
    // Act
    insertWithEncapsulateCurrent(k, powerNode);
    // Assert
    expectLatex(String.raw`1+{(2+3)}^{◼}`, k);
    expect(powerNode.placeholders[0].getLatex(k, null!)).to.be.equal('(2+3)');
  });

  it('with config.deleteOuterRoundBracketsIfAny: deletes outer round brackets during encapsulation', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new StandardLeafNode('x'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('2'));
    moveRight(k);
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new StandardLeafNode('x'));
    insert(k, new StandardLeafNode('-'));
    insert(k, new DigitNode('3'));
    moveRight(k);
    moveRight(k);
    expectLatex(String.raw`1+((x+2)(x-3))◼`, k);
    // Act
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'), { deleteOuterRoundBracketsIfAny: true });
    // Assert
    expectLatex(String.raw`1+\frac{(x+2)(x-3)}{◼}`, k);
  });

  it('with config.deleteOuterRoundBracketsIfAny: does not delete square brackets during encapsulation', () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new DigitNode('1'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new StandardBranchingNode(String.raw`|`, String.raw`|`));
    insert(k, new StandardLeafNode('x'));
    insert(k, new StandardLeafNode('+'));
    insert(k, new DigitNode('3'));
    moveRight(k);
    // Act
    const fraction = new DescendingBranchingNode(String.raw`\frac{`, '}{', '}');
    insertWithEncapsulateCurrent(k, fraction, {
      deleteOuterRoundBracketsIfAny: true,
    });
    // Assert
    expectLatex(String.raw`1+\frac{|x+3|}{◼}`, k);
    expect(fraction.placeholders[0].getLatex(k, null!)).to.be.equal('|x+3|');
  });

  it(`with config.deleteOuterRoundBracketsIfAny: encapsulation by single-placeholder ${BranchingNode.name} sets the cursor at the right of ("outside of") the new ${BranchingNode.name}`, () => {
    // Arrange
    const k = new KeyboardMemory();
    insert(k, new RoundBracketsNode('(', ')'));
    insert(k, new StandardLeafNode('A'));
    insert(k, new StandardLeafNode('B'));
    moveRight(k);
    expectLatex('(AB)◼', k);
    // Act
    insertWithEncapsulateCurrent(k, new StandardBranchingNode(String.raw`\overrightarrow{`, '}'), { deleteOuterRoundBracketsIfAny: true });
    // Assert
    expectLatex(String.raw`\overrightarrow{AB}◼`, k);
  });
});
