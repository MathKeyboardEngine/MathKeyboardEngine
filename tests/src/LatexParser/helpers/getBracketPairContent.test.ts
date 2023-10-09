import { describe } from 'mocha';
import { expect } from 'chai';
import { getBracketPairContent } from '../../../../src/LatexParser/helpers/getBracketPairContent'

describe(getBracketPairContent.name, () => {

  for(const testData of [ 
    { opening: String.raw`\frac{`, closingBracket: '}', sWithOpening: String.raw`\frac{1}{2}`, content: '1', rest: '{2}'},
    { opening: String.raw`\frac{`, closingBracket: '}', sWithOpening: String.raw`\frac{123}{456}`, content: '123', rest: '{456}'},
    { opening: String.raw`\frac{`, closingBracket: '}', sWithOpening: String.raw`\frac{\frac{1}{1-x}}{x}`, content: String.raw`\frac{1}{1-x}`, rest: '{x}'},
    { opening: String.raw`\frac{`, closingBracket: '}', sWithOpening: String.raw`\frac{TEST\right}and\}FORFUN}{x}`, content: String.raw`TEST\right}and\}FORFUN`, rest: '{x}'},
    { opening: String.raw`\frac{`, closingBracket: '}', sWithOpening: String.raw`\frac{1}{2}3`, content: '1', rest: '{2}3'},
   ])
  it(`command '${testData.opening}' and string ${testData.sWithOpening} should return content '${testData.content}' and rest ${testData.rest}`, () => {
    // Act
    const result = getBracketPairContent(testData.opening, testData.closingBracket, testData.sWithOpening);
    // Assert
    expect(testData.content).to.equal(result.content);
    expect(testData.rest).to.equal(result.rest);
  });
});
