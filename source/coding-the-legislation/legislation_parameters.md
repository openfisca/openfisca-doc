# Parameters

[Legislation parameters](../key-concepts/parameters.md) can be found in the `parameters` directory of your country package.

The parameters are organized with in a [tree structure](https://en.wikipedia.org/wiki/Tree_structure).

>**Example**: `tax_on_salary.public_sector.rate` can be found in `parameters/tax_on_salary/public_sector/rate.yml`.

Example of a `parameters` directory:
* parameters
  * tax_on_salary
    * **tax_scale.yaml**
    * public_sector
      * **rate.yaml**
  * universal_income
    * **minimum_age.yaml**
    * **amount.yaml**


In this file structure:
 - `tax_on_salaries`, `tax_on_salary.public_sector`, `universal_income` are **nodes**;
 - `tax_on_salaries.tax_scale`, `tax_on_salary.public_sector.rate`,`universal_income.minimum_age`,`universal_income.amount` are **parameters** (or scales).

## How to write a new parameter
> if you wish to update a parameter, read our [legislation evolution page](./40_legislation_evolutions.md).

1. Find where the parameter fits

A parameter is located inside a **node**, that has the same name as the directory it is contained in.
>**Example**: `tax_on_salary.public_sector` is the node that contains the `tax_on_salary.public_sector.rate`parameter.

2. Create a new parameter YAML file

A legislative parameter is defined by a YAML file of the same name. Possible attributes are:
* `description` (optional) Description;
* `reference` (optional) Legislative reference;
* `unit` (optional) Can be:
  - `year` : The values are years;
  - `currency`: The values are in the unit of currency of the country;
  - `/1`: The values are percentages, with `1.0`=100%;
* `values`: Value of the parameter for several dates.

Sample file `parameters/universal_income/amount.yaml`
```yaml
description: Universal income
unit: currency
values:
  1993-01-01:
    value: 1000
  2010-01-01:
    value: 1500
    reference: http://law.reference.org/universal_income
  2020-01-01:
    expected: 1700
```

In this example, the parameter `universal_income.amount` is:
* undefined before 1993;
* equal to 1000 from 1993 to 2010;
* equal to 1500 in 2010
* expected to be raised to 1700 "local currency" in 2020.

The ordering of the dates has no effect. It is recommended to add legislative references for every value?

3. Use the parameter in a variable

See [this example of a variable using legislation parameters](./10_basic_example.md#example-with-legislation-parameters).

### Naming conventions and reserved words

Names should begin with a lowercase letter and should contain only lowercase letters and the underscore (`_`).

The following keywords are reserved and should not be used as names : `description`, `reference`, `values`, `brackets`.

YAML parameter files should not be name `index.yaml`.

### Advanced uses

#### Use a YAML files to define nodes

A node can be defined with a YAML file instead of a directory. In such a case, the name of the file defines the name of the node. Such a file can define children nodes (which can define grandchildren...).

Sample `parameters/tax_on_salary.yaml`:

```yaml
description: Tax on salaries
reference: http://fiscaladministration.government/tax_on_salaries.html
tax_scale:
  bracket:
    ...
public_sector:
  description: Tax on salaries for public sector
  rate:
    values:
     ...
```

#### Create Scales

Scales are constituted of brackets. Brackets are defined by amounts, bases, rates, average rates and thresholds.

Sample `parameters/tax_on_salary/tax_scale.yaml`:
```yaml
description: Scale for tax on salaries
brackets:
- rate:
    1950-01-01:
      value: 0.0
    2010-01-01:
      value: 0.02
  threshold:
    1950-01-01:
      value: 0.0
- rate:
    1950-01-01:
      value: 0.2
  threshold:
    1950-01-01:
      value: 2000
```

Example: [the french tax scale on income](https://fr.openfisca.org/legislation/impot_revenu.bareme)

#### Import parameters from IPP tables

> This section applies only to OpenFisca-France.

The [<abbr title="Institut des politiques publiques">IPP</abbr>](http://www.ipp.eu/) is a French centre in economics which produces tax and benefit tables in the `XLSX` format, with parameters history.

The OpenFisca team works on importing those data into the YAML parameter files of OpenFisca-France.

See [this README](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/scripts/parameters/baremes_ipp) for more information.

## Computing a parameter that depends on a variable (fancy indexing)

Sometimes, the value of a parameter depends on a variable (e.g. a housing benefit that depends on the zone the house is built on).

To be more specific, let's assume that:
  - Households who rent their accomodation can get a `housing_benefit`
  - The amount of this benefit depends on which `zone` the household lives in. The `zone` can take only three values: `zone_1`, `zone_2` or `zone_3`.
  - The amount also depends on the composition of the household.

The parameters of this benefit can be defined in a `housing_benefit.yaml` file:

```YAML
zone_1:
  single:
    description: "Amount of housing benefit for a single person, in zone 1"
    values:
      2015-01-01:
        value: 150
  couple:
    description: "Amount of housing benefit for a couple, in zone 1"
    values:
      2015-01-01:
        value: 250
  per_child:
    description: "Amount of housing benefit per child, in zone 1"
    values:
      2015-01-01:
        value: 80
zone_2:
  single:
    description: "Amount of housing benefit for a single person, in zone 2"
    values:
      2015-01-01:
        value: 120
  couple:
    description: "Amount of housing benefit for a couple, in zone 2"
    values:
      2015-01-01:
        value: 220
  per_child:
    description: "Amount of housing benefit per child, in zone 2"
    values:
      2015-01-01:
        value: 60
zone_3:
  single:
    description: "Amount of housing benefit for a single person, in zone 3"
    values:
      2015-01-01:
        value: 100
  couple:
    description: "Amount of housing benefit for a couple, in zone 3"
    values:
      2015-01-01:
        value: 180
  per_child:
    description: "Amount of housing benefit per child, in zone 3"
    values:
      2015-01-01:
        value: 50
```

Then the formula calculting `housing_benefit` can be implemented with:

```py
def formula(household, period, parameters):
  is_couple = household('couple', period)
  nb_children = household('nb_children', period)
  zone = household('zone', period)

  P = parameters(period).housing_benefit[zone]

  return where(is_couple, P.couple, P.single) + nb_children * P.per_children
```

`parameters(period).housing_benefit[zone]` return the parameters for the zone corresponding to the household.

If there are many households in your simulation, this parameter will be **vectorial** : it may have a different value for each household of your entity.

To be able to use this notation, all the children node of the parameter node `housing_benefit` must be **homogenous**. In the previous example, `housing_benefit.zone_1`, `housing_benefit.zone_2`, `housing_benefit.zone_3` are homogenous, as they have the same subnodes.

However, let's imagine that `housing_benefit.yaml` had another subnode named `coeff_furnished`, which described a coefficient to apply to the benefit is the accomodation is rented furnished:

`housing_benefit.yaml` content:

```
coeff_furnished:
  description: "Coefficient to apply if the accomodation is rented furnished"
    values:
      2015-01-01:
        value: 0.75
zone_1:
  single:
    description: "Amount of housing benefit for a single person, in zone 1"
    values:
      2015-01-01:
        value: 150
(...)
```

In this case, `parameters(period).housing_benefit[zone]` would raise en error, whatever `zone` contains, as **the homogeneity condition is not respected**: `housing_benefit.zone_1` is a node, while `housing_benefit.coeff_furnished` is a parameter.

To solve this issue, the good practice would be to create an intermediate node `amount_by_zone`:

`housing_benefit.yaml` content:

```
coeff_furnished:
  description: "Coefficient to apply if the accomodation is rented furnished"
    values:
      2015-01-01:
        value: 0.75

amount_by_zone:
  zone_1:
    single:
      description: "Amount of housing benefit for a single person, in zone 1"
      values:
        2015-01-01:
          value: 150
  (...)
```

And then to get `parameters(period).housing_benefit.amount_by_zone[zone]`

## How to navigate the parameters in Python

Set-up your python file by importing a `country package` and building the `tax and benefits system`

> Example :
> ```
> import openfisca_country_template
> tax_benefit_system = openfisca_country_template.CountryTaxBenefitSystem()
> ```

### Access a parameter for all periods

To access a point in the parameter tree, call `tax_benefit_system.parameters`
> Example :
> Access the `benefit` branch of the `openfisca-country-template` legislation
> ```py
> tax_benefit_system.parameters.benefits
> ```
> Returns:
> ```sh
> basic_income:
>     2015-12-01: 600.0
> housing_allowance:
>   2016-12-01: None
>   2010-01-01: 0.25
> ```
>
> Access `basic_income`, a parameter of the `benefits` branch.
> ```py
> tax_benefit_system.parameters.benefits.basic_income
> ```
> Returns:
> ```sh
> 2015-12-01: 600.0
> ```

### Access a parameter for a specific period

Request a branch of a parameter at a given date with the `parameters.benefits('2015-07-01')` notation.

## How to update parameters in python

To add an entry to an existing parameter, use `update`:

> Example:
> ```py
> tax_benefit_system.parameters.benefits.basic_bro.update("2017-01", value = 2000)
> tax_benefit_system.parameters.benefits.basic_bro
> ```
> Returns:
> ```sh
> 2017-01-01: 2000
> 2015-12-01: 600.0
>```
