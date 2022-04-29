# Install Python

OpenFisca runs with [Python](https://www.python.org/).

Python installation depends on your operating system.
And its version depend on the OpenFisca country model that you would like to use.

## How to find the Python version of a model

We describe here how to find the Python version of the OpenFisca-Country-Template. Other country models have a similar structure.

To identify the Python revision of the `OpenFisca-Country-Template` we:
1. Look into the [setup.py file](https://github.com/openfisca/country-template/blob/master/setup.py) of its [repository](https://github.com/openfisca/country-template),
2. Check the `classifiers` values where the Python version is described by a value like `"Programming Language :: Python :: 3.7"` (here `3.7`)
3. When multiple Python versions are listed, we advise you to install the most recent one (3.8 for example if 3.7 and 3.8 are listed).

## Default Python installation

You will find the default installation instructions in [Python official documentation](https://www.python.org/downloads/). See the Python version of your model as described above before choosing wich Python to install.

### Recommendations for Docker or Windows users

Docker or Windows users might find it easier to follow a different installation for Python:
* [Docker](https://www.docker.com) users can create a container and rely on [Python official image](https://hub.docker.com/_/python) instead.
* Microsoft Windows users, can also rely [conda](https://docs.conda.io/en/latest/) package and environment manager to use [OpenFisca-Country-Template](https://anaconda.org/search?q=openfisca-country-template) or one of the openfisca packages [published as conda packages](https://anaconda.org/search?q=openfisca).
  
  We recommend this option for an easier installation but the [available packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
  To install Python through conda: 
  * install the [Anaconda distribution](https://anaconda.org) for Python and conda.
  * or, for users with less disk space, install the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python and conda.
