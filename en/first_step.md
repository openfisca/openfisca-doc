# First steps

We offer you here a quick overview of basic use of OpenFisca.  
You will find the script also as a Notebook in the [Tutorials](http://mybinder.org/repo/openfisca/tutorial).  
    You might find it easier to understand after reading the [Keys Concepts](key-concepts.md)
 Section of the doumentation.
### Calculate a variable


Say we want to calculate the [allocation familiales](http://legislation.openfisca.fr/variables/af) of a family with 1 parent (they divorced) and 3 children.


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


#### Print the trace

In Python you can print the trace of a calculation like that:

```python
# [...] Same as above
simulation = scenario.new_simulation(trace=True)
simulation.calculate('irpp', 2014, print_trace=True)
simulation.calculate('irpp', 2014, print_trace=True, max_depth=1)  # Print only one level of depth
simulation.calculate('irpp', 2014, print_trace=True, max_depth=-1)  # -1 means no max depth
simulation.calculate('irpp', 2014, print_trace=True, max_depth=6, show_default_values=False)  # Hide variables with values being default values (0 and False basically)
```
Result:
```
irpp@foyers_fiscaux<2014>[0.0]
|     |     |     |     |---> nb_adult@foyers_fiscaux<2014>[1.0]
|     |     |     |     |---> nb_pac@foyers_fiscaux<2014>[2.0]
|     |     |     |     |---> nbptr@foyers_fiscaux<2014>[2.0]
|     |     |     |     |---> celibataire_ou_divorce@foyers_fiscaux<2014>[True]
|     |     |     |     |---> nbF@foyers_fiscaux<2014>[2.0]
|     |     |     |---> decote@foyers_fiscaux<2014>[1135.0]
|     |     |     |     |---> nb_adult@foyers_fiscaux<2014>[1.0]
|     |     |     |     |---> decote@foyers_fiscaux<2014>[1135.0]
|     |     |     |     |---> nb_pac2@foyers_fiscaux<2014>[2.0]
|     |     |---> nb_pac2@foyers_fiscaux<2014>[2.0]
|     |     |     |---> nbF@foyers_fiscaux<2014>[2.0]
|     |     |     |     |---> enfant_a_charge@individus<2014>[False, True, True]
|     |     |     |     |---> enfant_a_charge@individus<2014>[False, True, True]
|     |     |     |     |---> age@individus<2014>[29, 11, 17]
|     |---> nb_adult@foyers_fiscaux<2014>[1.0]
|     |     |---> celibataire_ou_divorce@foyers_fiscaux<2014>[True]

array([ 0.], dtype=float32)
```
To understand it fully you have to know the variables (check the [Legislation Explorer](http://legislation.openfisca.fr/)) and to have understood the [syntax in Vector](thinking-in-vectors.md).

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
