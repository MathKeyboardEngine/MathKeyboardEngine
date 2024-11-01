## [1.1.1] 2024-11-1

### Fixed

- An import error that some environments had (for example React with Vite and Typescript), was `Could not find a declaration file for module 'mathkeyboardengine'.`. Fixed by [rmathis](https://github.com/rmathis) in [#11](https://github.com/MathKeyboardEngine/MathKeyboardEngine/pull/11).

## [1.1.0] 2023-10-22

### Added

- `parseLatex`. Developing this feature - parsing a LaTeX string for editing by MathKeyboardEngine - started after a [question thread](https://github.com/orgs/MathKeyboardEngine/discussions/1) was opened by [chengyi](https://github.com/WCY91).
- `insert` previously only accepted a single `TreeNode`, but it can now handle a `TreeNode[]` too.

## [1.0.1] 2023-02-08

### Fixed

- Bug related to type checking: the [type declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html) of `getEditModeLatex` and `getViewModeLatex` were not copied into `dist/MathKeyboardEngine.d.ts` due to a bug in `declarationbundler.js` since version 0.2.3. Fixed by [boompikachu](https://github.com/boompikachu) in [#7](https://github.com/MathKeyboardEngine/MathKeyboardEngine/pull/7).

## [1.0.0] 2023-01-23

### Changed

- `deleteCurrent` is renamed to `deleteLeft`.

### Added

- `deleteRight`.

## [0.2.3] 2023-01-21

- npm & jsDelivr: update readme.
- Deno: add [x.ts](https://github.com/MathKeyboardEngine/MathKeyboardEngine/blob/main/src/x.ts) for accessing everything from a single module.

## [0.2.2] 2022-11-22

- Fix only relevant if `LatexConfiguration`'s `activePlaceholderColor` and `passivePlaceholderColor` is used: use `{\color{my-color}x}` instead of `\color{my-color}{x}`.

## [0.2.1] 2022-06-29

- Add `.mjs`, `.d.ts` and `.cts` files to the package for Node.js.
- Push a tag for publication to [Deno](https://deno.land) via a webhook.

## [0.2.0] 2022-03-27

### Fixed

- `deleteCurrent` at `\frac{ab}{▦}\sqrt{⬚}` (where `▦` is current) gave a non-sensical result.

### Changed

- `deleteCurrent` at `\frac{12}{⬚}▦` no longer results in `\frac{1▦}{⬚}` but now in `12▦`. Analogous for `12_{⬚}▦` and `\begin{pmatrix}12 \\ ⬚ \\ ⬚\end{pmatrix}▦`, etc.
