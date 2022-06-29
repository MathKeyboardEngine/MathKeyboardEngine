const fs = require('fs');

fs.copyFile('./dist/MathKeyboardEngine.es2017-esm.js', './dist/MathKeyboardEngine.es2017.mjs', (err) => {
  if (err) throw err;
});

fs.copyFile('./dist/MathKeyboardEngine.es2017-esm.min.js', './dist/MathKeyboardEngine.es2017.min.mjs', (err) => {
  if (err) throw err;
});
