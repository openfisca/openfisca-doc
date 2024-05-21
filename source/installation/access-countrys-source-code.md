# Access a country's source code

This section provides instructions to run or modify the [source code](https://github.com/openfisca/country-template) of the `OpenFisca-Country-Template` package.

These instructions should be able to be followed for any OpenFisca country package, just substitute the `OpenFisca-Country-Template` package with the relevant OpenFisca country package.

OpenFisca runs with [Python](https://www.python.org/). Its source code is managed with the [Git](https://git-scm.com) version control software. The following steps call the [pip package installer](https://pypi.org/project/pip/) which requires a `Python` installation and a `git` command. To check their installation or install them, follow the [Installation requirements](installation-requirements.md) section.

The `OpenFisca-Country-Template` installation instructions are in its `README` [Advanced installation](https://github.com/openfisca/country-template#b-advanced-installation-git-clone) section.

> 💡 Other OpenFisca models have their own documentation. Check the existing repositories list on the [Available Packages](https://openfisca.org/en/packages/) section of the openfisca.org website.

## Testing changes on "ready to use" situations

Generally when making changes to legislation, there is a need to test the changes with a situation that works with the country's tax and benefit system.

Sometimes, these situations can be quite complicated to model. Instead of rewriting them everytime, they can be packaged in different formats:

* As [YAML tests](./../coding-the-legislation/writing_yaml_tests.md) when the output result should be registered.
* As [JSON requests](./../openfisca-web-api/input-output-data.md#describing-the-situation) when the output isn't being tested. Refer to [these examples](https://github.com/openfisca/country-template/tree/main/openfisca_country_template/situation_examples) in the `OpenFisca-Country-Template` repository. These can be adapted as requests to be sent to the OpenFisca web API.
* As [CSV or other data formats](./../simulate/run-simulation.md#data) when there is a large number of situations to save.
