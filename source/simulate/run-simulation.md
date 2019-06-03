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

### Data

Data sets describe multiple people situations. It could define a whole population.
This data could come from a survey with aggregated data, data files extracted from a database, etc.

> Here is a [survey example](https://www.casd.eu/en/source/tax-and-social-incomes-survey/). It typically goes from 50 000 households to 500 000.

Here is a minimal example of data (in CSV format):

```
person_id,household_id,person_salary,person_age
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
11,e,1600,35
```

As for the *test case* content, you will need the following information:
- unique indentifiers for persons and *group entities*
  > like `person_id` and `household_id` columns information in the CSV example
- if you have multiple [entities](../key-concepts/person,_entities,_role.md) types (persons, households, ...), you need to know how your persons list is dispatched over your *group entities*
  > in CSV example, every `person_id` is associated with a `household_id` on the same line
- the name of the corresponding variable in your model for every set of values 
  > `person_salary` values become [salary](https://demo.openfisca.org/legislation/salary) values in `OpenFisca-Country-Template` model
- the period and entity for every set of values
  > `person_salary` and `person_age` belong to *Person* entity  
  > the reference period isn't in the CSV file but it might, for example, come from the CSV creation time and be identical for the whole data set.



#### Application with persons entity: calculate a population's income tax from a CSV file

Let's say you are using the [country-template](https://github.com/openfisca/country-template), which describes the legislation of a yet to be country.

Let's also say you have the following `data.csv` and that you want to calculate [income_tax](https://demo.openfisca.org/legislation/income_tax) for all persons:

```
person_id,person_salary,person_age
1,2694,40
2,2720,43
3,3865,45
4,1300,23
5,0,12
6,0,14
7,2884,44
12,1200,38
8,3386,27
9,2929,28
10,0,10
11,1600,35
```

In the following example, we will use the [pandas](https://pandas.pydata.org) library to iterate over the data.

1. Install the required libraries, by running in your console:

    ```sh
    $ python --version # Python 3.7.0 or greater should be installed on your computer
    $ pip install --upgrade pip openfisca_country_template pandas
    ```

2. Load the `country-template` legislation and the content of the `data.csv` file with the [pandas](https://pandas.pydata.org) library:

    ```python
    import pandas
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()

    data = pandas.read_csv('./data.csv')  # pandas.DataFrame object
    length = len(data)  # ignores CSV header
    ```

    You can now access the `data.person_salary` column values and get:

    ```python
    >>> print(data.person_salary)

    0     2694
    1     2720
    2     3865
    3     1300
    4        0
    5        0
    6     2884
    7     1200
    8     3386
    9     2929
    10       0
    11    1600
    Name: person_salary, dtype: int64
    ```

3. Build a simulation according to your data's length with `SimulationBuilder` and configure the simulation:
   
    ```python
    from openfisca_core.simulation_builder import SimulationBuilder
    import numpy

    # ...step 2 code...

    simulation = SimulationBuilder().build_default_simulation(tax_benefit_system, length)
    period = '2018-01'

    # match data from the 'person_salary' column
    # with the 'salary' variable of our yet to be country's tax-benefit system
    simulation.set_input('salary', period, numpy.array(data.person_salary))
    ```

You are all set! You can now calculate the [income_tax](https://demo.openfisca.org/legislation/income_tax) variable for each person of your `data.csv` file for the same period:
```python
income_tax = simulation.calculate('income_tax', period)
```

`income_tax` is an instance of `numpy.ndarray` as you can see with:
```python
>>> print(income_tax)

array([404.1     408.00003      579.75    195.00002   0.        0.      432.6
       1.        507.90002      439.35      0.      240.00002],
      dtype=float32)
```

And, persons' order is kept:
```python
>>> print(data.person_id.values)

array([ 1  2  3  4  5  6  7 12  8  9 10 11])
``` 

Thus, you can get the calculated `income_tax` of one person. For example, get its value for the 8th person in the list with:
```python
>>> print(income_tax.item(7))  # person_id == 12

180.0
```

#### Application with multiple entities: calculate a population's households total taxes from a CSV file

In this example, we will manage `persons` and `households` entities. To calculate households' `total_taxes`, we include persons' `income_tax`. So, we need to link the persons list to the households and define their roles.

Let's say that our persons and households lists are defined in distinct files: 

* `data_persons.csv`
    ```csv
    person_id,household_id,person_role_in_household,person_salary,person_age
    1,a,first_parent,2694,40
    2,a,second_parent,2720,43
    3,b,first_parent,3865,45
    4,b,child,1300,23
    5,c,child,0,12
    6,c,child,0,14
    7,c,first_parent,2884,44
    12,e,second_parent,1200,38
    8,d,first_parent,3386,27
    9,d,second_parent,2929,28
    10,e,child,0,10
    11,e,unknown,1600,35
    ```

* `data_households.csv`
    ```csv
    household_id,rent,accommodation_size
    b,1200,64
    a,700,39
    d,750,31
    e,840,37
    c,1100,68
    ```

where `household_id` is used as pivot item linking these files contents.

1. Install the required libraries, by running in your console:

    ```sh
    $ python --version # Python 3.7.0 or greater should be installed on your computer
    $ pip install --upgrade pip openfisca_country_template pandas
    ```

2. Load the `country-template` legislation and the content of the CSV files with the [pandas](https://pandas.pydata.org) library:

    ```python
    import pandas
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()

    data_persons = pandas.read_csv('./data_persons.csv')
    data_households = pandas.read_csv('./data_households.csv')
    ```

    You can now access the entity identifiers columns values:

    ```python
    persons_ids = data_persons.person_id
    households_ids = data_households.household_id
    ```

3. Initialise a simulation builder with the `Person` entity. All you need is the list of persons identifiers:
   
    ```python
    from openfisca_core.simulation_builder import SimulationBuilder
    import numpy as numpy

    # ...step 2 code...

    sb = SimulationBuilder()
    sb.create_entities(tax_benefit_system)

    persons_ids = data_persons.person_id
    sb.declare_person_entity('person', persons_ids)
    ```

4. Configure the simulation builder with your group entity `Household`. All you need here is the list of households identifiers and the role of each person member of the households:

    ```python
    # ...step 3 code...

    # Instanciate the household entity:
    households_ids = data_households.household_id
    household_instance = sb.declare_entity('household', households_ids)
    
    # Join households data on persons:
    persons_households = data_persons.household_id
    persons_households_roles = data_persons.person_role_in_household
    sb.join_with_persons(household_instance, persons_households, persons_households_roles)
    ```

5. Create a simulation from the configured builder and set other inputs to your calculation like `salary` values:

    ```python
    simulation = sb.build(tax_benefit_system)

    period = '2019-03'
    simulation.set_input('salary', period, data_persons.person_salary)
    ```


You are all set! You can now calculate the [total_taxes](https://demo.openfisca.org/legislation/total_taxes) variable for each household of your `data_households.csv` file and the same period:

    ```python
    total_taxes = simulation.calculate('total_taxes', period)
    ```

> This example assumes that the calculated variable and its input values share the same period.



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
