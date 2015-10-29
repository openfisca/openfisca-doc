# Install

## Without installation

There are some use cases for which installing OpenFisca is not required.

OpenFisca has a web API instance which is hosted publically.

If you're developing a web application, you'll just need to call OpenFisca with an AJAX request.

See the [getting started](./getting-started.md) section for an example.

But if you want to develop with the Python API of OpenFisca, without the HTTP overhead,
you can install OpenFisca-France.

Or if you want to host an instance of the web API on your own server, you can install OpenFisca-Web-API.

## Dependencies

If you choose to install OpenFisca, regardless of the installation method (with `pip` or `git`),
there are dependencies that must be installed:

* [Python](http://www.python.org/) 2.7
* [NumPy](http://www.numpy.org/)

For GNU/Linux Debian, as root user:

```bash
apt-get install python-numpy python-pip
```

For Microsoft Windows, please read [this specific section](#openfisca-on-microsoft-windows).

## Install with pip

You have to choose if you'd like to install OpenFisca with `pip` (the Python package installer) or with `git`
(see next section).
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
git checkout next
pip install --editable . --user # Microsoft Windows users must not use the `--user` option
python setup.py compile_catalog

cd ..

git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
git checkout next
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
