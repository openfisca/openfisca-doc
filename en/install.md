# Install

## What to install?

Depending on your usage you'll want to install some parts of OpenFisca, or none:

- If you need to implement some parts of the legislation as OpenFisca formulas, or fill some values for parameters of the legislation, you'll want to install OpenFisca-France.
- If you're developing a web application and need to trigger a computation, you won't need to install anything. Just [send an AJAX request](../openfisca-web-api/index.html) to the public Web API.
  - But if you generate too much traffic we ask you to deploy your own version of the web API. This happens with important applications like https://mes-aides.gouv.fr/

## Install for development

Follow these steps if you plan to develop on OpenFisca-France or OpenFisca-Core.

### Install Miniconda

We recommend Miniconda because it's the simplest solution we've found.

Start by following their [quick install page](http://conda.pydata.org/docs/install/quick.html).

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

Install [Biryani](https://pythonhosted.org/Biryani/):

```
pip install Biryani
```

Check your environment packages:

```
conda list
```

### Clone git repositories

You need the [Git](http://www.git-scm.com/) command line tool to be installed on your system.

If not already done, activate your `OpenFisca` Conda env.

```bash
mkdir -p ~/Dev/openfisca
git clone https://github.com/openfisca/openfisca-core.git
cd openfisca-core
pip install --editable .
python setup.py compile_catalog

cd ..

git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
pip install --editable .
python setup.py compile_catalog
```

Run `conda list` to see the installed packages: `openfisca-core` and `openfisca-france` should be listed.

To exit your Conda env, type `deactivate`.

Running `pip list` outside of your env, the packages we just installed should *not* be listed.

## Test the installation

To test if OpenFisca-France is correctly installed:

```bash
python -m openfisca_france.tests.test_basics
```

It should display `OpenFisca-France basic test was executed successfully.`.

## OpenFisca on Microsoft Windows

Microsoft Windows users should add the Python scripts directory to the system PATH.
This can be done:

* by the Python installer, enabling the corresponding option during the install wizard;
* or after the installation, see [this stackoverflow question](http://stackoverflow.com/a/20458590).
