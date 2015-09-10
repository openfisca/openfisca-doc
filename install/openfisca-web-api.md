# OpenFisca Web API

> An unrestricted instance of the OpenFisca API is hosted online at http://api.openfisca.fr/.
> You need to install this Python package if you want to contribute to its source code or run a local instance
> on your computer.

Requirements:

* [OpenFisca-Core](https://github.com/openfisca/openfisca-core)
* [OpenFisca-France](https://github.com/openfisca/openfisca-france)
* [OpenFisca-Parsers](https://github.com/openfisca/openfisca-parsers)

Clone the OpenFisca-Web-API Git repository on your machine and install the Python package.

Assuming you are in an `openfisca` working directory:

```
git clone https://github.com/openfisca/openfisca-web-api.git
cd openfisca-web-api
git checkout next
pip install --editable . --user # Microsoft Windows users must not use the `--user` option
python setup.py compile_catalog
```
