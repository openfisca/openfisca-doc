# Contributor guidelines

The OpenFisca project follows the [GitHub Flow](https://guides.github.com/introduction/flow/).

Each Python package uses [Semantic Versioning](http://semver.org/).

## Opening issues

When opening a new issue, please take the following steps:
- try to be as explicit as possible when describing the problem
- try to include a minimal reproducible test case

## Sending Pull Requests

Some guidelines on contributing to OpenFisca:

- All work is submitted via Pull Requests.
- Pull Requests can be submitted as soon as there is code worth discussing. Pull Requests track the branch, so you can continue to work after the PR is submitted. Review and discussion can begin well before the work is complete, and the more discussion the better. The worst case is that the PR is closed.
- Pull Requests should be made against master
- Pull Requests should be tested, if feasible:
  - bugfixes should include regression tests
  - new behavior should at least get minimal exercise
- The CHANGELOG.md file should be updated, in particular new features and backwards-incompatible changes
- The version number should be updated

Don't make 'cleanup' pull requests just to change code style. We don't follow any style guide strictly, and we consider formatting changes unnecessary noise. If you're making functional changes, you can clean up the specific pieces of code you're working on.
Travis does a pretty good job testing IPython and Pull Requests, but it may make sense to manually perform tests (possibly with our test_pr script), particularly for PRs that affect IPython.parallel or Windows.


To merge a pull request into `master`, the tests must pass.

Let [Travis CI](https://travis-ci.org/) do the job directly from the pull request page.

Or execute tests with:

    make test

To download tests from [Ludwig](https://mes-aides.gouv.fr/tests/) (the tests tool from [Mes aides](https://mes-aides.gouv.fr/)), see the script [download_mes_aides_tests.py](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/scripts/download_mes_aides_tests.py).

The OpenFisca team will check that these points are respected:

* a relevant entry is added in the `CHANGELOG.md` file
* tests are updated according to the changes
* requirements are updated in the dependent projects via their `setup.py`