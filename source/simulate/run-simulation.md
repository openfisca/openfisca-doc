# How to run a simulation

To calculate some legislation variables on people's situations, you need to create and run a new *Simulation*. Whether situations are described with [test cases](run-simulation.md#test-cases) or [data](run-simulation.md#data), OpenFisca looks for two kinds of inputs:
- how persons are dispatched in other entities, 
- what variables' values are already known.

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
- if you have multiple [entities](../key-concepts/person,_entities,_role.md) types (persons, households, ...), you need to know how your persons list is dispatched over your *group entities*
  > in CSV example, every `person_id` is associated with a `household_id` on the same line
- the name of the corresponding variable in your model for every set of values 
  > `person_salary` values become [salary](https://demo.openfisca.org/legislation/salary) values in `OpenFisca-Country-Template` model
- the period and entity for every set of values
  > `person_salary` and `age` belong to *Person* entity  
  > the reference period isn't in the CSV file but it might, for example, come from the CSV creation time and be identical for the whole data set.



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

## Replicating a situation along axes

So far we've seen two ways of populating a Simulation object with data:
- either describe a small population with fine control over input variables and over the relationship between individuals and group entities;
- or provide inputs in bulk, typically using tabular data (CSV, Excel, etc.)

A third possibility exists: you can set up a small-scale situation, as in test cases; and use it to generate a number of "copies" of this situation, in which one or more variables of your choice take on a range of values.

We do this by adding an "axes" entry to a test case:

```python
WITH_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[{'count':10, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]]
    }

simulation_builder = SimulationBuilder()
simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_AXES)
```

Be careful to note the structure of the "axes" field: an **array of arrays** of axis objects. We will come back to this, but for now let's investigate the effects of adding this single axis.

As before, `BASIC_TEST_CASE` describes one household with two parents and one child, and a second household which is in fact a single adult person. However, the specification of an axis results in something quite different now:

```python
>>> len(simulation.calculate('salary', '2018-11'))
40
```

We started with a "prototype" situation containing 4 individuals, and we specified an axis which replicates this situation 10 times. And so, as expected, we end up with a simulation containing 4 times 10 individuals. 

What happened with respect to the data? It's easier to represent if we first "reshape" the computed data to reflect this structure of 10 groups of 4 individuals:

```python
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(10,4))
array([[   0.     ,    0.     ,    0.     ,    0.     ],
       [ 333.33334,    0.     ,    0.     ,    0.     ],
       [ 666.6667 ,    0.     ,    0.     ,    0.     ],
       [1000.     ,    0.     ,    0.     ,    0.     ],
       [1333.3334 ,    0.     ,    0.     ,    0.     ],
       [1666.6666 ,    0.     ,    0.     ,    0.     ],
       [2000.     ,    0.     ,    0.     ,    0.     ],
       [2333.3333 ,    0.     ,    0.     ,    0.     ],
       [2666.6667 ,    0.     ,    0.     ,    0.     ],
       [3000.     ,    0.     ,    0.     ,    0.     ]], dtype=float32)
```

We can see that, for the requested period, the variable `salary` **of the first individual in each group** is varying in increments from 0 to 3000.

### Targeting individuals

The control provided by an axis is fine-grained and targets one individual. If you wanted to set Javier's salary instead of Ari's, you could do so by providing the *index* of Javier in the original situation; since our indices are 0-based, this is 3:

```python
WITH_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[{'count':10, 'index': 3, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]]
    }
```

And the result is now:

```python
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(10,4))
array([[   0.     ,    0.     ,    0.     ,    0.     ],
       [   0.     ,    0.     ,    0.     ,  333.33334],
       [   0.     ,    0.     ,    0.     ,  666.6667 ],
       [   0.     ,    0.     ,    0.     , 1000.     ],
       [   0.     ,    0.     ,    0.     , 1333.3334 ],
       [   0.     ,    0.     ,    0.     , 1666.6666 ],
       [   0.     ,    0.     ,    0.     , 2000.     ],
       [   0.     ,    0.     ,    0.     , 2333.3333 ],
       [   0.     ,    0.     ,    0.     , 2666.6667 ],
       [   0.     ,    0.     ,    0.     , 3000.     ]], dtype=float32)
```

Axes are particularly interesting when you want to chart how one variable relates to another, as in [this tutorial notebook](https://mybinder.org/v2/gh/openfisca/tutorial/master?filepath=notebooks/how_to_handle_axes.ipynb).

### Adding axes: parallel axes

We noted above that the "axes" are in fact an array of arrays, which allows us to use several axes at once : parallel **or** perpendicular axes.

Sets of axes in the inner array are "parallel". They allow additional variables to be generated in increments. For instance (again take careful note of the position of the square brackets):

```python
WITH_PARALLEL_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[
        {'count':10, 'name':'age', 'min':18, 'max':78, 'period':'2018-11'},
        {'count':10, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}
    ]]
    }
```

The result should be as follows, with both age and salary changing in lockstep:

```python
>>> simulation_builder = SimulationBuilder() 
>>> simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_PARALLEL_AXES)
>>> numpy.reshape(simulation.calculate('age', '2018-11'),(10,4))
array([[18,  0,  0,  0],
       [24,  0,  0,  0],
       [31,  0,  0,  0],
       [38,  0,  0,  0],
       [44,  0,  0,  0],
       [51,  0,  0,  0],
       [58,  0,  0,  0],
       [64,  0,  0,  0],
       [71,  0,  0,  0],
       [78,  0,  0,  0]], dtype=int32)
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(10,4))
array([[   0.     ,    0.     ,    0.     ,    0.     ],
       [ 333.33334,    0.     ,    0.     ,    0.     ],
       [ 666.6667 ,    0.     ,    0.     ,    0.     ],
       [1000.     ,    0.     ,    0.     ,    0.     ],
       [1333.3334 ,    0.     ,    0.     ,    0.     ],
       [1666.6666 ,    0.     ,    0.     ,    0.     ],
       [2000.     ,    0.     ,    0.     ,    0.     ],
       [2333.3333 ,    0.     ,    0.     ,    0.     ],
       [2666.6667 ,    0.     ,    0.     ,    0.     ],
       [3000.     ,    0.     ,    0.     ,    0.     ]], dtype=float32)
```

For this to work, the `count` values of parallel axes must be the same. An error will be raised if they are different.

### Adding axes: perpendicular axes

Sets of axes in the outer array are "perpendicular", that is, they result in independent variation. For instance, we might have:

```python
WITH_PERPENDICULAR_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [
        [{'count':4, 'name':'age', 'min':18, 'max':78, 'period':'2018-11'}],
        [{'count':4, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]
    ]
    }
```

Note the difference in nesting: we no longer have an inner set of two axes, but two sets of one axis each. The result is more complex:

```python
>>> simulation_builder = SimulationBuilder()
>>> simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_PERPENDICULAR_AXES)
>>> len(simulation.calculate('salary', '2018-11'))
64
```

Why? Because we are varying `age` and `salary` independently, and each axis results in multiplying by 4 our original population of 4, resulting in 4 times 4 times 4 individuals, which is indeed 64.

What does the data look like?

```python
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(16,4))
array([[   0.,    0.,    0.,    0.],
       [   0.,    0.,    0.,    0.],
       [   0.,    0.,    0.,    0.],
       [   0.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.]], dtype=float32)
>>> numpy.reshape(simulation.calculate('age', '2018-11'),(16,4))
array([[18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0],
       [18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0],
       [18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0],
       [18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0]], dtype=int32)
```

We can see that both the `age` and the `salary` variables vary by increments, so that **all combinations are present**: for each `age` increment, there exists a variant with each `salary` increment.

This allows us to use OpenFisca for `multivariate observation`: charting how two variables interact to control a third, as in [this example](https://mybinder.org/v2/gh/adrienpacifico/adrienpacifico.github.io/master?filepath=Notebooks/plotly_openfisca_cohabitants.ipynb).
