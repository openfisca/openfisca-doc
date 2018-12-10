# OpenFisca Web API

```eval_rst
.. toctree::
   :hidden:

   endpoints
   input-output-data
   config-openapi
```

OpenFisca provides a web API package, compatible with all country packages.
Using a web interface, app developers can access information and computations without installing anything locally.

## Public France API

The latest version of the France web api is [`fr.openfisca.org/api/latest`](https://fr.openfisca.org/api/latest). Its endpoints are documented in [`fr.openfisca.org/legislation/swagger`](https://fr.openfisca.org/legislation/swagger). This API has no guarantee of stability over time. Building a web app on top of it is not recommended.

The [DINSIC's OpenFisca Team](https://github.com/orgs/openfisca/teams/france-contrib-dinsic) maintains two stable versions of the Web API. Every 6 months, on January 1st and July 1st, the oldest stable API is shut down, and the current newest version of France is served instead. This means every Web API version is maintained for a year.

Currently served Web API versions are listed in [https://fr.openfisca.org/api](https://fr.openfisca.org/api)

These stable Web APIs are meant to be used for building minimum viable products, proofs of concept and prototypes. The idea is to help web app developers quickly test out new ideas, find their first users or secure funding.

Please keep in mind they become outdated relatively quickly. Anyone wanting an up-to-date and stable OpenFisca Web API is invited to [host their own](#hosting-an-api-instance).


The stability of this API is guaranteed over time.

## Use Cases

The following services use the OpenFisca Web API:

- [fr.openfisca.org/legislation](https://fr.openfisca.org/legislation), giving you information on available OpenFisca variables.
- [Mes Aides](https://mes-aides.gouv.fr), the French social benefits simulator.
- [PA-comp](https://pa-comp.firebaseapp.com), a divorce fiscal impact simulator.

## Conditions

Please remember that OpenFisca is free software, licensed under an [Affero GPL license](https://choosealicense.com/licenses/agpl-3.0/). That means you have to provide access to the source code of the API you make available, including any changes you might have made on the original code. You also have to provide a link to the OpenFisca source code, and state its license, in a place that is easily discoverable by users of your software.

You could for example add one the following lines to a “credits” page:

```html
Computations done by <a href="https://openfisca.org">OpenFisca</a>, the <a href="https://choosealicense.com/licenses/agpl-3.0/" title="AGPL-3.0">free and open-source</a> social and fiscal computation engine. Source code available at <a href="https://github.com/openfisca">github.com/openfisca</a>.
```

```html
Calculs effectués par <a href="https://openfisca.org">OpenFisca</a>, le moteur <a href="https://choosealicense.com/licenses/agpl-3.0/" title="AGPL-3.0">libre et ouvert</a> du système social et fiscal. Code source disponible sur <a href="https://github.com/openfisca">github.com/openfisca</a>.
```
## Hosting an API instance

Let app developers access your country package information and computations by serving the web API that comes bundled with the OpenFisca-Core module. See the [technical documentation](https://github.com/openfisca/openfisca-core#serving-the-api) for serving instructions.

### Track your API

If you want to track how your API is being used, you can install the [OpenFisca Tracker](https://github.com/openfisca/openfisca-core#tracker).
