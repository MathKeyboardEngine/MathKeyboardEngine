import { Placeholder } from '../../../../SyntaxTreeComponents/Placeholder/Placeholder';

export function deleteOuterBranchingNodeButNotItsContents(nonEmptyPlaceholder: Placeholder) {
  const outerBranchingNode = nonEmptyPlaceholder.parentNode!;
  const indexOfOuterBranchingNode = outerBranchingNode.parentPlaceholder.nodes.indexOf(outerBranchingNode);
  outerBranchingNode.parentPlaceholder.nodes.splice(indexOfOuterBranchingNode, 1, ...nonEmptyPlaceholder.nodes);
  for (const node of nonEmptyPlaceholder.nodes) {
    node.parentPlaceholder = outerBranchingNode.parentPlaceholder;
  }
}
