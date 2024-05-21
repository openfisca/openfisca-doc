# Simulation, Computation

## Definition

A _Simulation_ is basically the OpenFisca frame for calculating taxes or benefits.

To calculate any variable, create a _Simulation_ from the _TaxBenefitSystem_ and add input data.

> Technically speaking it is the cache of input data and previously computed results.

It's possible to run many independent simulations using the same `TaxBenefitSystem`.

## Computing variables

To compute taxes and benefits, define whom it will focus on and what is already know about those persons or groups of persons. This is what decides the input data for a _Simulation_.

Once this is all established a simulation can be run to computate the results.

> For further information: see how to run a simulation in [this section](../simulate/run-simulation.md) and the following [tutorial](http://mybinder.org:/repo/openfisca/tutorial) "How to handle periods"

### Application: how to calculate a variable

```py
# Calculation of 'personal income tax' with openfisca-france
tax = simulation.calculate('impot_revenu_restant_a_payer', '2015')
# Calculation of 'family allowances' with openfisca-france
family_allowances = simulation.calculate('af', '2015-01')
```

 > HINT: Don't forget to give the period.

 The output is an array:

- positive means it's an amount the _entity_ receives from the state.
- negative means it's an amount the _entity_ has to pay to the state.

[Read more about how to run a simulation](../simulate/run-simulation.md).
