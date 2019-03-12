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
- and definition periods for those variable values.

Let's say that we want to add a salary to `Ari` and a `rent` to `h1`.
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

Where `salary` and `rent` names come from the [salary](https://demo.openfisca.org/legislation/salary) and [rent](https://demo.openfisca.org/legislation/rent) variables of the `OpenFisca-Country-Template`. In this [model](https://demo.openfisca.org/legislation/):
- `salary` is a Person entity variable defined on a monthly basis,
- `rent` is a Household entity variable defined on a monthly basis as well.


### Data

Data sets describe multiple people situations. It could define a whole population.
This data could come from a survey with aggregated data, data files extracted from a database, etc.

> Here is a [survey example](https://www.casd.eu/en/source/tax-and-social-incomes-survey/). It typically goes from 50 000 households to 500 000.

Here is a minimal example of data (in CSV format):

```csv
person_id,household_id,person_salary,age
1,a,2694,40
2,a,2720,43
3,b,3865,45
4,b,1300,23
5,c,0,12
6,c,0,14
7,c,2884,44
12,e,1200,38
8,d,3386,27
9,d,2929,28
10,e,0,10
```

As for the *test case* content, you will need the following information:
- unique indentifiers for persons and *group entities*
  > like `person_id` and `household_id` columns information in the CSV example
- if you have multiple [entities](./key-concepts/person,_entities,_role.md) types (persons, households, ...), you need to know how your persons list is dispatched over your *group entities*
  > in CSV example, every `person_id` is associated with a `household_id` on the same line
- the name of the corresponding variable in your model for every set of values 
  > `person_salary` values become [salary](https://demo.openfisca.org/legislation/salary) values in `OpenFisca-Country-Template` model
- the period and entity for every set of values
  > `person_salary` and `age` belong to *Person* entity  
  > the definition period isn't in the CSV file but it might, for example, come from the CSV creation time and be identical for the whole data set.


### Simulation

The interface between input data and a tax and benefits system that OpenFisca can handle is called *Simulation*.

Whatever the input is, *test case* or *data*, the simulation converts it into [vectors](../coding-the-legislation/25_vectorial_computing.md) internally.

See [How to calculate taxes and benefits on people situations](./running-simulation.md) section to create a new *Simulation* with your input data.
