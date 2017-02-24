# Periods

A period can be a month, a year, `n` successive months or `n` successive years.


## Periods for variable

Most of the quantities calculated in openfisca can change over time. Therefore, each formula calculates a variable for a person (or a family, etc.) **for a given period**.

This period is always the second argument of the formulas :

```py
class var(Variable):
    column = FloatCol
    entity = Person
    label = u"some variable"
    period_behavior = MONTH

    def function(person, period):
        ...
```

The size of the period is constrained by the class attribute `period_behavior` :
  - `period_behavior = MONTH` : The variable may have a different value each month. For example, the salary of a person. The parameter `period` is guaranteed to be a whole month.
  - `period_behavior = YEAR` : The variable is yearly or has always the same value every month. For example, The input of a yearly declaration. The parameter `period` is guaranteed to be a whole year (from january 1st to 31th december).
  - `period_behavior = PERMANENT` : The value of the variable is permanent. For example, the age of a person never changes. There is no guarantee about `period` which must not be used.


## Calculating dependencies for a specific period

It happens that the formula to calculate a variable at a given period needs the value of another variable for another period. Usually, the second period is defined relatively to the first one (previous month, last three month, current year).

For instance:
```py
def function(person, period):
    salary_this_month = person('salary', period.this_month)
    salary_last_month = person('salary', period.last_month)
    salary_6_months_ago = person('salary', period.offset(-6, 'month'))
```

You can generate any period with the following properties and methods:

| Period                            | Meaning                                                      |
|-----------------------------------|--------------------------------------------------------------|
| `period.this_month`               | First month-length period that includes the start of `period`|
| `period.last_month`               | Month preceding `period.this_month`                          |
| `period.this_year`                | First year-length period that includes the start of `period` |
| `period.last_year`                | Year preceding `period.this_year`                            |
| `period.n_2`                      | 2 years before `period.this_year`                            |
| `period.last_3_months`            | The three-month period preceding `period.this_month`         |
| `period.offset(n, 'month')`       | `period` translated by n months (backwards if n <0)          |
| `period.offset(n, 'year')`        | `period` translated by n years (backwards if n <0)           |
| `period.start.period('year')`     | Year-long period starting a the same time than `period`      |
| `period.start.period('month')`    | Month-long period starting a the same time than `period`     |
| `period.start.period('year', n)`  | n-year-long period starting a the same time than `period`    |
| `period.start.period('month', n)` | n-month-long period starting a the same time than `period`   |

You can find more information on the `period` object in the [reference documentation]() (_not available yet_)

## Calculating dependencies for a period different than the one they are defined for

Variables and formulas are usually defined for months or years. The first line of a formula usualy precises what kind of period it is working with:

```py
    # Formula defined for years
    def function(person, period):
        period = period.this_year
        ...

    # Formula defined for months
    def function(person, period):
        period = period.this_year
        ...

    # Formula that can handle both months and years
    def function(person, period):
        [Ø]
        ...
```

Calling a formula with a period it is no able to handle will cause an error. For instance, if we assume that a person `salary` is paid monthly:

```py
def function(person, period):
    salary_past_year = person('salary', period.last_year) # THIS WILL BREAK !
    # >>> Requested period (...) differs from (...) returned by variable salary
```

However, sometimes, we do need to estimate a variable for a different period that the one it is defined for. 

We may for example want to get the sum of the salaries perceived on the past year, or the past 3 months. The `ADD` option allows you to do it:

```py
def function(person, period):
    period = period.this_month
    salary_last_year = person('salary', period.last_year, options = [ADD])
    salary_last_3_months = person('salary', period.last_3_months, options = [ADD])
```

The `DIVIDE` option allows you to do the opposite: evaluating a quantity for a smaller period than what it is defined for. For instance, in the following example, `yearly_tax_projected` will contain the value of `some_yearly_tax` for the year including `period` divided by 12.

```py
def function(person, period):
    period = period.this_month
    tax_projected = person('some_yearly_tax', period.this_month, options = [DIVIDE])
```

`ADD` and `DIVIDE` can be both used together in tricky cases, for instance if you want an estimation for the past three month of a variable that is defined yearly :

```py
def function(person, period):
    period = period.this_month
    tax_projected_on_last_3_months = person('some_yearly_tax', period.last_3_months, options = [ADD, DIVIDE])
```
