# First steps

We offer you here a quick overview of basic use of OpenFisca.  
You will find the script also as a Notebook in the [Tutorials](http://mybinder.org/repo/openfisca/tutorial).  
    You might find it easier to understand after reading the [Keys Concepts](key-concepts.md)
 Section of the doumentation.
### Calculate a variable


Say we want to calculate the [allocation familiales](https://legislation.openfisca.fr/variables/af) of a family with 1 parent (they divorced) and 3 children.


```python
import openfisca_france

tax_benefit_system = openfisca_france.FranceTaxBenefitSystem()

scenario = tax_benefit_system.new_scenario()
scenario.init_single_entity(
    period = '2015',
    parent1 = dict(
        age = 30,
        salaire_de_base = 20000,
  # you can add as many describing variables as you want
        ),
    enfants = [
  # each dictionnary corresponds to a child
        dict(age = 12
        #, variable2 = '...'
        ),
        dict(age = 18),
        ],
    )

simulation = scenario.new_simulation()
af = simulation.calculate('af', '2015-01')
print af
```

Result:

```
[ 129.99000549]
```

The result is a vector of size 1, the number of `families` in our test case.

On the line `af = simulation.calculate('af', '2015-01')`, `'2015-01'` corresponds to a period (january 2015).


### Test the impact of a reform

OpenFisca can be used to test the impact of a reform. For the purpose of this tutorial we will work on a test case,
but it's possible to work on population data like surveys.
Let's use a reform which has already been coded: the .
A dedicated section of the documentation explains how to code a reform.

```python
import openfisca_france
from openfisca_france.reforms import plfr2014

tax_benefit_system = openfisca_france.init_tax_benefit_system()
reformed_tax_benefit_system = plfr2014.build_reform(tax_benefit_system)

scenario = reformed_tax_benefit_system.new_scenario()
scenario.init_single_entity(
    period = 2013,
    parent1 = dict(
        age = 40,
        salaire_imposable = 13795,
        ),
    )

simulation = scenario.new_simulation(reference = True)
impo = simulation.calculate('impo', '2013')
print impo

reform_simulation = scenario.new_simulation()
reform_impo = reform_simulation.calculate('impo', '2013')
print reform_impo
```

Result:

```
[-74.39001465]
[ 0.]
```

The result is a vector of size 1, the number of `foyers_fiscaux` in our test case.
