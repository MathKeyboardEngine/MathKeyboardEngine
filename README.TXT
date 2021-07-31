=================================================
========  What is MathKeyboardEngine?   ========
=================================================

MathKeyboardEngine provides the logic for a virtual math keyboard. It can be used on any website.

The logic of this repository is intended for use together with - for example - MathJax or KaTeX.

________________________ 
| Your customized       |    Tip: use SVG images on your virtual keys
| virtual keyboard      |    (or use KaTeX or MathJax to generate images on-the-fly)
| made with             |    to create a "What you see is what you get" keyboard.
| HTML, CSS, SVG images |
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞    
   ||
   ||       Each virtual key press should call something of the MathKeyboardEngine,
   ||       for example one key calls Insert(FractionAtom()) and another Insert(DigitAtom(3))
   ||       or MoveUp(), DeleteCurrent(), etc.
   \/
____________________________ 
| The MathKeyboardEngine    |   This library is easily extendible
| uses a simple             |   without knowledge of typesetting.
| abstract syntax tree      |   Also: you can choose what modules you use.
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞͞ ͞ 
    ||
    ||       Calling getLatex(config) outputs the Latex you "typed",
    ||       for example \frac{3}{4},
    ||       which you then feed to KaTeX or MathJax to display it.
    \/
________________________________
| Display LaTeX output and get  |
| the experience of typing      |   Even the cursor and placeholders can be customized :)
| in a textbox                  |
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ 

=================================================
===== How to work with a clone of this repo =====
=================================================

1. Install Node.js and VS Code.

2. Clone this repository and open the root folder in VS Code.

3. Open the VS Code Terminal and run:
npm ci
This loads all dependencies from the tree as specified in package-lock.json.

3. In the same terminal, to test whether the installation succeded, run:
npm test
This executes all the unit tests. (TypeScript is transpiled into JavaScript just before the tests execute.)

4a. Using it:
- rollup can be used to bundle the repository into a single .js file with only the modules you need.
- add the .js file to your html scripts section and start playing!

4b. Contributing:
- open a pull request (PR)
- report a bug or request an enhancement (issue)
- contact SymboLinker@gmail.com
