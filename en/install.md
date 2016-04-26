# Install

## What to install?

Depending on your usage you'll want to install some parts of OpenFisca, or none:

- If you need to implement some parts of the legislation as OpenFisca formulas, or fill some values for parameters of the legislation, you'll want to install OpenFisca-France.
- If you're developing a web application and need to trigger a computation, you won't need to install anything. Just [send an AJAX request](../openfisca-web-api/index.html) to the public Web API.
  - But if you generate too much traffic we ask you to deploy your own version of the web API. This happens with important applications like https://mes-aides.gouv.fr/

## Supported operating systems

The supported operating systems are GNU/Linux distributions (in particular Debian and Ubuntu), Mac OS X and Microsoft Windows.

Other OS should work if they can execute Python and NumPy.

On Microsoft Windows:
- The Conda installer adds by default the commands `conda` and `python` to the system PATH.
- We recommend using [ConEmu](https://conemu.github.io/) instead of the default console.

## Install for development

Follow these steps if you plan to develop on OpenFisca-France or OpenFisca-Core.

### Install Miniconda

We recommend using Miniconda because it's the simplest solution we've found to install Python scientific packages like NumPy for the different operating systems.

Start by following their [quick install page](http://conda.pydata.org/docs/install/quick.html) (choose the installer for Python 2.7).

### Create your env

```
conda update conda
```

Create a new environment for OpenFisca named `OpenFisca` and install the required packages:

```
conda create --name OpenFisca python=2 numpy PyYAML requests Babel nose
```

Activate your brand new environment:

```
source activate OpenFisca
```

Check your environment packages:

```
conda list
```

### Clone git repositories

You need the [Git](http://www.git-scm.com/) command line tool to be installed on your system.

If not already done, activate your `OpenFisca` Conda env and go to your working directory.

```bash
source activate OpenFisca
mkdir -p ~/Dev/openfisca
cd ~/Dev/openfisca
```

OpenFisca-Core should be installed with pip if you want to change only the tax-benefit-system:

```
pip install OpenFisca-Core
```

> If you need to modify OpenFisca-Core source code, don't install OpenFisca-Core via pip, but follow the [install for development](https://github.com/openfisca/openfisca-core#install-for-development) section.

Then install OpenFisca-France from git:

```
git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
pip install --editable .
python setup.py compile_catalog
cd ..
```

Run `conda list` to see the installed packages: `openfisca-core` and `openfisca-france` should be listed.

To exit your Conda env, type `deactivate`.

Running `pip list` outside of your env, the packages we just installed should *not* be listed.

## Test the installation

To test if OpenFisca-France is correctly installed:

```bash
python -m openfisca_france.tests.test_basics
```

It should display:

```
OpenFisca-France basic test was executed successfully.
```

## Without Conda

Conda is not a strong requirement! To install the requirements of the installed packages, you can either:

- install them with your operating system package manager (`apt-get` on Debian, `brew` on Mac OS X, etc.)
- install them with `pip install` with or without a virtualenv

It's up to you to choose what suits you the best.
