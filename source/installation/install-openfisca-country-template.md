# Install the OpenFisca-Country-Template

This section will allow you to run or modify the [source code of OpenFisca-Country-Template](https://github.com/openfisca/country-template) model.

## Prerequisites

OpenFisca runs with [Python](https://www.python.org/).
Its source code is managed through [Git](https://git-scm.com) version control system.

Python installation is compulsory to run OpenFisca code on your local environment. The [Install Python](./install-openfisca-country-template.html#install-python) section is here to help you through this journey.

Git installation is highly recommended. Here is the [documentation to install Git](https://git-scm.com/downloads) latest revision.

> If your local environement is already set, you can skip the next subsections and go to [Install OpenFisca-Country-Template](./install-openfisca-country-template.md#install-openfisca-country-template). 🙂

## How to find the Python version of a model

We describe here how to find the Python version of the OpenFisca-Country-Template. Other country models have a similar structure.

To identify the Python revision of the `OpenFisca-Country-Template` we:
1. Look into the [setup.py file](https://github.com/openfisca/country-template/blob/master/setup.py) of its [repository](https://github.com/openfisca/country-template),
2. Check the `classifiers` values where the Python version is described by a value like `"Programming Language :: Python :: 3.7"` (here `3.7`)
3. When multiple Python versions are listed, we advise you to install the most recent one (3.8 for example if 3.7 and 3.8 are listed).

## Install Python

Python installation depends on your operating system.

And its version depend on the OpenFisca country model that you would like to use.

You will find the default installation instructions in [Python official documentation](https://www.python.org/downloads/). See the Python version of your model as described above before choosing wich Python to install.

> [Docker](https://www.docker.com) users might find it easier to follow a different installation for Python and rely on [Python official image](https://hub.docker.com/_/python) instead. See the [Install OpenFisca in a Docker container](./install-with-docker.md) page.

#### Recommendations for Windows users

Microsoft Windows users, can also rely [conda](https://docs.conda.io/en/latest/) package and environment manager to use [OpenFisca-Country-Template](https://anaconda.org/search?q=openfisca-country-template) or one of the openfisca packages [published as conda packages](https://anaconda.org/search?q=openfisca).
  
We recommend this option for an easier installation but the [available packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
To install Python through conda: 
* install the [Anaconda distribution](https://anaconda.org) for Python and conda.
* or, for users with less disk space, install the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python and conda.

## Install OpenFisca-Country-Template

You will find the `OpenFisca-Country-Template` installation instruction in the [Install Instructions for Users and Contributors](https://github.com/openfisca/country-template#install-instructions-for-users-and-contributors) of its `README`.

💡 Other OpenFisca models have their own documentation. You will find the existing repositories list on [this page of openfisca.org](https://openfisca.org/en/countries/) website.
