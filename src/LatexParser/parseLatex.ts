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

export function parseLatex(latex : string | null, latexConfiguration: LatexConfiguration, latexParserConfiguration : LatexParserConfiguration): KeyboardMemory {
  let x = latex?.trim();

  if (x == null || x == '') {
    return new KeyboardMemory();
  }

  const k = new KeyboardMemory();

  while (x != '') {
    if (x[0] == ' ') {
      x = x.trimStart();
      continue;
    }

    if (x.startsWith(latexParserConfiguration.decimalSeparator)) {
      insert(k, new DecimalSeparatorNode(latexParserConfiguration.decimalSeparator));
      x = x.slice(latexParserConfiguration.decimalSeparator.length);
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
          const nodes = parseLatex(latex, latexConfiguration, latexParserConfiguration).syntaxTreeRoot.nodes;
          for (const node of nodes) {
            insert(k, node);
            k.current = node;
          }
          moveRight(k);
        }
      }
      const matrixEnd = String.raw`\end{${matrixTypeAndRest.content}}`;
      x = x.slice(x.indexOf(matrixEnd) + matrixEnd.length);
      continue;
    }

    if (x.startsWith('\\')) {
      for (const prefix of ['\\left\\', '\\right\\', String.raw`\left`, String.raw`\right`]) {
        if (x.startsWith(prefix)) {
          insert(k, new StandardLeafNode(prefix + x[prefix.length]));
          x = x.slice(prefix.length + 1);
          handled = true;
          break;
        }
      }
      if (handled) {
        continue;
      }

      for (const commandWithBrackets of latexParserConfiguration.descendingBranchingNodeSlashCommandsWithTwoPairsOfBrackets) {
        const opening = commandWithBrackets.slice(0, -3);
        const closingBracket1 = commandWithBrackets.slice(-3, -2);
        const openingBracket2 = commandWithBrackets.slice(-2, -1);
        const closingBracket2 = commandWithBrackets.slice(-1);

        if (x.startsWith(opening)) {
          const numeratorAndRest = getBracketPairContent(opening, closingBracket1, x);
          if (numeratorAndRest.rest[0] != openingBracket2) {
            continue;
          }
          
          const node = new DescendingBranchingNode(opening, closingBracket1 + openingBracket2, closingBracket2);
          insert(k, node);

          const numerator = parseLatex(numeratorAndRest.content, latexConfiguration, latexParserConfiguration).syntaxTreeRoot.nodes;
          for (const node of numerator) {
            insert(k, node);
            k.current = node;
          }
          moveRight(k);
  
          const denominatorAndRest = getBracketPairContent(openingBracket2, closingBracket2, numeratorAndRest.rest);
          const denominator = parseLatex(denominatorAndRest.content, latexConfiguration, latexParserConfiguration).syntaxTreeRoot.nodes;
          for (const node of denominator) {
            insert(k, node);
            k.current = node;
          }
          
          k.current = node;
          x = denominatorAndRest.rest;
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
          } else if (character == '{') {
            command += character;
            const opening = command;
            const bracketPairContentAndRest = getBracketPairContent(opening, '}', x);
            const placeholderContent = parseLatex(bracketPairContentAndRest.content, latexConfiguration, latexParserConfiguration).syntaxTreeRoot.nodes;
            const branchingNode = new StandardBranchingNode(opening, '}');
            insert(k, branchingNode);
            for (const node of placeholderContent) {
              insert(k, node);
              k.current = node;
            }
            k.current = branchingNode;
            x = bracketPairContentAndRest.rest;
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
        const secondPlaceholderNodes = parseLatex(bracketPairContentAndRest.content, latexConfiguration, latexParserConfiguration).syntaxTreeRoot.nodes;
        for (const node of secondPlaceholderNodes) {
          insert(k, node);
          k.current = node;
        }
        
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
