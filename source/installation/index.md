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

OpenFisca source code is in [Python language](https://www.python.org/). 

To run or modify the source code of a model, you will need a `Python` installation.
You may for example want to modify the source code to test OpenFisca syntaxes or write some law or regulation rule.  

To call the model throught OpenFisca Web API, you can:
* rely on already installed Web API instances and have nothing to install on your local environement.
* or, run the Web API on your local environment; this requires a `Python` installation.
You may for exemple want to call OpenFisca Web API to run some calculations for a Web site.

## Installation issues in specific environments

As the OpenFisca community becomes larger, issues that only affect a small percentage of users arise.

The purpose of this section is to bring together the clever solutions the community came up with and share them with all OpenFisca users.

- [How to use OpenFisca on the web (no installation required on your computer)](./howto-web-no-local-install.md)
- [How to use OpenFisca with Docker](./howto_docker.md)
- [How to install OpenFisca in an offline environment](./offline-environment.md)
- [How to work on OpenFisca on a Windows without being administrator](./windows-no-admin.md)
- [How to test your changes on "ready to use" situations](./test_situations.md)

> You're welcome to share your tips on how to solve technical issues! Please update [this section](https://github.com/openfisca/openfisca-doc/edit/master/recipes.md) (in english) or this [wiki FAQ](https://github.com/openfisca/tutorial/wiki) in your preferred language.
