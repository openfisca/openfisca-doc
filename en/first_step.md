# First steps


## Calculate a variable


Say we want to calculate the [allocation familiales](http://legislation.openfisca.fr/variables/af) of a family with 1 parent (they divorced) and 3 children.

Here is the script available in the
 [getting started Jupyter Notebook]:

```python
import openfisca_france

tax_benefit_system = openfisca_france.FranceTaxBenefitSystem()

scenario = tax_benefit_system.new_scenario()
scenario.init_single_entity(
    period = '?',
    parent1 = dict(
        variable1 = '?',
        variable2 = '?',
        ),
    enfants = [
        dict(age = 10),
        dict(age = 12),
        dict(age = 18),
        ],
    )

simulation = scenario.new_simulation()
af = simulation.calculate('af', '2015-01')
print af
```

Result:

```
[ 361.52359009]
```

The result is a vector of size 1, the number of `families` in our test case.

On the line `af = simulation.calculate('af', '2015-01')`, `'2015-01'` corresponds to a period (january 2015).

> OpenFisca uses periods intensively so it defines string shortcuts to express them.

#### Print the trace

In Python you can print the trace of a calculation like that:

```python
# [...] Same as above
simulation = scenario.new_simulation(trace=True)
simulation.calculate('irpp', 2014, print_trace=True)
simulation.calculate('irpp', 2014, print_trace=True, max_depth=1)  # Print only one level of depth
simulation.calculate('irpp', 2014, print_trace=True, max_depth=-1)  # -1 means no max depth
simulation.calculate('irpp', 2014, print_trace=True, max_depth=-1, show_default_values=False)  # Hide variables with values being default values (0 and False basically)
```

## Test the impact of a reform

OpenFisca can be used to test the impact of a reform. For the purpose of this tutorial we will work on a test case,
but it's possible to work on population data like surveys.

Let's use a reform which has already been coded: the .
A dedicated section of the documentation explains how to code a reform.

Here is the script `test2.py` available
[here](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/scripts/getting_started/test2.py)
or in the [getting started Jupyter Notebook]:

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

[getting started Jupyter Notebook]: http://mybinder.org/repo/openfisca/tutorial
