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

[Read more about how to code parameters](./legislation_parameters.md#parameters-and-time).

## Variable defined until a specific date

As the legislation evolves, some fiscal or benefit mechanism appear and disapear.  
For every variable, you can specify the attribute `end`; it defines until when this variable makes sense.

If called outside of its definition time, a variable will **not** execute its formula and instead **return its default value**.

For instance:
```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    end = '2014-12-31'
    definition_period = MONTH

    def formula(person, period, legislation):
        ...
```

will return a value calculated by its `formula` function if it is called for any date before its `end = '2014-12-31'` date. 
While it will return the default OpenFisca value for `FloatCol` if it is called after its `end` date.

Note that:
- The `end` is the last day a variable and its formulas are valid (not the first day of unvalidity).
- The `end` value is a string of 'YYYY-MM-DD' format where YYYY, MM and DD are respectively a year, month and day.
- When defining a date, the month is given **before** the day.

## Formula evolving over time

Some fiscal or benefit mechanism significantly evolve over time, with bigger changes than a simple parameter adjustement.

For instance, let's assume that from the 1st of Jan. 2017, our previous `flat_tax_on_salary` will not apply on the first `1000` earned by the person. 
We can implement this rule with dated formulas:

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

    def formula_2014(self, simulation, period):
        salary = person('salary', period)
        salary_above_1000 = min_(salary - 1000, 0)
        return salary_above_750 * legislation(period).taxes.salary.rate

    def formula(self, simulation, period):
        salary = person('salary', period)

        return salary * legislation(period).taxes.salary.rate
```

Note that:
- A formula name should start with `formula`.
- To define a starting date on a formula, we add a suffix to its name: `formula_2017` is valid from '2017'.
- When no month or day is specified, OpenFisca uses '01' as default value: `formula_2017` is similar to `formula_2017_01_01`.
- OpenFisca sets '0001-01-01' as default starting date for formulas without date: `formula` is similar to `formula_0001_01_01`.
- The end of validity of a formula is deduced from its siblings: 
  * the last day of validity for `formula` is '2013-12-31',
  * the last day of validity for `formula_2014` is '2016-12-31'.
- When there is an `end` attribute, every formula stops on the defined `end` day. 
If called outside of its definition time, a variable will **not** execute its formula and instead **return its default value**.
