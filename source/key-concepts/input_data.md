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

Where `salary` and `housing_occupancy_status` names come from the [salary](https://demo.openfisca.org/legislation/salary) and [housing_occupancy_status](https://demo.openfisca.org/legislation/housing_occupancy_status) variables of the `OpenFisca-Country-Template`.

### Data

Data sets describe multiple people situations. It could define a whole population.
This data could come from a survey with aggregated data (see [example](https://www.casd.eu/en/source/tax-and-social-incomes-survey/)), data files extracted from a database, etc.

> For example, a survey usually goes from 50 000 households to 500 000.


#### CSV data

To apply the legislation on data described in one or more CSV files, you can use the OpenFisca Python API.

###### Application: calculate a population's income tax from a CSV file

Let's say you are using the [country-template](https://github.com/openfisca/country-template), which describes the legislation of a yet to be country.

Let's also say you have the following `data.csv` and that you want to calculate [income_tax](https://demo.openfisca.org/legislation/income_tax) for all persons:

```csv
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
