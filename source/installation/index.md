# <i class="fas fa-cogs"></i> Installation

```eval_rst
.. toctree::
   :hidden:

   howto-web-no-local-install
   howto_docker
   offline-environment
   windows-no-admin
   test_situations
```

OpenFisca is a modular project as described in [Project components section](./../projectcomponents.md).

This section allows you to install the `OpenFisca-Country-Template` as a generic example of an OpenFisca model. This will also allow you to run the documentation examples on your local environment.

To install an existing country model, we advise you to refer to the model repository documentation (usually, the README file). 

## Generic requirements

OpenFisca source code is in [Python open source language](https://www.python.org/).

The default requirements depend on your use case. You may for example want to:
* Run or modify the source code to test OpenFisca syntaxes or write some law or regulation rule.
* Call OpenFisca Web API to run some calculations for a Web site.

To run or modify the source code of a model, you will need a `Python` installation.

To call the model throught OpenFisca Web API, you can:
* rely on already installed Web API instances and have nothing to install on your local environement.
* or, run the Web API on your local environment; this requires a `Python` installation.  

### How to install Python

Python installation depends on your operating system.

You will find the default installation instructions in [Python official documentation](https://www.python.org/downloads/).

Then here are some recommendations for Docker or Windows users:
* [Docker](https://www.docker.com) users can create a container and rely on [Python official image](https://hub.docker.com/_/python) instead.
* Microsoft Windows users, can also rely [conda](https://docs.conda.io/en/latest/) package and environment manager to use [OpenFisca-Country-Template](https://anaconda.org/search?q=openfisca-country-template) or one of the openfisca packages [published as conda packages](https://anaconda.org/search?q=openfisca).
  
  We recommend this option for an easier installation but the [available packages list](https://anaconda.org/search?q=openfisca) is shorter.  
  
  To install Python through conda: 
  * install the [Anaconda distribution](https://anaconda.org) for Python and conda.
  * or, for users with less disk space, install the minimal [Miniconda distribution](https://docs.conda.io/en/latest/miniconda.html) for Python and conda.

## Install the OpenFisca-Country-Template to run or modify the source code

> This step requires the Python installation described above.

You will find the `OpenFisca-Country-Template` installation instruction in its README: see the [Install Instructions for Users and Contributors](https://github.com/openfisca/country-template#install-instructions-for-users-and-contributors).

Other OpenFisca models have their own documentation. You will find the existing repositories list on [this page of openfisca.org](https://openfisca.org/en/countries/) website.

## Test or install the OpenFisca-Country-Template Web API

You can call `OpenFisca-Country-Template` Web API without installing it by relying on the demonstration instance. Or install it on your local environment for further testing.

### Call a demonstration instance

OpenFisca community hosts a demonstration instance for the `OpenFisca-Country-Template` Web API. 

Here is a [swagger interface](https://legislation.demo.openfisca.org/swagger) allowing you to interact with this Web API endpoints. For further information, [this section of the documentation](./../openfisca-web-api/endpoints.md) describes OpenFisca Web APIs endpoints.

### Run and call a local instance

> This step requires the Python installation described above.

To run a local instance of `OpenFisca-Country-Template` Web API, you need to: 
1. install `OpenFisca-Country-Template` on your local environment as described by the [Install Instructions for Users and Contributors](https://github.com/openfisca/country-template#install-instructions-for-users-and-contributors) section of the README,
2. serve the Web API on your environment by running one command as described [here](https://github.com/openfisca/country-template#serve-this-country-package-with-the-openfisca-web-api).

## Installation issues in specific environments

As the OpenFisca community becomes larger, issues that only affect a small percentage of users arise.

The purpose of this section is to bring together the clever solutions the community came up with and share them with all OpenFisca users.

- [How to use OpenFisca on the web (no installation required on your computer)](./howto-web-no-local-install.md)
- [How to use OpenFisca with Docker](./howto_docker.md)
- [How to install OpenFisca in an offline environment](./offline-environment.md)
- [How to work on OpenFisca on a Windows without being administrator](./windows-no-admin.md)
- [How to test your changes on "ready to use" situations](./test_situations.md)

> You're welcome to share your tips on how to solve technical issues! Please update [this section](https://github.com/openfisca/openfisca-doc/edit/master/recipes.md) (in english) or this [wiki FAQ](https://github.com/openfisca/tutorial/wiki) in your preferred language.
