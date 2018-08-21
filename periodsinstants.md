# Periods, Instants

Most of the quantities calculated in OpenFisca, such as `income tax`, and `housing allowance`, can change over time. 

## Time concepts in OpenFisca

In simulations, tests and parameters, variables and formulas, OpenFisca manipulates time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.

_Example: the 15th June 2015._

- *Period*: a succession of days.

_Example: a month ("July 2015"), a year ("2015"), several months ("July and August 2015") or the eternity._


The smallest unit for OpenFisca periods is the **month**. Therefore:

- All periods are presumed to start on the first day of their first month.
- A period cannot be smaller than a month.

The largest unit for OpenFisca periods is the **eternity**. The value of the variable is constant over time, e.g. a date of birth.

[Implementation options and helper functions](coding-the-legislation/35_periods.md) exist to transform periods or turn them into an instant.


## Legislation Evolution 

Both the formulas that calculates a variable, and the values of a parameters can change over time.
OpenFisca has mechanisms in place to define changes in the legislation that uses Instants.

### Define a start date and an end date for a formula

The formula that calculate can change. To learn more, checkout the our [legislation evolutions page](coding-the-legislation/40_legislation_evolutions.md/#formula-evolution)

```py
class salary(Variable):
    value_type = float
    entity = Person
    label = u"Salary for a month"
    definition_period = MONTH
    end = '2016-11-30'
    def formula_2017_01_01(person, period, parameters):
        ...
    def formula(person, period):
        ...
```
### How to update a parameter

The value for a parameter also can evolve. To learn more, checkout the our[legislation evolutions page](coding-the-legislation/40_legislation_evolutions.md/#how-to-update-a-parameter)

```yaml
taxes:
  salary:
    rate:
      description: Rate for the flat tax on salaries
      values:
        2016-01-01:
          value: 0.25
          reference: https://www.legislation-source.com/2016
        2015-01-01:
          value: 0.20
          reference: https://www.legislation-source.com/2015
```




