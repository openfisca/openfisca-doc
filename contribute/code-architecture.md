# Code architecture

## OpenFisca Web API

Each API endpoint (`calculate`, `simulate`, etc.) source code has its own controller (a function responding to a HTTP request) in `openfisca_web_api/controllers`.

Each controller function consists basically of 3 steps:
* reading and validating user input (with `req.params`)
* doing some computations
* returning the results in JSON (with `wsgihelpers.respond_json`)

The configuration of the application is stored in `development-<country>.ini` files, `<country>` being either
`france` or `tunisia`.
The configuration is validated once when the application starts.
The validation code is in `openfisca_web_api/environment.py` at the beginning of the `load_environment` function.

The tests are in `openfisca_web_api/tests`.

The function `make_app` in `openfisca_web_api/application.py` returns a [WSGI](http://wsgi.readthedocs.org/) application.
It is the main entry point of the application and is declared in `setup.py`.

All conversion and validation steps are done using the [Biryani](https://biryani.readthedocs.org) library.
