[![OpenFisca logo](https://openfisca.org/img/logo-openfisca.svg)](https://openfisca.org)

> Download a [PDF offline version](https://media.readthedocs.org/pdf/openfisca-doc/latest/openfisca-doc.pdf) of this documentation.

# Introduction

[OpenFisca](https://openfisca.org/) transforms legislation into code.

OpenFisca allows you to:

- Calculate many variables of the tax and benefit system of a country given input variables.
> OpenFisca can calculate social benefits and taxes on test cases (a person or a household).
- Simulate the budgetary consequences of a reform and its distributional impact when plugged on a survey.
> OpenFisca can calculate social benefits and taxes on population data (real data or survey data).

Its engine is independent of the country, it is therefore possible to simulate any country. It behaves as [microsimulation](https://en.wikipedia.org/wiki/Microsimulation) software with improved ties to legislation.

> For a deep dive into the context and difficulties that are encountered when modelling legislation as code that OpenFisca aims at solving, read the [Better Rules for Government](https://www.digital.govt.nz/showcase/better-rules-for-government-discovery-report) report.

[OpenFisca](https://openfisca.org/) is free software published under the [GNU Affero General Public Licence](https://www.gnu.org/licenses/agpl.html) version 3 or later.
It is written in the [Python](http://www.python.org/) programming language (compatible with version 3.7).

## Project Components

OpenFisca is a modular project. Depending on your goals, you will install and interact with one or several of the OpenFisca Components.

[![OpenFisca schema](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/architecture.svg)](https://github.com/openfisca/openfisca-doc/blob/master/img/architecture.svg)

### Web API

The Web API lets you access the legislation [Parameters](./key-concepts/parameters.md) and [Variables](./key-concepts/variables.md).

>**Example**: [Mes Aides](https://mes-aides.gouv.fr) uses the OpenFisca Web API to calculate OpenFisca-France benefits.

- To explore the OpenFisca-France Web API services, use the [French Legislation Explorer](https://fr.openfisca.org/legislation/)
- To query the Openfisca Web API in your app, see the [Web API endpoints description](./openfisca-web-api/endpoints.md)
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

Final products can be built on the top of OpenFisca, mainly to compute tax and benefit variables through the web API. For example: [Mes aides](https://mes-aides.gouv.fr/) allows French citizens to assess their entitlement to social benefits across agencies.

Another use can be to improve the discoverability and readability of law, using reflexivity possibilities demonstrated by the [legislation explorer](https://fr.openfisca.org/legislation/).

Independent researchers can use OpenFisca to publish articles exploring the impact of reforms, focusing on testing hypotheses rather than on modelling. For example, the impact of changing [how children are taken into account for social benefits](https://www.idep-fr.org/sites/default/files/idep/idep_analyses_n6.pdf) or of creating a [universal basic income in France](https://www.ipp.eu/projet/simulation-dun-revenu-de-base/). [NGOs can also use](https://www.revenudebase.info/2017/04/07/apprehender-cout-dun-revenu-de-base/) that same power to back their own suggestions.

The project is 100% free software, it is published on [GitHub](https://github.com/openfisca).
It uses the GitHub infrastructure (issues, pull requests, etc.) to communicate internally or with external participants.
The team discusses publicly on those issues and pull requests as transparently as possible.

The project has many contributors: many people and organizations are involved in the project, reading the legislation and transforming it into source code, developing the Core or web tools, developing external products, etc.

Among them:
[Etalab](https://www.etalab.gouv.fr/),
the [Incubateur des services numériques](https://beta.gouv.fr/),
the [<abbr title="Institut des politiques publiques">IPP</abbr>](https://www.ipp.eu/),
the [<abbr title="Institut d'économie publique">IDEP</abbr>](https://www.idep-fr.org/),
the [<abbr title="Sécurité sociale agricole">MSA</abbr>](http://www.msa.fr/lfy),
and [France Stratégie](http://www.strategie.gouv.fr/).
