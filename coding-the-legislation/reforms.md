# Reforms

A [reform](../reforms.md) is a set of modifications to be applied to a tax and benefit system, usually to study the quantitative impact of a possible change of the law.

> See the reference documentation of the class [Reform](https://openfisca.readthedocs.io/en/latest/reforms.html).


## Writing a reform

Let's for instance assume that we want to simulate the effect of a reform that changes the way the `income_tax` is calculated.

We would write such a reform this way:

```py

class income_tax(Variable):
    entity = Household
    label = u'Alternative formula to calculate the income tax, under experimentation'

    def formula(household, period):
        # (...)

class income_tax_reform(Reform):
    name = u'Reform on income tax'

    def apply(self):
        self.update_variable(income_tax)
```

A `Reform` **must** define an `apply()` method that describes all the modifications to be applied to the original tax and benefit system to get the reformed one.

> Note that the reference tax and benefit system won't be modified. The `apply()` function will be applied to a copy of the tax and benefit system.

All the [methods](https://openfisca.readthedocs.io/en/latest/tax-benefit-system.html) used to build a tax and benefit system can also be used to reform it.

A reform that modifies a formula (such as our `income_tax_reform` example) is called a *structural reform*. It redefines the way a variable is calculated.


### Parametric reforms

A reform that apply changes to legislation parameters is called a *parametric reforms*. 

> Note that a reform can be both structural and parametric, modifying and/or adding variables *and* parameters.

To modify the legislation parameters in the reform, you can call the method `self.modify_legislation`, which takes a function as a parameter.

This function defines the modifications you want to apply to the legislation. It takes as a parameter a copy of the reference tax and benefit system parameters: `legislation`. You can then modify and return this `legislation`.

#### Update the value of a parameter

```python
def modify_legislation(legislation):
    legislation.tax_on_salary.scale[1].threshold.update(period=reform_period, value=new_value)
    return legislation


class increase_minimum_wage(Reform):
    name = u'Increase the minimum wage'

    def apply(self):
        self.modify_legislation(modifier_function = modify_legislation)
```

#### Add new parameters

You can add new parameters from a directory containing YAML files, similarly to the [parameters of the original tax benefit system](legislation_parameters.md).

```python
import os
from openfisca_core import legislations

dir_path = os.path.dirname(__file__)

def modify_legislation(legislation):
    file_path = os.path.join(dir_path, 'plf2016.yaml')
    reform_legislation_subtree = legislations.load_file(name='plf2016', file_path=file_path)
    legislation.add_child('plf2016', reform_legislation_subtree)
    return legislation

class some_reform(Reform):
    def apply(self):
        self.modify_legislation(modifier_function = modify_legislation)
```

> Note that you have to know about the data structure of the legislative parameters to modify it.

#### Add new parameters dynamically

In some cases, loading new parameters from YAML files is not practical. Fox example, you may want to add parameters from values computed dynamically. In such cases you can use the internal domain specific language of the [legislations module](http://openfisca.readthedocs.io/en/latest/legislations.html)
:

```python
from openfisca_core.legislations import Node, Parameter, ValueAtInstant

def modify_legislation(legislation):
    reform_legislation_subtree = Node('new_tax', children = {
        'first_tax': Parameter('first_tax', values_list = [
            ValueAtInstant('first_tax', "2015-01-01", value=f(a, b, c)),
            ValueAtInstant('first_tax', "2016-01-01", value=None),
            ]),
        'second_tax': Parameter('second_tax', values_list = [
            ValueAtInstant('second_tax', "2015-01-01", value=g(a, b, c)),
            ValueAtInstant('second_tax', "2016-01-01", value=None),
            ]),
        })
    legislation.add_child('new_tax', reform_legislation_subtree)


class some_reform(Reform):
    def apply(self):
        self.modify_legislation(modifier_function = modify_legislation)
```


## Using a reform in Python

Reforms can be applied in Python with the following syntax:

```py
from openfica_france import CountryTaxBenefitSystem

class income_tax_reform(Reform):
    # (...)

tax_benefit_system = CountryTaxBenefitSystem()

reformed_tax_benefit_system = income_tax_reform(tax_benefit_system)
```

Reforms can be chained:

```py
from openfica_france import CountryTaxBenefitSystem

class income_tax_reform(Reform):
    # (...)

class increase_minimum_wage(Reform):
    # (...)

tax_benefit_system = CountryTaxBenefitSystem()

reformed_tax_benefit_system = income_tax_reform(
    increase_minimum_wage(tax_benefit_system)
    )
```

> The [Getting_Started Notebook](https://github.com/openfisca/openfisca-france/blob/master/notebooks/getting-started.ipynb) contains an example of reform use.

## Using a reform from the Web API

Please read the dedicated documentation:
[OpenFisca-Web-API reforms](../openfisca-web-api/reforms.md)

## Real examples

Examples can be found on the [OpenFisca-France reforms directory](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/reforms).
