# Coding a formula

## Basic Example

The following piece of code creates a variable named `flat_tax_on_salary`, representing an imaginary tax of 25% on salaries, paid monthly by individuals (not households).

```py
class flat_tax_on_salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula(person, period):
        salary = person('salary', period)

        return salary * 0.25
```

Let's explain in details the different part of the code:
- `class flat_tax_on_salary(Variable):` declares a new variable with the name `flat_tax_on_salary`.
- Metadatas:
  - `column = FloatCol` declares the type of the variable. Possible types are:
    - `AgeCol`: age
    - `BoolCol`: boolean
    - `DateCol`: date
    - `EnumCol`: discrete value (from an enumerable)
    - `FixedStrCol`: string with maximum length
    - `FloatCol`: float
    - `IntCol`: integer
    - `StrCol`: string
    - *`PeriodSizeIndependentIntCol`: integer (deprecated)*
  - `entity = Person` declares which entity the variable is defined for, e.g. a person, a family, a tax household, etc. The different available entities are defined by each tax and benefit system. In `openfisca-france`, a variable can be defined for an `Individu`, a `Famille`, a `FoyerFiscal`, or a `Menage`.
  - `label = u"Individualized..."` gives, in a human-readable language, concise information about the variable.
  - `definition_period = MONTH` states that the variable will be computed on months.
- Formula:
  - `def formula(person, period):` declares the formula that will be used to calculate the `flat_tax_on_salary` for a given `person` at a given `period`. Because `definition_period = MONTH`, `period` is constrained to be a month.
  - `salary = person('salary', period)` calculates the salary of the person, for the given month. This will, of course, work only if `salary` is another variable in the tax and benefit system.
  - `return salary * 0.25` returns the result for the given period.

## Testing a formula

To make sure that the formula you have just written works the way you expect, you have to test it. Tests about legislation are written in a [YAML syntax](writing_yaml_tests.md). The `flat_tax_on_salary` formula can for instance be tested with the following test file:

```yaml

- name: "Flax tax on salary - No income"
  period: 2017-01
  input_variables:
    salary: 0
  output_variables:
    flat_tax_on_salary: 0

- name: "Flax tax on salary - With income"
  period: 2017-01
  input_variables:
    salary: 2000
  output_variables:
    flat_tax_on_salary: 500
```

You can check the [YAML tests documentation](writing_yaml_tests.md) to learn more about how to write YAML tests, and how to run them.

## Example with Enum variable

Let's say we have a `HOUSING_OCCUPANCY_STATUS` enumeration:

```py
HOUSING_OCCUPANCY_STATUS = Enum([
    u'Tenant',
    u'Owner',
    u'Free lodger',
    u'Homeless'])
```

To declare an enumeration variable `housing_occupancy_status` of `HOUSING_OCCUPANCY_STATUS` in your legislation, the `EnumCol` type should be defined as follow:

```py
class housing_occupancy_status(Variable):
    column = EnumCol(
        enum = HOUSING_OCCUPANCY_STATUS
        )
    entity = Household
    definition_period = MONTH
    label = u"Legal housing situation of the household concerning their main residence"
```

A default value could also be added:
```py
    column = EnumCol(
        enum = HOUSING_OCCUPANCY_STATUS,
        default = 1
        )
```

Thus, to get this variable for a given `month` you would call `household('housing_occupancy_status', month)`. Its value is an index of `HOUSING_OCCUPANCY_STATUS` Enum.
Nevertheless, in a YAML test, favor its string definition as it is more readable than the enumeration index:

```yaml

- name: Household with free lodger status living in a 100 sq.meters accomodation
  period: 2017
  input_variables:
    accomodation_size:
      2017-01: 100
    housing_occupancy_status:
      2017-01: Free lodger
  output_variables:
    housing_tax: 0
```

## Example with legislation parameters

To access a common legislation parameter, a third parameter can be added to the function signature. The previous formulas could thus be rewritten:

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

`legislation` is here a function that be be called for a given period, and returns the whole legislation (in a hierarchical tree structure). You can get the parameter you are interested in by navigating this tree with the `.` notation.
