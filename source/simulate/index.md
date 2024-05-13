# <i icon-name="cog"></i> Running a simulation

```{toctree}
:hidden:

run-simulation
replicate-simulation-inputs
analyse-simulation
profile-simulation
```

To calculate Tax and Benefit System variables relating to people's situations, you need to create and run a _Simulation_.

OpenFisca will work the same if there is one person, seven, or seven million in the modelled situation.

> Technically speaking, OpenFisca uses [vector computing](../coding-the-legislation/25_vectorial_computing.md) via the [NumPy](http://www.numpy.org/) package. In simple terms this allows it to process large datasets in one go instead of sequentially processing one line of data at a time.

This allows for a wide range of use cases, from calculating a single entitlement for a person utilising a web service, to modelling population wide simulations and reforms for policy and research purposes.
In this section the focus is on simulations and the two approaches that can be taken. They are

- [test cases](./run-simulation.md#test-cases): that utilise small structured data for input,
- [bulk data](./run-simulation.md#data): in the form of aggregated data, CSV files, etc.

It's also possible to extend _Simulations_ by defining an axis which is covered in detail in the section [Replication a situation along axes](./replicate-simulation-inputs.md).

When running Simulations it is also possible to activate the [`trace` feature](./analyse-simulation.md) which provides a way to analyse how the simulation achieved its results. Similarly there are options to trouble-shoot [Simulation performance](./profile-simulation.md).
