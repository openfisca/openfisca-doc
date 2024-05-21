# Installation requirements

> Some use cases require an OpenFisca installation in a local environment where some tools should be pre-installed. First establish if the use case requires installation via the [getting started](./index.md) page.

OpenFisca runs with [Python](https://www.python.org/).

If the local environment already has an appropriate `Python` version (with `pip`) then this step can be skipped. Check the OpenFisca [country package for supported Python versions](installation-requirements.md#how-to-find-the-python-version-of-a-model).

_All country templates depend on the [OpenFisca Core](https://github.com/openfisca/openfisca-core) package, at the time of writing, OpenFisca Core supports python versions 3.9 -> 3.11._

## Check Python installation

To check the `pip` installation run this command in the local terminal:

```shell
pip --version
```

If this results in `pip: command not found`, then installing Python is required.

## Install Python

`Python` installation is required to run OpenFisca code on a local environment. The `Python` version required depends on the OpenFisca country package to be installed.

### How to find the Python version of a model

These instructions apply to the `OpenFisca-Country-Template` by way of example, other country packages have a similar structure.

To identify the Python revision of the `OpenFisca-Country-Template`:

1. Check the [pyproject.toml](https://github.com/openfisca/country-template/blob/main/pyproject.toml)* of the [OpenFisca-Country-Template repository](https://github.com/openfisca/country-template),
2. Check the `classifiers` values where the Python version is described by a value like `"Programming Language :: Python :: 3.11"` (here `3.11`)
3. When multiple Python versions are listed, it is advised to install the most recent version (3.11 for example if 3.9, 3.10 and 3.11 are listed).

_* In some older versions of country packages the information will instead be in the `setup.py` file at the root of the project_.

### Install a Python version

Python installation depends on the operating system.

Follow the default installation instructions in the [Python official documentation](https://www.python.org/downloads/). Find the appropriate version required before proceeding to install.

> [Docker](https://www.docker.com) users might find it easier to follow a different installation for Python and rely on [Python official image](https://hub.docker.com/_/python) instead. See the [Install with Docker](./install-with-docker.md) page.

#### Recommendations for Windows users

Microsoft Windows users can also utilise the [conda](https://docs.conda.io/en/latest/) package and environment manager to install the [OpenFisca-Country-Template published on PyPi](https://pypi.org/project/openfisca-country-template/#history) or one of the [OpenFisca packages published on PyPi](https://pypi.org/search/?q=openfisca).

OpenFisca-Country-Template is also published as [conda package](https://anaconda.org/search?q=openfisca-country-template) but the [available openfisca packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
To install Python through conda:

* install the [Anaconda distribution](https://anaconda.org) for Python, pip and conda.
* or, also consider the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python, pip and conda.

## Contributing to the rules (Git)

Source code is managed with the [Git](https://git-scm.com) version control system. If the use-case includes contributing to the rules, `Git` is going to be an essential requirement.

To can check for a valid Git installation run this command:

```shell
git --version
```

It should return the version of Git if Git is installed. If [Git](https://git-scm.com) isn't installed, follow the official [documentation to install Git](https://git-scm.com/downloads) for the latest version.
