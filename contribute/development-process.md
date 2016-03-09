# Development process

The OpenFisca project follows the [GitHub Flow](https://guides.github.com/introduction/flow/).

Each Python package uses [Semantic Versioning](http://semver.org/).

## Submit a pull request

To merge a pull request into `master`, the tests must pass.

Let [Travis CI](https://travis-ci.org/) do the job directly from the pull request page.

Or execute tests with:

    make test

To download tests from [Ludwig](https://mes-aides.gouv.fr/tests/) (the tests tool from [Mes aides](https://mes-aides.gouv.fr/)), see the script [download_mes_aides_tests.py](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/scripts/download_mes_aides_tests.py).
