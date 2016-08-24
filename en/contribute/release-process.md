# Release process

## Automated releasing

The four main openfisca packages (core, france, web-api and parsers) are today **continously** and **automatically** released.

When a Pull Request is merged to master, this CI server (travis) automatically:

- Publish a version tag on github.
- Publish a release on the [PyPI](https://pypi.python.org/pypi) repository.


## Set up automated releasing on a new repository

* Make sure you have installed the [Travis CI Command Line Client](https://github.com/travis-ci/travis.rb)

* Log in to Travis CI using your github credentials:
```sh
travis login
```
### Automated tagging on git

* Create a **new** ssh key in your repository. Do **not** push it:
```sh
ssh-keygen -t rsa -b 4096 -C "bot@openfisca.fr"
```

* Encrypt the private key.
```
travis encrypt-file $id_rsa --add
```

* Add the public key to the repository in Settings > Deploy keys, with writing rights.

* Copy and **adapt the repository name** in the [`release-tag.sh`](https://github.com/openfisca/openfisca-france/blob/master/release-tag.sh) script into the repository.

* Edit `.travis.yaml` to:
    * Decrypt the ssh key in `before_deploy` instead of `before_install`.
    * Add the [deployment instructions](https://github.com/openfisca/openfisca-france/blob/4.0.0/.travis.yml#L19).


* Only push the encrypted key. You can remove both the private and public keys after making sure the automatic tagging works as expected.

### Automated releasing on Pypy

* Make sure you know the credentials for the `openfisca-bot` Pypi user.

* Give `openfisca-bot` maintainer's right on Pypi.

* Encrypt the `openfisca-bot` password:
```
travis encrypt
```

* Edit `.travis.yaml` to:
    * [Compile](https://github.com/openfisca/openfisca-core/blob/2.0.1/.travis.yml#L21) the [internationalization]() catalog in `before_deploy`, if needed.
    * Add the [deployment instructions](https://github.com/openfisca/openfisca-core/blob/2.0.1/.travis.yml#L30). Replace the encrypted password by what `travis encrypt` generated.


# Deprecated

## Manual releasing

Here are the steps to follow to build and release a Python package.
Execute them on each Git repository you want to publish :

* [OpenFisca-Core](https://github.com/openfisca/openfisca-core)
* [OpenFisca-Parsers](https://github.com/openfisca/openfisca-parsers)
* [OpenFisca-Web-API](https://github.com/openfisca/openfisca-web-api)

See also:

* [PEP 440: public version identifiers](http://legacy.python.org/dev/peps/pep-0440/#public-version-identifiers)
* [distributing packages guide](https://python-packaging-user-guide.readthedocs.org/en/latest/distributing.html)
* [setuptools](https://pythonhosted.org/setuptools/setuptools.html)
* [semver](http://semver.org/)

### Steps to execute

#### Tests

Open the [build-status](http://www.openfisca.fr/build-status) page to check that the build status of every project is "passing" (green color).

> Check that there are no pending tests by clicking on the badges.
>
> If there are errors, click on a badge to open the corresponding Travis page.
>
> You can also execute the tests by yourself: do `git pull` in every project on the branch `master`, and run `make test` in each project.

### Internationalization (i18n)

If the project does not use [Python-Babel](http://babel.pocoo.org/) to translate strings, skip this section. Check by looking for the `Babel` entry in `install_requires = ` of `setup.py`.

Extract strings to translate from source code to `.pot` file and update `.po` catalog files:

```bash
python setup.py extract_messages update_catalog
```

Translate `.po` catalog files using [poedit](https://poedit.net/) for example:

```bash
poedit /path/to/i18n/fr/LC_MESSAGES/fr.po
```

Ensure that `Project-Id-Version` in `.pot` and `.po` files are correct.

Commit modified files if needed:

```bash
git commit -am "Update i18n translations"
```

Compile catalog `.po` files:

```bash
python setup.py compile_catalog
```

It should display `(100%) translated`.

### Create the release commit

In `setup.py` check the `install_requires` and `version` keys.

Each Pull Request introducing a new dependency or a breaking change should have updated the `setup.py` file, but it's better to check it again.

The same for the `CHANGELOG.md` file, check that it's OK.

> If the `CHANGELOG.md` file is not enough filled-in, you can use this command to extract some useful commit messages:
> ```bash
> git log --pretty=format:"* %s" a..b
> ```

Commit changes if you made some.

Then create a release tag:

```bash
# Replace X by the actual version number!
git tag X
git push origin master X
```

#### Publish on PyPI

Build and upload the package to PyPI:

```bash
python setup.py bdist_wheel upload
```

#### Test the package installation

Let's check if the package is installable from PyPI without errors
using [virtualenv](https://virtualenv.pypa.io/en/latest/):

```bash
cd /tmp
virtualenv test-openfisca
cd test-openfisca
source bin/activate
pip install OpenFisca-France
python -m openfisca_france.tests.test_basics
deactivate
```

> Test OpenFisca-Web-API installation if you wish.

#### Next steps

Do the same for the remaining repositories to release.

When all the suited repositories are released, you can announce the new release on the website news, Twitter, the mailing list, etc.
