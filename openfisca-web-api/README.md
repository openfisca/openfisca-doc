# OpenFisca Web API

The OpenFisca project provides a web API package compatible with all country packages.
With the web API, interested App developers can access information and computations by sending and receiving JSON data.

Those projects use the OpenFisca Web API:

- [legislation.openfisca.fr](https://legislation.openfisca.fr), giving you information on available OpenFisca variables.
- [Mes Aides](https://mes-aides.gouv.fr), the French social benefits simulator.
- [PA-comp](https://pa-comp.firebaseapp.com), a divorce fiscal impact simulator.


## Endpoints

OpenFisca endpoints are the entry points to the web API :
the consultation endpoints use the [GET](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) method, whereas the computation endpoint uses the [POST](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) method. 

To request information from OpenFisca, several endpoints are available.
 - GET `/parameters` ([Documentation](http://openfisca.readthedocs.io/en/latest/parameters.html))
 - GET `/parameter/<parameter_id>`([Documentation](http://openfisca.readthedocs.io/en/latest/parameter.html))
 - GET `/variables`([Documentation](http://openfisca.readthedocs.io/en/latest/variables.html))
 - GET `/variable/<variable_id>`([Documentation](http://openfisca.readthedocs.io/en/latest/variable.html))
 - POST `/calculate`([Documentation](http://openfisca.readthedocs.io/en/latest/variable.html))

Each endpoint encodes its information in a [JSON object](input-output-data.md).

> If you are interested in testing OpenFisca-France Web API, we host a [public instance](https://fr.openfisca.org/api/v18) with a dedicated [Open API documentation](legislation.openfisca.fr/swagger).

## Hosting an API instance

To allow app developers to access your country package information and computation, you can host your own API.
[deploy your own instance](https://github.com/openfisca/openfisca-core#serving-the-api).

### Track your API

If you want to track how your API is being used, you can install the [OpenFisca Tracker](https://github.com/openfisca/tracker)

## Licence and copyright information

Please remember that OpenFisca is free software, licensed under an [Affero GPL license](https://choosealicense.com/licenses/agpl-3.0/). That means you have to provide access to the source code of the API you make available, including any changes you might have made on the original code. You also have to provide a link to the OpenFisca source code, and state its license, in a place that is easily discoverable by users of your software.

You could for example add one the following lines to a “credits” page:

```html
Computations done by <a href="https://openfisca.fr">OpenFisca</a>, the <a href="https://choosealicense.com/licenses/agpl-3.0/" title="AGPL-3.0">free and open-source</a> social and fiscal computation engine. Source code available at <a href="https://github.com/openfisca">github.com/openfisca</a>.
```

```html
Calculs effectués par <a href="https://openfisca.fr">OpenFisca</a>, le moteur <a href="https://choosealicense.com/licenses/agpl-3.0/" title="AGPL-3.0">libre et ouvert</a> du système social et fiscal. Code source disponible sur <a href="https://github.com/openfisca">github.com/openfisca</a>.
```
