# Analysing or debugging a simulation

When running a simulation with the Python API, you might want to understand how the result was calculated and what intermediate variables and parameters have been taken into account.

> To trace a simulation calculation with the Web API, please see [/trace endpoint documentation](../openfisca-web-api/trace-simulation.md).


## Activating the simulation tracer

Let's suppose you ran a simulation, calculated the `housing_allowance` for a set of households, and would like to understand in details where the final results come from. 

To use the tracer, you should activate the `trace` option with `simulation.trace = True` _before_ running any calculation with a `simulation` object. This will allow you to inspect calculation steps and print them with `simulation.tracer.print_computation_log()`.

Here is an example:

```python
# -*- coding: utf-8 -*-

from openfisca_core.simulation_builder import SimulationBuilder
from openfisca_country_template import CountryTaxBenefitSystem


TEST_CASE = {
    # ... whole test case (see example in next section)...
}

tax_benefit_system = CountryTaxBenefitSystem()
simulation_builder = SimulationBuilder()
simulation = simulation_builder.build_from_entities(tax_benefit_system, TEST_CASE)

# activate the trace
simulation.trace = True

# calculate a variable
housing_allowance = simulation.calculate('housing_allowance', '2011-01')

# print calculation steps
simulation.tracer.print_computation_log()
```

> For more information on the `tracer` methods, see this [Tracer class interface](../../openfisca-python-api/tracer.html)

## Analysing simulation steps

If we use the tracer with the following `TEST_CASE`:

```python
TEST_CASE = {
    'persons': {
        'Ari': {
            'salary': {'2011-01': 1000}
        }, 
        'Paul': {}, 
        'Leila': {}, 
        'Javier': {}
    },
    'households': {
        'h1': {
            'children': ['Leila'], 
            'parents': ['Ari', 'Paul'],
            'rent': {'2011-01': 300}
        },
        'h2': {'parents': ['Javier']}
    },
}
```

The previous code example would give us this output:

```py
  housing_allowance<2011-01> >> [75.  0.]
    rent<2011-01> >> [300.   0.]
```

The `rent` variable is indented to the right relative to `housing_allowance`. This says that `housing_allowance` variable called the `rent` calculation. It was called on the same period, '2011-01'. As the [rent variable](https://demo.openfisca.org/legislation/rent)'s value was an input value given by our `TEST_CASE`, it was returned to `housing_allowance`. Then, as the [housing_allowance variable](https://demo.openfisca.org/legislation/housing_allowance) has a valid formula on '2011-01', it used the `rent` value to calculate its amount for its two households (`h1` and `h2`): `[75.  0.]`

Thus, on the left side of the double chevrons, you can read the trace from top to bottom to see the dependencies between the variables. And, on the right side, you can read it from bottom to top to see how the simulation result is built.

Likewise if you are calculating this `housing_allowance` on a large population, you will be able to check your calculation results with aggregated outputs. To do so, you can add the `aggregate=True` option as follows:

```
simulation.tracer.print_computation_log(aggregate=True)
```

If we apply it to our previous short example, it would give us this output:

```sh
  housing_allowance<2011-01> >> {'min': 0.0, 'max': 75.0, 'avg': 37.5}
    rent<2011-01> >> {'min': 0.0, 'max': 300.0, 'avg': 150.0}
```

where the minimum, maximum, and average value is given for each computed vector.
