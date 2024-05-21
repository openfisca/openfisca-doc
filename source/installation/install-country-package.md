# Install a country package

This section is a guide on how to install the `OpenFisca-Country-Template` [packaged library](https://pypi.org/project/OpenFisca-Country-Template/).

These instructions should be able to be followed for any OpenFisca country package that has published their package on [https://pypi.org/](https://pypi.org/)

It's the minimal installation required to run a country package without the intention of contributing to it. If the use case also requires contributing to the model, please follow the [access a country's source code](./access-countrys-source-code.md) section.

## Install OpenFisca-Country-Template packaged library

OpenFisca runs with [Python](https://www.python.org/). The following steps call [pip package installer](https://pypi.org/project/pip/) which requires a `Python` installation. To check its installation or install it, first check the [Installation requirements](installation-requirements.md).

> When other Python projects exist in the intended environment, it is recommended to create a new virtual environment to avoid dependency conflicts. [Here is more information](https://github.com/openfisca/country-template#setting-up-a-virtual-environment-with-venv) from `OpenFisca-Country-Template` documentation.

To install the latest OpenFisca-Country-Template [published revision](https://pypi.org/project/OpenFisca-Country-Template/#history), run the following command in the environment's terminal:

```shell
pip install OpenFisca-Country-Template
```

It should complete without any errors. To check the installed packages run the following command:

```shell
pip list
```

`OpenFisca-Country-Template` should be in the list indicating that it is installed and ready to run simulations.
