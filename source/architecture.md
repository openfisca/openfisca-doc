# <i class="fas fa-cubes"></i> Architecture

Depending on your goals, you will interact with one or several components of OpenFisca.

[![OpenFisca architecture](https://cdn.rawgit.com/openfisca/openfisca-doc/master/source/static/img/architecture.svg)](https://github.com/openfisca/openfisca-doc/blob/master/source/static/img/architecture.svg)

## Country packages

Country packages are what most users will interact with when using OpenFisca. They model the rules of a jurisdiction by defining [Parameters](key-concepts/parameters.md), [Variables](key-concepts/variables.md) and [Entities](key-concepts/person,_entities,_role.md).

> For example, [`openfisca-france`](https://github.com/openfisca/openfisca-france) models French law.

## Extensions packages

Extensions add capabilities to a country package while maintaining situation description compatibility by adding or redefining parameters and variables, but not entities.

This architecture enables subcommunities to maintain subsets of the rules of a country on which they have authority, or which are too specific to be of interest to the wider OpenFisca French community.

> For example, [`openfisca-paris`](https://github.com/openfisca/openfisca-paris) extends `openfisca-france` with benefits specific to the town of Paris and is maintained by the Paris City Council.

## Core

OpenFisca Core provides the API, domain-specific language (DSL) and testing tools with which country and extension packages are built.

It defines the [Python API](openfisca-python-api/index.md) through which the country packages can be queried.

The Core also includes an optional [web API](openfisca-web-api/index.md), which makes it possible to expose [Parameters](key-concepts/parameters.md) and calculate [Variables](key-concepts/variables.md) over HTTP and JSON.

## Templates

Since all country and extension packages are maintained by different communities and depend on legal and cultural contexts, OpenFisca provides two packages aimed at demonstrating its capabilities independently: [`country-template`](https://github.com/openfisca/country-template/) and [`extension-template`](https://github.com/openfisca/extension-template/). They can be used to bootstrap new country or extension packages.

This documentation uses these packages throughout.
