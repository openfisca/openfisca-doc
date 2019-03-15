# How to run a simulation

When you have an OpenFisca tax and benefits system and you want to calculate some legislation variables on people situations, you need to create and run a new *Simulation*.

OpenFisca will work the same if there is one person or seven or seven million in the modelled situation. 

Nevertheless, you won't have the same experience defining those various situations sizes and linking them to your simulation. So, multiple options could be used to describe this information:

- either [test cases](running-simulation.md#test-cases): you simulate the legislation for small number of situations
- or [data](running-simulation.md#data): you provide a population (survey with aggregated data, CSV files with bulk data, etc.) on which you want to apply the legislation.

In both cases, OpenFisca looks for two kinds of inputs to describe situations:
- how persons are dispatched in other entities, 
- what variables' values are already known.

> Technically speaking, OpenFisca is using [vector computing](../coding-the-legislation/25_vectorial_computing.md) for performance reasons via the [NumPy](http://www.numpy.org/) Python package

## How to run a simulation on a test case

Test cases can be expressed in Python, or in JSON when using the Web API (see the [specific section](../openfisca-web-api/input-output-data.md) of the documentation).

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

It's a Python dictionary object that we will use to build a *Simulation*.

#### Application: calculate two households housing allowances

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

## How to run a simulation on data

You can build a *Simulation* on multiple data formats.
Any well structured tabular input shoud be fine as long as you are able to iterate over its items in Python.

In the following example, will use the [pandas](https://pandas.pydata.org) library to do so.

### Data

Data sets describe multiple people situations. It could define a whole population.
This data could come from a survey with aggregated data, data files extracted from a database, etc.

> Here is a [survey example](https://www.casd.eu/en/source/tax-and-social-incomes-survey/). It typically goes from 50 000 households to 500 000.

Here is a minimal example of data (in CSV format):

```
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



#### Application: calculate a population's income tax from a CSV file

Let's say you are using the [country-template](https://github.com/openfisca/country-template), which describes the legislation of a yet to be country.

Let's also say you have the following `data.csv` and that you want to calculate [income_tax](https://demo.openfisca.org/legislation/income_tax) for all persons:

```
person_id,person_salary,person_age
1,2694,40
2,2720,43
3,1865,45
4,1941,23
5,2393,31
6,3008,47
7,2286,23
8,3386,28
9,2929,38
10,3981,37
11,3643,38
12,2078,23
```

1. Install the required libraries, by running in your console:

```sh
$ python --version # Python 3.7.0 or greater should be installed on your computer
$ pip install --upgrade pip openfisca_country_template pandas ipython
$ ipython
```

2. Load the `country-template` legislation and, then, the content of the `data.csv` file with the [pandas](https://pandas.pydata.org) library:

```python
In [1]: from openfisca_country_template import CountryTaxBenefitSystem

In [2]: import pandas as pandas

In [3]: tax_benefit_system = CountryTaxBenefitSystem()

In [4]: data = pandas.read_csv('./data.csv')  # pandas.DataFrame object

In [5]: length = len(data)  # ignores CSV header
```

You can now access the `person_salary` column values:

```python
In [6]: data.person_salary
Out[6]:
0     2694
1     2720
2     1865
3     1941
4     2393
5     3008
6     2286
7     3386
8     2929
9     3981
10    3643
11    2078
Name: person_salary, dtype: int64
```


3. Build a simulation according to your data's length:

```python
In [7]: from openfisca_core.simulation_builder import SimulationBuilder

In [8]: simulation = SimulationBuilder().build_default_simulation(tax_benefit_system, length)
```

4. Configure the simulation and calculate the [income_tax](https://demo.openfisca.org/legislation/income_tax) variable for all persons on the same period:

```python
In [9]: import numpy as numpy

In [10]: period = '2018-01'

# match data from the 'person_salary' column
# with the 'salary' variable of our yet to be country's tax-benefit system
In [11]: simulation.set_input('salary', period, numpy.array(data.person_salary))

In [12]: income_tax = simulation.calculate('income_tax', period)
```

5. You are all set! The `income_tax` has been calculated for each person on your `data.csv` file.

Persons' order is kept:

```python
In [13]: data.person_id.values
Out[13]: array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])
```

And `income_tax` is an instance of `numpy.ndarray`:

```python
In [14]: income_tax
Out[14]:
array([404.1    , 408.00003, 279.75   , 291.15002, 358.95   , 451.2    ,
       342.90002, 507.90002, 439.35   , 597.15   , 546.45   , 311.7    ],
      dtype=float32)

In [15]: income_tax.item(2)  # person_id == 3
Out[15]: 279.75
```
