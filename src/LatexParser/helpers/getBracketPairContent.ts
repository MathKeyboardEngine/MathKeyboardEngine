type  BracePairContent = { content : string; rest : string };

export function getBracketPairContent(opening : string, closing : string, sWithOpening : string) : BracePairContent {
    const openingBracket = opening.slice(-1);
    const s = sWithOpening.slice(opening.length)
    let level = 0;
    for (let closingBracketIndex = 0; closingBracketIndex < s.length; closingBracketIndex++){
      if (s.substring(closingBracketIndex, closingBracketIndex + closing.length) == closing) {
        if (level == 0) {
            return { content: s.slice(0, closingBracketIndex), rest: s.slice(closingBracketIndex + closing.length)};
        } else {
          level--;
          continue;
        }
      }
      
      const toIgnores = [ '\\' + openingBracket, '\\' + closing, String.raw`\left` + openingBracket, String.raw`\right` + closing];
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
    throw `A closing ${closing} is missing.`;
}
