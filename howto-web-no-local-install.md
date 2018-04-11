# How to use OpenFisca on the web (no installation required on your computer)

Services exist that create developement environment online (e.g. [repl.it](https://repl.it), [python anywhere](https://www.pythonanywhere.com), [jupyterlab](https://jupyterlab.readthedocs.io/en/stable/)).
Let's see how to use OpenFisca on one of those services: [repl.it](https://repl.it) 🤓

## Instructions

1. Go to [repl.it](https://repl.it) and select `Python` (i.e. `python2.7`):

[![OpenFisca schema](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/replit-homepage.png)](https://github.com/openfisca/openfisca-doc/blob/master/img/replit-homepage.png)

2. Write the OpenFisca code you wish to run python files. The default entry point is `main.py` file. Example of `main.py` content using `openfisca-country-template`:

```py
from openfisca_country_template import CountryTaxBenefitSystem

tax_benefit_system = CountryTaxBenefitSystem()
parameters = tax_benefit_system.parameters

print parameters
```

3. Clic on `run` button to execute your code check its result on the right sided python interpreter.

[![OpenFisca schema](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/replit-run-button.png)](https://github.com/openfisca/openfisca-doc/blob/master/img/replit-run-button.png)

> Your code dependencies are automaticly analyzed and imported. If you still want to manually add a package, see this [repl.it article](https://repl.it/site/blog/python-import).
