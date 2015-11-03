# Extensions

This section explains how to write an extension in Python.

> If you're looking how to use an existing extension with OpenFisca Web API, please read
> [OpenFisca-Web-API extensions](../openfisca-web-api/extensions)

See the [key concepts](../key-concepts.md#extensions) section to know what is an extension.

## How to write an extension?

[OpenFisca-Core](https://github.com/openfisca/openfisca-core) provides a `TaxBenefitSystem` class to represent a tax and benefit system. It provides too a `Reform` class which inherits `TaxBenefitSystem`.

To write a reform which will work with [OpenFisca-Web-API](https://github.com/openfisca/openfisca-web-api),
you have to implement a `build_reform` function which returns an instance of the `Reform` class.

The `reforms.make_reform` function does the job.

Here is how to do a reform which does nothing, for the purpose of the example:

```python
def build_reform(tax_benefit_system):
    Reform = reforms.make_reform(
        key = 'empty',
        name = u'Dummy empty reform',
        reference = tax_benefit_system,
        )
    reform = Reform()
    return reform
```

> `reforms.make_reform` returns a `Reform` class that you can instantiate in `build_reform`.
> You can modify this instance if needed, then return it.

The `Reform` class provides a decorator to declare formulas (`@Reform.formula`) and another one to declare input variables (`@Reform.input_variable`).

The reference `tax_benefit_system` won't be touched.

Here is an example:

```python
def build_reform(tax_benefit_system):
    Reform = reforms.make_reform(
        key = 'change_formula',
        name = u'Dummy reform with changed formula',
        reference = tax_benefit_system,
        )

    @Reform.formula
    class charges_deduc(formulas.SimpleFormulaColumn):
        label = u"Charge déductibles always returning 999"
        reference = charges_deductibles.charges_deduc
        def function(self, simulation, period):
            return period, self.zeros() + 999

    reform = Reform()
    return reform
```

To change the JSON data structure of the legislation in the reform, you call the `reform.modify_legislation_json` method which takes as a parameter a callback.
This callback is a function you write in which the legislation JSON will be modified.
It takes in parameter a copy of the legislation_json of the reference tax and benefit system that you can modify (do not make the copy yourself) and return.

Here is an example:

```python
def modify_legislation_json(reference_legislation_json_copy):
    reference_legislation_json_copy['children']['xxx']['values'][0]['value'] = 0
    return reference_legislation_json_copy


def build_reform(tax_benefit_system):
    Reform = reforms.make_reform(
        key = 'new_legislation',
        name = u'Dummy reform with new legislation',
        reference = tax_benefit_system,
        )

    reform = Reform()
    reform.modify_legislation_json(modifier_function = modify_legislation_json)
    return reform
```

> You have to know about the structure of the legislation JSON data structure to modify it.

For more details see the examples linked in the tl;dr section above.

## Use from the Web API

Please read the dedicated documentation:
[OpenFisca-Web-API reforms](https://github.com/openfisca/openfisca-web-api/tree/next/docs/reforms.md)

## Real examples

Examples can be found [here](http://www.openfisca.fr/extensions).
