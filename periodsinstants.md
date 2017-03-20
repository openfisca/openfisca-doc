# Periods, Instants

#### Definition
OpenFisca manipulates time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.
Example: the 15th June 2015
- *Period*: a succession of days.
Example: a month ("July 2015"), a year ("2015"), several months ("July and August 2015") or the eternity.

#### Implementation in OpenFisca

In OpenFisca, periods are encoded in strings. All the valid period formats are referenced in this table:

| Period               |   Period type    | Example                                                                    |
|----------------------|-----------------------------------------------------------------------------------------------|
| `AAAA`               | Calendar year    | `'2010'` is the year 2010                                                  | 
| `AAAA-MM`            | Month            | `'2010-04'` is april 2010                                                  | 
| `year:AAAA-MM`       | Rolling year     | `'year:2010-04'` is the 12 months period starting from april 2010          | 
| `year:AAAA:N`        | N years          | `'year:2010:3'` is the 3 years period starting from 2010                   |
| `year:AAAA-MM:N`     | N rolling years  | `'year:2010:3'` is the 3 years (36 months) period starting from april 2010 |
| `month:AAAA-MM:N`    | N months         | `'month:2010-04:3'` is the 3 months period starting from april 2010        |

The smallest unit for OpenFisca periods is the **month**. Therefore:

- All periods are presumed to start on the first day of their first month
- A period cannot be smaller than a month

>Internally, time is stored as a start instant, a unit (MONTH, YEAR) and a quantity of units.

Functions exist to transform periods or turn them into an instant. They are documented [further](coding-the-legislation/35_periods.md).

