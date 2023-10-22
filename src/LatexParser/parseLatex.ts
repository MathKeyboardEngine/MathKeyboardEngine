import { KeyboardMemory } from '../KeyboardEngine/KeyboardMemory';
import { LatexConfiguration } from '../LatexConfiguration';
import { isLetter } from '../helpers/stringhelpers/isLetter';
import { LatexParserConfiguration } from './LatexParserConfiguration';
import { insert } from '../../src/KeyboardEngine/Functions/Insertion/insert';
import { AscendingBranchingNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/AscendingBranchingNode';
import { BranchingNode } from '../../src/SyntaxTreeComponents/Nodes/Base/BranchingNode';
import { DecimalSeparatorNode } from '../../src/SyntaxTreeComponents/Nodes/LeafNodes/DecimalSeparatorNode';
import { DescendingBranchingNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/DescendingBranchingNode';
import { DigitNode } from '../../src/SyntaxTreeComponents/Nodes/LeafNodes/DigitNode';
import { StandardBranchingNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/StandardBranchingNode';
import { StandardLeafNode } from '../../src/SyntaxTreeComponents/Nodes/LeafNodes/StandardLeafNode'
import { insertWithEncapsulateCurrent } from '../../src/KeyboardEngine/Functions/Insertion/insertWithEncapsulateCurrent';
import { moveRight } from '../../src/KeyboardEngine/Functions/Navigation/moveRight';
import { getBracketPairContent } from './helpers/getBracketPairContent';
import { MatrixNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/MatrixNode';
import { RoundBracketsNode } from '../../src/SyntaxTreeComponents/Nodes/BranchingNodes/RoundBracketsNode';

export function parseLatex(latex : string | null, latexParserConfiguration : LatexParserConfiguration): KeyboardMemory {
  if (latex == null) {
    return new KeyboardMemory();
  }
  let x = latex.trim();

  const k = new KeyboardMemory();

  while (x != '') {
    if (x[0] == ' ') {
      x = x.trimStart();
      continue;
    }

    const decimalSeparatorMatch = latexParserConfiguration.decimalSeparatorMatchers.find(pattern => x.startsWith(pattern));
    if (decimalSeparatorMatch != null) {
      insert(k, new DecimalSeparatorNode(latexParserConfiguration.decimalSeparatorSetting ?? decimalSeparatorMatch));
      x = x.slice(decimalSeparatorMatch.length);
      continue;
    } 
    
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(x[0]) || latexParserConfiguration.additionalDigits?.includes(x[0])) {
      insert(k, new DigitNode(x[0]));
      x = x.slice(1);
      continue;
    }
    
    let handled = false;

    if (x.startsWith(String.raw`\begin{`)) {
      const matrixTypeAndRest = getBracketPairContent(String.raw`\begin{`, '}', x);
      if (!matrixTypeAndRest.content.endsWith('matrix') && !matrixTypeAndRest.content.endsWith('cases')) {
        throw String.raw`Expected a word ending with 'matrix' or 'cases' after '\begin{'.`
      }
      const matrixContent = matrixTypeAndRest.rest.slice(0, matrixTypeAndRest.rest.indexOf(String.raw`\end{${matrixTypeAndRest.content}}`));
      const lines = matrixContent.split(String.raw`\\`);
      insert(k, new MatrixNode(matrixTypeAndRest.content, lines[0].split('&').length, lines.length));
      for (const line of lines) {
        for (const latex of line.split('&')) {
          const nodes = parseLatex(latex, latexParserConfiguration).syntaxTreeRoot.nodes;
          insert(k, nodes);
          moveRight(k);
        }
      }
      const matrixEnd = String.raw`\end{${matrixTypeAndRest.content}}`;
      x = x.slice(x.indexOf(matrixEnd) + matrixEnd.length);
      continue;
    }

    if (latexParserConfiguration.preferRoundBracketsNode && (x[0] =='(' || x.startsWith(String.raw`\left(`) )) {
      const opening = x[0] =='(' ? '(' : String.raw`\left(`;
      const closing = x[0] =='(' ? ')' : String.raw`\right)`;
      const bracketsNode = new RoundBracketsNode(opening, closing);
      insert(k, bracketsNode);
      const bracketsContentAndRest = getBracketPairContent(opening, closing, x);
      const bracketsContentNodes = parseLatex(bracketsContentAndRest.content, latexParserConfiguration).syntaxTreeRoot.nodes;
      insert(k, bracketsContentNodes);
      k.current = bracketsNode;
      x = bracketsContentAndRest.rest;
      continue;
    }

    if (x.startsWith('\\')) {
      for (const prefix of ['\\left\\', '\\right\\', String.raw`\left`, String.raw`\right`]) {
        if (x.startsWith(prefix) && !isLetter(x.slice(prefix.length)[0])) {
          insert(k, new StandardLeafNode(prefix + x[prefix.length]));
          x = x.slice(prefix.length + 1);
          handled = true;
          break;
        }
      }
      if (handled) {
        continue;
      }

      const textOpening = String.raw`\text{`;
      if (x.startsWith(textOpening)) {
        const bracketPairContentAndRest = getBracketPairContent(textOpening, '}', x);
        const textNode = new StandardBranchingNode(textOpening, '}');
        insert(k, textNode);
        for (const character of bracketPairContentAndRest.content) {
          insert(k, new StandardLeafNode(character));
        }
        k.current = textNode;
        x = bracketPairContentAndRest.rest;
        continue;
      }

      let command = '\\';
      if (isLetter(x[1])) {
        for (let i = 1; i < x.length; i++) {
          const character = x[i];
          if (isLetter(character)) {
            command += character;
          } else if (character == '{' || character == '[') {
            const opening = command + character;
            const closingBracket1 = character == '{' ? '}' : ']';
            const bracketPair1ContentAndRest = getBracketPairContent(opening, closingBracket1, x);
            const placeholder1Nodes = parseLatex(bracketPair1ContentAndRest.content, latexParserConfiguration).syntaxTreeRoot.nodes;
            if (bracketPair1ContentAndRest.rest[0] == '{') {
              const multiPlaceholderBranchingNode = new DescendingBranchingNode(opening, closingBracket1 + '{', '}');
              insert(k, multiPlaceholderBranchingNode);
              insert(k, placeholder1Nodes);
              moveRight(k);
              const bracketPair2ContentAndRest = getBracketPairContent('{', '}', bracketPair1ContentAndRest.rest);
              const placeholder2Nodes = parseLatex(bracketPair2ContentAndRest.content, latexParserConfiguration).syntaxTreeRoot.nodes;
              insert(k, placeholder2Nodes);
              k.current = multiPlaceholderBranchingNode;
              x = bracketPair2ContentAndRest.rest;
            } else {
              const singlePlaceholderBranchingNode = new StandardBranchingNode(opening, closingBracket1);
              insert(k, singlePlaceholderBranchingNode);
              insert(k, placeholder1Nodes);
              k.current = singlePlaceholderBranchingNode;
              x = bracketPair1ContentAndRest.rest;
            }
            handled = true;
            break;
          }
          else {
            break;
          }
        }
        if (handled) {
          continue;
        }
        insert(k, new StandardLeafNode(command));
        x = x.slice(command.length);
      } else {
        insert(k, new StandardLeafNode('\\' + x[1]));
        x = x.slice(2);
      }
      continue;
    }

    if (x.startsWith('_{')) {
      const opening = '_{';
      const closingBracket1 = '}';
      const bracketPair1ContentAndRest = getBracketPairContent(opening, closingBracket1, x);
      if (bracketPair1ContentAndRest.rest.startsWith('^{')) {
        const ascendingBranchingNode = new AscendingBranchingNode(opening, '}^{', '}');
        insert(k, ascendingBranchingNode);
        const placeholder1Nodes = parseLatex(bracketPair1ContentAndRest.content, latexParserConfiguration).syntaxTreeRoot.nodes;
        insert(k, placeholder1Nodes);
        moveRight(k);
        const bracketPair2ContentAndRest = getBracketPairContent('^{', '}', bracketPair1ContentAndRest.rest);
        const placeholder2Nodes = parseLatex(bracketPair2ContentAndRest.content, latexParserConfiguration).syntaxTreeRoot.nodes;
        insert(k, placeholder2Nodes);
        k.current = ascendingBranchingNode;
        x = bracketPair2ContentAndRest.rest;
        continue;
      }
    }
    
    const various : [string, () => BranchingNode][] = [
      ['^{', () => new AscendingBranchingNode('', '^{', '}')],
      ['_{', () => new DescendingBranchingNode('', '_{', '}')]
    ];
    for (const opening_getTreeNode of various) {
      const opening = opening_getTreeNode[0];
      if (x.startsWith(opening)) {
        const node = opening_getTreeNode[1]();
        insertWithEncapsulateCurrent(k, node);
        const bracketPairContentAndRest = getBracketPairContent(opening, '}', x);
        const secondPlaceholderNodes = parseLatex(bracketPairContentAndRest.content, latexParserConfiguration).syntaxTreeRoot.nodes;
        insert(k, secondPlaceholderNodes);      
        k.current = node;
        x = bracketPairContentAndRest.rest;
        handled = true;
        break;
      }
    }
    if (handled == true) {
      continue;
    }

    insert(k, new StandardLeafNode(x[0]));
    x = x.slice(1);
    continue;

  }
  return k;
}
