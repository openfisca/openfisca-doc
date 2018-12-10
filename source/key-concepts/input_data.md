# Input Data

You can use OpenFisca with two kinds of input information:

- either *test cases*: you simulate the legislation for one standard situation
- or *data*: you provide a population (survey with aggregated data, CSV files with bulk data, etc.) on which you want to apply the legislation

### Scenario

The interface between input information and *input variables* that OpenFisca can handle is called *Scenario*.

> Technically speaking, OpenFisca is using [vector computing](../coding-the-legislation/25_vectorial_computing.md) for performance reasons via the [NumPy](http://www.numpy.org/) Python package

Whatever the input is, *test case* or *data*, the scenario converts it into vectors internally.

###### Application: how to create a scenario

After initializing the [Tax and Benefit System](tax_and_benefit_system.md), you now want to create a *scenario* that will allow you in a second step to give input information.

```python
# Create a scenario
scenario = tax_benefit_system.new_scenario()

```

### Test cases

A test case describes persons and entities with their input variables or attributes.

You may add information at the *individual* level or at the *entity* level. One input is crucial and shouldn't be forgotten: the *period* of the simulation.

###### Application: how to initialize a scenario

Test cases can be expressed in Python, or in JSON when using the Web API (see the [specific section](../openfisca-web-api/input-output-data.md) of the documentation).

In Python, you have to use the `init_single_entity` function based on the *scenario*. To give to every person of your *test case* attributes, you have to use the Python dictionary object.

We show here the Python expression for a family constituted by:

- two parents (with attributes: her `age` or her `date_naissance` and her `salaire_de_base`)
- two children (with attribute: their `age`)
- a house (with attributes: the `loyer` and the `statut_occupation_logement`)

```python
# Initialize test case
scenario.init_single_entity(
    period = 2015,
# Variable describing the individuals
    parent1 = dict(
        age = 30,
        salaire_de_base = 15000, # Annual basis
        ),
    parent2 = dict(
        date_naissance = date(1980, 1, 1),
        salaire_de_base = 70000, # Annual basis
        ),
     enfants = [
        dict(age = 12),
        dict(age = 18),
        ],
 # Variable describing the entity
    menage = dict(loyer = 12000, # Annual basis
            statut_occupation_logement = u"Locataire ou sous-locataire
                                      d'un logement loué vide non-HLM",
            ),
    )
   ```

Notice that some input variables are associated to *individus* ("parent1" , "parent2" and "children") whereas other are related to *entity* ("menage").

> **WARNING**: Declare the *input variables* on an annual basis.

HINT: For categorical variables you may use either the modality or its number.
Example with the [statut d'occupation du logement](https://fr.openfisca.org/legislation/statut_occupation_logement):
 ``` python
 # Declaration of categorical variable
 menage = dict(loyer = 12000,
            statut_occupation_logement = 4,
            )

```

### Data

OpenFisca input data can vary from one situation to a whole population. This data could come from a survey with aggregated data, data files extracted from a database, etc.

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
