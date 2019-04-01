# Run a simulation

```eval_rst
.. toctree::
   :hidden:

   run-simulation
   analyse-simulation
```

When you have an OpenFisca tax and benefits system and you want to calculate some legislation variables on people situations, you need to create and run a new *Simulation*.

OpenFisca will work the same if there is one person or seven or seven million in the modelled situation. 

> Technically speaking, OpenFisca is using [vector computing](../coding-the-legislation/25_vectorial_computing.md) for performance reasons via the [NumPy](http://www.numpy.org/) Python package.

Nevertheless, you won't have the same experience defining those various situations sizes and linking them to your simulation. So, multiple options could be used to describe this information:

- either [test cases](simulate/run-simulation.md#test-cases): you simulate the legislation for small number of situations
- or [data](simulate/run-simulation.md#data): you provide a population (survey with aggregated data, CSV files with bulk data, etc.) on which you want to apply the legislation.

Then, you might want to understand how your simulation result was calculated. To follow its steps, you can use the `trace` functions as described in [this section](simulate/analyse-simulation.md).
