# Legislation parameters


## Hierarchical structure

The parameters are organized with a [tree structure](https://en.wikipedia.org/wiki/Tree_structure). Each node of the tree can contain scales, parameters or other nodes ("children nodes").


## Writing parameters

The legislation parameters are stored in YAML files in the directory `parameters` ([example in OpenFisca-France](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/parameters)).

The structure of the directory follows the tree structure of the parameters.

Example:
```
* parameters
  * _.yaml
  * tax_on_salary
    * _.yaml
    * tax_scale.yaml
    * public_sector
      * _.yaml
      * rate.yaml
  * universal_income
    * minimum_age.yaml
    * amount.yuml
```
This file structure defines the nodes `tax_on_salaries`, `tax_on_salary.public_sector`, `universal_income` and the parameters (or scales) `tax_on_salaries.tax_scale`, `tax_on_salary.public_sector.rate`, `universal_income.minimum_age`, `universal_income.amount`.

### Nodes

A node is defined by a directory of the same name. Such a directory contains a file `_.yaml` that describe the node with the following attributes:
* `type`: Must be set to `node`
* `description`: (optional) Description of the node
* `reference`: (optional) Reference to a legislative text, or a URL

Sample `parameters/tax_on_salary/_.yaml`:
```yaml 
type: node
description: Tax on salaries
reference: http://fiscaladministration.government/tax_on_salaries.html
```

Alternativelly, a node can be defined with a YAML file instead of a directory. In such a case, the name of the file defines the name of the node. Such a file can define children nodes (which can define grandchildren...).

Sample `parameters/tax_on_salary.yaml`:
```yaml
type: node
description: Tax on salaries
reference: http://fiscaladministration.government/tax_on_salaries.html
tax_scale:
  type: scale
  bracket:
    ...
public_sector:
  type: node:
  description: Tax on salaries for public sector
  rate:
    type: parameter
    values:
     ...
```

### Parameters

A legislative parameter is defined by a YAML file of the same name. Possible attributes are:
* `type`: Must be `parameter`
* `description` (optional) Description
* `reference` (optional) Legislative reference
* `unit` (optional) Can be:
  - `year` : The values are years
  - `currency`: The values are in the unit of currency of the country
  - `/1`: The values are percentages, with `1.0`=100%
* `values`: Value of the parameter for several dates.

Sample file `parameters/universal_income/amount.yaml`
```yaml
type: parameter
description: Universal income
unit: currency
values:
  '1993-01-01':
    value: 1000
  '1995-01-01':
    value: null
  '2010-01-01':
    value: 1500
  '2015-01-01':
    value: 1600
    reference: Link to text of law
  '2020-01-01':
    expected: 1700
```

On this example, the parameter `universal_income.amount` is:
* undefined before 1993
* equal to 1000 "local currency" from 1993 to 1994
* removed from the legislation from 1995 to 2009
* equal to 1500 "local currency" from 2010 to 2014
* raised to 1600 "local currency" from 2015 to 2019
* expected to be raised to 1700 "local currency" in 2020

The ordering of the dates has no effect. Optional legilative references can be added for each value.

### Scales

Scales are constituted of brackets. Brackets are defined by amounts, bases, rates and thresholds.

Sample `parameters/tax_on_salary/tax_scale.yaml`:
```yaml
type: scale
description: Scale for tax on salaries
brackets:
- rate:
    '1950-01-01':
      value: 0.0
    '2010-01-01':
      value: 0.02
  threshold:
    '1950-01-01':
      value: 0.0
- rate:
    '1950-01-01':
      value: 0.2
  threshold:
    '1950-01-01':
      value: 2000
```

Example: [the french tax scale on salaries](https://legislation.openfisca.fr/parameters/impot_revenu.bareme)


## Usage in formulas

See [this example](./10_basic_example.md#example-with-legislation-parameters).


## Importing from IPP tables

> This section applies only to OpenFisca-France.

The [<abbr title="Institut des politiques publiques">IPP</abbr>](http://www.ipp.eu/) is a French centre in economics which produces tax and benefit tables in the `XLSX` format, with parameters history.

The OpenFisca team works on importing those data into the YAML parameter files of OpenFisca-France.

See [this README](https://github.com/openfisca/openfisca-france/tree/master/openfisca_france/scripts/parameters/baremes_ipp) for more information.
