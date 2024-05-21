# Python API in the browser

Some online services offer the opportunity to run Python code online without having to install anything on a local machine.

To run OpenFisca directly in the browser for a simulation or to evaluate the impact of a reform, the following services could be useful: [Gitpod](https://www.gitpod.io/), [repl.it](https://repl.it), [python anywhere](https://www.pythonanywhere.com) and [Jupyterlab](https://jupyterlab.readthedocs.io/en/stable/).

There is a lot of variance between the above services so rather than offer specific instructions, the following is the type of approach that will be required.

## Instructions

1. Start by [installing the package](install-country-package.md) on the online service e.g. `OpenFisca-Country-Template`.

2. Write the code the use case requires. The following is an example of a python code snippet to run against the Python API:

    ```py
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()
    parameters = tax_benefit_system.parameters

    print(parameters)
    ```

3. Run the code; check the results.
