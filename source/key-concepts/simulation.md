# Simulation, Computation

#### Simulation: the framework of computation
A *Simulation* is basically the OpenFisca frame for calculating taxes or benefits.

To calculate any variable you need to create a *Simulation* from the *TaxBenefitSystem* that is to say the framework where you will compute your result.

> Technically speaking it is the cache of input data and previously computed results.

It's possible to run many independent simulations using the same `TaxBenefitSystem`.

###### Application: how to launch a simulation

As soon as you've loaded the TaxBenefitSystem of a country and a Scenario, you may now create a simulation.

```python
# Create a simulation from a scenario
simulation = scenario.new_simulation()
```


#### Computing variables

Now all the settings are given to run computation of taxes or benefits.

WARNING: Be aware of the period over which you want to have your result. Some measures are calculated on a monthly basis other an annual one.

> For further information: see the [tutorial](http://mybinder.org:/repo/openfisca/tutorial) "How to handle periods"

###### Application: how to calculate a variable

```python
# Calcul of the 'impot sur le revenu des personnes physiques'
impot = simulation.calculate('irpp', '2015')
allocations_familiales = simulation.calculate('af', '2015-01')
```

 > HINT: Don't forget to give the period.

 The output is an array:
 - positive if it is an amount the *entity* receives from the state.
 - negative if it is an amount the *entity* has to pay.

