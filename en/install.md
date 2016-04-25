# Install

## What to install?

Depending on your usage you'll want to install some parts of OpenFisca, or none:

- If you need to implement some parts of the legislation as OpenFisca formulas, or fill some values for parameters of the legislation, you'll want to install OpenFisca-France.
- If you're developing a web application and need to trigger a computation, you won't need to install anything. Just [send an AJAX request](../openfisca-web-api/index.html) to the public Web API.
  - But if you generate too much traffic we ask you to deploy your own version of the web API. This happens with important applications like https://mes-aides.gouv.fr/


## Install Miniconda

We recommend Miniconda because it's the simplest solution we've found.

Start by following their [quick install page](http://conda.pydata.org/docs/install/quick.html).

## Create your env

```
conda update conda
```

Create a new environment for OpenFisca named `OpenFisca` and install the required packages:

```
conda create --name OpenFisca numpy PyYAML requests Babel nose
```

Activate your brand new environment:

```
source activate OpenFisca
```

Install [Biryani](https://pythonhosted.org/Biryani/):

```
pip install Biryani
```

Check your environment packages:

```
conda list
```

## Install with pip

You have to choose if you'd like to install OpenFisca with `pip` (the Python package installer) or with `git` (see next section).
Installation with `git` is more complex than `pip` but allows you to hack on the source code of OpenFisca itself.

When you install OpenFisca using `pip`, OpenFisca becomes available as any Python package.

For a basic usage in Python you just need to install OpenFisca-France:

```bash
pip install OpenFisca-France
```

You'll be able to import the `openfisca_core` and `openfisca_france` Python packages.

If you need to host an instance of the web API, you can install it:

```bash
pip install OpenFisca-Web-API[france]
```

## Install with git

Installing OpenFisca with `git` is more complex but more fine-grained:

- you don't need to wait for new releases to update the source code
- you can fork a repository and submit pull-requests

You'll need the [Git](http://www.git-scm.com/) command line tool to be installed on your system.

Assuming you are in an `openfisca` directory placed where you want on your drive:

```bash
git clone https://github.com/openfisca/openfisca-core.git
cd openfisca-core
git checkout master
pip install --editable . --user # Microsoft Windows users must not use the `--user` option
python setup.py compile_catalog

cd ..

git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
git checkout master
pip install --editable . --user # Microsoft Windows users must not use the `--user` option
python setup.py compile_catalog
```

You'll be able to import the `openfisca_core` and `openfisca_france` Python packages like with `pip` installation
but you'll be able to contribute to the project too.

## Test the installation

To test if OpenFisca-France is correctly installed:

```bash
python -m openfisca_france.tests.test_basics
```

It should display `OpenFisca-France basic test was executed successfully.`.

## OpenFisca on Microsoft Windows

### Python

Install [Python](http://www.python.org/) 2.7 for 32 bits architecture.

### Python pip

Python pip (the package installer) is provided by the Windows installer of Python. You don't need to install it by hand.

### Python numpy

Microsoft Windows users should install the pre-compiled version of numpy package from
[Christoph Gohlke page](http://www.lfd.uci.edu/~gohlke/pythonlibs/).

Download the last versions of the packages, for Python 2.7 and 32 bits architecture.

You'll download [Python Wheels](https://wheel.readthedocs.org/) packages.

First, open the "bash" shell from the "Start" menu then type:

```bash
pip install <package>.whl
```

> Tip: you can drag & drop the files from the Windows Explorer to the "bash" command line terminal.

### Add Python to PATH

Microsoft Windows users should add the Python scripts directory to the system PATH.
This can be done:

* by the Python installer, enabling the corresponding option during the install wizard;
* or after the installation, see [this stackoverflow question](http://stackoverflow.com/a/20458590).
