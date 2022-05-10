# Presets to OpenFisca installation

OpenFisca runs with [Python](https://www.python.org/).
Its source code is managed through [Git](https://git-scm.com) version control system.

> If your local environement already has `Python` (with `pip`) and `Git`, you can skip the next subsections and go to [Install OpenFisca-Country-Template](./install-wheel.md#install-openfisca-country-template). 🙂

## Check Environment presets

You can check the `pip` installation by running this command in your terminal:

```shell
pip --version
```

If this results to `pip: command not found`, then you need to install Python. The [Install Python](./presets.md#install-python) section is here to help you through this journey. 🙂

Likewise, you can check your Git installation by running this command:

```shell
git --version
```

It should return the version of your installed version control system. If [Git](https://git-scm.com) isn't installed on your local environment, you will find more information in the [Install Git](./presets.md#install-git) section below.

## Install Python

`Python` installation is compulsory to run OpenFisca code on your local environment. The `Python` version depend on the OpenFisca country model that you would like to use.

### How to find the Python version of a model

We describe here how to find the Python version of the `OpenFisca-Country-Template`. Other country models have a similar structure.

To identify the Python revision of the `OpenFisca-Country-Template`:
1. Look into the [setup.py file](https://github.com/openfisca/country-template/blob/master/setup.py) of [OpenFisca-Country-Template repository](https://github.com/openfisca/country-template),
2. Check the `classifiers` values where the Python version is described by a value like `"Programming Language :: Python :: 3.7"` (here `3.7`)
3. When multiple Python versions are listed, we advise you to install the most recent one (3.8 for example if 3.7 and 3.8 are listed).

### Install a Python version

Python installation depends on your operating system.

You will find the default installation instructions in [Python official documentation](https://www.python.org/downloads/). See the Python version of your model as described above before choosing wich Python to install.

> [Docker](https://www.docker.com) users might find it easier to follow a different installation for Python and rely on [Python official image](https://hub.docker.com/_/python) instead. See the [Install OpenFisca in a Docker container](./install-with-docker.md) page.

#### Recommendations for Windows users

Microsoft Windows users, can also rely [conda](https://docs.conda.io/en/latest/) package and environment manager to use [OpenFisca-Country-Template](https://anaconda.org/search?q=openfisca-country-template) or one of the openfisca packages [published as conda packages](https://anaconda.org/search?q=openfisca).
  
We recommend this option for an easier installation but the [available packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
To install Python through conda: 
* install the [Anaconda distribution](https://anaconda.org) for Python and conda.
* or, for users with less disk space, install the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python and conda.

## Install Git

`Git` installation is compulsory to push your contributions to OpenFisca code to the shared repository.

Here is the [documentation to install Git](https://git-scm.com/downloads) latest revision.
