# For developers


Follow these steps if you plan to develop on OpenFisca-France or OpenFisca-Core.

## Supported operating systems

The supported operating systems are GNU/Linux distributions (in particular Debian and Ubuntu), Mac OS X and Microsoft Windows.

Other OS should work if they can execute Python and NumPy.

On Microsoft Windows we recommend using [ConEmu](https://conemu.github.io/) instead of the default console.

### Create a virtualenv

[Virtualenvs](https://virtualenv.readthedocs.io/en/latest/) are a recommended way to install Python packages and their dependencies in an isolated way on your machine.

Virtualenvs are easier to use with tools like [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) or [pew](https://github.com/berdario/pew).

## Clone git repositories

First of all, [Git](http://www.git-scm.com/) needs to be installed on your machine.

Create a working directory like `~/Dev/openfisca` and go inside.

> If you need to modify OpenFisca-Core source code, follow the [install for development](https://github.com/openfisca/openfisca-core#install-for-development) section before completing the step below. By default just continue below.

Install OpenFisca-France from Git:

```
git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
pip install --editable .
python setup.py compile_catalog
```

OpenFisca-Core should be installed automatically as a requirement of OpenFisca-France.

Run `pip freeze` to see the installed packages: `openfisca_core` and `openfisca_france` should be listed.

## Test the installation

To test if OpenFisca-France is correctly installed:

```bash
python -m openfisca_france.tests.test_basics
```

It should display (this could take one or two minutes):

```
OpenFisca-France basic test was executed successfully.
```

This means that OpenFisca is correctly installed on your machine.

The next step for you is to read the [Coding the legislation](../coding-the-legislation/index.html) section to know how to write legislation.

> If you want to use your local installation as an API (instead of importing it in python scripts), install **OpenFisca Web API** with [these instructions](https://github.com/openfisca/openfisca-web-api#install).
