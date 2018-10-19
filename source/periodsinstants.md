# Periods, Instants

Most of the values calculated in OpenFisca, such as an _income tax_, or a _housing allowance_, can change over time.  

In [simulations](simulation.md), parameters and variables, OpenFisca handles time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.

_Example: the 15th June 2015._

- *Period*: a succession of days.

_Example: a month ("July 2015"), a year ("2015"), several months ("July and August 2015") or the eternity._


The smallest unit for OpenFisca periods is the **month**. Therefore:

- All periods are presumed to start on the first day of their first month.
- A period cannot be smaller than a month.

The largest unit for OpenFisca periods is the **eternity**, which is used for variables that are constant over time, e.g. a date of birth.

[Read more about the periods implementation in OpenFisca](coding-the-legislation/35_periods.md)
