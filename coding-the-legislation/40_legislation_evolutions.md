# Legislation evolutions

Openfisca handles the fact that the legislation change over time.

## Parameter evolution

Many legislation parameters are regularly re-evaluated. In that case, formulas usually don't need to be modified: adding the new parameter value in the parameter file is enough.

Let's go back to our [previous example](10_basic_example.md#example-with-legislation-parameters):

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def function(person, period, legislation):
        salary = person('salary', period)

        return period, salary * legislation(period).taxes.salary.rate
```

 and let's assume we have in one of our parameter files the value of the rate for the past couple of years:

```xml
<NODE code="taxes">
    <NODE code='salary'>
      <CODE code="rate" description="Rate for the flat tax on salaries">
        <VALUE deb="2016-01-01" fuzzy="true" valeur="0.25" />
        <VALUE deb="2015-01-01" fin="2015-12-31" valeur="0.20" />
        <VALUE deb="2014-01-01" fin="2014-12-31" valeur="0.22" />
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
        2015-11: 2000
        2014-01: 2000
```

we get the output:
```yaml
    flat_tax_on_salary:
        2016-01: 500
        2015-12: 400
        ...
        2015-01: 400
        2014-12: 440
        ...
        2014-01: 440
```

[Read more about how to code parameters](../legislation-parameters/README.md#parameters-and-time).

## Variable defined only for a specific time intervale

As the legislation evolves, some fiscal or benefit mechanism appear and disapear. When creating a variable, you can specify the attribute `start_date` and `stop_date` to defines in which time intervale this variable make sense.

When called outside of its definition intervale, a variable will **not** execute its formula and instead **return its default value**.

For instance:
```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    start_date = date(2014, 01, 01)
    definition_period = MONTH

    def function(person, period, legislation):
        ...

class progressive_income_tax(Variable):
    column = FloatCol
    entity = Person
    label = u"Former tax replaced by the flat tax on the 1st of Jan 2014"
    stop_date = date(2013, 12, 31)
    definition_period = MONTH

    def function(person, period, legislation):
        ...
```

Note that:
- A variable can of course have both a `start_date` and a `stop_date`.
- The `stop_date` is the last day a formula is valid, and not the first day it is not valid anymore.
- When defining a date, the month is given **before** the day.

## Formula evolving over time

Some fiscal or benefit mechanism significantly evolve over time, with bigger changes than a simple parameter adjustement.

For instance, let's assume that from the 1st of Jan. 2017, our previous `flat_tax_on_salary` will not apply on the first `1000` earned by the person. We can implement this rule with a `DatedVariable`:

```py
class flat_tax_on_salary(DatedVariable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    @dated_function(start = date(2017, 1, 1))
    def function_2017(self, simulation, period):
        salary = person('salary', period)
        salary_above_1000 = min_(salary - 1000, 0)
        return period, salary_above_1000 * legislation(period).taxes.salary.rate

    @dated_function(start = date(2014, 01, 01), stop = date(2016, 12, 31))
    def function_2014(self, simulation, period):
        salary = person('salary', period)

        return period, salary * legislation(period).taxes.salary.rate
```


Note that:
- If you omit the start date, the formula is valid until the stop date.
- If you omit the stop date, it is valid from the start date.
