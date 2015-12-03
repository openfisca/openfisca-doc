# OpenFisca Web API

## What is a web API?

See https://en.wikipedia.org/wiki/Web_API

## Public API instance

The OpenFisca project provides a free and unrestricted instance of the API which is hosted on
http://api.openfisca.fr/.

You can use it or install and run your own instance of the API on your own machine/server.
See [installation](#installation) section.

## Run the HTTP server

    paster serve --reload development-france.ini

To stop the server, interrupt the command with Ctrl-C.

To check if it's OK, open the following URL in your browser:
http://localhost:2000/, 2000 is the port number defined in the development-france.ini config file.
You should see this JSON response:

    {"apiVersion": 1, "message": "Welcome, this is OpenFisca Web API.", "method": "/"}
