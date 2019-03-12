# How to calculate the legislation on people situations?

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
            'salary': {'2019-01': 1000}
        }, 
        'Paul': {}, 
        'Leila': {}, 
        'Javier': {}
    },
    'households': {
        'h1': {
            'children': ['Leila'], 
            'parents': ['Ari', 'Paul'],
            'housing_occupancy_status': {'2019-01': 'tenant'}
        },
        'h2': {'parents': ['Javier']}
    },
}
```

It's a Python dictionary object that we will use to build a *Simulation*.

In Python, you have to use the `build_from_entities` function based on the *SimulationBuilder*


HINT: For categorical variables you may use either the modality or its number.
Example with the [statut d'occupation du logement](https://fr.openfisca.org/legislation/statut_occupation_logement):
 ``` python
 # Declaration of categorical variable
 menage = dict(loyer = 12000,
            statut_occupation_logement = 4,
            )

```

