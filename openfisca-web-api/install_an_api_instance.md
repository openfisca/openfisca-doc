# Install an instance of the Web API

You can install your own instance of the OpenFisca API on a server.

This is useful if you want calculate specific quantities that are not in the main country package, or if you don't want to rely on the public API.

## Prerequisites

We recommend to install the Web API in a Python virtual environment. You can use [virtualenv-burrito](https://github.com/brainsik/virtualenv-burrito) to easily set one up.

## Install

In your virtual environmenent, install the OpenFisca-Web-API package and the country package you want to serve (here OpenFisca-France):

```sh
pip install openfisca-web-api openfisca-france
```

## Run

### Test

You can immediately run a test version of the API, with a [default configuration file](https://github.com/openfisca/openfisca-web-api/blob/master/development-france.ini):
```sh
openfisca-serve --port 2000
# Serving on http://localhost:2000/
```
Please note that this uses a basic WSGI server and may have low performances.

### Production

You can run the API with WSGI servers such as `paster` or `gunicorn`.

First download and adapt an openfisca-web-api configuration file:
```sh
curl https://raw.githubusercontent.com/openfisca/openfisca-web-api/master/development-france.ini > api_config.ini
# Edit api_config.ini with the port you want to serve on, the extensions you want to load, etc.
```
Then run your application with your WSGI server:
```sh
paster serve api_config.ini
```
