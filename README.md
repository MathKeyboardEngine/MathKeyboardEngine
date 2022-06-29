[![](https://badgen.net/npm/v/mathkeyboardengine?label=latest%20release)](https://www.jsdelivr.com/package/npm/mathkeyboardengine?path=dist)
![](https://badgen.net/badge/test%20coverage/100%25/green)

## MathKeyboardEngine for JavaScript

MathKeyboardEngine for JavaScript provides the logic for a highly customizable virtual math keyboard. It is intended for use together with any LaTeX typesetting library (for example MathJax or KaTeX).

Also available: [MathKeyboardEngine for C#](https://github.com/MathKeyboardEngine/MathKeyboardEngine.CSharp).

#### An execution timeline

1. You load an html page with your customized virtual math keyboard (based on one of the examples). On load the LaTeX for each key is typeset (by KaTeX or MathJax) and a cursor is displayed in a textbox-look-a-like div.
1. On your customized virtual math keyboard, you press a key. The key calls a MathKeyboardEngine function, for example `insert(someMatrixNode)` or `moveUp()`, `deleteCurrent()`, etc.
1. Calling `getEditModeLatex()` outputs the total of LaTeX you typed, for example `\frac{3}{4}\blacksquare` (if `\blacksquare` is your cursor), which you then feed to KaTeX or MathJax for display.
1. Calling `getViewModeLatex()` outputs the LaTeX without a cursor.

#### Let me test it now!

Live examples can be tested at [MathKeyboardEngine.GitHub.io](https://mathkeyboardengine.github.io).

#### Pros and cons?

<i>Unique about MathKeyboardEngine:</i>

- it supports (almost?) all math mode LaTeX, including matrices. (Please share if you know anything that is not supported.)
- its syntax tree consists of very few different parts: the `StandardLeafNode`, `StandardBranchingNode`, `AscendingBranchingNode` and `DescendingBranchingNode` can be used for almost all LaTeX, including fractions, powers, combinations, subscript, etc. with ready-to-use up/down/left/right navigation.
- it can be used with any LaTeX math typesetting library you like.

<i>A con:</i>

- this library will never be able to handle setting the cursor with the touch of a finger on a typeset formula. (But it DOES support up/down/left/right navigation and has a selection mode via arrow keys.)

<i>More pros:</i>

- you have full control over what you display on the virtual keyboard keys and what a virtual key press actually does.
- customize the editor output at runtime: dot or comma as decimal separator, cross or dot for multiplication, cursor style, colors, etc.
- this library also supports handling input from a physical keyboard, where - for example - the forward slash "/" key can be programmed to result in encapsulating a previously typed number as the numerator of a fraction. (See the examples.)
- almost forgotten: it's open source, free to use, free to modify (please fork this repo)!

## How to use this library

There is no need to download or install anything. Your website just needs to have a `<script>` element that results in getting one of the following files from [jsDelivr](https://www.jsdelivr.com/package/npm/mathkeyboardengine?path=dist):

- MathKeyboardEngine.es2020-esm.js
- MathKeyboardEngine.es2017-esm.js
- MathKeyboardEngine.es2015-iife.js

<strong>esYEAR</strong>: those are JavaScript language versions.<br/>
<strong>esm</strong>: the ECMAScript module is simply the best choice: easy, safe, future proof.<br/>
<strong>iife</strong>: an immediately invoked function expression for browsers that do not support ESM.

For each of those ".js" files there is a minified version (".min.js") - a smaller file (of only 13 kB) with the same capabilities.

A `<script>` element using the recommended "MathKeyboardEngine.es2017-esm.min.js":

```html
<script type="module" type="text/javascript">
  import * as mke from 'https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.2.0/dist/MathKeyboardEngine.es2017-esm.min.js';
  let latexConfiguration = new mke.LatexConfiguration();
  let keyboardMemory = new mke.KeyboardMemory();

  // Subscribe to onclick events of virtual key presses, etc.
</script>
```

A `<script>` element using the with-older-browsers-compatible "MathKeyboardEngine.es2015-iife.min.js":

```html
<script src="https://cdn.jsdelivr.net/npm/mathkeyboardengine@v0.2.0/dist/MathKeyboardEngine.es2015-iife.min.js"></script>
<script type="text/javascript">
  window.addEventListener('DOMContentLoaded', (event) => {
    let latexConfiguration = new mke.LatexConfiguration();
    let keyboardMemory = new mke.KeyboardMemory();

    // Subscribe to onclick events of virtual key presses, etc.
  });
</script>
```

<i>Note: "mke" is an abbreviation of "MathKeyboardEngine". You can choose something different. (But the iife format forces you to use "mke".)</i>

Visit the [documentation](https://mathkeyboardengine.github.io/docs/0.1/) and (the right version of)\* the [examples folder](https://github.com/MathKeyboardEngine/MathKeyboardEngine/tree/main/examples) for more implementation details.

\* If you use a version tag in the url like this: https://github.com/MathKeyboardEngine/MathKeyboardEngine/tree/v0.1.0-beta.11, you can see the git repository as it was for that version.

#### Node.js with types:

Experimental: `.mjs`, `.d.ts` and `.cjs` files have been added in `v0.2.1-beta.*`.

After opening a folder in VS Code, run in the terminal:
```
npm i mathkeyboardengine
```
Verify that `mathkeyboardengine` has been added to the `node_modules` folder. Then you can choose:

Using the CommonJS module (the `.cjs` file) in `myFile.js`:
```js
const mke = require('mathkeyboardengine');
const k = new mke.KeyboardMemory();
```
Using the ESM module (the `.mjs` file) in `myFile.js` or `myFile.ts`:
```js
import * as mke from 'mathkeyboardengine';
const k = new mke.KeyboardMemory();
```

#### Deno

Experimental: publication via https://deno.land

## How to use this repo

Follow these steps to set up (and verify) a development environment for this repository:

1. Install Node.js, Git and VS Code.
2. Fork (or clone), checkout and then open the root folder of this repository in VS Code.
3. Open the VS Code Terminal and run:<br/>
   `npm ci`<br/>
   This loads all the devDependencies from the tree as specified in package-lock.json.
4. Compiling the library:<br/>
   All of the following commands run some script as defined in package.json:<br/>
   `npm run tsc` to do type checking, to check whether a successful compilation is possible.<br/>
   `npm run clean` to run eslint and prettier (performing auto-fixes of spacing etc.).<br/>
   `npm test` to run all unit tests from the 'tests' folder.<br/>
   `npm run build` creates a single-file library in different formats and language versions in the 'dist' folder. Note: the 'src' folder contains all the source code files. The file 'bundle.ts' does not add new code, but helps in compiling the library to a single file.
5. Testing localhost:<br/>
   For testing localhost with live reload from VS Code, you could install the VS Code extension [Five Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) and click `> Go Live` in the bottom right corner of VS Code. The browser starts up automatically - navigate to the 'examples' folder and click the html file you'd like to test.

## Ask or contribute

- [ask questions](https://github.com/MathKeyboardEngine/MathKeyboardEngine/discussions) about anything that is not clear or when you'd like help.
- [share](https://github.com/MathKeyboardEngine/MathKeyboardEngine/discussions) ideas or what you've made.
- [report a bug](https://github.com/MathKeyboardEngine/MathKeyboardEngine/issues).
- [request an enhancement](https://github.com/MathKeyboardEngine/MathKeyboardEngine/issues).
- [open a pull request](https://github.com/MathKeyboardEngine/MathKeyboardEngine/pulls). (The command `npm run clean` runs eslint and prettier.)
