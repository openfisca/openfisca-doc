# Legislation evolutions

Openfisca handles the fact that the legislation changes over time.

## Parameter evolution

Many legislation parameters are regularly re-evaluated. 
In that case, formulas usually don't need to be modified: adding the new parameter value in the parameter file is enough.

Let's go back to our [previous example](10_basic_example.md#example-with-legislation-parameters):

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula(person, period, legislation):
        salary = person('salary', period)

        return salary * legislation(period).taxes.salary.rate
```

 and let's assume we have in one of our parameter files the value of the rate for the past couple of years:

```xml
<NODE code="taxes">
    <NODE code='salary'>
      <CODE code="rate" description="Rate for the flat tax on salaries">
        <VALUE deb="2016-01-01" valeur="0.25" />
        <VALUE deb="2015-01-01" valeur="0.20" />
        <VALUE deb="2014-01-01" valeur="0.22" />
      </CODE>
    </NODE>
</NODE>
```

In the formula, when `legislation(period).path.to.parameter` is called, the parameter corresponding to the **requested period** will be returned.

For the following inputs:
```yaml
    salary:
        2016-01: 2000
        2015-12: 2000
        2015-01: 2000
        2014-12: 2000
        2014-01: 2000
```

we get the output:
```yaml
    flat_tax_on_salary:
        2016-01: 500
        2015-12: 400
        2015-01: 400
        2014-12: 440
        2014-01: 440
```

[Read more about how to code parameters](./legislation_parameters.md#parameters-and-time).

## Formula evolving over time

Some fiscal or benefit mechanism significantly evolve over time, with bigger changes than a simple parameter adjustement.

For instance, let's assume that from the 1st of Jan. 2017, our previous `flat_tax_on_salary` will not be applied on the first `1000` earned by the person.

We implement this rule by adding a new formula to our variable, and _dating_ it:

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula_2017(self, simulation, period):
        salary = person('salary', period)
        salary_above_1000 = min_(salary - 1000, 0)
        return salary_above_1000 * legislation(period).taxes.salary.rate

    def formula(self, simulation, period):
        salary = person('salary', period)

        return salary * legislation(period).taxes.salary.rate
```

If the `flat_tax_on_salary` is calculated for a person **before** the 31st of Dec. 2016 (included), `formula` is used. If it is called **after** the 1st of Jan 2017 (included), `formula_2017` is used.

Note that:
- A formula name must always start with `formula`.
- To define a starting date for a formula, we add to its name a suffix made of an underscore followed by a date.
  - For instance, `formula_2017_01_01` is active from the 1st of Jan. 2017.
- When defining a date, the month is given **before** the day.
- When no month or day is specified, OpenFisca uses '01' as default value.
  - For instance, `formula_2017` is equivalent to `formula_2017_01_01`.
- If no date is specified for a formula, OpenFisca will consider that this formula has been active since the dawn of time (or more precisely, since `0001-01-01`, as Python does not handle B.C. dates).
  - For instance, `formula` is active on `2010`.
- A formula is active until another formula, starting later, becomes active and replaces it.
  - For instance, `formula` is active until `2016-12-31` (included). On the day after, `2017-01-01`, `formula_2017` becomes active, and `formula` becomes inactive.


## Introduction of a formula

In our previous example, we assumed that `flat_tax_on_salary` had _always_ had a formula, since the dawn of time. This is a reasonable hypothesis if we are only interested in running computations for recent years.

But most fiscal and benefit mechanisms have been introduced at some point. Let's for instance assume that our `flat_tax_on_salary` only appeared in our legislation on the 1st of June 2005. 

This is easily implemented by _dating_ the two formulas:

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula_2017(self, simulation, period):
        salary = person('salary', period)
        salary_above_1000 = min_(salary - 1000, 0)
        return salary_above_1000 * legislation(period).taxes.salary.rate

    def formula_2005_06(self, simulation, period):
        salary = person('salary', period)

        return salary * legislation(period).taxes.salary.rate
```

Only a few characters changed in comparison with the last example: the suffix `_2005_06` has been added to the second formula name.

Note that if `flat_tax_on_salary` is calculated **before** `2005-05-31` (included), _none_ of the two formulas is used, as they are _both inactive_ at this time. Instead, **the variable [default value](../variables.md#default-values) is returned**.


## Variable defined until a specific date

As the legislation evolves, some fiscal or benefit mechanisms disapear.

Let's for instance assume that a `progressive_income_tax` used to exist before the `flat_tax_on_salary` was introduced, and that therefore this progressive tax disapeared on the 1st of June 2005.

This is implemented with an `end` attribute that define the _last day_ a variable can be calculated:

```py
class progressive_income_tax(Variable):
    column = FloatCol
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
