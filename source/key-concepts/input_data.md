# Input Data

OpenFisca can calculate social benefits and taxes on people situations.  
Those situations should be defined as input data.

OpenFisca looks for two kinds of inputs to describe situations:
- how persons are dispatched in other entities, 
- what variables' values are already known.

OpenFisca will work the same if there is one Person or seven or seven million in the modelled situation. 

> Technically speaking, OpenFisca is using [vector computing](../coding-the-legislation/25_vectorial_computing.md) for performance reasons via the [NumPy](http://www.numpy.org/) Python package

Nevertheless, you won't have the same experience defining those various situations sizes. So, multiple options could be used to describe this information:

- either *test cases*: you simulate the legislation for small number of situations
- or *data*: you provide a population (survey with aggregated data, CSV files with bulk data, etc.) on which you want to apply the legislation.

### Simulation

The interface between input data and a tax and benefits system that OpenFisca can handle is called *Simulation*.

A simulation has another crucial input: the calculation *period*.

Whatever the input is, *test case* or *data*, the simulation converts it into [vectors](../coding-the-legislation/25_vectorial_computing.md) internally.

### Test cases

A test case describes persons and other entities with their variables values.  
It's the usual solution to define a small number of situations. 

Here is an example of test case (in Python):

```python
BASIC_TEST_CASE = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    }
```

This test case defines 4 persons, `Ari`, `Paul`, `Leila` and `Javier`.
They belong to 2 households named `h1` and `h2`.
For example, `Ari` and `Paul` are parents in `h1` and have one child, `Leila`.

You may add information at the *individual* level or at the *group entity* level:
- known variable values,
- and period of definition for those variable values.

Let's say that we want to add a salary to `Ari` and a `housing_occupancy_status` to `h1`.
Here is the updated test case:

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

Where `salary` and `rent` names come from the [salary](https://demo.openfisca.org/legislation/salary) and [rent](https://demo.openfisca.org/legislation/rent) variables of the `OpenFisca-Country-Template`.

### Data

Data sets describe multiple people situations. It could define a whole population.
This data could come from a survey with aggregated data (see [example](https://www.casd.eu/en/source/tax-and-social-incomes-survey/)), data files extracted from a database, etc.

> For example, a survey usually goes from 50 000 households to 500 000.
