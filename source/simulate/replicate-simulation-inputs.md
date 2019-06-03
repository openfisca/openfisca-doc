## Replicating a situation along axes

So far we've seen two ways of populating a Simulation object with data:
- either describe a [small population](./run-simulation.md#test-cases) with fine control over input variables and over the relationship between individuals and group entities;
- or provide [inputs in bulk](./run-simulation.md#data), typically using tabular data (CSV, Excel, etc.)

A third possibility exists: you can set up a small-scale situation, as in test cases; and use it to generate a number of "copies" of this situation, in which one or more variables of your choice take on a range of values.

We do this by adding an "axes" entry to a test case:

```python
WITH_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[{'count':10, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]]
    }

simulation_builder = SimulationBuilder()
simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_AXES)
```

Be careful to note the structure of the "axes" field: an **array of arrays** of axis objects. We will come back to this, but for now let's investigate the effects of adding this single axis.

As before, `BASIC_TEST_CASE` describes one household with two parents and one child, and a second household which is in fact a single adult person. However, the specification of an axis results in something quite different now:

```python
>>> len(simulation.calculate('salary', '2018-11'))
40
```

We started with a "prototype" situation containing 4 individuals, and we specified an axis which replicates this situation 10 times. And so, as expected, we end up with a simulation containing 4 times 10 individuals. 

What happened with respect to the data? It's easier to represent if we first "reshape" the computed data to reflect this structure of 10 groups of 4 individuals:

```python
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

We can see that, for the requested period, the variable `salary` **of the first individual in each group** is varying in increments from 0 to 3000.

### Targeting individuals

The control provided by an axis is fine-grained and targets one individual. If you wanted to set Javier's salary instead of Ari's, you could do so by providing the *index* of Javier in the original situation; since our indices are 0-based, this is 3:

```python
WITH_AXES = {
    'persons': {'Ari': {}, 'Paul': {}, 'Leila': {}, 'Javier': {}},
    'households': {
        'h1': {'children': ['Leila'], 'parents': ['Ari', 'Paul']},
        'h2': {'parents': ['Javier']}
        },
    'axes': [[{'count':10, 'index': 3, 'name':'salary', 'min':0, 'max':3000, 'period':'2018-11'}]]
    }
```

And the result is now:

```python
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

Axes are particularly interesting when you want to chart how one variable relates to another, as in [this tutorial notebook](https://mybinder.org/v2/gh/openfisca/tutorial/master?filepath=notebooks/how_to_handle_axes.ipynb).

### Adding axes: parallel axes

We noted above that the "axes" are in fact an array of arrays, which allows us to use several axes at once : parallel **or** perpendicular axes.

Sets of axes in the inner array are "parallel". They allow additional variables to be generated in increments. For instance (again take careful note of the position of the square brackets):

```python
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

```python
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

### Adding axes: perpendicular axes

Sets of axes in the outer array are "perpendicular", that is, they result in independent variation. For instance, we might have:

```python
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

Note the difference in nesting: we no longer have an inner set of two axes, but two sets of one axis each. The result is more complex:

```python
>>> simulation_builder = SimulationBuilder()
>>> simulation = simulation_builder.build_from_entities(tax_benefit_system, WITH_PERPENDICULAR_AXES)
>>> len(simulation.calculate('salary', '2018-11'))
64
```

Why? Because we are varying `age` and `salary` independently, and each axis results in multiplying by 4 our original population of 4, resulting in 4 times 4 times 4 individuals, which is indeed 64.

What does the data look like?

```python
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

We can see that both the `age` and the `salary` variables vary by increments, so that **all combinations are present**: for each `age` increment, there exists a variant with each `salary` increment.

This allows us to use OpenFisca for `multivariate observation`: charting how two variables interact to control a third, as in [this example](https://mybinder.org/v2/gh/adrienpacifico/adrienpacifico.github.io/master?filepath=Notebooks/plotly_openfisca_cohabitants.ipynb).
