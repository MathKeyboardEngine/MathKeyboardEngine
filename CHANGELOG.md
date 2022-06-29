## [0.2.1-beta.*] 2022-06-28

Add `.mjs`, `.d.ts` and `.cts` files to the package (experimental).

## [0.2.0] 2022-03-27

### Fixed

- `deleteCurrent` at `\frac{ab}{▦}\sqrt{⬚}` (where `▦` is current) gave a non-sensical result.

### Changed

- `deleteCurrent` at `\frac{12}{⬚}▦` no longer results in `\frac{1▦}{⬚}` but now in `12▦`. Analogous for `12_{⬚}▦` and `\begin{pmatrix}12 \\ ⬚ \\ ⬚\end{pmatrix}▦`, etc.
