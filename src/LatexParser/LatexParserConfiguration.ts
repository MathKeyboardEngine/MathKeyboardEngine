export class LatexParserConfiguration {
  additionalDigits: string[] | null = null;
  decimalSeparatorMatchers : string[] = [ '.', '{,}' ];
  decimalSeparatorSetting? : (() => string) | string | null;
  preferRoundBracketsNode = true;
}
