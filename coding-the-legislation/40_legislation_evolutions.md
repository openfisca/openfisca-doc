# Legislation evolutions

Openfisca handles the fact that the legislation changes over time.

## Parameter evolution

Many legislation parameters are regularly re-evaluated while the variables using them stay the same.
>Example: the `taxes` parameter can change without altering the code of the `flat_tax_on_salary` variable that uses that parameter.

In that case, add the new parameter values and their start dates in the appropriate parameter files.

### How to update a parameter

#### Open the file where the parameter is described

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

#### Add a new value to this parameter

```yaml
taxes:
  salary:
    rate:
      description: Rate for the flat tax on salaries
      values:
        2017-01-01:
          value: 0.25
          reference: https://www.legislation-source.com/2017
        2016-01-01:
          value: 0.25
          reference: https://www.legislation-source.com/2016
        2015-01-01:
          value: 0.20
          reference: https://www.legislation-source.com/2015
```

After this change `legislation(period).taxes.salary.rate` will return the corresponding values:
- `legislation('2015-04').taxes.salary.rate` will return `0.2`
- `legislation('2017-01').taxes.salary.rate` will return `0.3`
- `legislation('2022-01').taxes.salary.rate` will return `0.3`

[Read more about how to code parameters](./legislation_parameters.md#parameters-and-time).

## Formula evolution

Some fiscal or benefit mechanism significantly evolve over time and call for a change in the formula that computes them. In this case, a simple parameter adjustement is not enough.

For instance, let's assume that from the 1st of Jan. 2017, the `flat_tax_on_salary` is not applied anymore on the first `1000` earned by a person.

We implement this rule by adding a new formula to our variable, and _dating_ it:

```py
class flat_tax_on_salary(Variable):
    value_type = float
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula_2017(person, period, parameters):
        salary = person('salary', period)
        salary_above_1000 = min_(salary - 1000, 0)
        return salary_above_1000 * parameters(period).taxes.salary.rate

    def formula(person, period, parameters):
        salary = person('salary', period)

        return salary * parameters(period).taxes.salary.rate
```

If the `flat_tax_on_salary` is calculated for a person **before** the 31st of Dec. 2016 (included), `formula` is used. If it is called **after** the 1st of Jan 2017 (included), `formula_2017` is used.

Formula naming rules:
- A formula name must always start with `formula`.
- To define a starting date for a formula, we add to its name a suffix made of an underscore followed by a date.
  - For instance, `formula_2017_01_01` is active from the 1st of Jan. 2017.
- When defining a date, the month is given **before** the day.
- When no month or day is specified, OpenFisca uses '01' as default value.
  - For instance, `formula_2017` is equivalent to `formula_2017_01_01`.
- If no date is specified for a formula, OpenFisca will consider that this formula has been active since the dawn of time (or more precisely, since `0001-01-01`, as Python does not handle B.C. dates).
  - For instance, `formula` is active on `2010`.
- A formula is active until another formula, starting later, becomes active and replaces it (or until the variable `end` date is reached, as we'll see further down in the [Variable end](#variable-end) section).
  - For instance, `formula` is active until `2016-12-31` (included). On the day after, `2017-01-01`, `formula_2017` becomes active, and `formula` becomes inactive.


## Formula introduction

In our previous example, we assumed that `flat_tax_on_salary` had _always_ had a formula, since the dawn of time. This is a reasonable hypothesis if we are only interested in running computations for recent years.

But most fiscal and benefit mechanisms have been introduced at some point. Let's for instance assume that our `flat_tax_on_salary` only appeared in our legislation on the 1st of June 2005. 

This is easily implemented by _dating_ the two formulas:

```py
class flat_tax_on_salary(Variable):
    value_type = float
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula_2017(person, period, parameters):
        salary = person('salary', period)
        salary_above_1000 = min_(salary - 1000, 0)
        return salary_above_1000 * parameters(period).taxes.salary.rate

    def formula_2005_06(person, period, parameters):
        salary = person('salary', period)

        return salary * parameters(period).taxes.salary.rate
```

Only a few characters changed in comparison with the last example: the suffix `_2005_06` has been added to the second formula name.

Note that if `flat_tax_on_salary` is calculated **before** `2005-05-31` (included), _none_ of the two formulas is used, as they are _both inactive_ at this time. Instead, **the variable [default value](../variables.md#default-values) is returned**.


## Variable end

As the legislation evolves, some fiscal or benefit mechanisms disapear.

Let's for instance assume that a `progressive_income_tax` used to exist before the `flat_tax_on_salary` was introduced. This progressive tax then disapeared on the 1st of June 2005.

This is implemented with an `end` attribute that define the _last day_ a variable can be calculated:

```py
class progressive_income_tax(Variable):
    value_type = float
    entity = Person
    label = u"Former tax replaced by the flat tax on the 1st of June 2005"
    definition_period = MONTH
    end = '2005-05-31'

    def formula(person, period, legislation):
        # Apply a marginal scale to the person's income
        ...
```

If `progressive_income_tax` is called **before** `2005-05-31`(included), `formula` will be used.

However, if `progressive_income_tax` is calculated **after** `2005-06-01` (included), `formula` is **not** used, as it is not active anymore at this time. Instead, **the variable [default value](../variables.md#default-values) is returned**. 

Note that:
- The `end` day is **inclusive**: it is the last day a variable and its formulas are active (and not the first day it is not active anymore).
- The `end` value is a string of format `YYYY-MM-DD` where `YYYY`, `MM` and `DD` are respectively a year, month and day.
- When defining a date, the month is given **before** the day.
