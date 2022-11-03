# Person, entities, role

Taxes and benefits can be calculated for different entities: persons, household, companies, etc.

## Person

Some OpenFisca variables are defined for a _person_.

Example: a ["salary"](https://fr.openfisca.org/legislation/salaire_net) is defined as the individual level.

## Group entities

_Group entities_ are clusters of _persons_ such as the family, the household or the company.
A tax and benefit system can define several entities and specifies each time which tax and benefit applies to which entity.

In France the legislation has these _group entities_:

- `"familles"`,  (families)
- `"foyers_fiscaux"` (tax homes) and
- `"menages"` (households).

Example: the  ["local tax"](https://fr.openfisca.org/legislation/taxe_habitation) is calculated over the `"menages"`.

### Roles

Each person related to a _group entity_ has a _role_ inside this entity.

The _roles_ are:

- for '```familles```': ```parents``` and ```enfants``` (children),
- for '```foyers_fiscaux```': ```declarants``` (registrants) and ```personnes_a_charge``` (dependants),
- for '```menages```': ```personne_de_reference``` (reference person), ```conjoint```, ```enfants```and ```autres``` (other).

You can define as many entities as you want and dispatch persons into them.

#### Application: module used by OpenFisca

The entities definitions are closely related to a country, therefore they are defined in a Python package (OpenFisca-France) independent from the core engine (OpenFisca-Core).
