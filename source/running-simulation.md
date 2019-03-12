# How to calculate the legislation on people situations

You have an OpenFisca tax and benefits system and you want to calculate some legislation variables on people situations.

You can use OpenFisca with two kinds of input information:
- either *test cases*: you simulate the legislation for small number of situations
- or *data*: you provide a population (survey with aggregated data, CSV files with bulk data, etc.) on which you want to apply the legislation.

## How to run a simulation on a test case

Test cases can be expressed in Python, or in JSON when using the Web API (see the [specific section](../openfisca-web-api/input-output-data.md) of the documentation).

Let's say that you have this Python test case:

```python
TEST_CASE = {
    'persons': {
        'Ari': {
            'salary': {'2011-01': 1000}
        }, 
        'Paul': {}, 
        'Leila': {}, 
        'Javier': {}
    },
    'households': {
        'h1': {
            'children': ['Leila'], 
            'parents': ['Ari', 'Paul'],
            'rent': {'2011-01': 300}
        },
        'h2': {'parents': ['Javier']}
    },
}
```

It's a Python dictionary object that we will use to build a *Simulation*.

Let's assume that you want to calculate households' `housing_allowance` for the same period.
You have to follow these steps:
1. Load a tax and benefits system like [OpenFisca-Country-Template](https://demo.openfisca.org/legislation).
2. Initialise a *SimulationBuilder*.
3. Create a *Simulation* using, for example, the `build_from_entities(...)` function.
4. Calculate the [housing_allowance](https://demo.openfisca.org/legislation/housing_allowance) and print its value for every test case household.

Which gives:

```python
# -*- coding: utf-8 -*-

from openfisca_core.simulation_builder import SimulationBuilder
from openfisca_country_template import CountryTaxBenefitSystem


TEST_CASE = {
    # ... whole test case ...
}

tax_benefit_system = CountryTaxBenefitSystem()

simulation_builder = SimulationBuilder()
simulation = simulation_builder.build_from_entities(tax_benefit_system, TEST_CASE)

housing_allowance = simulation.calculate('housing_allowance', '2011-01')

print("households", simulation.household.ids)
print("housing_allowance", housing_allowance)
```
