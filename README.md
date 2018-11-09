# OpenFisca Doc

[OpenFisca](http://openfisca.org/doc/) is a versatile microsimulation free software. This repository contains the source code of its [online documentation](http://openfisca.org/doc/).

## Installation

To install dependencies, run:

```
pip install -r requirements.txt
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
