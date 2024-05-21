# Person, entities, role

Taxes and benefits can be calculated for different entities: persons, household, companies, etc.

## Person

The person entity within OpenFisca is unique and there is only one entity of this type. Some OpenFisca variables are defined for a _person_.

Example: a "salary" or someone's age is defined for a person.

## Group entities

_Group entities_ are clusters of _persons_ such as a family, a household or a company.
A tax and benefit system will likely define several entities and specify for each variable if it applies to a specific group entity or a person.

In France the legislation has these _group entities_:

- `"familles"`,  (families)
- `"foyers_fiscaux"` (tax units) and
- `"menages"` (households).

In France for example, `"taxe_habitation"` (local tax) is calculated specifically for `"menages"`.

### Roles

Each person related to a _group entity_ has a _role_ inside this entity.

By way of example, within the OpenFisca France model the _roles_ are:

- for '```familles```': ```parents``` and ```enfants``` (children),
- for '```foyers_fiscaux```': ```declarants``` (registrants) and ```personnes_a_charge``` (dependants),
- for '```menages```': ```personne_de_reference``` (reference person), ```conjoint```, ```enfants``` and ```autres``` (other).

and within the OpenFisca Aotearoa Model the _roles_ are:

- for '```families```': ```principal```, ```partner```, ```parent```, ```child``` and ```other```,
- for '```tenancies```': ```principal```, ```tenant``` and ```other```,
- for '```ownerships```': ```principal```, ```owner``` and ```other```,
- for '```Titled Properties```': ```owner``` and ```other```,

You can define as many entities and roles as you want.

#### Entities and roles are instance specific

Entities and roles are described per the country, jurisdiction or domain, independent from the core engine (OpenFisca-Core). They can be identified in the texts of the modelled rules.
