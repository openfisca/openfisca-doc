# How to run a simulation

To calculate legislation variables on people's situations, a _Simulation_ needs to be created and run.
OpenFisca looks for two kinds of inputs:

- how persons are dispatched in other entities,
- what variables' values are already known.

This is true for both [test cases](run-simulation.md#test-cases) and [data](run-simulation.md#data), the two approaches to running Simulations.

## How to run a simulation on a test case

Test cases can be expressed in Python, or in JSON when using the web API (see the [specific section](../openfisca-web-api/input-output-data.md) of the documentation).

### Test cases

A test case describes persons and other entities with their variables values.
It's the usual solution to define a small number of situations.

Here is an example of test case (in Python):

```py
BASIC_TEST_CASE = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'household_1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'household_2': {'parents': ['Javier']}
        },
    }
```

This test case defines 4 persons, `Ari`, `Paul`, `Leila` and `Javier`.
They belong to 2 households named `household_1` and `household_2`.
For example, `Ari` and `Paul` are parents in `household_1` and have one child, `Leila`.

Information that can be added at the _individual_ level or at the _group entity_ level:

- known variable values,
- and definition periods for those variable values.

To add a salary to `Ari` and `rent` to `household_1` would look like this:

```py
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
        'household_1': {
            'children': ['Leila'],
            'parents': ['Ari', 'Paul'],
            'rent': {'2011-01': 300}
        },
        'household_2': {'parents': ['Javier']}
    },
}
```

The `salary` and `rent` names come from the [salary](https://legislation.demo.openfisca.org/salary) and [rent](https://legislation.demo.openfisca.org/rent) variables of the `OpenFisca-Country-Template`. In this [model](https://legislation.demo.openfisca.org/):

- `salary` is a Person entity variable defined on a monthly basis,
- `rent` is a Household entity variable defined on a monthly basis as well.

#### Application: calculate two households housing allowances

The following steps calculate two households' `housing_allowance` for the same period:

1. Load a tax and benefit system like [OpenFisca-Country-Template](https://legislation.demo.openfisca.org).
2. Initialise a _SimulationBuilder_.
3. Create a _Simulation_ using, for example, the `build_from_entities(...)` function.
4. Calculate the [housing_allowance](https://legislation.demo.openfisca.org/housing_allowance) and print its value for every household.

Example:

```py
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

The following is an example of how to build a _Simulation_ from multiple data formats.
Any well structured tabular input should be fine as long as it's possible to iterate over its items in Python.

### Data

The data describes multiple people's situations. It could define a whole population.
This data could come from a survey with aggregated data, data files extracted from a database, etc.

> Here is a [survey example](https://www.casd.eu/en/source/tax-and-social-incomes-survey/). It typically goes from 50 000 households to 500 000.

Here is a minimal example of data (in CSV format):

```text
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

As for the _test case_ content, it needs the following information:

- unique identifiers for persons and _group entities_
  > like the `person_id` and `household_id` columns information in the CSV example
- if there have multiple [entities](../key-concepts/person_entities_role.md) types (persons, households, ...), there needs to be a way that the persons list is dispatched over the _group entities_
  > in the CSV example, every `person_id` is associated with a `household_id` on the same line
- the name of the corresponding variables in the model for each set of values
  > `person_salary` values become [salary](https://legislation.demo.openfisca.org/salary) values in `OpenFisca-Country-Template` model
- the _period_ and _entity_ for every set of values
  > `person_salary` and `person_age` belong to the _Person_ entity. The _period_ isn't in the CSV file, but it may for example be the CSV creation time and identical for the whole data set.

#### Application: calculate persons income tax from a CSV file

Given the following `data.csv` here is how to calculate [income_tax](https://legislation.demo.openfisca.org/income_tax) for all persons:

```text
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

In the following example, the [pandas](https://pandas.pydata.org) library can be leveraged to access the data.

1. Install the required libraries, by running in a console:

    ```sh
    python --version # Python 3.7.0 or greater should be installed on your computer
    pip install --upgrade pip openfisca_country_template pandas
    ```

2. Load the `country-template` legislation and the content of the `data.csv` file with the [pandas](https://pandas.pydata.org) library:

    ```py
    import pandas
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()

    data = pandas.read_csv('./data.csv')  # pandas.DataFrame object
    length = len(data)  # ignores CSV header
    ```

    Now access the `data.person_salary` column values:

    ```py
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

3. Build a simulation according to the data's length with `SimulationBuilder` and configure the simulation:

    ```py
    from openfisca_core.simulation_builder import SimulationBuilder
    import numpy

    # ...step 2 code...

    simulation = SimulationBuilder().build_default_simulation(tax_benefit_system, length)

    period = '2018-01'
    simulation.set_input('salary', period, numpy.array(data.person_salary))
    ```

It is now possible to calculate the [income_tax](https://legislation.demo.openfisca.org/income_tax) variable for each person described in the `data.csv` file for the same period:

```py
income_tax = simulation.calculate('income_tax', period)
```

`income_tax` is an instance of `numpy.ndarray` as you can see with:

```py
>>> print(income_tax)

array([404.1     408.00003      579.75    195.00002   0.        0.      432.6
       1.        507.90002      439.35      0.      240.00002],
      dtype=float32)
```

And, the persons' order is kept:

```py
>>> print(data.person_id.values)

array([ 1  2  3  4  5  6  7 12  8  9 10 11])
```

The following example calculates the `income_tax` of the 8th person in the list:

```py
>>> print(income_tax.item(7))  # person_id == 12

180.0
```

#### Application: calculate households total taxes from a CSV file

This example will manage the `persons` and `households` entities. To calculate households' `total_taxes`, it requires each persons' `income_tax`.
First link the persons list to the households and define their roles.

Persons and households lists in this example are defined in distinct files:

- `data_persons.csv`

    ```text
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

- `data_households.csv`

    ```text
    household_id,rent,accommodation_size
    b,1200,64
    a,700,39
    d,750,31
    e,840,37
    c,1100,68
    ```

where `household_id` is used as a pivot item linking these files contents.

1. Install the required libraries, by running in a console:

    ```sh
    python --version # Python 3.9 or greater should be installed on your computer
    pip install --upgrade pip openfisca_country_template pandas
    ```

2. Load the `country-template` legislation and the content of the CSV files with the [pandas](https://pandas.pydata.org) library:

    ```py
    import pandas
    from openfisca_country_template import CountryTaxBenefitSystem

    tax_benefit_system = CountryTaxBenefitSystem()

    data_persons = pandas.read_csv('./data_persons.csv')
    data_households = pandas.read_csv('./data_households.csv')
    ```

    Access the entity identifiers columns values:

    ```py
    persons_ids = data_persons.person_id
    households_ids = data_households.household_id
    ```

3. Initialise a simulation builder with the `Person` entity. The list of persons identifiers is required as follows:

    ```py
    from openfisca_core.simulation_builder import SimulationBuilder
    import numpy as numpy

    # ...step 2 code...

    sb = SimulationBuilder()
    sb.create_entities(tax_benefit_system)

    persons_ids = data_persons.person_id
    sb.declare_person_entity('person', persons_ids)
    ```

4. Configure the simulation builder with the group entity `Household`. The list of households identifiers and the role of each person member of the households is required:

    ```py
    # ...step 3 code...

    # Instantiate the household entity:
    households_ids = data_households.household_id
    household_instance = sb.declare_entity('household', households_ids)

    # Join households data on persons:
    persons_households = data_persons.household_id
    persons_households_roles = data_persons.person_role_in_household
    sb.join_with_persons(household_instance, persons_households, persons_households_roles)
    ```

5. Create a simulation from the configured builder and set other inputs like the `salary` values:

    ```py
    simulation = sb.build(tax_benefit_system)

    period = '2019-03'
    simulation.set_input('salary', period, data_persons.person_salary)
    ```

This now allows calculation of the [total_taxes](https://legislation.demo.openfisca.org/total_taxes) variable for each household of the `data_households.csv` file over the given period:

```py
total_taxes = simulation.calculate('total_taxes', period)
```

> Note: This example assumes that the calculated variable and its input values share the same period.
