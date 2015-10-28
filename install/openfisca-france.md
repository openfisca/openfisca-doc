## OpenFisca France

Requirement: [OpenFisca-Core](https://github.com/openfisca/openfisca-core).

Clone the OpenFisca-France Git repository on your machine and install the Python package.

Assuming you are in an `openfisca` working directory:

```
git clone https://github.com/openfisca/openfisca-france.git
cd openfisca-france
git checkout next
pip install --editable . --user # Microsoft Windows users must not use the `--user` option
python setup.py compile_catalog
```

For your information, the Tunisian tax and benefit system is also available:
[OpenFisca-Tunisia](https://github.com/openfisca/openfisca-tunisia).

## Tests

To add tests for a formula, add a YAML file in `openfisca_france/tests/formulas/`, taking example on the existing ones.

To execute the tests for a specific YAML file, run `openfisca_france/tests/test_yaml.py <path/to/file.yaml>`.

### Mass execution

Before submitting a pull request, please execute tests:

    make test

To download tests from [Ludwig](https://mes-aides.gouv.fr/tests/)
(the tests tool from [Mes aides](https://mes-aides.gouv.fr/)),
see [OpenFiscaFrance.jl](https://github.com/openfisca/OpenFiscaFrance.jl)
