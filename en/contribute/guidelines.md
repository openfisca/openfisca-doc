# Contributor guidelines

The OpenFisca project follows the [GitHub Flow](https://guides.github.com/introduction/flow/).

Each Python package uses [Semantic Versioning](http://semver.org/).

## Opening issues

Each OpenFisca repository has its own issues. See [OpenFisca repositories](https://github.com/openfisca).

When an issue does not concern a repository in particular, it must be opened in [OpenFisca-Core](https://github.com/openfisca/openfisca-core).
In this case the issue should have the "all-packages" label.

When opening a new issue, please take the following steps:
- try to be as explicit as possible when describing the problem
- try to include a minimal reproducible test case

## Contributing to the code

### Writing code
- If you modify/create/delete a simulation variable, please follow the [commit message rules](commit-messages.md).
- When adding new variables, please consider the [naming guidelines](variables-naming.md).
- Your code should be tested, if feasible:
  - bugfixes should include regression tests
  - new behavior should at least get minimal exercise
- Use atomic commits, in particular try to isolate "code-cleanup" commits

### Opening a Pull Request

- All code contributions are submitted via a Pull Request towards `master`. The `master` branches are thus [protected](https://help.github.com/articles/about-protected-branches/).
- Pull Requests can be submitted as soon as there is code worth discussing.
- If your work is in progress, add "WIP: " in front of the name of the Pull Request. In this case the maintainers will wait for a "good to merge" message.
- Pull Requests track the branch, so you can continue to work after the PR is submitted. Review and discussion can begin well before the work is complete, and the more discussion the better. In the worst case, the PR will be closed.
- If the Pull Request depends on another opened Pull Request on another repository (like OpenFisca-Core/OpenFisca-France), the requirements should be updated in the dependent project via its `setup.py`.

### Merging a Pull Request

#### Continuous integration

Before allowing you to merge a PR, the continuous integration server (Travis) will ensure that:

- The automated tests are passing (they are triggered automatically and result is visible from the Pull Request page).
- The semantic version number has been updated. Check the [semantic versionning guidelines](semver.md) to know more about how to increment the version number.
- The [`CHANGELOG.md`](https://github.com/openfisca/openfisca-france/blob/master/CHANGELOG.md) has been updated. Make sure to briefly summarize your work, and to **mention any non backward-compatible changes**.

#### Peer reviews

Pull requests should generally be **reviewed** by someone else than their authors.

This is mandatory for:
- Any Pull Request on **`openfisca-core`**
- Any Pull Request with **breaking changes** on `openfisca-france`, `openfisca-web-api`, and `openfisca-parsers`.
- Any Pull Request bringing **new features**, if these features are not relative to a specific scope. 
    - Adding a new route to the API **requires** a review. 
    - A review is yet not mandatory to add a new formula to social contributions in `openfisca-france`. It is though recommended.

To help reviewers, make sure to add to your PR a **clear text explanation** of your changes.

In case of breaking changes, you **must** give details about what features were deprecated. You must also provide guidelines to help users adapt their code to be compatible with the new version of the package.
