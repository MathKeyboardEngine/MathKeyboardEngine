=================================
== What is MathKeyboardEngine? ==
=================================

MathKeyboardEngine provides the logic - in JavaScript and LaTeX - for a highly customizable virtual math keyboard.

It is intended for use together with - for example - MathJax or KaTeX.

-------------------------
| Your customized       |    
| virtual keyboard      |
| made with             |   
| HTML, CSS, SVG images |
-------------------------
  ||  Each virtual key press should
  ||  call MathKeyboardEngine functions,
  ||  for example one key calls
  ||  Insert(FractionAtom()) and
  ||  others Insert(DigitAtom(3)),
  ||  MoveUp(), DeleteCurrent(), etc.
  \/
-----------------------------
| The MathKeyboardEngine    |
| uses a simple             |
| abstract syntax tree and  |
| is easily extendible      |
| without knowledge of      |
| typesetting.              |
-----------------------------
  ||  Calling getLatex(config) outputs
  ||  the Latex you "typed",
  ||  for example \frac{3}{4},
  ||  which you then feed to
  ||  KaTeX or MathJax for display.
  \/
---------------------------------
| Display LaTeX output and get  |
| the experience of typing      |
| in a textbox. Even the cursor |
| and placeholders can be       |
| customized :)                 |
---------------------------------

Unique about MathKeyboardEngine:
 - it supports (almost?) all math LaTeX (please share if you know anything that is not supported), including matrices.
 - the syntax tree exists of very few different parts: the very strong (Readonly-)`RawAtom` and (Writable-)`RawAtom`s can be used for almost any LaTeX, including fractions, powers, combinations, subscript, etc. with ready-to-use up/down/left/right navigation.
 - it can be used with any LaTeX math typesetting library you like.
 
 A con:
- this library will never be able to handle setting the cursor with the touch of a finger. (But it DOES support up/down/left/right navigation and has a selection mode via arrow keys!).

More pros:
 - you have full control over what you display on the virtual keyboard keys and what a virtual key press actually does.
 - customize the editor output at runtime: dot or comma as decimal separator, cross or dot for multiplication, cursor style, colors, etc.
 - this libary also supports handling input from a physical keyboard, where - for example - the forward slash "/" key can be programmed to result in encapsulating a previously typed number as the numerator of a fraction. (Examples will come.)
 - almost forgotten: it's open source, free to use, free to modify (please fork this repo)!


============================
== How to use the library ==
============================

The library is distributed as a single file. There are 4 options:
https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.1.0-beta.3/dist/MathKeyboardEngine.esm.js
https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.1.0-beta.3/dist/MathKeyboardEngine.esm.min.js
https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.1.0-beta.3/dist/MathKeyboardEngine.iife.js
https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.1.0-beta.3/dist/MathKeyboardEngine.iife.min.js

esm: the ECMAScript module is simply the best choice: easy, safe, future proof.
iife: an immediately invoked function expression for browsers that do not support ESM.
min: the minified version is a smaller file with the same capabilities.

Quick start for using the "esm" format:

  <script type="module" type="text/javascript">
      import * as mke from 'https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.1.0-beta.3/dist/MathKeyboardEngine.esm.min.js';
      let latexConfiguration = new mke.LatexConfiguration();
      let keyboardMemory = new mke.KeyboardMemory();

      // Subscribe to onclick events of virtual key presses, etc.
      // See the 'examples' folder for more details.
  </script>

Note: "mke" is an abbreviation of "MathKeyboardEngine". You can choose something different. (But the iife format forces you to use "mke".)


==========================
== How to use this repo ==
==========================

Doing a localhost test with an example from the 'examples' folder is probably the first thing to do. Follow these steps to do that (and more):

1. Install Node.js and VS Code.

2. Fork (or clone), checkout and then open the root folder of this repository in VS Code.

3. Open the VS Code Terminal and run:
npm ci
This loads all dependencies from the tree as specified in package-lock.json.

3. Compiling the library:
Use the command "tsc --noEmit" to do type checking, to check whether a successful compilation is possible.
Use the command "npm test" to run all unit tests from the "tests" folder.
Use the command "npm run build". (This command runs the build script as defined in package.json.) It creates a single-file library in different formats and language versions in the "dist" folder.
Note: the "src" folder contains all the source code files. The file "bundle.ts" does not add new code, but helps in compiling the library to a single file.

4. Testing localhost:
For testing localhost with live reload from VS Code, you could install the VS Code extension "Five Server" (https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) and click "> Go Live" in the bottom right corner of VS Code. The browser starts up automatically - navigate to the example folder with the html file you'd like to test.


=======================
== Ask or contribute ==
=======================

Options:
- ask questions about anything that is not clear or when you'd like help (issue). That is also a contribution to this repo, because it may lead to improvements in the documentation.
- report a bug (issue).
- request an enhancement (issue).
- open a pull request (PR).


==========
== Goal ==
==========

Goal: make a future proof, not complex, highly customizable virtual math keyboard library.
First draft of this library: July 2021.
Founder and maintainer: SymboLinker