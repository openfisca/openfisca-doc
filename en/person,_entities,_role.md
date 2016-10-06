# Person, entities, role


OpenFisca models the real world legislation.
Each tax and benefit concerns either individual persons or entities.

Entities are groups of persons like a family, a household or a company.
The legislation defines many entities and specifies which tax and benefit applies to which entity.

The entities definitions are closely related to a country, therefore they are defined in a Python package independent from the core engine (ie OpenFisca-Core / OpenFisca-France).

In France the legislation defines these entities: `"familles"`, `"foyers_fiscaux"` and `"menages"`.

Each person related to an entity has a role. For `"familles"` the roles are "`parents`" and `"enfants"` (children).

You can define as many entities as you want and dispatch persons into them