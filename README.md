# About the project

> You can download an [offline version](https://www.gitbook.com/book/openfisca/documentation) of the documentation (direct link to [PDF](https://www.gitbook.com/download/pdf/book/openfisca/documentation), [ePub](https://www.gitbook.com/download/epub/book/openfisca/documentation) and [Mobi](https://www.gitbook.com/download/mobi/book/openfisca/documentation)).

[![OpenFisca logo](https://www.openfisca.fr/hotlinks/logo-openfisca.svg)](https://www.openfisca.fr/)

[OpenFisca](https://www.openfisca.fr/) is a versatile microsimulation software.

It is a free software published under the [GNU Affero General Public Licence](https://www.gnu.org/licenses/agpl.html) version 3 or later.

## What's the purpose?

OpenFisca allows users to calculate many variables of the tax and benefit legislation of a country (social benefits and taxes paid by households) given input variables.
The impact of reform projects can also be simulated.

When plugged on a survey, OpenFisca can also calculate the budgetary consequences of a reform
and its distributional impact.

Its engine is independent of the country, it is therefore possible to simulate any country.
For now the main supported country is France.

OpenFisca is distributed with distinct packages:

- OpenFisca-Core allows to calculate variables in Python
- OpenFisca-France contains a representation of the French legislation
- OpenFisca-Web-API allows to calculate variables using an web API

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
the [<abbr title="Institut des politiques publiques">IPP</abbr>](http://www.ipp.eu/),
the "startups d'état" of the
[<abbr title="Secrétariat général pour la modernisation de l'action publique">SGMAP</abbr>](http://www.modernisation.gouv.fr/),
the [<abbr title="Institut d'économie publique">IDEP</abbr>](http://www.idep-fr.org/)
and [France Stratégie](http://www.strategie.gouv.fr/).

OpenFisca provides a basic infrastructure, in particular a public instance of its web API,
hosted on cheap servers.
As it is free software, anyone can reproduce the OpenFisca infrastructure on its server.

## Slides

In french: https://openfisca.github.io/communication/PyConFR-2016/ and https://speakerdeck.com/cbenz/ecrire-la-loi-en-python

## What is microsimulation?

TODO

https://en.wikipedia.org/wiki/Microsimulation

## Technical choices

OpenFisca is written in the [Python](http://www.python.org/) programming language.

OpenFisca can calculate tax and benefit variables on test cases (a person or a household)
or population data (real data or survey data).
To achieve both, computations are vectorial.
For performance reasons the [NumPy](http://www.numpy.org/) package is used.
It is coded in the C language under the hood, more performant than Python.

## Project history

The development of OpenFisca began in May 2011 at the
[<abbr title="Centre d'analyse stratégique">CAS</abbr>](http://www.strategie.gouv.fr/)
(renamed France Stratégie / Commissariat général à la stratégie et à la prospective in April 2013)
with the support of the
[<abbr title="Institut d'économie publique">IDEP</abbr>](http://www.idep-fr.org/).

The source code has been released under a free software license in November 2011.

OpenFisca was originally developed as a desktop application
using the [Qt](http://www.qt.io/) library with a Python API.

In the early 2014, when <a href="https://www.etalab.gouv.fr/" rel="external" target="_blank">Etalab</a>
started being implicated in the development of OpenFisca, it was decided to:

- separate the computing engine from its desktop user interface
- offer a web API in addition to the Python API
- demonstrate the value of the web API by developing sample applications including a web interface
  to simulate personal cases
- propose a public access to this web API open to all: administrations, researchers, citizens, etc.

Since then, the software is being developed extensively by
[Etalab](https://www.etalab.gouv.fr/).
Meanwhile the economic model is being improved and the tax and benefit legislation updated by the
[<abbr title="Commissariat général à la stratégie et à la prospective">CGSP</abbr>](http://www.strategie.gouv.fr/)
with the help of the
the [<abbr title="Institut d'économie publique">IDEP</abbr>](http://www.idep-fr.org/)
and the [<abbr title="Institut des politiques publiques">IPP</abbr>](http://www.ipp.eu/).

As of now (March 2014), the Qt version is no longer maintained and only the Python and the web APIs are being developed.
