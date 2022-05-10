# Install the country package

This section will allow you to run the [OpenFisca-Country-Template packaged library](https://pypi.org/project/OpenFisca-Country-Template/). It's the minimal installation when you need to run the model on your local environement and don't want to edit it.

If you want to modify the model, just switch to the [install the OpenFisca-Country-Template in editable mode](./install-openfisca-country-template.md) section.

## Prerequisites

OpenFisca runs with [Python](https://www.python.org/).

Python installation is compulsory to run OpenFisca code on your local environment. The [Install Python](./install-wheel.md#install-python) section is here to help you through this journey.

> If your local environement is already set, you can skip the next subsections and go to [Install OpenFisca-Country-Template](./install-wheel.md#install-openfisca-country-template). 🙂

### How to find the Python version of a model

We describe here how to find the Python version of the `OpenFisca-Country-Template`. Other country models have a similar structure.

To identify the Python revision of the `OpenFisca-Country-Template` we:
1. Look into the [setup.py file](https://github.com/openfisca/country-template/blob/master/setup.py) of its [repository](https://github.com/openfisca/country-template),
2. Check the `classifiers` values where the Python version is described by a value like `"Programming Language :: Python :: 3.7"` (here `3.7`)
3. When multiple Python versions are listed, we advise you to install the most recent one (3.8 for example if 3.7 and 3.8 are listed).

### Install Python

Python installation depends on your operating system.

And its version depend on the OpenFisca country model that you would like to use.

You will find the default installation instructions in [Python official documentation](https://www.python.org/downloads/). See the Python version of your model as described above before choosing wich Python to install.

> [Docker](https://www.docker.com) users might find it easier to follow a different installation for Python and rely on [Python official image](https://hub.docker.com/_/python) instead. See the [Install OpenFisca in a Docker container](./install-with-docker.md) page.

### Recommendations for Windows users

Microsoft Windows users, can also rely [conda](https://docs.conda.io/en/latest/) package and environment manager to use [OpenFisca-Country-Template](https://anaconda.org/search?q=openfisca-country-template) or one of the openfisca packages [published as conda packages](https://anaconda.org/search?q=openfisca).
  
We recommend this option for an easier installation but the [available packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
To install Python through conda: 
* install the [Anaconda distribution](https://anaconda.org) for Python and conda.
* or, for users with less disk space, install the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python and conda.

## Install OpenFisca-Country-Template packaged library

To get OpenFisca-Country-Template latest [published revision](https://pypi.org/project/OpenFisca-Country-Template/#history), you can use the [pip package installer](https://pypi.org/project/pip/) that was installed on your environment with Python.

Check the `pip` installation by running this command in your tarminal:

```shell
pip --version
```

The command should give the installed pip revision and end without error. 

> Then, if you have other Python projects on your local environement, we recommend you to create a new virtual environment to work in an isolated area and avoid dependencies conflicts. This is optional and could be skipped in your first installation. And [here is more information](https://github.com/openfisca/country-template#setting-up-a-virtual-environment-with-venv) on how to set such virtual environment.

And, run the following command in your terminal to install your packaged model:

```shell
pip install OpenFisca-Country-Template
```

It should end without error.
You're all set! `OpenFisca-Country-Template` is now installed and ready to run your calculations! 🎉 
