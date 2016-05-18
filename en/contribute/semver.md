Semantic versionning guidelines
===============================

Before merging your contribution to an openfisca package, you are required to increment the version of this package.

The [semantic versionning convention](http://semver.org/), applied here, requires you to:


>Given a version number MAJOR.MINOR.PATCH, increment the:

>**MAJOR** version when you make incompatible API changes,

>**MINOR** version when you add functionality in a backwards-compatible manner, and

>**PATCH** version when you make backwards-compatible bug fixes.

It is thus crucial to determine whether your changes are **backwards-compatible**. If, during a hackathon, a contributor has written a reform to Openfisca, would this reform still work after adding your changes ?

Examples in Openfisca context
-----------------------------

### Country package (e.g. openfisca-france)

#### Patch

- Correcting an error in a formula.
- Correcting the value of a parameter.

#### Minor
- Introducing a new formula.
- Introducing a parameter.

#### Major
- Renaming or deprecating a variable.
- Changing the default value of a variable.
- Deprecating a parameter.
- Changing the sctructure of the parameter tree.

### Openfisca-core

#### Patch

- Internal optimization (such as cache) without consequence on the API.

#### Minor
- Adding a helper.

#### Major
- Renaming or deprecating a helper.
- Changing the behaviour of openfisca when a legal parameter doesn't exist at the required date.
