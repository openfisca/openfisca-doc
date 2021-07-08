# On the web


Some online services offer the opportunity to run Python code without having to install anything on your machine.

If you wish to run OpenFisca directly on your browser for a simulation or to evaluate the impact of a reform, you might find one of the following services useful: [Gitpod](https://www.gitpod.io/), [repl.it](https://repl.it), [python anywhere](https://www.pythonanywhere.com) and [Jupyterlab](https://jupyterlab.readthedocs.io/en/stable/). 

Please be aware that you might need to install the OpenFisca package you need on your online service before using it. You will find a quick generic usage example to test your setup below.

## Instructions

1. Start by installing the package you need on your online service e.g. `OpenFisca-Country-Template`.

2. Write the code you wish to run. Example of a code snippet to run:

    ```py
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()
    parameters = tax_benefit_system.parameters

    print(parameters)
    ```

3. Run your code and check the results.
