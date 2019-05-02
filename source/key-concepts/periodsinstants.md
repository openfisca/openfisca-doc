# Periods, Instants

Most of the values calculated in OpenFisca, such as an _income tax_, or a _housing allowance_, can change over time.

In [simulations](simulation.md), parameters and variables, OpenFisca handles time via *periods* and *instants*.

In OpenFisca context, a period consists of:
- a starting instant (the atomic unit is a day, so instants are day dates),
- a unit (day, month or year),
- a quantity of that unit.

Let's look at some examples:
* here is an instant: the 15th June 2015,
* and here are some periods: `July 2015` is a month starting on its 1st day, `2015` is a year starting on its 1st day, 
* we can also define a period of several months, `July and August 2015`, or a period overlapping different months, `one month starting on the 15th of July`.

The smallest unit for OpenFisca periods is the **day**.

The largest OpenFisca period is the **eternity**, which is used for variables that are constant over time, e.g. a date of birth.

[Read more about the periods implementation in OpenFisca](../coding-the-legislation/35_periods.md).
