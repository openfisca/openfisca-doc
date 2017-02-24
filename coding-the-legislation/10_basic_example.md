# Coding a formula

## Basic Example

The following piece of code creates a variable named `flat_tax_on_salary`, representing an imaginary tax of 25% on salaries, paid monthly by individuals (not households).

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    period_behavior = MONTH

    def function(person, period):
        salary = person('salary', period)

        return salary * 0.25
```

Let's explain in details the different part of the code:
- `class flat_tax_on_salary(Variable):` declares a new variable with the name `flat_tax_on_salary`.
- Metadatas:
  - `column = FloatCol` declares the type of the variable, here a Float. All available types are documented [here]().
  - `entity = Person` declares which entity the variable is defined for, e.g. a person, a family, a tax household, etc. The different available entities are defined by each tax benefit system. In `openfisca-france`, a variable can be defined for an `Individu`, a `Famille`, a `FoyerFiscal`, or a `Menage`.
  - `label = u"Individualized..."` gives, in a human-readable language, concise information about the variable.
- Formula:
  - `def function(person, period):` declares the formula that will be used to calculate the `flat_tax_on_salary` for a given `person` at a given `period`.
  - `period = period.this_month` is an openfisca idiom that indicates that when `flat_tax_on_salary` will be called for a period different than a month (e.g. a year), it will anyway return the value for a month.
  - `salary = person('salary', period)` calculates the salary of the person, for the given month. This will, of course, work only if `salary` is another variable in the tax benefit system.
  - `return period, salary * 0.25` returns the result for the given period.

## Example with legislation parameters

To access a common legislation parameter, a third parameter can be added to the function signature. The previous formulas could thus be rewritten:

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    period_behavior = MONTH

    def function(person, period, legislation):
        salary = person('salary', period)

        return salary * legislation(period).taxes.salary.rate
```

`legislation` is here a function that be be called for a given period, and returns the whole legislation (in a hierarchical tree structure). You can get the parameter you are interested in by navigating this tree with the `.` notation.
