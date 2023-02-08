const fs = require('fs');
const path = require('path');
const { readdirSync } = require('fs');

function getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

const files = getFiles('./dist/declarations/src').filter((x) => path.parse(x).base !== 'x.d.ts');

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
