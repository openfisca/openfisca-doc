# Release process

> This section is for maintainers who want to build and release a Python package of OpenFisca on the [PyPI](https://pypi.python.org/pypi) repository.

Here are the steps to follow to build and release a Python package.
Execute them on each Git repository you want to publish, in that order:

* [OpenFisca-Core](https://github.com/openfisca/openfisca-core)
* [OpenFisca-France](https://github.com/openfisca/openfisca-france)
* [OpenFisca-Parsers](https://github.com/openfisca/openfisca-parsers)
* [OpenFisca-Web-API](https://github.com/openfisca/openfisca-web-api)

See also:

* [PEP 440: public version identifiers](http://legacy.python.org/dev/peps/pep-0440/#public-version-identifiers)
* [distributing packages guide](https://python-packaging-user-guide.readthedocs.org/en/latest/distributing.html)
* [setuptools](https://pythonhosted.org/setuptools/setuptools.html)
* [semver](http://semver.org/)

## Steps to execute

### Tests

Open the [build-status](http://www.openfisca.fr/build-status#branch-next) page to check that the build status of every project is *passing* (green color).

> Check that there are no pending tests by clicking on the badges.
>
> If there are errors, click on a badge to open the corresponding Travis page.
>
> You can also execute the tests by yourself from every project source code directory:
>
> ```bash
> make test
> ```

### Internationalization (i18n)

If the project is internationalized with [GNU gettext](https://www.gnu.org/software/gettext/)
via [Babel](http://babel.pocoo.org/), execute these steps.

Extract strings to translate from source code to `.pot` file and update `.po` catalog files:

```bash
python setup.py extract_messages update_catalog
```

Translate `.po` catalog files using [poedit](https://poedit.net/) for example:

```bash
poedit /path/to/i18n/fr/LC_MESSAGES/fr.po
```

Ensure that `Project-Id-Version` in `.pot` and `.po` files are correct.

If there are modified files, commit them:

```bash
git commit -am "Update i18n translations"
```

Compile catalog `.po` files:

```bash
python setup.py compile_catalog
```

It should display `(100%) translated`.

### Create the release commit

Determine the next `NEW_RELEASE_NUMBER`. You can bump the major version number if breaking changes were committed to the code.

Edit `CHANGELOG.md`:

* fill the changes list
```bash
git log --pretty=format:"* %s" LATEST_VERSION_TAG.. | grep -v "Merge > pull request"
```
* ~~`NEW_RELEASE_NUMBER.dev0 - next release`~~ becomes `NEW_RELEASE_NUMBER`
* delete the line `TODO Fill this changes list while developing`

Edit `setup.py` and check that everything is OK, in particular if requirements have evolved.

```python
setup(
    [...]
    version = 'NEW_RELEASE_NUMBER',
    [...]
    )
```

Commit changes:

```bash
git commit -am "Release NEW_RELEASE_NUMBER" # Replacing NEW_RELEASE_NUMBER! 
```

### Publish on PyPI test instance

Try the release process on the [PyPI test instance](https://wiki.python.org/moin/TestPyPI).

Register the package on the PyPI test instance, only the first time  :

> Note: this operation is protected by an authentication, as well as the other commands dealing with PyPI.

```bash
python setup.py register -r https://testpypi.python.org/pypi
```

Build and [upload](https://python-packaging-user-guide.readthedocs.org/en/latest/distributing.html#uploading-your-project-to-pypi) the package to the PyPI test instance:

```bash
python setup.py bdist_wheel upload -r https://testpypi.python.org/pypi
```

Check if package install correctly from the PyPI test instance (TODO: this does not work!):

```bash
pip install -i https://testpypi.python.org/pypi <package name>
```

### Publish on PyPI

Register the package on PyPI, only the first time:

```bash
python setup.py register
```

Build and upload the package to PyPI:

```bash
(next) python setup.py bdist_wheel upload
```

Merge the `next` branch into `master` and add tags:

```bash
(next) git checkout master
(master) git merge --no-ff next
(master) git tag NEW_RELEASE_NUMBER
(master) git push --follow-tags origin next master
```

### Test the package installation

Let's check if the package is installable from PyPI without errors
using [virtualenv](https://virtualenv.pypa.io/en/latest/):

```bash
cd ~/tmp
virtualenv openfisca-france
cd openfisca-france
source bin/activate
pip install OpenFisca-France
python -m openfisca_france.tests.test_basics
deactivate
```

> Do the same for OpenFisca-Web-API if you wish.

### Create the future release commit

Switch back to the previous shell and checkout the `next` branch:

```bash
(master) git checkout next
```

Edit `setup.py` to change version number (ie increase patch number and add ".dev0" suffix):

```python
setup(
    [...]
    version = 'NEW_FUTURE_RELEASE_NUMBER.dev0',
    [...]
    )
```

Create the next release section in `CHANGELOG.md`, ie:

```
## NEW_FUTURE_RELEASE_NUMBER.dev0 - next release

* TODO Fill this changes list while developing
```

> Keep the "TODO" list item as is.

Commit changes and push:

```bash
(next) git commit -am "Update to next dev version"
(next) git push
```

### Next steps

Do the same for the remaining repositories to release.

When all the suited repositories are released, you can announce the new release
on the website news, Twitter, the mailing list, etc.
