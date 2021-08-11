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

4. Testing localhost:
- run the following command:
npm run build
This creates a single-file library two times, in different formats:
--- dist/MathKeyboardEngine.iife.js
--- dist/MathKeyboardEngine.esm.js
- add one of the .js files to your html scripts section of yourFile.html. See the 'examples' folder.
- for testing localhost with live reload from VS Code, you could install Five Server (https://marketplace.visualstudio.com/items?itemName=yandeu.five-server).

5. Contributing:
- open a pull request (PR)
- report a bug or request an enhancement (issue)
- contact SymboLinker@gmail.com
