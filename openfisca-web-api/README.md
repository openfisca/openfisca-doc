# OpenFisca Web API

The OpenFisca project provides a [web API](https://en.wikipedia.org/wiki/Web_API) in order
to launch a simulation from an HTTP URL, sending and receiving JSON data.

## Why should I use it?

If you're developing a web application in JavaScript, or need to compute something from the tax and benefit system,
you need to call the OpenFisca API.

On the contrary, if you're writing a Python script, you may want to import the [`openfisca_france`](https://pypi.python.org/pypi/OpenFisca-France)
Python module directly from your script (or any other country available in OpenFisca).

[mes-aides.gouv.fr](https://mes-aides.gouv.fr/) is an ambitious project, client of the web API.

## Public API instance

The OpenFisca project provides a free and unrestricted instance of the API which is hosted on https://api.openfisca.fr/
so you don't have to install it on your server.

It's OK with small applications but if you plan to develop a real application in production,
we'll politely ask you to host your own instance of the API to reduce the load of our small server.

The public instance of the Web API is auto-updated and you may want to decide when to upgrade it, otherwise your application may break suddently (see [this issue (in French)](https://github.com/openfisca/openfisca-france/issues/716#issuecomment-288689289) for example).

To deploy an instance of the Web API in production, please follow [these instructions](https://github.com/openfisca/openfisca-web-api/tree/master/production-config).

## Endpoints and JSON payload

The web API offers many endpoints providing different data or allowing to send a simulation test case.
See the [dedicated section](./endpoints.md).

The client communicates with the web API with JSON data, see the [dedicated section](./json-data-structures.md) for more information.

Now continue reading the [endpoints](./endpoints.md) section, which contains several examples.
