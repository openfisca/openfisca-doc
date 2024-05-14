# Replicating a situation along axes

Further to the two ways of populating a Simulation object with data:

- either describe a [small population](./run-simulation.md#test-cases) with fine control over input variables and over the relationship between individuals and group entities;
- or provide [inputs in bulk](./run-simulation.md#data), typically using tabular data (CSV, Excel, etc.)

a third possibility also exists. 
Suitable for small-scale situations such as test cases; it is possible to generate a number of "copies" of this situation, in which one or more variables of your choice take on a range of values.

The following example does this by adding an "axes" entry to a test case:

```py
WITH_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'hh1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'hh2': {'parents': ['Javier']}
        },
    'axes': [[{'count':10, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]]
    }

simulation_builder = SimulationBuilder()
simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_AXES)
```

Be careful to note the structure of the "axes" field: an **array of arrays** of axis objects.

This example describes one household with two parents and one child, plus a second household which is in fact a single adult person. 
With this simulation the following code indicates that there will be 40 results:

```py
>>> len(simulation.calculate('salary', '2018-11'))
40
```

The "prototype" situation contains 4 individuals, the axis replicates this situation 10 times which results in a simulation containing 4 times 10 individuals.

What happened with respect to the data? It's easier to represent by "reshaping" the computed data to reflect the structure of 10 groups of 4 individuals:

```py
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(10,4))
array([[   0.     ,    0.     ,    0.     ,    0.     ],
       [ 333.33334,    0.     ,    0.     ,    0.     ],
       [ 666.6667 ,    0.     ,    0.     ,    0.     ],
       [1000.     ,    0.     ,    0.     ,    0.     ],
       [1333.3334 ,    0.     ,    0.     ,    0.     ],
       [1666.6666 ,    0.     ,    0.     ,    0.     ],
       [2000.     ,    0.     ,    0.     ,    0.     ],
       [2333.3333 ,    0.     ,    0.     ,    0.     ],
       [2666.6667 ,    0.     ,    0.     ,    0.     ],
       [3000.     ,    0.     ,    0.     ,    0.     ]], dtype=float32)
```

This shows that for the requested period, the variable `salary` **of the first individual in each group** is varying in increments from 0 to 3000.

## Targeting individuals

The control provided by an axis is fine-grained and targets one individual. To set Javier's salary instead of Ari's, provide the _index_ of Javier in the original situation; since the indices are 0-based, this is 3:

```py
WITH_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[{'count':10, 'index': 3, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]]
    }
```

This leads to the result:

```py
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(10,4))
array([[   0.     ,    0.     ,    0.     ,    0.     ],
       [   0.     ,    0.     ,    0.     ,  333.33334],
       [   0.     ,    0.     ,    0.     ,  666.6667 ],
       [   0.     ,    0.     ,    0.     , 1000.     ],
       [   0.     ,    0.     ,    0.     , 1333.3334 ],
       [   0.     ,    0.     ,    0.     , 1666.6666 ],
       [   0.     ,    0.     ,    0.     , 2000.     ],
       [   0.     ,    0.     ,    0.     , 2333.3333 ],
       [   0.     ,    0.     ,    0.     , 2666.6667 ],
       [   0.     ,    0.     ,    0.     , 3000.     ]], dtype=float32)
```

Axes are particularly for charting how one variable relates to another, as in [this tutorial notebook](https://mybinder.org/v2/gh/openfisca/tutorial/master?filepath=notebooks/how_to_handle_axes.ipynb).

## Adding axes: parallel axes

As noted above, the "axes" are in fact an array of arrays making it possible to implement several parallel **or** perpendicular axes at once.

Sets of axes in the inner array are "parallel". They allow additional variables to be generated in increments. For instance (again take careful note of the position of the square brackets):

```py
WITH_PARALLEL_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[
        {'count':10, 'name':'age', 'min':18, 'max':78, 'period':'2018-11'},
        {'count':10, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}
    ]]
    }
```

The result should be as follows, with both age and salary changing in lockstep:

```py
>>> simulation_builder = SimulationBuilder() 
>>> simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_PARALLEL_AXES)
>>> numpy.reshape(simulation.calculate('age', '2018-11'),(10,4))
array([[18,  0,  0,  0],
       [24,  0,  0,  0],
       [31,  0,  0,  0],
       [38,  0,  0,  0],
       [44,  0,  0,  0],
       [51,  0,  0,  0],
       [58,  0,  0,  0],
       [64,  0,  0,  0],
       [71,  0,  0,  0],
       [78,  0,  0,  0]], dtype=int32)
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(10,4))
array([[   0.     ,    0.     ,    0.     ,    0.     ],
       [ 333.33334,    0.     ,    0.     ,    0.     ],
       [ 666.6667 ,    0.     ,    0.     ,    0.     ],
       [1000.     ,    0.     ,    0.     ,    0.     ],
       [1333.3334 ,    0.     ,    0.     ,    0.     ],
       [1666.6666 ,    0.     ,    0.     ,    0.     ],
       [2000.     ,    0.     ,    0.     ,    0.     ],
       [2333.3333 ,    0.     ,    0.     ,    0.     ],
       [2666.6667 ,    0.     ,    0.     ,    0.     ],
       [3000.     ,    0.     ,    0.     ,    0.     ]], dtype=float32)
```

For this to work, the `count` values of parallel axes must be the same. An error will be raised if they are different.

## Adding axes: perpendicular axes

Sets of axes in the outer array are "perpendicular" resulting in independent variations. For instance:

```py
WITH_PERPENDICULAR_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [
        [{'count':4, 'name':'age', 'min':18, 'max':78, 'period':'2018-11'}],
        [{'count':4, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]
    ]
    }
```

Note the difference in nesting; there is no longer an inner set of two axes, but two sets of one axis each. The result is more complex:

```py
>>> simulation_builder = SimulationBuilder()
>>> simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_PERPENDICULAR_AXES)
>>> len(simulation.calculate('salary', '2018-11'))
64
```

Why? Because `age` and `salary` are varying independently and each axis results in multiplying by 4 the original population of 4. This resultS in 4 times 4 times 4 individuals, equalling 64.

The results are as follows:

```py
>>> numpy.reshape(simulation.calculate('salary', '2018-11'),(16,4))
array([[   0.,    0.,    0.,    0.],
       [   0.,    0.,    0.,    0.],
       [   0.,    0.,    0.,    0.],
       [   0.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [1000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [2000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.],
       [3000.,    0.,    0.,    0.]], dtype=float32)
>>> numpy.reshape(simulation.calculate('age', '2018-11'),(16,4))
array([[18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0],
       [18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0],
       [18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0],
       [18,  0,  0,  0],
       [38,  0,  0,  0],
       [58,  0,  0,  0],
       [78,  0,  0,  0]], dtype=int32)
```

Both the `age` and `salary` variables vary by increments, this means **all combinations are present**. For each `age` increment there exists a variant of each `salary` increment.

This allows OpenFisca to be used for `multivariate observation`: charting how two variables interact to control a third, as in [this example](https://mybinder.org/v2/gh/adrienpacifico/adrienpacifico.github.io/master?filepath=Notebooks/plotly_openfisca_cohabitants.ipynb).
