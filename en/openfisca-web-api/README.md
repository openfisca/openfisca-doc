# OpenFisca Web API

## What is a web API?

See https://en.wikipedia.org/wiki/Web_API

In short this is a way to trigger OpenFisca simulations on a server from an HTTP URL.

## Why should I use it?

If you develop a web application in JavaScript for example, and if you'd like to call OpenFisca for a simulation, you're certainly going to use the Web API and your application will be a client of the Web API.

Some existing clients are, among others, the [OpenFisca Demonstrator](http://ui.openfisca.fr/) and [mes-aides.gouv.fr](https://mes-aides.gouv.fr/).

## Public API instance

The OpenFisca project provides a free and unrestricted instance of the API which is hosted on http://api.openfisca.fr/ so you don't have to install it on your server.

But if you prefer to be independent or if the traffic you generate on our servers is too important, we'll politely ask you to host your own instance of the API (see the [source code repository](https://github.com/openfisca/openfisca-web-api)).

## Example

Let's run a simple simulation: a single person with no salary.

The URL to call is `http://api.openfisca.fr/api/1/simulate` and here is the JSON payload (we'll explain it later):

```json
// Stored in test_case_1.json
{
  "scenarios": [
    {
      "test_case": {
        "individus": [
          {
            "date_naissance": "1980-01-01",
            "id": "individu0"
          }
        ]
      },
      "period": "2015"
    }
  ],
  "variables": ["revdisp"]
}
```

Run the simulation with [curl](https://curl.haxx.se/) from the command line prompt:

```
curl http://api.openfisca.fr/api/1/simulate -X POST --data @./test_case_1.json --header 'content-type: application/json'
```

The output is:

```json

```