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

### Host your own instance

Once you've developed your application and want to decrease the rhythm of development, the safer and more scalable way to use the API is to [deploy your own instance](https://github.com/openfisca/openfisca-web-api/tree/master/production-config).


## Endpoints and JSON payload

The web API offers many endpoints providing different data or allowing to send a simulation test case.
See the [dedicated section](./endpoints.md).

The client communicates with the web API with JSON data, see the [dedicated section](./json-data-structures.md) for more information.

Now continue reading the [endpoints](./endpoints.md) section, which contains several examples.
