const fs = require('fs');

fs.readFile('./disthelper/bundle.ts', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const files = data
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((x) => x.includes(' from '))
    .map((x) => x.split(' from ')[1].replace("'../src/", './dist/declarations/src/').replace("';", '.d.ts'))
    .concat('./dist/declarations/src/SyntaxTreeComponents/Nodes/LeafNodes/Base/PartOfNumberWithDigits.d.ts');
  console.log(files);

  for (const file of files) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const lines = data
        .toString()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter((x) => !x.startsWith('import '));
      for (const line of lines) {
        fs.appendFileSync('./dist/MathKeyboardEngine.d.ts', line + '\n');
      }
    });
  }
});
