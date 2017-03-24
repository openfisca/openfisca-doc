# OpenFisca Web API

The OpenFisca project provides a web API package in order to do computations over HTTP, sending and receiving JSON data.


## Use cases

If you cannot or don't want to interact directly with the Python API, for example if you're developing a web application.

### Examples

Those projects use the OpenFisca Web API:

- [legislation.openfisca.fr](https://legislation.openfisca.fr), giving you information on available OpenFisca variables.
- [Mes Aides](https://mes-aides.gouv.fr), the French social benefits simulator.
- [PA-comp](https://pa-comp.firebaseapp.com), a divorce fiscal impact simulator.


## Architecture

The web API supports different use-cases, from getting information on the available tax benefit system to full-fledged simulation. Different [endpoints](endpoints.md) support each of them. Each endpoint encodes its information in a [JSON object](json-data-structures.md).


## Public or hosted

The OpenFisca API is available through two different means, each coming with its set of constraints.

### Public API instance

The OpenFisca project provides a free and unrestricted instance of the API, complete with the French tax benefit system, on [`api.openfisca.fr`](https://api.openfisca.fr).

This instance is great for getting a feel of the API, testing, or even deploying small applications, but please note that it is continuously updated. Every update to the endpoints, or to the tax benefit system, will be automatically deployed to this host without prior notice, including breaking changes.
If you use this host, it is your responsibility to stay up-to-date with all legislation changes that could impact your application.

#### Conditions

The public instance comes with no warranty at all. We provide it on a _best-effort_ basis, with no SLA and no performance engagement.

### Host your own instance

Once you've developed your application and want to decrease the rhythm of development, the safer and more scalable way to use the API is to [deploy your own instance](https://github.com/openfisca/openfisca-web-api/tree/master/production-config).

#### Conditions

Please remember that OpenFisca is free software, licensed under an [Affero GPL license](https://choosealicense.com/licenses/agpl-3.0/). That means you have to provide access to the source code of the API you make available, including any changes you might have made on the original code. You also have to provide a link to the OpenFisca source code, and state its license, in a place that is easily discoverable by users of your software.

You could for example add one the following lines to a “credits” page:

```html
Computations done by <a href="https://openfisca.fr">OpenFisca</a>, the <a href="https://choosealicense.com/licenses/agpl-3.0/" title="AGPL-3.0">free and open-source</a> social and fiscal computation engine. Source code available at <a href="https://github.com/openfisca">github.com/openfisca</a>.
```

```html
Calculs effectués par <a href="https://openfisca.fr">OpenFisca</a>, le moteur <a href="https://choosealicense.com/licenses/agpl-3.0/" title="AGPL-3.0">libre et ouvert</a> du système social et fiscal. Code source disponible sur <a href="https://github.com/openfisca">github.com/openfisca</a>.
```
