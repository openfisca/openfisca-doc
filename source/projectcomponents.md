# <i class="fas fa-cubes"></i> Project components

OpenFisca is a modular project. Depending on your goals, you will install and interact with one or several of the OpenFisca Components.

[![OpenFisca schema](https://cdn.rawgit.com/openfisca/openfisca-doc/master/source/img/architecture.svg)](https://github.com/openfisca/openfisca-doc/blob/master/source/img/architecture.svg)

## Web API

The Web API lets you access the legislation [Parameters](./key-concepts/parameters.md) and [Variables](./key-concepts/variables.md).

>**Example**: [Mes Aides](https://mes-aides.gouv.fr) uses the OpenFisca Web API to calculate OpenFisca-France benefits.

- To explore the OpenFisca-France Web API services, use the [French Legislation Explorer](https://fr.openfisca.org/legislation/)
- To query the Openfisca Web API in your app, see the [Web API endpoints description](./openfisca-web-api/endpoints.md)
- To host your own instance of the Openfisca API, go to the [installation documentation](./openfisca-web-api/index.md)

## Extensions Packages

Extensions add on the capacities of a country-package.

>**Example**: See [Paris extension](https://github.com/sgmap/openfisca-paris) and [Rennes extension](https://github.com/sgmap/openfisca-rennesmetropole) on top of OpenFisca France.

- To install an Extension, head to the [Extensions documentation](./contribute/extensions.md)

## Country package

Country Packages are the basic modules of OpenFisca. They define the [Parameters](./key-concepts/parameters.md), [Entities](./key-concepts/person,_entities,_role.md) and [Variables](./key-concepts/variables.md) of a country.

- To install an existing Country Package, head to that package's documentation.
>**Example**: [Openfisca-france's repository](https://github.com/openfisca/openfisca-france)


## OpenFisca Core

OpenFisca-Core is the main engine: it is the common interface to every Country Package.
It binds the Country Package(s), Extension(s) and the engine together.
OpenFisca-Core is also where the API is packaged.

- To install OpenFisca-Core, read the [OpenFisca-core Documentation](https://github.com/openfisca/openfisca-core).