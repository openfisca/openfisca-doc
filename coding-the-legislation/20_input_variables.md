# Introducing an input variable

The syntax to introduce an input variable is very similar to the one we used to code a formula.

For instance:

```py
class salary(Variable):
    column = FloatCol
    entity = Person
    label = u"Salary earned by a person for a given month"
    definition_period = MONTH
```


The only difference is that we do **not** have a formula to calculate the value of a variable.

If we ask the value of `salary` for a given month, the returned result will be:
* The **input** that was provided when initializing the simulation if it exists.
* The **default value** of the Variable if no input has been provided.

## Setting a default value

When declaring an input variable, you can change its default value by adding the argument `default` to the `column` attribute:

```py
class french_citizen(Variable):
    column = BoolCol(default = True)
    entity = Person
    label = u"Whether the person is a French citizen"
    definition_period = YEAR
```

If you do not explicitly define a default value, the following will be used:

- For numeric variables: `0`.
- For boolean variables: `False`.
- For enum variables: the item of index `0`.

## Advanced example: enumerations (enum)

### When to use enums?

Let's say you want to calculate a housing tax that depends on the occupancy status of the inhabitants.  

The input variable `housing_occupancy_status` will be an input variable, and have a limited set of possible values (e.g. Owner, Tenant ...). 
We can express this through the enum type.  

### How to use the enum in an input variable?

1. Create an [enumerated type](https://en.wikipedia.org/wiki/Enumerated_type) `HOUSING_OCCUPANCY_STATUS`:  

```py
HOUSING_OCCUPANCY_STATUS = Enum([
    u'Tenant',
    u'Owner',
    u'Free lodger',
    u'Homeless'])
```

Enum items can be references by their index (starting at `0`).
> For example, `HOUSING_OCCUPANCY_STATUS['Tenant']` will return `0`, `HOUSING_OCCUPANCY_STATUS['Owner']` will return `1`, `HOUSING_OCCUPANCY_STATUS['Free lodger']` will return `2`, ...

2. Create an OpenFisca variable `housing_occupancy_status`:  

```py
class housing_occupancy_status(Variable):
    column = EnumCol(
        enum = HOUSING_OCCUPANCY_STATUS
        )
    entity = Household
    definition_period = MONTH
    label = u"Legal housing situation of the household concerning their main residence"
```
It's a `HOUSING_OCCUPANCY_STATUS` for a specific entity and period (`Household` and `MONTH` here).  

A default value could also be added and taken into account when no input is provided for this variable:

```py
    column = EnumCol(
        enum = HOUSING_OCCUPANCY_STATUS,
        default = 1  # 'Owner'
        )
```

3. Use the enum in a variable formula:  

To get `housing_occupancy_status` for a given `month`, call `household('housing_occupancy_status', month)`. 
Its value is an index of `HOUSING_OCCUPANCY_STATUS` Enum.

4. Test the formula by inputing the enum:  

A YAML test would look as follows:

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

In your tests and calls to the Web API, favor its string definition as it is more readable than the enum index. 
