export class LatexParserConfiguration {
  additionalDigits: string[] | null = null;
  decimalSeparatorMatchers : string[] = [ '.', '{,}' ];
  preferredDecimalSeparator? : (() => string) | string | null;
  preferRoundBracketsNode = true;
}
