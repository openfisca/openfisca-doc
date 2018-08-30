# Periods, Instants

Most of the values calculated in OpenFisca, such as an _income tax_, or a _housing allowance_, can change over time.  

## Time concepts in OpenFisca

In [simulations](simulation.md), parameters and variables, OpenFisca handles time via *periods* and *instants*.

- *Instant*: the atomic unit is a day, so instants are day dates.

_Example: the 15th June 2015._

- *Period*: a succession of days.

_Example: a month ("July 2015"), a year ("2015"), several months ("July and August 2015") or the eternity._


The smallest unit for OpenFisca periods is the **month**. Therefore:

- All periods are presumed to start on the first day of their first month.
- A period cannot be smaller than a month.

The largest unit for OpenFisca periods is the **eternity**, i.e. value of the variable is constant over time, e.g. a date of birth.

[Read more about the periods implementation in OpenFisca](coding-the-legislation/35_periods.md)

## Legislation evolution 

Both the formulas that calculate a variable and the values of a parameter can change over time.
OpenFisca has mechanisms in place to define changes in the legislation that uses Instants.

### Define a start date and an end date for a formula

The formula that calculates a variable might only be valid from a start date and before an end date. 

```py
class salary(Variable):
    value_type = float
    entity = Person
    label = u"Salary for a month"
    definition_period = MONTH
    end = '2018-11-30'
    def formula_2017_01_01(person, period, parameters):
        ...
    def formula(person, period):
        ...
```

To learn more, check out our [legislation evolutions page](coding-the-legislation/40_legislation_evolutions.md#formula-evolution).

### How to update a parameter

The value for a parameter also can evolve over time. 

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

To learn more, checkout the our [legislation evolutions page](coding-the-legislation/40_legislation_evolutions.md#how-to-update-a-parameter).

