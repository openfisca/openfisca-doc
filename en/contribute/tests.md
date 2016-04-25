# Tests

OpenFisca has three sorts of tests:

* unit tests
* test-case tests
* scenario tests

## Run tests

OpenFisca uses [nose](https://nose.readthedocs.org/) to run its unit tests. Here are some useful commands.

- Run the whole test suite:
    ```
    make test
    ```
    which is available at least in Core, France and Web-API repositories.
- Run a specific test:
    ```
    nosetests openfisca_france/tests/test_legislations.py
    ```
- Hide log of failing test:
    ```    
    nosetests --nologcapture openfisca_france/tests/test_legislations.py
    ```
- Display log of successful test:
    ```
    nosetests --debug=openfisca_core openfisca_france/tests/test_legislations.py
    ```

## YAML tests

In OpenFisca-France run a YAML test like this:

```
python openfisca_france/tests/test_yaml.py openfisca_france/tests/formulas/psoc.yaml
```

To add tests for a formula, add a YAML file in `openfisca_france/tests/formulas/`, taking example on the existing ones.

To execute the tests for a specific YAML file, run `openfisca_france/tests/test_yaml.py <path/to/file.yaml>`.

## Ignored tests

In OpenFisca-France some YAML tests are ignored. They receive a property `ignored: true` ([example](https://github.com/openfisca/openfisca-france/blob/ea869ad3c98e633ed3de84fa8618a045b5ebe4f9/openfisca_france/tests/formulas/irpp.yaml#L297)).

> Some tests written in Python were ignored. They are now deleted and put aside in the `deleted-tests` branch, see the old [`Makefile`](https://github.com/openfisca/openfisca-france/blob/deleted-tests/Makefile#L1).

## ipdb debugger

If a test fails, you can execute it with the [debug](http://nose.readthedocs.org/en/latest/plugins/debug.html) nose plugin:

    nosetests --pdb openfisca_core/tests/test_tax_scales.py

You can even [specify the exact test to launch](http://nose.readthedocs.org/en/latest/usage.html#selecting-tests):

    nosetests --pdb openfisca_core/tests/test_tax_scales.py:test_linear_average_rate_tax_scale

> The [nose-ipdb](https://github.com/flavioamieiro/nose-ipdb/) plugin is more user-friendly (because it uses the [ipdb](https://github.com/gotcha/ipdb) debugger instead of pdb).

> In this case, just use the `--ipdb` option rather than `--pdb`.

## Travis automated tests

OpenFisca uses [Travis CI](https://travis-ci.org/openfisca) to run tests automatically after each `git push`.

The repositories tested by Travis are:

* [OpenFisca-Core](https://github.com/openfisca/openfisca-core)
* [OpenFisca-France](https://github.com/openfisca/openfisca-france)
* [OpenFisca-Web-API](https://github.com/openfisca/openfisca-web-api)

The OpenFisca website hosts a summary page of the build statuses: http://www.openfisca.fr/build-status

Travis tests other git branches than `master` too. For example: [OpenFisca-Core](https://travis-ci.org/openfisca/openfisca-core/branches).

For OpenFisca-France, when testing a branch, if there is a branch in OpenFisca-Core with the same name, Travis will checkout it before running the tests. This is done by [this script](https://github.com/openfisca/openfisca-france/blob/master/run-travis-tests.sh).

Idem for OpenFisca-Web-API with [this script](https://github.com/openfisca/openfisca-web-api/blob/master/run-travis-tests.sh) which is sightly different because it handles more dependencies.

## Ludwig tests

To download tests from [Ludwig](https://mes-aides.gouv.fr/tests/) (the tests tool from [Mes aides](https://mes-aides.gouv.fr/)), see the script [download_mes_aides_tests.py](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/scripts/download_mes_aides_tests.py).