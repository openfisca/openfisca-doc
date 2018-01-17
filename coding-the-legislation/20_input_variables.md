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

## Advanced example: enumerations (enum)

### Usecases

Enumerations are variables that have a limited set of possible values. For instance:
- A person's relationship status: married, single, divorced.
- A household housing occupancy status: owner, tenant, free-lodger, homeless.
- The main occupation of a person: employee, freelance, retired, student, unemployed.

### Defining and using an enumeration variable

As an example, let's code a `housing_tax` that is paid by households who own or rent their main homes, but does not apply to households that do not have a stable residence, or are accommodated for free.

The variable `housing_tax` will thus depend on `housing_occupancy_status`, an enumeration variable that can take 4 values: `tenant`, `owner`, `free_lodger` and `homeless`.

First, we can create an [enumerated type](https://en.wikipedia.org/wiki/Enumerated_type) `HousingOccupancyStatus`:

```py
class HousingOccupancyStatus(Enum):
    tenant = u'Tenant or lodger who pays a rent'
    owner = u'Owner'
    free_lodger = u'Free logder'
    homeless = u'Homeless'
```

> OpenFisca enums are based on Python 3 native enums. Each enum item (for instance `HousingOccupancyStatus.tenant`) has:
> - a `name` attribute that contains its key (e.g. `tenant`)
> - a `value` attribute that contains its description (e.g. `"Tenant or lodger who pays a monthly rent"`)

Then, create an OpenFisca variable `housing_occupancy_status`:

```py
class housing_occupancy_status(Variable):
    value_type = Enum
    possible_values = HousingOccupancyStatus
    default_value = HousingOccupancyStatus.tenant  # The default is mandatory
    entity = Household
    definition_period = MONTH
    label = u"Legal housing situation of the household concerning their main residence"
```


You can now use the enum in variable formulas !

For instance, assuming the enumeration and the formula using it are defined in the same file:

```py
class housing_tax(Variable):
    value_type = float
    entity = Household
    definition_period = MONTH.
    label = u"Tax paid by each household proportionnally to the size of its accommodation"

    def formula(household, period, legislation):
        accommodation_size = household('accomodation_size', period)
        housing_occupancy_status = household('housing_occupancy_status', period)
        tenant = (housing_occupancy_status == HousingOccupancyStatus.tenant)
        owner = (housing_occupancy_status == HousingOccupancyStatus.owner)

        # The tax is applied only if the household owns or rents its main residency
        return (owner + tenant) * accommodation_size * 10
```

If the enumeration and the formula using it are **not** defined in the same file, an extra step is necessary:

```py
class housing_tax(Variable):
    value_type = float
    entity = Household
    definition_period = MONTH.
    label = u"Tax paid by each household proportionnally to the size of its accommodation"

    def formula(household, period, legislation):
        accommodation_size = household('accomodation_size', period)
        housing_occupancy_status = household('housing_occupancy_status', period)
        HousingOccupancyStatus = housing_occupancy_status.possible_values  # "Import" the enum type. Careful: do not use python imports accross variables files: comparisons would not work !
        tenant = (housing_occupancy_status == HousingOccupancyStatus.tenant)
        owner = (housing_occupancy_status == HousingOccupancyStatus.owner)

        # The tax is applied only if the household owns or rents its main residency
        return (owner + tenant) * accommodation_size * 10
```

You can now test the formula in a YAML test:

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

