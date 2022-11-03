# OpenFisca Doc

[OpenFisca](http://openfisca.org/doc/) is a versatile microsimulation free software. This repository contains the source code of its [online documentation](http://openfisca.org/doc/).

## Installation

This documentation is built with [Sphinx](https://www.sphinx-doc.org/), a Python documentation generator. You will thus need to install a [Python runtime](https://www.python.org/downloads/) to build it. The version to install is specified in the `runtime.txt` file.

In order to avoid conflicting dependencies with other projects on your local machine, it is recommended to install its dependencies in a virtual environment. To create a virtual environment, run:

```sh
python3 -m venv .venv
source .venv/bin/activate
```

To install dependencies, run:

```sh
make install
```

## Build

To build the HTML documentation, run:

```sh
make html
```

The HTML output will be generated in the `build/html` directory.

## Dev

To serve the documentation in dev mode, run:

```sh
make dev
```

The documentation will be served on `http://127.0.0.1:8000`

## Test

To test the documentation, run:

```sh
make test
```

This will also lint the source files using [Markdownlint](https://github.com/DavidAnson/markdownlint), for which you will need [Node](https://nodejs.org) and NPM.

## Fixing the doc

If the tests fail, here's what you can do:

If the errors also concern OpenFisca-Core, please take a look at the [README](https://github.com/openfisca/openfisca-core/blob/master/README.md).

If not, clone & install the documentation:

```sh
git clone https://github.com/openfisca/openfisca-doc
make install
```

Create a branch to correct the problems:

```sh
git checkout -b fix-doc
```

Fix the offending problems. You can test-drive your fixes by checking that each change works as expected:

```sh
make test
```

Commit at each step, so you don't accidentally lose your progress:

```sh
git add -A && git commit -m "Fixed missing doctree"
```

Once you're done, push your changes:

```sh
git push origin `git branch --show-current`
```

Finally, open a [pull request](https://github.com/openfisca/openfisca-doc/compare/master...fix-doc).

That's it! 🙌
