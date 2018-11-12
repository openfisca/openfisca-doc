# Coding a formula

## Basic Example

The following piece of code creates a variable named `flat_tax_on_salary`, representing an imaginary tax of 25% on salaries, paid monthly by individuals (not households).

```py
class flat_tax_on_salary(Variable):
    value_type = float
    entity = Person
    definition_period = MONTH
    label = u"Individualized and monthly paid tax on salaries"

    def formula(person, period):
        salary = person('salary', period)
        return salary * 0.25
```

Let's explain in details the different parts of the code:

### The variable name

`class flat_tax_on_salary(Variable):` declares a new variable named `flat_tax_on_salary`.  You can check out our recommended [naming conventions](../contribute/variables-naming.md).

### The variable attributes

All variables have a set of attributes.
* `value_type` defines the type of the formula output. Possible types are the basic python types. 
Note however that OpenFisca uses NumPy to [run calculations vectorially](25_vectorial_computing.md),
so the actual type of data may be slightly different from the builtin Python ones.
Available types are :
    - `bool`: boolean
    - `date`: date
    - `Enum`: discrete value (from an enumerable). [See details](20_input_variables.md#advanced-example-enumerations-enum) in the next section.
    - `float`: float (Note that to reduce memory usage, float are stored on 32 bits using NumPy's `float32`)
    - `int`: integer
    - `str`: string
* `entity` defines who or what group the variable concerns, e.g. individuals, households, families. 
* `definition_period` defines the period on which the variable is calculated. It can be `MONTH` (e.g. salary), `YEAR` (e.g. income taxes), or ETERNITY (e.g. date of birth)
* `label` is a human friendly way to describe the variable
* `reference` is a list of relevant legislative reference for this variables (usually URLs the text of the law or another trustworthy source)

### The formula

  - `def formula(person, period):` declares the formula that will be used to calculate the `flat_tax_on_salary` for a given `person` at a given `period`. Because `definition_period = MONTH`, `period` is constrained to be a month.
  - `salary = person('salary', period)` calculates the salary of the person, for the given month. This will, of course, work only if `salary` is another variable in the tax and benefit system.
  - `return salary * 0.25` returns the result for the given period.
  - [Dated Formulas](40_legislation_evolutions.md) have a start and/or an end date.
  
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

## Example with legislation parameters

To access a common legislation parameter, a third parameter can be added to the function signature. The previous formulas could thus be rewritten:

```py
class flat_tax_on_salary(Variable):
    value_type = float
    entity = Person
    label = u"Individualized and monthly paid tax on salaries"
    definition_period = MONTH

    def formula(person, period, parameters):
        salary = person('salary', period)

        return salary * parameters(period).taxes.salary.rate
```

`parameters` is here a function that be be called for a given period, and returns the whole legislation parameters (in a hierarchical tree structure). You can get the parameter you are interested in by navigating this tree with the `.` notation.
