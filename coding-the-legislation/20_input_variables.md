# Introducing an input variable

The syntax to introduce an input variable is very similar to the one we used to code a formula.

For instance:

```py
class salary(Variable):
    value_type = float
    entity = Person
    label = u"Salary earned by a person for a given month"
    definition_period = MONTH
```


The only difference is that we do **not** have a formula to calculate the value of a variable.

If we ask the value of `salary` for a given month, the returned result will be:
* The **input** that was provided when initializing the simulation if it exists.
* The **default value** of the Variable if no input has been provided.

## Setting a default value

When declaring an input variable, you can change its default value by adding the `default_value` attribute:

```py
class french_citizen(Variable):
    value_type = bool
    default_value = True
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

Let's say you want to write a `housing_tax` that depends on the occupancy status of the inhabitants.
> Example: Only Tenants and Owners pay the housing tax. Free Lodgers and Homeless people are exempted.

`housing_occupancy_status` will be an input variable, and have a limited set of possible values (e.g. Owner, Tenant ...).
We can express this through the enum type.

### How to use the enum in an input variable?

1. Create an [enumerated type](https://en.wikipedia.org/wiki/Enumerated_type) `HousingOccupancyStatus`:

```py
class HousingOccupancyStatus(Enum):
    tenant = u'Tenant or lodger who pays a rent'
    owner = u'Owner'
    free_lodger = u'Free logder'
    homeless = u'Homeless'

```

> Each enum item has:
> - a `name` property that contains its key (e.g. `tenant`)
> - a `value` property that contains its description (e.g. `"Tenant or lodger who pays a monthly rent"`)

> For example, `HousingOccupancyStatus.tenant.name` will return `tenant`.

2. Create an OpenFisca variable `housing_occupancy_status`. The Enum can be referenced or declared in the Variable:

> Referenced:
> ```py
> class housing_occupancy_status(Variable):
>     value_type = Enum
>     possible_values = HOUSING_OCCUPANCY_STATUS
>     entity = Household
>     definition_period = MONTH
>     label = u"Legal housing situation of the household concerning their main residence"
> ```
> Declared in the variable:
> ```py
> class housing_occupancy_status(Variable):
>     value_type = Enum
>     possible_values = Enum([
>         u'Tenant',
>         u'Owner',
>         u'Free logder',
>         u'Homeless'
>         ])
>     entity = Household
>     definition_period = MONTH
>     label = u"Legal housing situation of the household concerning their main residence"
> ```

A `default_value` can also be added:

```py
class housing_occupancy_status(Variable):
    value_type = Enum
    possible_values = HousingOccupancyStatus
    default_value = HousingOccupancyStatus.tenant #The default is mandatory
    entity = Household
    definition_period = MONTH
    label = u"Legal housing situation of the household concerning their main residence"
```

This variable links the `HousingOccupancyStatus` to a specific entity and period (`Household` and `MONTH` here).


3. Use the enum in a variable formula:

In a formula, get `housing_occupancy_status` for a given `month` by calling `household('housing_occupancy_status', month)`.

```py
class housing_tax(Variable):
    value_type = float
    entity = Household
    definition_period = YEAR  # This housing tax is defined for a year.
    label = u"Tax paid by each household proportionnally to the size of its accommodation"

    def formula(household, period, legislation):
        # The housing tax is defined for a year, but depends on the `accomodation_size`
        # and `housing_occupancy_status` on the first month of the year.
        january = period.first_month
        accommodation_size = household('accomodation_size', january)

        housing_occupancy_status = household('housing_occupancy_status', january)
        tenant = (housing_occupancy_status == HousingOccupancyStatus.tenant)
        owner = (housing_occupancy_status == HousingOccupancyStatus.owner)

        # The tax is applied only if the household owns or rents its main residency
        return (owner + tenant) * accommodation_size * 10
```

4. Test the formula by inputing the enum:

A YAML test would look as follows:

```yaml
- name: Household with free lodger status living in a 100 sq.meters accomodation
  period: 2017
  input_variables:
    accomodation_size:
      2017-01: 100
    housing_occupancy_status:
      2017-01: free_lodger
  output_variables:
    housing_tax: 0
```

As described in the YAML example above, favor the enum's string definition in your tests and Web API calls, as it is more readable than the enum index.
