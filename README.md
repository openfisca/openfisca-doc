[![OpenFisca logo](http://openfisca.org/img/logo-openfisca.svg)](https://fr.openfisca.org)

> Download a [PDF offline version](./openfisca-doc.pdf) of this documentation.

# Introduction

[OpenFisca](https://www.openfisca.fr/) is a versatile [microsimulation](https://en.wikipedia.org/wiki/Microsimulation) software.
OpenFisca allows users to :
- Calculate many variables of the tax and benefit system of a country given input variables.
  > OpenFisca can calculate social benefits and taxes on test cases (a person or a household).
- Simulate the budgetary consequences of a reform and its distributional impact when plugged on a survey.
  > OpenFisca can calculate social benefits and taxes on population data (real data or survey data)

To achieve both, computations are vectorial and use [NumPy](http://www.numpy.org/) package. It is coded in the C language under the hood, more performant than Python.
Its engine is independent of the country, it is therefore possible to simulate any country.
For now the main supported country is France.

[OpenFisca](https://www.openfisca.fr/) is a free software published under the [GNU Affero General Public Licence](https://www.gnu.org/licenses/agpl.html) version 3 or later.
It is written in the [Python](http://www.python.org/) programming language (compatible with version 2.7).

## Project Components

OpenFisca is a modular project. Depending on your goals, you will install and interact with one or several of the OpenFisca Components.

[![OpenFisca schema](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/architecture.svg)](https://github.com/openfisca/openfisca-doc/blob/master/img/architecture.svg)

### Web API

The Web API lets you access the legislation [Parameters](./parameters.md) and [Variables](./variables.md).

>**Example**: [Mes Aides](https://mes-aides.gouv.fr) uses the OpenFisca Web API to calculate OpenFisca-France benefits.

- To explore the OpenFisca-France Web API services, use the [French Legistation Explorer](https://legislation.openfisca.fr/)
- To query the Openfisca Web API in your app, see the [Web API endpoints description](./openfisca-web-api/endpoints.md)
- To make sure the OpenFisca-France Web API (and all the related services) are still up and running, check out our [status page](https://status.openfisca.fr/)
- To host your own instance of the Openfisca API, go to the [installation documentation](./openfisca-web-api/README.md)

### Extensions Packages

Extensions add on the capacities of a country-package.

>**Example**: See [Paris extension](https://github.com/sgmap/openfisca-paris) and [Rennes extension](https://github.com/sgmap/openfisca-rennesmetropole) on top of OpenFisca France.

- To install an Extension, head to the [Extensions documentation](./contribute/extensions.md)

### Country package

Country Packages are the basic modules of OpenFisca. They define the [Parameters](./parameters.md), [Entities](./person,_entities,_role.md) and [Variables](./variables.md) of a country.

- To install an existing Country Package, head to that package's documentation.
>**Example**: [Openfisca-france's repository](https://github.com/openfisca/openfisca-france)


### OpenFisca Core

OpenFisca-Core is the main engine: it is the common interface to every Country Package.
It binds the Country Package(s), Extension(s) and the engine together. 
OpenFisca-Core is also where the API is packaged.

- To install OpenFisca-Core, read the [OpenFisca-core Documentation](https://github.com/openfisca/openfisca-core).

## What's the purpose?

OpenFisca is more a platform than an application: its first target is not the end user but
economists, software developers, researchers, teachers, administrations, interested citizens, etc.

Final products can be built on the top of OpenFisca.
They trigger tax and benefit variables computations via the web API.
For example: [Mes aides](https://mes-aides.gouv.fr/).

Then, the web API of OpenFisca is used by the team itself to develop tools like the [legislation explorer](https://legislation.openfisca.fr/).

These tools are designed to help developers understand the legislation when they write it down into source code,
and allow citizens to browse the tax and benefit legislation.

The current version implements a large set of taxes, social benefits and housing provision for France
for the last 10 years.
But this is only due to a shortage in manpower to enter and update the Tunisian legislation.

The project is 100% free software, it is published on [GitHub](https://github.com/openfisca).
It uses the GitHub infrastructure (issues, pull requests, etc.) to communicate internally or with external participants.
The team discusses publically on those issues and pull requests and tries to be as transparent as possible.

The project is multi-actors: many people and organizations are involved in the project,
reading the legislation and transforming it into source code,
developing the Core or web tools,
developing external products, etc.

Among them:
[Etalab](https://www.etalab.gouv.fr/),
the [Incubateur des services numériques](https://beta.gouv.fr/),
the [<abbr title="Institut des politiques publiques">IPP</abbr>](https://www.ipp.eu/),
the [<abbr title="Institut d'économie publique">IDEP</abbr>](https://www.idep-fr.org/),
the [<abbr title="Sécurité sociale agricole">MSA</abbr>](http://www.msa.fr/lfy),
and [France Stratégie](http://www.strategie.gouv.fr/).

OpenFisca provides a basic infrastructure, in particular a public instance of its web API,
hosted on cheap servers.
As it is free software, anyone can reproduce the OpenFisca infrastructure on its server.
