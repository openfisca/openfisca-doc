# Input Data

  You can use OpenFisca with two kind of input information:
  - either *test case*: you simulate the legislation for one standard situation
  - or *data*: you give a whole population (survey with aggregated data or csv files for example) on which you want to apply the legislation.

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
---

### Test cases

Test case describes persons and entities with their input variables or attributes.

You may add information at *individual* level or at *entity* level.
One input is crucial and shouldn't be forgotten: the *period* of the simulation.

###### Application: how to initialize a scenario

Test cases can be expressed in Python or in JSON when using the Web API (see the [specific section](../openfisca-web-api/input-output-data.md) of the documentation).

In Python you have to use the `init_single_entity` function based on the *scenario*. To give to every person of your *test case* attributes, you have to use the Python dictionnary object.

We show here the Python expression for a family constituted by:
- two parents (with attributes: her `age` or her `date_naissance` and her `salaire_de_base`),
- two children (with attribute: their `age`),
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

HINT: For categorical variable you may use either the modality or its number.
Example with the [statut d'occupation du logement](https://fr.openfisca.org/legislation/statut_occupation_logement):
 ``` python
 # Declaration of categorical variable
 menage = dict(loyer = 12000,
            statut_occupation_logement = 4,
            )

```
---

### Data

OpenFisca input data can contain multiple situations: from more than one situation to a whole population. This data could come from a survey with aggregated data or data files extracted, for example, from a database.

#### CSV data

To apply the legislation on data described in CSV file(s), you can use OpenFisca Python API.

Let's say you have the following `data.csv` and you want to calculate the [income_tax](https://demo.openfisca.org/legislation/income_tax) for all persons:

```csv
person_id,salary,age
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

1. Load the legislation and `data.csv` content with [pandas](https://pandas.pydata.org) library:

```python
from openfisca_country_template import CountryTaxBenefitSystem
import pandas as pds

tax_benefit_system = CountryTaxBenefitSystem()
data = pds.read_csv('./data.csv')  # pandas.DataFrame object
n = len(data)  # without csv header
```
