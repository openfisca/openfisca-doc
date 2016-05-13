# Contributor guidelines

The OpenFisca project follows the [GitHub Flow](https://guides.github.com/introduction/flow/).

Each Python package uses [Semantic Versioning](http://semver.org/).

## Opening issues

Each OpenFisca repository has its own issues. See [OpenFisca repositories](https://github.com/openfisca).

When an issue does not concern a repository in particular,
it must be opened in [OpenFisca-Core](https://github.com/openfisca/openfisca-core).
In this case the issue should have the "all-packages" label.

When opening a new issue, please take the following steps:
- try to be as explicit as possible when describing the problem
- try to include a minimal reproducible test case

## Sending Pull Requests

Some guidelines on contributing to OpenFisca:

- All work is submitted via Pull Requests.
- Pull Requests can be submitted as soon as there is code worth discussing.
- If your work is in progress, add "WIP: " in front of the name of the Pull Request. In this case the maintainers will wait for a "good to merge" message.
- Pull Requests track the branch, so you can continue to work after the PR is submitted. Review and discussion can begin well before the work is complete, and the more discussion the better. The worst case is that the PR is closed.
- Pull Requests should be made against master
- The `CHANGELOG.md` file should be updated, in particular new features and backwards-incompatible changes
- The semantic version number should be updated
- If you modify/create/delete a simulation variable, please follow the [commit message rules](https://github.com/openfisca/openfisca-france/wiki/Messages-de-commit).
- When adding new variables, please consider the [naming guidelines](https://github.com/openfisca/openfisca-france/wiki/OpenFisca-variables-naming-guidelines).
- Pull Requests should be tested, if feasible:
  - bugfixes should include regression tests
  - new behavior should at least get minimal exercise
- Use atomic commits, in particular try to isolate "code-cleanup" commits
- Travis tests must pass (they are triggered automatically and result is visible from the Pull Request page).
- If the Pull Request depends on another opened Pull Request on another repository (like OpenFisca-Core/OpenFisca-France), the requirements should be updated in the dependent project via its `setup.py`.
