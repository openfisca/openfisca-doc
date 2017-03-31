# Person, entities, role

Taxes and benefits can be calculated for different entities: persons, household, companies, etc.

## Person
Some openfisca variables are defined for a *person*.  

Example: a ["salary"](https://legislation.openfisca.fr/variables/salaire_net) is defined as the individual level.

##  Group entities
*Group entities* are clusters of *persons* such as the family, the household or the company.
A tax and benefit system can define several entities and specifies each time which tax and benefit applies to which entity.

In France the legislation has these *group entities*: 
- `"familles"`,
- `"foyers_fiscaux"` and 
- `"menages"`.

Example: the  ["local tax"](https://legislation.openfisca.fr/variables/taxe_habitation) is calculated over the `"menages"`.

###### Roles
Each person related to a *group entity* has a *role* inside this entity.  

The *roles* are:
- for '```familles```': ```parents``` and ```enfants```,
- for '```foyers_fiscaux```': ```declarants``` and ```personnes_a_charge```,
- for '```menages```': ```personne_de_reference```, ```conjoint```, ```enfants```and ```autres```.

You can define as many entities as you want and dispatch persons into them.

#### Application: module used by OpenFisca

The entities definitions are closely related to a country, therefore they are defined in a Python package (OpenFisca-France) independent from the core engine (OpenFisca-Core).

