=== Transpile TypeScript into JavaScript automatically ===

1. Install Node.js

2. Open the Node.js command prompt and run:
npm install -g typescript

3. Restart VS Code.

4. Press Ctrl Shift B and choose 'Watch'. Now js files are generated on each update to a ts file.


=== The Mocha unit testing framework with TypeScript===

npm install chai mocha ts-node @types/chai @types/mocha --save-dev
resulted in creatubg the package-lock.json and downloading stuff into a new node_modules folder, but I've added "node_modules/*" to ".gitignore".