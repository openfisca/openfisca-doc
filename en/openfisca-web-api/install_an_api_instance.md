# Install an api instance

You can install your own instance of the Openfisca API on a server.

This is useful if you want calculate specific quantities that are not in the main country package, or if you don't want to rely on the public API.

## Prerequisites
We recommand to install the api in a python virtual environment. You can use  [virtualenv-burrito](https://github.com/brainsik/virtualenv-burrito) to easily set one up.

## Install
In your virtual environmenent, install the web-api package, and the country package you want to serve (here openfisca-france):

```sh
  pip install openfisca-web-api
  pip install openfisca-france
```

## Run

You can immediately run a test version of the API, with a [default configuration file](https://github.com/openfisca/openfisca-web-api/blob/master/development-france.ini):
```sh
  openfisca-serve
```

