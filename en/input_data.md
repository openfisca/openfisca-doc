# Input Data

  You can use OpenFisca with two kind of input information :
  - either *test case* : you simulate the legislation for one standard *entity*
  - or *data* : you give a whole population (survey with aggregated data for example) on which you want to apply the legislation. 

### Scenario

The interface between input information and *input variables* that OpenFisca can handle is called *Scenario*.

> Technically speaking, OpenFisca is using vector computing for performance reasons via the [NumPy](http://www.numpy.org/) Python package

Whatever the input is, *test case* or *data*, the scenario converts it into vectors internally.

###### Application : how to create a scenario

After initializing the [Tax and Benefit System](tax_and_benefit_system.md), you now want to create a *scenario* that will allow you in a second step to give input information.

```python
# Create a scenario
scenario = tax_benefit_system.new_scenario()

```

### Test cases 

Test case describes persons and entities with their input variables.

You may add information at individual level or at entity level.
One input is crucial and shouldn't be forgotten : the period of the simulation.

###### Application : how to intialize a scenario
Test cases can be expressed in Python or in JSON when using the Web API (see specific sections of the documentation).

In Python you have to use the `init_single_entity` function based on the *scenario*.

We show here the Python expression for a family constituted by :
- two parents (as attributes : her `age` or her `date_naissance` and her `salaire_de_base`),
- two children (as attribute : their `age`),
- a house (as attributes : the `loyer` and the `statut_occupation_logement`)

```python

scenario.init_single_entity(
    period = 2015,
    parent1 = dict(
        age = 30,
        salaire_de_base = 15000,
        ),
    parent2 = dict(
        date_naissance = date(1980, 1, 1),
        salaire_de_base = 70000,
        ),
    enfants = [
        dict(age = 12),
        dict(age = 18),
        ],
    menage = dict(
            loyer = 1000,
            statut_occupation_logement = u'Locataire ou sous-locataire d'un logement loué vide non-HLM',
            ),
    )
    
```

Notice that some input variables are associated to *individus* ("parent1" , "parent2" and "children") whereas other are related to *entity* ("menage").





### Data
Using data as input is not documented yet. Please consult this repository:
https://github.com/openfisca/openfisca-france-data