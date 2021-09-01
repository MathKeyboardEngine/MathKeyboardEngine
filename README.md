## What is MathKeyboardEngine?

MathKeyboardEngine provides the logic - in JavaScript and LaTeX - for a highly customizable virtual math keyboard. It is intended for use together with any LaTeX typesetting library (for example MathJax or KaTeX).

#### An execution timeline

1. You load an html page with your customized virtual math keyboard (based on one of the examples). On load, the LaTeX for each key is rendered (by KaTeX or MathJax) and a cursor is displayed in a textbox-look-a-like div.
1. On your customized virtual keyboard, you press a key. The key calls a MathKeyboardEngine function, for example Insert(someMatrixNode) or MoveUp(), DeleteCurrent(), etc.
1. Calling GetEditModeLatex() outputs the total of LaTeX you "typed", for example `\frac{3}{4}\blacksquare` (if `\blacksquare` is your cursor), which you then feed to KaTeX or MathJax for display.
1. Calling GetViewModeLatex outputs the LaTeX without a cursor.

#### Let me test it now!

Live examples can be tested at [MathKeyboardEngine.GitHub.io](https://mathkeyboardengine.github.io).

#### Pros and cons?

<i>Unique about MathKeyboardEngine:</i>

- it supports (almost?) all math LaTeX (please share if you know anything that is not supported), including matrices.
- the syntax tree exists of very few different parts: the `StandardLeafNode`, `StandardBranchingNode`, `AscendingBranchingNode` and `DescendingBranchingNode` can be used for almost all LaTeX, including fractions, powers, combinations, subscript, etc. with ready-to-use up/down/left/right navigation.
- it can be used with any LaTeX math typesetting library you like.

<i>A con:</i>

- this library will never be able to handle setting the cursor with the touch of a finger. (But it DOES support up/down/left/right navigation and has a selection mode via arrow keys!).

<i>More pros:</i>

- you have full control over what you display on the virtual keyboard keys and what a virtual key press actually does.
- customize the editor output at runtime: dot or comma as decimal separator, cross or dot for multiplication, cursor style, colors, etc.
- this libary also supports handling input from a physical keyboard, where - for example - the forward slash "/" key can be programmed to result in encapsulating a previously typed number as the numerator of a fraction. (Examples will come.)
- almost forgotten: it's open source, free to use, free to modify (please fork this repo)!

## How to use the library

The library is distributed as a single file in several language versions and formats:

- MathKeyboardEngine.es2020-esm.js
- MathKeyboardEngine.es2017-esm.js
- MathKeyboardEngine.es2015-iife.js

<strong>es2015, es2017, es2019</strong>: those are JavaScript language versions.<br/>
<strong>esm</strong>: the ECMAScript module is simply the best choice: easy, safe, future proof.<br/>
<strong>iife</strong>: an immediately invoked function expression for browsers that do not support ESM.

You can replace ".js" by ".min.js" to get the minified version: this is a smaller file with the same capabilities.

Quick start for using the "esm" format:

```
  <script type="module" type="text/javascript">
    import * as mke from 'https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.1.0-beta.5/dist/MathKeyboardEngine.es2017-esm.min.js';
    let latexConfiguration = new mke.LatexConfiguration();
    let keyboardMemory = new mke.KeyboardMemory();

    // Subscribe to onclick events of virtual key presses, etc.
  </script>
```

Notes:

- "mke" is an abbreviation of "MathKeyboardEngine". You can choose something different. (But the iife format forces you to use "mke".)
- Visit (the right version of)\* the 'examples' folder for more implementation details.

\* If you use a version tag in the url like this: https://github.com/MathKeyboardEngine/MathKeyboardEngine/tree/v0.1.0-beta.5, you can see the git repository (e.g. 'examples' folder, etc.) as it was for that version.

## How to use this repo

Doing a localhost test with an example from the 'examples' folder is probably the first thing to do. Follow these steps to do that (and more):

1. Install Node.js and VS Code.
2. Fork (or clone), checkout and then open the root folder of this repository in VS Code.
3. Open the VS Code Terminal and run:<br/>
   `npm ci`<br/>
   This loads all dependencies from the tree as specified in package-lock.json.
4. Compiling the library:<br/>
   All of the following commands run some script as defined in package.json:<br/>
   `npm run tsc` to do type checking, to check whether a successful compilation is possible.<br/>
   `npm run clean` to run eslint and prettier (performing auto-fixes of spacing etc.).<br/>
   `npm test` to run all unit tests from the "tests" folder.<br/>
   `npm run build` creates a single-file library in different formats and language versions in the "dist" folder. Note: the "src" folder contains all the source code files. The file "bundle.ts" does not add new code, but helps in compiling the library to a single file.
5. Testing localhost:<br/>
   For testing localhost with live reload from VS Code, you could install the VS Code extension "Five Server" (https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) and click "> Go Live" in the bottom right corner of VS Code. The browser starts up automatically - navigate to the "examples" folder and click the html file you'd like to test.

## Ask or contribute

- ask questions about anything that is not clear or when you'd like help (issue). That is also a contribution to this repo, because it may lead to improvements in the documentation.
- report a bug (issue).
- request an enhancement (issue).
- open a pull request (PR). (The command `npm run clean` runs eslint and prettier.)

## Goal

<strong>Goal</strong>: make a future proof, not complex, highly customizable virtual math keyboard library.<br/>
<strong>First draft of this library</strong>: July 2021.<br/>
<strong>Founder and maintainer</strong>: SymboLinker
