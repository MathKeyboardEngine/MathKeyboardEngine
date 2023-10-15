import { describe } from 'mocha';
import { expect, assert } from 'chai';
import { insert, LatexConfiguration, DigitNode, parseLatex, insertWithEncapsulateCurrent, DescendingBranchingNode, StandardLeafNode, DecimalSeparatorNode, StandardBranchingNode, BranchingNode, AscendingBranchingNode, MatrixNode, RoundBracketsNode } from '../../../src/x';
import { expectViewModeLatex } from '../../helpers/expectLatex';
import { LatexParserConfiguration } from '../../../src/LatexParser/LatexParserConfiguration';
import { nameof } from '../../helpers/nameof';

describe(parseLatex.name, () => {
  const CONFIG = new LatexConfiguration();
  const PARSERCONFIG = new LatexParserConfiguration();
  PARSERCONFIG.descendingBranchingNodeSlashCommandsWithTwoPairsOfBrackets = [String.raw`\frac{}{}`, String.raw`\binom{}{}`, String.raw`sqrt[]{}` ];
  PARSERCONFIG.useRoundBracketsNode = false;

  for(const testData of [ 
    { input: '', expected: '⬚'},
    { input: null, expected: '⬚'},
    { input: ' ', expected: '⬚'},
   ])
  it(`should return EditMode Latex '${testData.expected}' for input '${testData.input}'`, () => {
    // Act
    const k = parseLatex(testData.input, CONFIG, PARSERCONFIG);
    // Assert
    expectViewModeLatex(testData.expected, k);
  });

  for(const testData of [
    '1', 
    '123', 
    '1.2', 
    'x', 
    'xyz', 
    '2x', 
    String.raw`\frac{1}{2}`,
    String.raw`3\frac{1}{2}`,
    String.raw`\frac{1}{2}3`,
    String.raw`\frac{1+x}{2-y}`,
    String.raw`\frac{7}{\frac{8}{9}}`,
    String.raw`\binom{10}{2}`,
    String.raw`\binom{\frac{4}{2}}{1}`,
    String.raw`\frac{\frac{\binom{10}{x}}{x-1}}{\frac{2a-x}{a}}`,
    '2^x',
    '2^{x}',
    '2^{x+1}',
    String.raw`2^{\frac{1}{2}}`,
    String.raw`1+2^{\frac{3}{4}}+5`,
    'a_{1}',
    'a_1',
    'a_{n-1}',
    'a_{n-2}a_{n-1}a_{n}',
    String.raw`x^\frac{1}{2}`,
    String.raw`x^{\frac{1}{2}}`,
    String.raw`x^\frac{p^2}{2}`,
    String.raw`x^\frac{p^{2}}{2}`,
    String.raw`x^\pi`,
    String.raw`x^{\pi}`,
    String.raw`a_1\times a_2`,
    String.raw`a_{1}\times a_{2}`,
    String.raw`\sqrt{2}`,
    String.raw`a\sqrt{2}b`,
    String.raw`\|`,
    String.raw`\sin\pi`,
    String.raw`\sin{\pi}`,
    String.raw`\sin6`,
    String.raw`\sin{6}`,
    String.raw`\sin(6)`,
    String.raw`\sin\left(6\right)`,
   ])
  it(`should return ViewMode Latex '${testData}' for input '${testData}'`, () => {
    // Act
    const k = parseLatex(testData, CONFIG, PARSERCONFIG);
    // Assert
    expectViewModeLatex(testData, k);
  });

  it('can handle non-decimal number base', () => {
    // Arrange
    const myParserConfig = new LatexParserConfiguration();
    myParserConfig.additionalDigits = ['↊', '↋'];
    // Act
    const k = parseLatex('6↊↋', CONFIG, myParserConfig);
    // Assert
    k.syntaxTreeRoot.nodes.forEach(function (n) {
      assert.isTrue(n instanceof DigitNode)
    })
    
    insertWithEncapsulateCurrent(k, new DescendingBranchingNode(String.raw`\frac{`, '}{', '}'));
    insert(k, new DigitNode('2'));
    expectViewModeLatex(String.raw`\frac{6↊↋}{2}`, k);
  });

  it('allows commands with bracket-only difference', () => {
    // Arrange
    const myParserConfig = new LatexParserConfiguration();
    myParserConfig.descendingBranchingNodeSlashCommandsWithTwoPairsOfBrackets = [ String.raw`\sqrt[]{}`, String.raw`\sqrt{}{}`, String.raw`\sqrt[][]`, String.raw`\sqrt{}[]`];

    // Act & Assert
    expectViewModeLatex(String.raw`\sqrt[3]{27}`, parseLatex(String.raw`\sqrt[3]{27}`, CONFIG, myParserConfig));
    expectViewModeLatex(String.raw`\sqrt{3}{27}`, parseLatex(String.raw`\sqrt{3}{27}`, CONFIG, myParserConfig));
    expectViewModeLatex(String.raw`\sqrt[3][27]`, parseLatex(String.raw`\sqrt[3][27]`, CONFIG, myParserConfig));
    expectViewModeLatex(String.raw`\sqrt{3}[27]`, parseLatex(String.raw`\sqrt{3}[27]`, CONFIG, myParserConfig));
  });

  it('throws on missing closing bracket', () => {
    expect(() => parseLatex(String.raw`\frac{1}{2`, CONFIG, PARSERCONFIG)).to.throw();
  })

  for(const testData of [
    'a',
    String.raw`\|`,
    String.raw`\pi`,
    String.raw`\left{`,
    String.raw`\left\{`,
    String.raw`\right}`,
    String.raw`\right\}`,
    String.raw`\right|`,
    String.raw`\right\|`,
    String.raw`\right]`,
    String.raw`\right\]`,
    String.raw`\left(`,
    String.raw`\right)`,
  ])
  it(String.raw`inserts ${testData} as ${StandardLeafNode.name}`, () => {
    // Act
    const k = parseLatex(testData, CONFIG, PARSERCONFIG);
    // Assert
    const nodes = k.syntaxTreeRoot.nodes;
    expect(nodes.length).to.equal(1);
    assert.isTrue(nodes[0] instanceof StandardLeafNode);
    expectViewModeLatex(testData, k);
  });

  for (const testData of [ String.raw`\sin6`, String.raw`\sin 6`]) {
    it(String.raw`interprets ${testData} as two LeafNodes`, () => {
      // Act
      const k = parseLatex(testData, CONFIG, PARSERCONFIG);   
      // Assert 
      const nodes = k.syntaxTreeRoot.nodes;
      expect(nodes.length).to.equal(2);
      assert.isTrue(nodes[0] instanceof StandardLeafNode);
      assert.isTrue(nodes[1] instanceof DigitNode);
      expectViewModeLatex(String.raw`\sin6`, k);
    });
  }

  it(String.raw`understands that \sin{6} is a StandardBranchingNode`, () => {
    // Arrange
    const latex = String.raw`\sin{6}`;
    // Act
    const k = parseLatex(latex, CONFIG, PARSERCONFIG);   
    // Assert 
    const nodes = k.syntaxTreeRoot.nodes;
    expect(nodes.length).to.equal(1);
    const outerNode = nodes[0] as BranchingNode;
    assert.isTrue(outerNode instanceof StandardBranchingNode);
    expect(outerNode.placeholders[0].nodes.length).to.equal(1);
    const innerNode = outerNode.placeholders[0].nodes[0];
    assert.isTrue(innerNode instanceof DigitNode);
    expectViewModeLatex(latex, k);
  });

  for (const separator of [ '.','{,}']) {
    it(String.raw`understands the decimal separator ${separator}`, () => {
      // Arrange
      const myParserConfig = new LatexParserConfiguration();
      myParserConfig.decimalSeparator = separator;
      const latex = `1${separator}2`;
      // Act
      const k = parseLatex(latex, CONFIG, myParserConfig);
      // Assert
      const nodes = k.syntaxTreeRoot.nodes;
      expect(nodes.length).to.equal(3);
      const separatorNode = nodes[1];
      assert.isTrue(nodes[0] instanceof DigitNode);
      assert.isTrue(separatorNode instanceof DecimalSeparatorNode);
      assert.isTrue(nodes[2] instanceof DigitNode);
      expectViewModeLatex(latex, k);
    });
  }

  it(String.raw`understands that a_{12}\times a_{34} has ${DescendingBranchingNode.name}s`, () => {
    // Arrange
    const latex = String.raw`a_{12}\times a_{34}`;
    // Act
    const k = parseLatex(latex, CONFIG, PARSERCONFIG);   
    // Assert 
    const nodes = k.syntaxTreeRoot.nodes;
    expect(nodes.length).to.equal(3);

    const outerNode = nodes[0] as BranchingNode;
    assert.isTrue(outerNode instanceof DescendingBranchingNode);
    const subscript1 = outerNode.placeholders[1].nodes;
    expect(subscript1.length).to.equal(2);
    assert.isTrue(subscript1[0] instanceof DigitNode);
    assert.isTrue(subscript1[1] instanceof DigitNode);

    assert.isTrue(nodes[1] instanceof StandardLeafNode);

    const outerNode2 = nodes[0] as BranchingNode;
    assert.isTrue(outerNode2 instanceof DescendingBranchingNode);
    const subscript2 = outerNode2.placeholders[1].nodes;
    expect(subscript2.length).to.equal(2);
    assert.isTrue(subscript2[0] instanceof DigitNode);
    assert.isTrue(subscript2[1] instanceof DigitNode);  
    
    expectViewModeLatex(latex, k);
  });

  it(String.raw`understands complex Latex`, () => {
    // Arrange
    const latex = String.raw`\exp\left[\int d^{4}xg\phi\bar{\psi}\psi\right]=\sum_{n=0}^{\infty}\frac{g^{n}}{n!}\left(\int d^{4}x\phi\bar{\psi}\psi\right)^{n}`;
    // Act
    const k = parseLatex(latex, CONFIG, PARSERCONFIG);   
    // Assert 
    const nodes = k.syntaxTreeRoot.nodes;

    assert.isTrue(nodes[0] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\exp`, nodes[0]);

    assert.isTrue(nodes[1] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\left[`, nodes[1]);

    assert.isTrue(nodes[2] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\int`, nodes[2]);

    assert.isTrue(nodes[3] instanceof AscendingBranchingNode);
    expectViewModeLatex('d^{4}', nodes[3]);

    assert.isTrue(nodes[4] instanceof StandardLeafNode);
    expectViewModeLatex('x', nodes[4]);

    assert.isTrue(nodes[5] instanceof StandardLeafNode);
    expectViewModeLatex('g', nodes[5]);
    
    assert.isTrue(nodes[6] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\phi`, nodes[6]);

    assert.isTrue(nodes[7] instanceof StandardBranchingNode);
    expectViewModeLatex(String.raw`\bar{\psi}`, nodes[7]);

    assert.isTrue(nodes[8] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\psi`, nodes[8]);

    assert.isTrue(nodes[9] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\right]`, nodes[9]);

    assert.isTrue(nodes[10] instanceof StandardLeafNode);
    expectViewModeLatex('=', nodes[10]);

    assert.isTrue(nodes[11] instanceof AscendingBranchingNode);
    expectViewModeLatex(String.raw`\sum_{n=0}^{\infty}`, nodes[11]);

    assert.isTrue(nodes[12] instanceof DescendingBranchingNode);
    expectViewModeLatex(String.raw`\frac{g^{n}}{n!}`, nodes[12]);

    assert.isTrue(nodes[13] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\left(`, nodes[13]);

    assert.isTrue(nodes[14] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\int`, nodes[14]);

    assert.isTrue(nodes[15] instanceof AscendingBranchingNode);
    expectViewModeLatex('d^{4}', nodes[15]);

    assert.isTrue(nodes[16] instanceof StandardLeafNode);
    expectViewModeLatex('x', nodes[16]);

    assert.isTrue(nodes[17] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\phi`, nodes[17]);

    assert.isTrue(nodes[18] instanceof StandardBranchingNode);
    expectViewModeLatex(String.raw`\bar{\psi}`, nodes[18]);
    
    assert.isTrue(nodes[19] instanceof StandardLeafNode);
    expectViewModeLatex(String.raw`\psi`, nodes[19]);

    assert.isTrue(nodes[20] instanceof AscendingBranchingNode);
    expectViewModeLatex(String.raw`\right)^{n}`, nodes[20]);

    expectViewModeLatex(latex, k);
  });

  for (const matrixType of [ 'matrix','pmatrix']) {
    it(String.raw`understands the ${matrixType}`, () => {
      // Arrange
      const latex = String.raw`3\begin{${matrixType}}1+2 & x^{3} \\ \frac{4}{5} & x \\ \pi & x\left(x+6\right)\end{${matrixType}}=`;
      // Act
      const k = parseLatex(latex, CONFIG, PARSERCONFIG);
      // Assert
      const nodes = k.syntaxTreeRoot.nodes;
      expect(nodes.length).to.equal(3);
      assert.isTrue(nodes[0] instanceof DigitNode);
      assert.isTrue(nodes[1] instanceof MatrixNode);
      assert.isTrue(nodes[2] instanceof StandardLeafNode);

      const matrixNode = nodes[1] as MatrixNode;
      expect(matrixNode.placeholders.length).to.equal(6);

      const placeholder0 = matrixNode.placeholders[0];
      expect(placeholder0.nodes.length).to.equal(3);
      expectViewModeLatex('1+2', placeholder0);

      const placeholder1 = matrixNode.placeholders[1];
      expect(placeholder1.nodes.length).to.equal(1);
      expectViewModeLatex('x^{3}', placeholder1);
      assert.isTrue(placeholder1.nodes[0] instanceof AscendingBranchingNode);

      const placeholder2 = matrixNode.placeholders[2];
      expect(placeholder2.nodes.length).to.equal(1);
      assert.isTrue(placeholder2.nodes[0] instanceof DescendingBranchingNode);
      expectViewModeLatex(String.raw`\frac{4}{5}`, placeholder2);
      
      const placeholder3 = matrixNode.placeholders[3];
      expect(placeholder3.nodes.length).to.equal(1);
      expectViewModeLatex('x', placeholder3);

      const placeholder4 = matrixNode.placeholders[4];
      expect(placeholder4.nodes.length).to.equal(1);
      expectViewModeLatex(String.raw`\pi`, placeholder4);

      const placeholder5 = matrixNode.placeholders[5];
      expect(placeholder5.nodes.length).to.equal(6);
      expectViewModeLatex(String.raw`x\left(x+6\right)`, placeholder5);

      expectViewModeLatex(latex, k);
    });
  }

  it(String.raw`parses \begin{cases} and \text{if }`, () => {
    // Arrange
    const latex = String.raw`x=\begin{cases}a & \text{if }b \\ c & \text{if }d\end{cases}`
    // Act
    const k = parseLatex(latex, CONFIG, PARSERCONFIG);
    // Assert
    const nodes = k.syntaxTreeRoot.nodes;
    expect(nodes.length).to.equal(3);
    assert.isTrue(nodes[2] instanceof MatrixNode);
    const matrixNode = nodes[2] as MatrixNode;
    expect(matrixNode.placeholders.length).to.equal(4);
    const placeholder1 = matrixNode.placeholders[1];
    expect(placeholder1.nodes.length).to.equal(2);
    expectViewModeLatex(String.raw`\text{if }`, placeholder1.nodes[0]);
    expectViewModeLatex(latex, k);
  });

  it(String.raw`throws on \begin{__} where __ does not end with the word 'matrix' or 'cases'`, () => {
    expect(() => parseLatex(String.raw`\begin{test}12\\34\end{test}`, CONFIG, PARSERCONFIG)).to.throw();
  });

  for(const latex of ['(x-1)', String.raw`\left(x-1\right)`]) {
    it(String.raw`Setting: ${nameof<LatexParserConfiguration>('useRoundBracketsNode')} = true`, () => {
      // Arrange
      const myParserConfig = new LatexParserConfiguration();
      myParserConfig.useRoundBracketsNode = true;
      // Act
      const k = parseLatex(latex, CONFIG, myParserConfig);
      // Assert
      const nodes = k.syntaxTreeRoot.nodes;
      expect(nodes.length).to.equal(1);
      assert.isTrue(nodes[0] instanceof RoundBracketsNode);
      const roundBracketsNode = nodes[0] as RoundBracketsNode;
      expectViewModeLatex(latex, k);
      expect(roundBracketsNode.placeholders[0].nodes.length).to.equal(3);
    });
  }
});
