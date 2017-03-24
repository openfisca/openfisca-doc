# OpenFisca Web API

The OpenFisca project provides a web API package in order to do computations over HTTP, sending and receiving JSON data.


## When should I use it?

If you cannot or don't want to interact directly with the Python API, for example if you're developing a web application.

### Examples

Those projects use the OpenFisca Web API:

- [legislation.openfisca.fr](https://legislation.openfisca.fr), giving you information on available OpenFisca variables.
- [Mes Aides](https://mes-aides.gouv.fr), the French social benefits simulator.
- [PA-comp](https://pa-comp.firebaseapp.com), a divorce fiscal impact simulator.


## How can I use it?

### Public API instance

The OpenFisca project provides a free and unrestricted instance of the API, complete with the French tax benefit system, on [`api.openfisca.fr`](https://api.openfisca.fr).

This instance is great for getting a feel of the API, testing, or even deploying small applications, but please note that it is continuously updated. Every update to the endpoints, or to the tax benefit system, will be automatically deployed to this host without prior notice, including breaking changes.
If you use this host, it is your responsibility to stay up-to-date with all legislation changes that could impact your application.

It's OK with small applications but if you plan to develop a real application in production,
we'll politely ask you to host your own instance of the API to reduce the load of our small server.

The public instance of the Web API is auto-updated and you may want to decide when to upgrade it, otherwise your application may break suddently (see [this issue (in French)](https://github.com/openfisca/openfisca-france/issues/716#issuecomment-288689289) for example).

To deploy an instance of the Web API in production, please follow [these instructions](https://github.com/openfisca/openfisca-web-api/tree/master/production-config).

## Endpoints and JSON payload

The web API offers many endpoints providing different data or allowing to send a simulation test case.
See the [dedicated section](./endpoints.md).

The client communicates with the web API with JSON data, see the [dedicated section](./json-data-structures.md) for more information.

Now continue reading the [endpoints](./endpoints.md) section, which contains several examples.
