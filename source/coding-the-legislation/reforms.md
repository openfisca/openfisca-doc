# Reforms

A [reform](../key-concepts/reforms.md) is a set of modifications to be applied to a tax and benefit system, usually to study the quantitative impact of a possible change of the law.

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

A reform that apply changes to legislation parameters is called a *parametric reform*.

> Note that a reform can be both structural and parametric, modifying and/or adding variables *and* parameters. In that case, it is common practice to call it a structural reform anyway, the structural part outweighting the parametric one.


To modify the legislation parameters in the reform, you can call the method `self.modify_parameters`, which takes a function as a parameter.

This function performs the modifications you want to apply to the legislation. It takes as a parameter a copy of the reference tax and benefit system parameters: `parameters`. You can then modify and return `parameters`.

The reform is applied for a certain fixed period. To define the period for which you want to apply the reform, it's necessary to import `periods` from `openfisca_core`.

#### Update the value of a parameter

```python
from openfisca_core import periods

def modify_parameters(parameters):
    reform_period = periods.period("2015")
    parameters.tax_on_salary.brackets[1].threshold.update(period = reform_period, value = 4000)
    return parameters


class increase_minimum_wage(Reform):
    name = u'Increase the minimum wage'

    def apply(self):
        self.modify_parameters(modifier_function = modify_parameters)
```

#### Add new parameters

You can load new parameters from a directory containing YAML files and add them to the reference parameters.

```python
import os
from openfisca_core.parameters import load_parameter_file

dir_path = os.path.dirname(__file__)

def modify_parameters(parameters):
    file_path = os.path.join(dir_path, 'plf2016.yaml')
    reform_parameters_subtree = load_parameter_file(file_path, name='plf2016')
    parameters.add_child('plf2016', reform_parameters_subtree)
    return parameters

class some_reform(Reform):
    def apply(self):
        self.modify_parameters(modifier_function = modify_parameters)
```

#### Add new parameters dynamically

In some cases, loading new parameters from YAML files is not practical. For example, you may want to add parameters from values computed dynamically. In such cases you can use the python objects defined in the [parameters module](http://openfisca.readthedocs.io/en/latest/parameters.html)
:

```python
from openfisca_core.parameters import ParameterNode

def modify_parameters(parameters):
    reform_parameters_subtree = ParameterNode('new_tax', validated_yaml = {
        'decote_seuil_celib': {
            'values': {
                "2015-01-01": {'value': f(a, b, c)},
                "2016-01-01": {'value': None}
                }
            },
        'decote_seuil_couple': {
            'values': {
                "2015-01-01": {'value': g(a, b, c)},
                "2016-01-01": {'value': None}
                }
            },
        })

    parameters.add_child('new_tax', reform_parameters_subtree)


class some_reform(Reform):
    def apply(self):
        self.modify_parameters(modifier_function = modify_parameters)
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

> The [Getting_Started Notebook](https://github.com/openfisca/tutorial/blob/master/notebooks/getting_started.ipynb) contains an example of reform use.

## Real examples

Examples can be found on the [OpenFisca-France reforms directory](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/reforms).
