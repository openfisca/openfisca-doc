# OpenFisca Web API

## Public API instance

The OpenFisca project provides two free and unrestricted instances of the API:

* http://api.openfisca.fr/ which is the production one, running the code corresponding to the `prod` git branches
  of the [OpenFisca-Core](https://github.com/openfisca/openfisca-core),
  [OpenFisca-France](https://github.com/openfisca/openfisca-france) and OpenFisca-Web-API (this one).
* http://api-test.openfisca.fr/ which is the development one, running the code corresponding to the `next` git branches
  of the same projects as above.

However you can install and run your own instance of the API on your own machine/server.
See [installation](#installation) section.

## Run the HTTP server

    paster serve --reload development-france.ini

To stop the server, interrupt the command with Ctrl-C.

To check if it's OK, open the following URL in your browser:
http://localhost:2000/, 2000 is the port number defined in the development-france.ini config file.
You should see this JSON response:

    {"apiVersion": 1, "message": "Welcome, this is OpenFisca Web API.", "method": "/"}
