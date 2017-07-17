# Periods

A period can be a month, a year, `n` successive months, `n` successive years or the eternity.


## Periods for variable

Most of the quantities calculated in openfisca can change over time. Therefore, each formula calculates a variable for a person (or a family, etc.) **for a given period**.

This period is always the second argument of the formulas:

```py
class salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Salary for a month"
    definition_period = MONTH

    def formula(person, period):
        ...
```

The size of the period is constrained by the class attribute `definition_period`:
  - `definition_period = MONTH`: The variable may have a different value each month. *For example*, the salary of a person. When `formula` is executed, the parameter `period` will always be a whole month. Trying to compute `salary` with a period that is not a month will raise an error before entering `formula`.
  - `definition_period = YEAR`: The variable is defined for a year or it has always the same value every months of a year. *For example*, if taxes are to be paid yearly, the corresponding variable is yearly. When `formula` is executed, the parameter `period` will always be a whole year (from January 1st to December 31th).
  - `definition_period = ETERNITY`: The value of the variable is constant. *For example*, the date of birth of a person never changes. `period` is still the 2nd parameter of `formula`. However when `formula` is executed, the parameter `period` can be anything and it should not be used.


## Calculating dependencies for a period different than the one they are defined for

Calling a formula with a period that is incompatible with the attribute `definition_period` will cause an error. For instance, if we assume that a person `salary` is paid monthly:

```py
class taxes(Variable):
    column = FloatCol
    entity = Person
    label = u"Taxes for a whole year"
    definition_period = YEAR

    def formula(person, period):  # period is a year because definition_period = YEAR
        salary_past_year = person('salary', period)  # salary is computed on a year while it's a montly variable, openfisca will complain
        ...
```

However, sometimes, we do need to estimate a variable for a different period than the one it is defined for.

We may for example want to get the sum of the salaries perceived on the past year, or the past 3 months. The option `ADD` tells openfisca to split the period into months, compute the variable for each month and sum up the results:

```py
class taxes(Variable):
    column = FloatCol
    entity = Person
    label = u"Taxes for a whole year"
    definition_period = YEAR

    def formula(person, period):  # period is a year because definition_period = YEAR
        salary_last_year = person('salary', period, options = [ADD])
        ...
```

The option `DIVIDE` allows you to do the opposite: evaluating a quantity for a month while the variable is defined for a year. Openfisca computes the variable for the whole year that contains the specified month and then divides the result by 12.

```py
class salary_net_of_taxes(Variable):
    column = FloatCol
    entity = Person
    label = u"Monthly salary, net of taxes"
    definition_period = MONTH

    def formula(person, period):  # period is a month because definition_period = MONTH
        # The variable taxes is computed on a year, monthly_taxes equals the 12th of that result
        monthly_taxes = person('taxes', period, options = [DIVIDE])

        # salary is a monthly variable, period is a month: no option is required
        salary = person('salary', period)

        return salary - monthly_taxes
```


## Calculating dependencies for a specific period

It happens that the formula to calculate a variable at a given period needs the value of another variable for another period. Usually, the second period is defined relatively to the first one (previous month, last three month, current year).

For instance, we want to compute an unemployment benefit that equals half of last year's salary, if the person had no income for the past 3 months.

```py
class unemployment_benefit(Variable):
    column = FloatCol
    entity = Person
    label = u"Unemployment benefit"
    definition_period = MONTH

    def formula(person, period):
        salary_last_3_months = person('salary', period.last_3_month)
        salary_last_year = person('salary', period.last_year)

        is_unemployed = (salary_last_3_months == 0)
        return 0.5 * salary_last_year * is_unemployed
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


## Automatically process variable inputs defined for periods not matching the `definition_period`

By default, when you provide a simulation inputs, you won't a able to set a variable value for a period that doesn't match its `definition_period`.

For instance, as the `definition_period` of `salary` is `MONTH`, if you provide as an input a value of `salary` for `2015`, an error will be raised.

It is however possible to define an automatic behaviour to cast yearly inputs into monthy values. To do this, add a `set_input` class attribute to a variable.

* if `set_input = set_input_divide_by_period`, the 12 months are set equal to the 12th of the input value,
* if `set_input = set_input_dispatch_by_period`, the 12 months are set equal to input value.

For instance, let's slightly modify the code of `salary`:
```py
class salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Salary for a month"
    definition_period = MONTH
    set_input = set_input_divide_by_period

    def formula(person, period):
        ...
```

We can now provide an input for `2015` for `salary`: no error will be raised, and the value will be automatically split between the 12 months of `2015.
