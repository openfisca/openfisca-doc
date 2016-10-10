# Person, entities, role

#### Definition 
Taxes and benefits are calculated at different levels of people aggregates.

###### Person
Some measures depend only on the attributes of the *person*.  

Example : the ["allocations chômage imposables"](https://legislation.openfisca.fr/variables/chomage_imposable) are calculated as the individual level.

######  Entities
*Entities* are clusters of *persons* like the family, the household or the company.
The legislation defines many entities and specifies each time which tax and benefit applies to which entity.

In France the legislation has these *entities*: 
- `"familles"`,
- `"foyers_fiscaux"` and 
- `"menages"`.

Example : the  ["taxe d'habitation"](https://legislation.openfisca.fr/variables/taxe_habitation) is calculated over the `"menages"`.

###### Roles
Each person related to an *entity* has a *role* inside this entity.  

The *roles* are :
- for '```familles```': ```parents``` and ```enfants```,
- for '```foyers_fiscaux```': ```declarants``` and ```personnes_a_charge```,
- for '```menages```': ```personne_de_reference```, ```conjoint```, ```enfants```and ```autres```.

You can define as many entities as you want and dispatch persons into them.

#### Application : module used by OpenFisca

The entities definitions are closely related to a country, therefore they are defined in a Python package (OpenFisca-France) independent from the core engine (OpenFisca-Core).

