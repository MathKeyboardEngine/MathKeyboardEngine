type  BracePairContent = { content : string; rest : string };

export function getBracketPairContent(opening : string, closingBracket : string, sWithOpening : string) : BracePairContent {
    const openingBracket = opening.slice(-1);
    const s = sWithOpening.slice(opening.length)
    let level = 0;
    for (let closingBracketIndex = 0; closingBracketIndex < s.length; closingBracketIndex++){
      if (s[closingBracketIndex] == closingBracket) {
        if (level == 0) {
            return { content: s.slice(0, closingBracketIndex), rest: s.slice(closingBracketIndex + 1)};
        } else {
          level--;
          continue;
        }
      }
      
      const toIgnores = [ '\\' + openingBracket, '\\' + closingBracket, String.raw`\left` + openingBracket, String.raw`\right` + closingBracket];
      const currentPosition = s.slice(closingBracketIndex);
      for (const toIgnore of toIgnores) {
        if (currentPosition.length >= toIgnore.length && currentPosition.startsWith(toIgnore)) {
          closingBracketIndex += toIgnore.length;
          continue;
        }
      }
  
      if (s[closingBracketIndex] == openingBracket) {
        level++;
      }
    }
    throw `A closing ${closingBracket} is missing.`;
}
