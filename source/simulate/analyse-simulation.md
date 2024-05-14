# Analysing or debugging a simulation

To understand how a result was calculated when simulating with the Python API, intermediate variables and parameters have been taken into account.

> To trace a simulation calculation with the web API, please see [/trace endpoint documentation](../openfisca-web-api/trace-simulation.md).

## Activating the simulation tracer

The following example uses the tracer to understand in detail how the `housing_allowance` for a set of households was calculated.

To use the tracer, activate the `trace` option with `simulation.trace = True` _before_ running any calculation with a `simulation` object. This allows inspection of the calculation steps and prints them with `simulation.tracer.print_computation_log()`.

Example:

```py
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

> For more information on the `tracer` methods, see [Tracer class interface](../../openfisca-python-api/tracer)

## Analysing simulation steps

To analyse the output consider the following `TEST_CASE`:

```py
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
        'hh1': {
            'children': ['Leila'], 
            'parents': ['Ari', 'Paul'],
            'rent': {'2011-01': 300}
        },
        'hh2': {'parents': ['Javier']}
    },
}
```

The previous code example would give us this output:

```py
  housing_allowance<2011-01> >> [75.  0.]
    rent<2011-01> >> [300.   0.]
```

The `rent` variable is indented to the right relative to `housing_allowance` indicating that `housing_allowance` variable called the `rent` calculation. It was called on the same period: '2011-01'. The [rent variable](https://legislation.demo.openfisca.org/rent)'s value was an input value given by the `TEST_CASE` and was returned to `housing_allowance`. The [housing_allowance variable](https://legislation.demo.openfisca.org/housing_allowance) used the `rent` value to calculate `housing_allowance` for its two households (`hh1` and `hh2`): `[75.  0.]`

Thus, on the left side of the double chevrons, the trace can be read from top to bottom to see the dependencies between the variables. The right side can be read from bottom to top to see how the simulation result is built.

Likewise, in calculating `housing_allowance` on a large population it is possible to aggregate outputs. To do so, add the `aggregate=True` option as follows:

```py
simulation.tracer.print_computation_log(aggregate=True)
```

If applied to the previous short example, the following would result:

```sh
  housing_allowance<2011-01> >> {'min': 0.0, 'max': 75.0, 'avg': 37.5}
    rent<2011-01> >> {'min': 0.0, 'max': 300.0, 'avg': 150.0}
```

where the minimum, maximum, and average value is given for each computed vector.
