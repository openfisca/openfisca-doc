# Periods, Instants

#### Definition

OpenFisca manipulates time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.

_Example: the 15th June 2015._

- *Period*: a succession of days.

_Example: a month ("July 2015"), a year ("2015"), several months ("July and August 2015") or the eternity._

#### API

In OpenFisca, periods are encoded in strings. All the valid period formats are referenced in this table:

| Period format     | Period type     | Example             | Represents                                       | Disambiguation                                                        |
|-------------------|-----------------|---------------------|--------------------------------------------------|-----------------------------------------------------------------------|
| `AAAA`            | Calendar year   | `'2010'`            | The year 2010.                                   | From the 1st of January 2010 to the 31st of December 2010, inclusive. |
| `AAAA-MM`         | Month           | `'2010-04'`         | The month of April 2010.                         | From the 1st of April 2010 to the 30th of April 2010, inclusive.      |
| `year:AAAA-MM`    | Rolling year    | `'year:2010-04'`    | The 1 year period from April 2010 to April 2011. | From the 1st of April 2010 to the 31st of March 2011, inclusive       |
| `year:AAAA:N`     | N years         | `'year:2010:3'`     | The years 2010, 2011 and 2012.                   | From the 1st of January 2010 to the 31st of December 2012, inclusive. |
| `year:AAAA-MM:N`  | N rolling years | `'year:2010-04:3'`  | The three years from April 2010 to April 2012.   | From the 1st of April 2010 to the 31st of March 2012, inclusive.      |
| `month:AAAA-MM:N` | N months        | `'month:2010-04:3'` | The three months from April to June 2010.        | From the 1st of April 2010 to the 30th of June 2010, inclusive.       |

The smallest unit for OpenFisca periods is the **month**. Therefore:

- All periods are presumed to start on the first day of their first month.
- A period cannot be smaller than a month.

> Internally, time is stored as a start instant, a unit (MONTH, YEAR) and a quantity of units.

[Helper functions](coding-the-legislation/35_periods.md) exist to transform periods or turn them into an instant.

