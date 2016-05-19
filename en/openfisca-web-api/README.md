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

## Run the HTTP server

    paster serve --reload development-france.ini

To stop the server, interrupt the command with Ctrl-C.

To check if it's OK, open the following URL in your browser:
http://localhost:2000/, 2000 is the port number defined in the development-france.ini config file.
You should see this JSON response:

    {"apiVersion": 1, "message": "Welcome, this is OpenFisca Web API.", "method": "/"}
