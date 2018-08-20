# Periods, Instants

Most of the quantities calculated in OpenFisca, such as `income tax`, and `housing allowance`, can change over time. OpenFisca manipulates time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.

_Example: the 15th June 2015._

- *Period*: a succession of days.

_Example: a month ("July 2015"), a year ("2015"), several months ("July and August 2015") or the eternity._

The smallest unit for OpenFisca periods is the **month**. Therefore:

- All periods are presumed to start on the first day of their first month.
- A period cannot be smaller than a month.


[Implementation options and helper functions](coding-the-legislation/35_periods.md) exist to transform periods or turn them into an instant.

