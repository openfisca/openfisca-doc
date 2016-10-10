# Key concepts

This section presents the key concepts required to have a good understanding of OpenFisca, without being too technical.

We use the French legislation to illustrate these concepts as it is the only actively maintained country for now.
French names are kept as it is.

## Tax and benefit system

The tax and benefit system is the higher-level instance in OpenFisca.
Its goal is to model the legislation of a country.

Basically a tax and benefit system contains simulation variables (source code) and legislation parameters (data).

The OpenFisca core engine is able to simulate any country legislation once it is (partially) represented as source code.

## Variables

Variables can be calculated or input.

Input variables are normal variables but don't have any formula defined.
Their value is given by the caller who runs the simulation.

Calculated variable have a formula which can be bypassed if an actual value is given.
Calculated variables have dependencies: variables involved in the formula.
The dependencies are either calculated, either looked in input variables. If not found, default values are used (most of the time `0`).

Variables values (input or calculated) are associated to a period.

Input variables are defined given a period. For example you give a salary amount for a period of 6 months.

When a variable is called, a period is given.
For example you want to know the amount of a tax for a specific year.

But sometimes the asked period isn't calculable so the core engine returns the value for another period.
There are some strategies to deal with these periods mismatch, which are documented later.

The [legislation explorer](http://legislation.openfisca.fr/) presents each variable under its own URL.
For example [`irpp`](http://legislation.openfisca.fr/variables/irpp).

## Parameters

Parameters are data, variables are algorithms.

Each time a part of the legislation is data, it should be stored in a parameters file instead of creating a variable which returns a static value.

Parameters are read by variables formulas.

Legislation parameters are stored in an XML file:
[`param.xml`](https://github.com/openfisca/openfisca-france/blob/master/openfisca_france/param/param.xml).

They can be simple values or scales and are stored by date to collect the past values.
Even with simple values, there can be many values for the same parameter because of the multiple dates.

For instance, the calculation of the `irpp` variable will involve the `ir.recouvrement.min` parameter, also present in the [legislation explorer](http://legislation.openfisca.fr/parameters/ir.recouvrement.min).

There are functions to extract a subset of the whole legislation at a specific instant, which is necessary when writing the formula of a variable.

The [legislation explorer](http://legislation.openfisca.fr/) presents each parameter under its own URL.
For example [a simple value](http://legislation.openfisca.fr/parameters/prelsoc.rsa) or [a scale](http://legislation.openfisca.fr/parameters/ir.bareme)

## Simulation

A simulation is basically a cache of previously computed results.

To calculate any variable you need to create a `Simulation` from the `TaxBenefitSystem`.

It's possible to run many independent simulations using the same `TaxBenefitSystem`.

## Persons, entities and roles

OpenFisca models the real world legislation.
Each tax and benefit concerns either individual persons or entities.

Entities are groups of persons like a family, a household or a company.
The legislation defines many entities and specifies which tax and benefit applies to which entity.

The entities definitions are closely related to a country, therefore they are defined in a Python package independent from the core engine (ie OpenFisca-Core / OpenFisca-France).

In France the legislation defines these entities: `"familles"`, `"foyers_fiscaux"` and `"menages"`.

Each person related to an entity has a role. For `"familles"` the roles are "`parents`" and `"enfants"` (children).

You can define as many entities as you want and dispatch persons into them.

## Test cases or data

OpenFisca can take test cases or data (surveys with aggregated data or real population data) as input when calculating variables.

A test case describes persons and entities with their input variables whereas data contains potentially a huge quantity of persons and entities.

Test cases can be expressed in Python or in JSON when using the Web API (see specific sections of the documentation).

Here is a test case sample in JSON for a single person with 3 children:

```json
{
  "familles": [
    {
      "parents": ["parent1"],
      "enfants": ["enfant1", "enfant2", "enfant3"]
    }
  ],
  "foyers_fiscaux": [
    {
      "declarants": ["parent1"],
      "personnes_a_charge": ["enfant1", "enfant2", "enfant3"]
    }
  ],
  "individus": [
    {
      "id": "parent1",
      "date_naissance": "1980-01-01",
      "salaire_de_base": 15000
    },
    {
      "id": "enfant1",
      "date_naissance": "2005-01-01"
    },
    {
      "id": "enfant2",
      "date_naissance": "2003-01-01"
    },
    {
      "id": "enfant3",
      "date_naissance": "1997-01-01"
    }
  ],
  "menages": [
    {
      "personne_de_reference": "parent1",
      "enfants": ["enfant1", "enfant2", "enfant3"],
      "loyer": 1500
    }
  ]
}
```

Notice the input variables associated to the `"individus"` (`"date_naissance"` and `"salaire_de_base"`) and to the entity `"menages"` (`"loyer"`).

This is quite verbose but there are shortcuts to generate a test case in common situations.

Using data as input is not documented yet. Please consult this repository:
https://github.com/openfisca/openfisca-france-data

## Scenarios

To support both test cases and data, and for performance reasons,
OpenFisca is developed using vector computing via the [NumPy](http://www.numpy.org/) Python package.

Whatever the input is, a test case or data, OpenFisca will transform it to vectors internally.

Scenarios take a test cases as input and convert them into vectors.

They even offer a way to simplify the declaration of test cases when it contains only a single entity of each type.

## Reforms

An reform represents a modified version of the tax and benefit legislation.

For example it can be used to add, remove or modify a variable, or a legislation parameter.

The tax and benefit system of the country knows about the laws that are already adopted, were existing in the past, or will exist in a near future. In contrast, the reforms are used for political reforms or propositions that people do but are not officially voted.

Reforms do not modify the `TaxBenefitSystem` itself, they create a shallow copy and modify only what changed.

Reforms are loaded given a base `TaxBenefitSystem` and return an extended one.

As a consequence reforms can be composed (`ext2(ext1(tax_benefit_system))`).

Reforms can be published in their own `git` repository.

## Periods and instants

OpenFisca manipulates time via periods and instants.

The atomic unit is a day, so instants are day dates.

Periods are defined using an ad-hoc strings format.
Internally, they are stored as a start instant, a unit (month, year) and a quantity of units.

For example:

- `"2015"` is a year, `"2015-01"` is a month, `"2015-06:3"` are the 3 months
june, july and august of the year 2015. They are all periods.
- `"2015-02-15"` is an instant.

Functions exist to transform periods or turn them into an instant, which are documented later.

