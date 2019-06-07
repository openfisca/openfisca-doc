# <i class="fas fa-chart-pie"></i> Running a simulation

```eval_rst
.. toctree::
   :hidden:

   run-simulation
   analyse-simulation
   replicate-simulation-inputs
```

To calculate Tax and Benefit System variables on people's situations, you need to create and run a new *Simulation*.

OpenFisca will work the same if there is one person, seven, or seven million in the modeled situation. 

> Technically speaking, OpenFisca uses [vector computing](../coding-the-legislation/25_vectorial_computing.md) via the [NumPy](http://www.numpy.org/) package for performance reasons.

Nevertheless, you won't have the same experience defining those various situations sizes and linking them to your simulation. So, multiple options could be used to describe this information:

- either [test cases](./run-simulation.md#test-cases): you simulate the legislation for a small number of persons,
- or [bulk data](./run-simulation.md#data): you provide a population (survey with aggregated data, CSV files with bulk data, etc.) on which you want to apply the legislation.

Then, when you have a defined situation and need to replicate an input in a range of values (e.g. a `salary` in [0, 100 000]), you can define an axis as described in [the axes section](./replicate-simulation-inputs.md).

Finally, you might want to understand how your simulation result was calculated. To do so, you can use the `trace` feature described in [this section](./analyse-simulation.md).
