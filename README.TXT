=================================
== What is MathKeyboardEngine? ==
=================================

MathKeyboardEngine provides the logic - in JavaScript and LaTeX - for a highly customizable virtual math keyboard.

It is intended for use together with - for example - MathJax or KaTeX.

________________________ 
| Your customized       |    
| virtual keyboard      |
| made with             |   
| HTML, CSS, SVG images |
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞    
  ||  Each virtual key press should
  ||  call MathKeyboardEngine functions,
  ||  for example one key calls
  ||  Insert(FractionAtom()) and
  ||  others Insert(DigitAtom(3)),
  ||  MoveUp(), DeleteCurrent(), etc.
  \/
____________________________ 
| The MathKeyboardEngine    |
| uses a simple             |
| abstract syntax tree and  |
| is easily extendible      |
| without knowledge of      |
| typesetting.              |
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞͞ ͞ 
  ||  Calling getLatex(config) outputs
  ||  the Latex you "typed",
  ||  for example \frac{3}{4},
  ||  which you then feed to
  ||  KaTeX or MathJax for display.
  \/
________________________________
| Display LaTeX output and get  |
| the experience of typing      |
| in a textbox. Even the cursor |
| and placeholders can be       |
| customized :)                 |
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ 

===================================================
== How to work with a clone or fork of this repo ==
===================================================

1. Install Node.js and VS Code.

2. Clone this repository and open the root folder in VS Code.

3. Open the VS Code Terminal and run:
npm ci
This loads all dependencies from the tree as specified in package-lock.json.

3. In the same terminal, to test whether the installation was successful, run:
npm test
This executes all the unit tests. (TypeScript is transpiled into JavaScript just before the tests execute.)

4a. Using it:
- rollup can be used to bundle the repository into a single .js file with only the modules you need.
- add the .js file to your html scripts section and start playing!

4b. Contributing:
- open a pull request (PR)
- report a bug or request an enhancement (issue)
- contact SymboLinker@gmail.com
