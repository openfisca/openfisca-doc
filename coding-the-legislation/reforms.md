# Reforms

A [reform](../reforms.md) is a set of modifications to be applied to a tax and benefit system, usually to study the quantitative impact of a possible change of the law.

## Writing a reform

Let's for instance assume that we want to simulate the effect of a reform that changes the way the `income_tax` is calculated.

We would write such a reform this way:

```py

class income_tax(Variable):
    entity = Household
    label = u'Alternative formula to calculate the income tax, under experimentation'

    def function(household, period):
        # (...)

class income_tax_reform(Reform):
    name = u'Reform on income tax'

    def apply(self):
        self.update_variable(income_tax)
```

A `Reform` **must** define an `apply` method that describes all the modifications to be applied to the original tax and benefit system to get the reformed one.

> Note that the reference tax and benefit system won't be modified. The `apply` function will be applied to a copy of the tax and benefit system.

All the [methods](https://openfisca.readthedocs.io/en/latest/tax-benefit-system.html) used to build a tax and benefit system can also be used to reform it.

A reform that modifies a formula (such as our `income_tax_reform` example) is called a *structural reform*. It redefines the way a variable is calculated.


### Parametric reforms

Unlike *structural reforms*, *parametric reforms* do not directly modify any formula: they apply changes to legislation parameters only.

To modify the legislation parameters in the reform, you can call the method `self.modify_legislation_json`, which takes a function as a parameter.

This function defines the modifications you want to apply to the legislation. It takes as a parameter a copy of the reference tax and benefit system `legislation_json`. You can then modify and return this `legislation_json`.

For instance:

```python
def modify_legislation_json(reference_legislation_json_copy):
    reference_legislation_json_copy['children']['minimum_wage']['values'][0]['value'] = 15
    return reference_legislation_json_copy


class increase_minimum_wage(Reform):
    name = u'Increase the minimum wage'

    def apply(self):
        self.modify_legislation_json(modifier_function = modify_legislation_json)
```

> Note that you have to know about the data structure of the legislation JSON to modify it.

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

Examples can be found on the [community page](../../community.md), as well as on the [OpenFisca-France reforms directory](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/reforms).
