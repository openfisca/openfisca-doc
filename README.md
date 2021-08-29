# OpenFisca Doc

[OpenFisca](http://openfisca.org/doc/) is a versatile microsimulation free software. This repository contains the source code of its [online documentation](http://openfisca.org/doc/).

## Installation

To install dependencies, run:

```
make install
```

## Build

To build the HTML documentation, run:

```
make build
```

The HTML output will be generated in the `build/html` directory.

## Dev

To serve the documentation in dev mode, run:

```
make dev
```

The documentation will be served on `http://127.0.0.1:8000`

## Test

To test the documentation, run:

```
make test
```

## Fixing the doc

If the tests fail, here's what you can do:

1. If the errors also concern OpenFisca-Core, please take a look at the [README](https://github.com/openfisca/openfisca-core/blob/master/README.md).

2. If not, clone & install the documentation:

```
git clone https://github.com/openfisca/openfisca-doc
make install
```

3. create a branch to correct the problems:

```
git checkout -b fix-doc
```

4. Fix the offending problems.

You can test-drive your fixes by checking that each change works as expected:

```
make test
```

5. Commit at each step, so you don't accidentally lose your progress:

```
git add -A && git commit -m "Fixed missing doctree"
```

6. Once you're done, push your changes:

```
git push origin `git branch --show-current`
```

7. Finally, open a [pull request](https://github.com/openfisca/openfisca-doc/compare/master...fix-doc).

That's it! 🙌

## Technical note on links

`recommonmark`, the library we use to include Markdown-written pages into the Sphinx-generated documentation, seems to have trouble correctly processing links. The current workarounds are:
- Adding an extra `../` to links in Markdown-written pages pointing towards the rST-written pages
- Dynamically rewriting some links [in Javascript](./source/static/scripts.js)
