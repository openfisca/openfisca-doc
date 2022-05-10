# Install the country package

This section will allow you to run the [OpenFisca-Country-Template packaged library](https://pypi.org/project/OpenFisca-Country-Template/). 

It's the minimal installation when you need to run the model on your local environement and don't want to edit it. If you want to modify the model, just switch to the [install the OpenFisca-Country-Template in editable mode](./install-openfisca-country-template.md) section.

## Install OpenFisca-Country-Template packaged library

OpenFisca runs with [Python](https://www.python.org/). The following steps call [pip package installer](https://pypi.org/project/pip/) that requires a `Python` installation. To check its installation or install it, the [presets page](presets.md) is here for you!

> When you have other Python projects on your local environement, we recommend you to create a new virtual environment to work in an isolated area and avoid dependencies conflicts. [Here is more information](https://github.com/openfisca/country-template#setting-up-a-virtual-environment-with-venv) from OpenFisca-Country-Template documentation.

To install OpenFisca-Country-Template latest [published revision](https://pypi.org/project/OpenFisca-Country-Template/#history), run the following command in your terminal:

```shell
pip install OpenFisca-Country-Template
```

It should end without error. You can see the installed packages by running:

```shell
pip list
```
`OpenFisca-Country-Template` should now be in the list.

You're all set! `OpenFisca-Country-Template` is now installed and ready to run your calculations. 
