=================================================
===== How to work with a clone of this repo =====
=================================================

Coming soon.


=====================================
===== How this repo was created =====
=====================================

=== Transpile TypeScript into JavaScript automatically ===

1. Install Node.js

2. Open the Node.js command prompt or VS Code Terminal and run:
npm install --save-dev typescript

3. Restart VS Code.

4. Press Ctrl Shift B and choose 'Watch'. Now js files are generated on each update to a ts file.


=== The Mocha unit testing framework with TypeScript===

npm install --dev ts-node mocha @testdeck/mocha nyc chai ts-mockito @types/chai @types/mocha
resulted in creatubg the package-lock.json and downloading stuff into a new node_modules folder, but I've added "node_modules/*" to ".gitignore".

    ts-node: allow to run .ts file by transpiling them on the fly.
    mocha: we’ll use it as the test runner.
    @testdeck/mocha: it will allow mocha to interpret TypeScript classes as test suites.
    nyc: it will generate the coverage report.
    chai: the expectation library we’ll use.
    ts-mockito: a supercool stubbing and mocking library inspired by mockito for Java.


=== Create a package.json file when the node_modules folder is full of packages ===
npm init

The package.json AND the package-lock.json should be checked into source control.
Now, if you clone this repository and have no node_modules folder, you can download all required packages via the following command:
npm ci
This loads all dependencies from the tree as specified in package-lock.json.

After UPDATING the package.json (using newer versions of packages), you should run
npm install
This updates the package-lock.json and downloads all neweer packages in the whole dependency tree.