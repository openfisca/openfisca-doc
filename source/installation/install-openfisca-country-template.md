# Install and edit the country package

This section will allow you to install, run or modify the [source code of OpenFisca-Country-Template](https://github.com/openfisca/country-template) model.

OpenFisca runs with [Python](https://www.python.org/). Its source code is managed through [Git](https://git-scm.com) version control system. So, the following steps call [pip package installer](https://pypi.org/project/pip/) that requires a `Python` installation and `git` command. To check their installation or install them, the [presets page](presets.md) is here for you!

Then you will find the `OpenFisca-Country-Template` installation instruction in its `README` [Advanced installation](https://github.com/openfisca/country-template#b-advanced-installation-git-clone) section.

> 💡 Other OpenFisca models have their own documentation. You will find the existing repositories list on [this page of openfisca.org](https://openfisca.org/en/countries/) website.

## How to test your changes on "ready to use" situations (for OpenFisca-France)

Often, when making changes to legislation, you need to test it on a situation that works with your country's tax and benefit system.
Sometimes, these situations can be quite complicated to model (such as roomates).
Instead of re-writing them everytime, we have pre-packaged a few in a Python Package.

You can find the package along with a usage example in the [Tutorial repository](https://github.com/openfisca/tutorial/tree/master/python/scripts/generate_situation_examples)
