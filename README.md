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
make html
```

The HTML output will be generated in the `build/html` directory.

## Dev

To serve the documentation in dev mode, run:

```
make dev
```

The documentation will be served on `http://127.0.0.1:8000`


## Technical note on links

`recommonmark`, the library we use to include Markdown-written pages into the Sphinx-generated documentation, seems to have trouble correctly processing links. The current workarounds are:
- Adding an extra `../` to links in Markdown-written pages pointing towards the rST-written pages
- Dynamically rewriting some links [in Javascript](./source/static/scripts.js)
