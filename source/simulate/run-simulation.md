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



#### Application: calculate persons income tax from a CSV file

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

In the following example, we will use the [pandas](https://pandas.pydata.org) library to access the data.

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

#### Application: calculate households total taxes from a CSV file

In this example, we will manage `persons` and `households` entities. To calculate households' `total_taxes`, we include persons' `income_tax`. So, we need to link the persons list to the households and define their roles.

Let's say that our persons and households lists are defined in distinct files: 

* `data_persons.csv`
    ```
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
    ```
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

> Note: This example assumes that the calculated variable and its input values share the same period.
