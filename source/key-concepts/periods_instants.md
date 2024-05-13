# Periods, Instants

Most of the values calculated in OpenFisca, such as an **income tax**, or **housing allowance**, can change over time.

In [simulations](simulation.md), parameters and variables, OpenFisca handles time via _periods_ and _instants_.

In OpenFisca context, a period consists of:

- a starting instant (the atomic unit is a day, so instants are day dates),
- a unit (day, weekday, week, month or year),
- a quantity of that unit.

Let's look at some examples:

- here is an instant: the 15th June 2015
- and here are some periods: `July 2015` is a month starting on its 1st day, `2015` is a year starting on its 1st day,
- we can also define a period of several months, `July and August 2015`, or a period overlapping different months, `one month starting on the 15th of July`,
- and we can also define a period of weeks like the `first 6 weeks of 2015`.

The smallest unit for OpenFisca periods is the **day**.

The largest OpenFisca period is the **eternity**, which is used for variables that are constant over time, e.g. a date of birth.

[Read more about periods implementation in OpenFisca](../coding-the-legislation/35_periods.md).
