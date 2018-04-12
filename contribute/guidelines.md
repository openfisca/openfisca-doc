# Contributor guidelines

The OpenFisca project follows the [GitHub Flow](https://guides.github.com/introduction/flow/).

Each Python package uses [Semantic Versioning](http://semver.org/).

## Opening issues

Each OpenFisca repository has its own issues. See [OpenFisca repositories](https://github.com/openfisca).

- Describe what you did.
- Describe what you expected to happen.
- Describe what happened.
- Include (or link to) any data that can help reproduce the issue you encountered.

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
- Opening a Pull Request means you want that code to be merged. If you want to only discuss it, send a link to your branch along with your questions through whichever communication channel you prefer.
- If the Pull Request depends on another opened Pull Request on another repository (like OpenFisca-Core/OpenFisca-France), the requirements should be updated in the dependent project via its `setup.py`.

It is considered a good practice to begin the name of the pull request with a verb in the present imperative tense:

    # Good
    Propose a new reform according to the French finance bill 2018

    # Bad
    new reform PLF 2018

### Merging a Pull Request

#### Continuous integration

Before allowing you to merge a PR, the continuous integration server will ensure that:

- The automated tests are passing (they are triggered automatically and result is visible from the Pull Request page).
- The semantic version number has been updated. Check the [semantic versionning guidelines](semver.md) to know more about how to increment the version number.
- The [`CHANGELOG.md`](https://github.com/openfisca/openfisca-france/blob/master/CHANGELOG.md) has been updated. Make sure to briefly summarize your work, and to **mention any non backward-compatible changes**.

#### Web API version number

Due to a `pip` limitation, it is required to increment the major version number of OpenFisca-Web-API when it is adapted to a new major version of OpenFisca-Core. This rule avoids installing a version of OpenFisca-Core incompatible with the loaded country package (for example OpenFisca-France).

> See also:
> - this [old `pip` issue](https://github.com/pypa/pip/issues/988)
> - the [issue](https://github.com/openfisca/openfisca-ops/issues/4#issuecomment-291900286) leading to this decision

#### Peer reviews

Pull requests should generally be **reviewed** by someone else than their authors.

This is mandatory for:

- Any Pull Request with **breaking changes** on `openfisca-france`, `openfisca-web-api`.
- Any Pull Request bringing **new features**, if these features are not relative to a specific scope.
    - Adding a new route to the API **requires** a review.
    - A review is yet not mandatory to add a new formula to social contributions in `openfisca-france`. It is though recommended.

To help reviewers, make sure to add to your PR a **clear text explanation** of your changes.

In case of breaking changes, you **must** give details about what features were deprecated. You must also provide guidelines to help users adapt their code to be compatible with the new version of the package.
