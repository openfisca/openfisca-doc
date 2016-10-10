# Simulation, Computation

#### Simulation : the framework of computation
A *Simulation* is basically the OpenFisca frame for calculating taxes or benefits.

To calculate any variable you need to create a *Simulation* from the *TaxBenefitSystem* that is to say the framework where you will compute your result.

> Technically speaking it is the cache of previously computed results.

It's possible to run many independent simulations using the same `TaxBenefitSystem`.

###### Application : how to calculate variable

As soon as you've loaded the TaxBenefitSystem of a country and a Scenario, you may now create a simulation.

```python
# Create a simulation from a scenario
simulation = scenario.new_simulation()
```

> You can use this function with one interesting function : ```trace =True```

#### Computing variables

Now all the settings are given to run computation of taxes or benefits.

```python
# Calcul of the 'impot sur le revenu des personnes physiques'
impot = simulation.calculate('irpp')
```

As a result you will have an array with the 'impot' for each person of your test case.
