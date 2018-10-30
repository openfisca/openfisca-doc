# Use OpenFisca on the web


If you want to use OpenFisca for running a simulation or evaluating the impact of a reform, without installing anything in your computer, these online services allow you to run OpenFisca directly on your browser, no installation required: [repl.it](https://repl.it), [python anywhere](https://www.pythonanywhere.com) and [jupyterlab](https://jupyterlab.readthedocs.io/en/stable/).

Let's see how to use OpenFisca on one of those services: [repl.it](https://repl.it) 🤓

## Instructions

1. Go to [repl.it](https://repl.it) and select `Python`:

    [![repl.it homepage](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/replit-homepage.png)](https://github.com/openfisca/openfisca-doc/blob/master/img/replit-homepage.png)

2. Write the OpenFisca code you wish to run. The default entry point is `main.py` python file. Example of `main.py` content using `openfisca-country-template`:

    ```py
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()
    parameters = tax_benefit_system.parameters

    print parameters
    ```

    > You can also import files (e.g. JSON files describing input [situations](./openfisca-web-api/input-output-data.md#describing-the-situation)) by clicking on the `import or drop` button.
    [![repl.it upload & drop button](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/replit-upload-drop-button.png)](https://github.com/openfisca/openfisca-doc/blob/master/img/replit-upload-drop-button.png)

3. Click the `run` button to execute your code [![repl.it run button](https://cdn.rawgit.com/openfisca/openfisca-doc/master/img/replit-run-button.png)](https://github.com/openfisca/openfisca-doc/blob/master/img/replit-run-button.png).

    > Your code dependencies are automatically analyzed and imported.

4. You're all set. Check your code results on the right sided python interpreter.

## Example: evaluating a reform with OpenFisca France and repl.it

To see OpenFisca in action in your favourite browser, check out this [example of reform to the French tax-benefit system in repl.it](https://repl.it/@openfisca/framework-openfisca-france) (in French)!
