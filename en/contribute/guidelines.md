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
- The `CHANGELOG.md` file should be updated, in particular new features and backwards-incompatible changes
- The semantic version number should be updated
- Use atomic commits, in particular try to isolate "code-cleanup" commits
- Travis tests must pass (they are triggered automatically and result is visible from the Pull Request page).
- If the Pull Request depends on another opened Pull Request on another repository (like OpenFisca-Core/OpenFisca-France), the requirements should be updated in the dependent project via its `setup.py`.
